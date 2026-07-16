import { cn } from '../../lib/cn'
import { inputClass } from '../ui/Modal'

// ---------------------------------------------------------------------------
// AuthField — one labeled input used across every auth form (login, register,
// forgot/reset password) so they stay visually consistent. Supports a leading
// icon, an inline error message, a hint, and a trailing slot (e.g. the
// show/hide password toggle).
// ---------------------------------------------------------------------------
export default function AuthField({
  label,
  icon: Icon,
  error,
  hint,
  rightSlot,
  id,
  className,
  ...props
}) {
  const fieldId = id || props.name
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={fieldId}
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        )}
        <input
          id={fieldId}
          aria-invalid={!!error}
          className={cn(
            inputClass,
            Icon && 'pl-10',
            rightSlot && 'pr-10',
            error &&
              'border-rose-300 focus:border-rose-400 focus:ring-rose-500/30',
          )}
          {...props}
        />
        {rightSlot && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            {rightSlot}
          </div>
        )}
      </div>
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-400">{hint}</p>
      ) : null}
    </div>
  )
}
