import { cn } from '../../lib/cn'

// Usage meter row: label + used/limit + progress bar.
function UsageRow({ item }) {
  const pct = Math.min(100, Math.round((item.used / item.limit) * 100))
  const danger = pct >= 90
  const warn = pct >= 70 && pct < 90
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-600">{item.label}</span>
        <span className="text-slate-500">
          {item.used}
          {item.unit} <span className="text-slate-400">/ {item.limit}{item.unit}</span>
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn(
            'h-full rounded-full transition-all',
            danger ? 'bg-rose-500' : warn ? 'bg-amber-500' : 'bg-brand-500'
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

// Card that lists all usage limits for the current plan.
export default function BillingUsageCard({ usage }) {
  return (
    <div className="fs-card p-5">
      <h3 className="text-base font-semibold text-slate-900">Usage & Limits</h3>
      <p className="mt-0.5 text-sm text-slate-500">
        Your consumption for the current billing period.
      </p>
      <div className="mt-5 space-y-4">
        {usage.map((item) => (
          <UsageRow key={item.label} item={item} />
        ))}
      </div>
    </div>
  )
}
