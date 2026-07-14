import { cn } from '../../lib/cn'

// Base shimmer block. Compose these to mirror real content while API loads.
// TODO(api): render these while fetch/react-query `isLoading` is true.
export default function Skeleton({ className }) {
  return (
    <div className={cn('shimmer rounded-md bg-slate-200/70', className)} />
  )
}

// Prebuilt skeleton for a stat card row on the overview page.
export function StatCardSkeleton() {
  return (
    <div className="fs-card p-5">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="mt-4 h-7 w-20" />
      <Skeleton className="mt-2 h-3 w-24" />
      <Skeleton className="mt-4 h-10 w-full" />
    </div>
  )
}

// Prebuilt skeleton for a table (rows x cols).
export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="fs-card divide-y divide-slate-100 overflow-hidden">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4 p-4">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton
              key={c}
              className={cn('h-4', c === 0 ? 'w-40' : 'flex-1')}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
