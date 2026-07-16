import { AlertTriangle, RefreshCw } from 'lucide-react'
import Button from './Button'

// ---------------------------------------------------------------------------
// ErrorState — shown when an API request fails. Pair it with `useAsync`'s
// `error` + `reload`:  {error && <ErrorState error={error} onRetry={reload} />}
// ---------------------------------------------------------------------------
export default function ErrorState({
  title = 'Something went wrong',
  description,
  error,
  onRetry,
  className = '',
}) {
  // Prefer an explicit description; fall back to the ApiError message.
  const message =
    description ||
    error?.message ||
    'We couldn’t load this data. Please try again.'

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-rose-200 bg-rose-50/60 px-6 py-16 text-center ${className}`}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ring-rose-100">
        <AlertTriangle className="h-7 w-7 text-rose-500" />
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">{message}</p>
      {onRetry && (
        <Button variant="secondary" icon={RefreshCw} className="mt-5" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}
