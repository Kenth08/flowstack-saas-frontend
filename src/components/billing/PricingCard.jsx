import { Check } from 'lucide-react'
import Button from '../ui/Button'
import { cn } from '../../lib/cn'

// Pricing plan card. Used on landing + billing pages.
// `current` marks the user's active plan (billing page context).
export default function PricingCard({ plan, current = false, onSelect }) {
  const highlighted = plan.highlighted
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border p-6 transition-shadow',
        highlighted
          ? 'border-brand-300 bg-white shadow-card ring-1 ring-brand-200'
          : 'border-slate-200 bg-white shadow-soft hover:shadow-card'
      )}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-3 py-1 text-xs font-semibold text-white shadow-sm">
          Most Popular
        </span>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
        <p className="mt-1 text-sm text-slate-500">{plan.tagline}</p>
      </div>

      <div className="mb-5 flex items-end gap-1">
        <span className="text-4xl font-bold tracking-tight text-slate-900">
          ${plan.price}
        </span>
        <span className="mb-1 text-sm text-slate-400">/month</span>
      </div>

      <ul className="mb-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-100">
              <Check className="h-3 w-3 text-brand-600" />
            </span>
            {f}
          </li>
        ))}
      </ul>

      {/* TODO(api): POST /api/v1/billing/checkout-session/ with plan id */}
      <Button
        variant={current ? 'secondary' : highlighted ? 'gradient' : 'secondary'}
        className="w-full"
        disabled={current}
        onClick={() => onSelect?.(plan)}
      >
        {current ? 'Current Plan' : `Choose ${plan.name}`}
      </Button>
    </div>
  )
}
