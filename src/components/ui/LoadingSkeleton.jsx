import Skeleton, { StatCardSkeleton, TableSkeleton } from './Skeleton'
import { cn } from '../../lib/cn'

// ---------------------------------------------------------------------------
// LoadingSkeleton — one component, many shapes. Render it while a page's
// `useAsync` call is `loading` so the placeholder mirrors the real layout.
//
//   <LoadingSkeleton variant="cards" count={6} />
//   <LoadingSkeleton variant="table" rows={6} cols={5} />
//   <LoadingSkeleton variant="kanban" />
//
// Variants: 'stats' | 'cards' | 'table' | 'kanban' | 'charts' | 'list' | 'block'
// ---------------------------------------------------------------------------
export default function LoadingSkeleton({
  variant = 'block',
  count = 6,
  rows = 5,
  cols = 4,
  className,
}) {
  switch (variant) {
    // Row of stat tiles (Overview, Analytics KPIs).
    case 'stats':
      return (
        <div
          className={cn(
            'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4',
            className
          )}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      )

    // Grid of content cards (Projects, Workspaces).
    case 'cards':
      return (
        <div
          className={cn(
            'grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3',
            className
          )}
        >
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="fs-card p-5">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
              <Skeleton className="mt-5 h-2 w-full rounded-full" />
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          ))}
        </div>
      )

    // Data table placeholder.
    case 'table':
      return <TableSkeleton rows={rows} cols={cols} />

    // Kanban board — horizontally scrolling columns of card placeholders.
    case 'kanban':
      return (
        <div className={cn('flex gap-4 overflow-x-auto pb-4', className)}>
          {Array.from({ length: 4 }).map((_, c) => (
            <div
              key={c}
              className="flex w-72 shrink-0 flex-col gap-2.5 rounded-2xl bg-slate-100/70 p-3"
            >
              <Skeleton className="mb-1 h-5 w-24" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="fs-card space-y-3 p-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-1/2" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-14" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )

    // Chart cards (Analytics, Overview charts).
    case 'charts':
      return (
        <div className={cn('grid grid-cols-1 gap-6 lg:grid-cols-3', className)}>
          <div className="fs-card p-5 lg:col-span-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="mt-4 h-56 w-full rounded-xl" />
          </div>
          <div className="fs-card p-5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-4 h-56 w-full rounded-xl" />
          </div>
        </div>
      )

    // Vertical list of rows (Invitations, activity).
    case 'list':
      return (
        <div className="fs-card divide-y divide-slate-100 overflow-hidden">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-4">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </div>
      )

    // Generic block.
    default:
      return <Skeleton className={cn('h-40 w-full', className)} />
  }
}
