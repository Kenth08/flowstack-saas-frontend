import { cn } from '../../lib/cn'
import EmptyState from './EmptyState'

// ---------------------------------------------------------------------------
// DataTable — a reusable, responsive table matching the FlowStack table style.
//
// Desktop (md+): a real <table>. Mobile (< md): each row collapses into a
// stacked card so tables never overflow horizontally on small screens.
//
//   const columns = [
//     { key: 'name',   header: 'Name',   render: (row) => <>{row.name}</> },
//     { key: 'status', header: 'Status', render: (row) => <StatusBadge value={row.status} /> },
//     { key: 'actions', header: '', align: 'right', hideLabelOnMobile: true,
//       render: (row) => <RowMenu row={row} /> },
//   ]
//   <DataTable columns={columns} data={rows} keyField="id" />
//
// Column shape:
//   key                unique id (and default cell accessor: row[key])
//   header             column heading text
//   render(row)        optional custom cell renderer
//   align              'left' | 'right' (default 'left')
//   className          extra classes for the <td>/value
//   hideLabelOnMobile  don't print the header label in the mobile card
// ---------------------------------------------------------------------------
export default function DataTable({
  columns,
  data = [],
  keyField = 'id',
  empty,
  className,
}) {
  if (!data.length) {
    return empty ?? <EmptyState />
  }

  return (
    <div className={cn('fs-card overflow-hidden', className)}>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'px-5 py-3 font-medium',
                    col.align === 'right' && 'text-right'
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((row) => (
              <tr
                key={row[keyField]}
                className="transition-colors hover:bg-slate-50/70"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      'px-5 py-3 text-slate-600',
                      col.align === 'right' && 'text-right',
                      col.className
                    )}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-slate-100 md:hidden">
        {data.map((row) => (
          <div key={row[keyField]} className="space-y-2 p-4">
            {columns.map((col) => {
              const content = col.render ? col.render(row) : row[col.key]
              if (content == null || content === '') return null
              return (
                <div
                  key={col.key}
                  className="flex items-center justify-between gap-3"
                >
                  {!col.hideLabelOnMobile && col.header && (
                    <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      {col.header}
                    </span>
                  )}
                  <span className={cn('min-w-0 text-sm text-slate-700', col.className)}>
                    {content}
                  </span>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
