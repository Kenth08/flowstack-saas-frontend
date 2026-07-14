import { Search } from 'lucide-react'
import { cn } from '../../lib/cn'

// Reusable search field. Controlled via value/onChange when needed.
export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search…',
  className,
}) {
  return (
    <div className={cn('relative', className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 fs-focus transition-colors"
      />
    </div>
  )
}
