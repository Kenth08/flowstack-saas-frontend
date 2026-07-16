import Badge, { statusTone } from './Badge'

// ---------------------------------------------------------------------------
// StatusBadge — the canonical pill for any domain status/role/priority value.
// Thin wrapper over <Badge> that resolves the semantic color from the value
// itself (see `statusTone` in Badge.jsx), so callers just pass the raw string
// the backend returns: <StatusBadge value={project.status} />.
// ---------------------------------------------------------------------------
export default function StatusBadge({ value, dot = false, tone, className }) {
  return (
    <Badge tone={tone} dot={dot} className={className}>
      {value}
    </Badge>
  )
}

export { statusTone }
