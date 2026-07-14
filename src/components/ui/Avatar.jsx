import { cn } from '../../lib/cn'

// Initials-based avatar so we don't need image assets for the prototype.
// TODO(api): swap for real `avatar_url` from the user serializer when available.
const sizes = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
}

export default function Avatar({
  initials = '?',
  color = 'bg-brand-500',
  size = 'md',
  ring = false,
  className,
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white select-none',
        sizes[size],
        color,
        ring && 'ring-2 ring-white',
        className
      )}
    >
      {initials}
    </span>
  )
}

// Overlapping avatar group used on project/task cards.
export function AvatarGroup({ people = [], max = 3, size = 'sm' }) {
  const shown = people.slice(0, max)
  const extra = people.length - shown.length
  return (
    <div className="flex items-center -space-x-2">
      {shown.map((p) => (
        <Avatar
          key={p.id}
          initials={p.initials}
          color={p.avatarColor}
          size={size}
          ring
        />
      ))}
      {extra > 0 && (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-600 ring-2 ring-white',
            sizes[size]
          )}
        >
          +{extra}
        </span>
      )}
    </div>
  )
}
