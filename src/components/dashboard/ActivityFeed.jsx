import Avatar from '../ui/Avatar'

// Vertical timeline of recent team activity.
export default function ActivityFeed({ items = [] }) {
  return (
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={item.id} className="relative flex gap-3 pb-4 last:pb-0">
          {/* connector line */}
          {i !== items.length - 1 && (
            <span className="absolute left-4 top-9 h-full w-px bg-slate-100" />
          )}
          <Avatar
            initials={item.initials}
            color={item.avatarColor}
            size="sm"
          />
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{item.actor}</span>{' '}
              {item.action}{' '}
              <span className="font-medium text-brand-600">{item.target}</span>
            </p>
            <p className="mt-0.5 text-xs text-slate-400">{item.time}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
