import { CreditCard, Download, ExternalLink, Sparkles } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import PricingCard from '../components/billing/PricingCard'
import BillingUsageCard from '../components/billing/BillingUsageCard'
import { useToast } from '../components/ui/Toast'
import { billing, plans } from '../data/mockData'

// TODO(api): GET  /api/v1/billing/subscription/   -> current plan + usage
// TODO(api): POST /api/v1/billing/checkout-session/ -> Stripe Checkout redirect
// TODO(api): POST /api/v1/billing/portal-session/   -> Stripe billing portal

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function Billing() {
  const toast = useToast()
  const { currentPlan, usage, history } = billing

  const openPortal = () => {
    // TODO(api): POST /api/v1/billing/portal-session/ then redirect to url
    toast.info('Redirecting to billing portal…')
  }

  const selectPlan = (plan) => {
    // TODO(api): POST /api/v1/billing/checkout-session/ { plan: plan.id }
    toast.success(`Selected the ${plan.name} plan`)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing"
        subtitle="Manage your subscription, usage, and payment history."
      />

      {/* Current plan + usage */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Current plan */}
        <div className="fs-card overflow-hidden lg:col-span-2">
          <div className="relative bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-brand-200" />
                  <span className="text-sm font-medium text-brand-100">
                    Current plan
                  </span>
                </div>
                <p className="mt-2 text-3xl font-bold">{currentPlan.name}</p>
                <p className="mt-1 text-sm text-brand-100">
                  ${currentPlan.price}/{currentPlan.interval} · Renews{' '}
                  {formatDate(currentPlan.renewsOn)}
                </p>
              </div>
              <div className="flex flex-col items-start gap-3 sm:items-end">
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                  {currentPlan.status}
                </span>
                {/* TODO(api): POST /api/v1/billing/portal-session/ */}
                <Button
                  className="bg-white text-brand-700 hover:bg-brand-50"
                  icon={CreditCard}
                  onClick={openPortal}
                >
                  Manage Subscription
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Usage */}
        <BillingUsageCard usage={usage} />
      </div>

      {/* Pricing cards */}
      <div>
        <h3 className="mb-1 text-lg font-semibold text-slate-900">
          Available plans
        </h3>
        <p className="mb-5 text-sm text-slate-500">
          Upgrade or change your plan at any time.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              current={plan.name === currentPlan.name}
              onSelect={selectPlan}
            />
          ))}
        </div>
      </div>

      {/* Billing history */}
      <div className="fs-card overflow-hidden">
        <div className="flex items-center justify-between p-5">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Billing history
            </h3>
            <p className="mt-0.5 text-sm text-slate-500">
              Download past invoices and receipts.
            </p>
          </div>
          <Button variant="secondary" icon={ExternalLink} onClick={openPortal}>
            <span className="hidden sm:inline">Billing portal</span>
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3 font-medium">Invoice</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Plan</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 text-right font-medium">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {history.map((h) => (
                <tr key={h.id} className="transition-colors hover:bg-slate-50/70">
                  <td className="px-5 py-3 font-medium text-slate-700">
                    #{h.id}
                  </td>
                  <td className="px-5 py-3 text-slate-500">
                    {formatDate(h.date)}
                  </td>
                  <td className="px-5 py-3 text-slate-600">{h.plan}</td>
                  <td className="px-5 py-3 font-medium text-slate-700">
                    ${h.amount.toFixed(2)}
                  </td>
                  <td className="px-5 py-3">
                    <Badge>{h.status}</Badge>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-brand-600 transition-colors hover:bg-brand-50">
                      <Download className="h-3.5 w-3.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
