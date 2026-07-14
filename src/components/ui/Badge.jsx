import { cn } from '../../lib/cn'

// Status / label pill. `tone` picks a semantic color set.
const tones = {
  neutral: 'bg-slate-100 text-slate-600 ring-slate-200',
  brand: 'bg-brand-50 text-brand-700 ring-brand-200',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  warning: 'bg-amber-50 text-amber-700 ring-amber-200',
  danger: 'bg-rose-50 text-rose-700 ring-rose-200',
  info: 'bg-sky-50 text-sky-700 ring-sky-200',
}

// Convenience map so callers can pass a domain value and get the right tone.
export const statusTone = {
  // project / task status
  'On Track': 'success',
  'At Risk': 'warning',
  Delayed: 'danger',
  'In Progress': 'brand',
  Done: 'success',
  Todo: 'neutral',
  Review: 'warning',
  Overdue: 'danger',
  // member status
  Active: 'success',
  Invited: 'info',
  Suspended: 'danger',
  // invitation status
  Pending: 'warning',
  Accepted: 'success',
  Expired: 'neutral',
  // roles
  Owner: 'brand',
  Member: 'neutral',
  // priority
  High: 'danger',
  Medium: 'warning',
  Low: 'info',
  // plans
  Free: 'neutral',
  Pro: 'brand',
  Business: 'info',
  Paid: 'success',
}

export default function Badge({ children, tone, dot = false, className }) {
  const resolved = tone || statusTone[children] || 'neutral'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
        tones[resolved],
        className
      )}
    >
      {dot && (
        <span
          className={cn('h-1.5 w-1.5 rounded-full', {
            'bg-slate-400': resolved === 'neutral',
            'bg-brand-500': resolved === 'brand',
            'bg-emerald-500': resolved === 'success',
            'bg-amber-500': resolved === 'warning',
            'bg-rose-500': resolved === 'danger',
            'bg-sky-500': resolved === 'info',
          })}
        />
      )}
      {children}
    </span>
  )
}
