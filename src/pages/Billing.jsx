import { CreditCard, Download, ExternalLink, Sparkles } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import PricingCard from '../components/billing/PricingCard'
import BillingUsageCard from '../components/billing/BillingUsageCard'
import DataTable from '../components/ui/DataTable'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import ErrorState from '../components/ui/ErrorState'
import { useToast } from '../components/ui/Toast'
import { useAsync } from '../hooks/useAsync'
import {
  getSubscription,
  listPlans,
  createCheckoutSession,
  createPortalSession,
} from '../api/billing'

// Data:
//   GET  /api/v1/billing/subscription/     -> current plan + usage + history
//   POST /api/v1/billing/checkout-session/ -> Stripe Checkout redirect
//   POST /api/v1/billing/portal-session/   -> Stripe billing portal

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Columns for the billing history DataTable (shared by desktop + mobile views).
const historyColumns = [
  { key: 'id', header: 'Invoice', className: 'font-medium text-slate-700',
    render: (h) => `#${h.id}` },
  { key: 'date', header: 'Date', render: (h) => formatDate(h.date) },
  { key: 'plan', header: 'Plan' },
  { key: 'amount', header: 'Amount', className: 'font-medium text-slate-700',
    render: (h) => `$${h.amount.toFixed(2)}` },
  { key: 'status', header: 'Status', render: (h) => <Badge>{h.status}</Badge> },
  {
    key: 'receipt',
    header: 'Receipt',
    align: 'right',
    render: () => (
      <button className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-brand-600 transition-colors hover:bg-brand-50">
        <Download className="h-3.5 w-3.5" /> PDF
      </button>
    ),
  },
]

export default function Billing() {
  const toast = useToast()
  const { data: billing, loading, error, reload } = useAsync(
    () => getSubscription(),
    []
  )
  const { data: plansData } = useAsync(() => listPlans(), [])
  const plans = plansData ?? []

  const openPortal = async () => {
    // POST /api/v1/billing/portal-session/ then redirect to { url }.
    toast.info('Redirecting to billing portal…')
    const { url } = await createPortalSession()
    if (url) window.location.href = url
  }

  const selectPlan = async (plan) => {
    // POST /api/v1/billing/checkout-session/ { plan: plan.id } then redirect.
    const { url } = await createCheckoutSession({ plan: plan.id })
    if (url) window.location.href = url
    else toast.success(`Selected the ${plan.name} plan`)
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Billing"
          subtitle="Manage your subscription, usage, and payment history."
        />
        <ErrorState error={error} onRetry={reload} />
      </div>
    )
  }

  if (loading || !billing) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Billing"
          subtitle="Manage your subscription, usage, and payment history."
        />
        <LoadingSkeleton variant="charts" />
        <LoadingSkeleton variant="table" rows={4} cols={6} />
      </div>
    )
  }

  const { currentPlan, usage, history } = billing

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
      <div>
        <div className="mb-4 flex items-center justify-between">
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
        {/* DataTable renders a table on desktop and stacked cards on mobile. */}
        <DataTable columns={historyColumns} data={history} />
      </div>
    </div>
  )
}
