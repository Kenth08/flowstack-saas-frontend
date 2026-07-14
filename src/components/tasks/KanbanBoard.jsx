import { Plus } from 'lucide-react'
import TaskCard from './TaskCard'
import { cn } from '../../lib/cn'

// Kanban board laid out as horizontally-scrolling columns.
// Structure is drag-and-drop ready: swap the map for a DnD context later.
// TODO(dnd): wrap columns/cards with a DnD library (dnd-kit) and persist
// order via PATCH /api/v1/projects/{uuid}/tasks/{id}/ when moved.
export default function KanbanBoard({ columns, tasks, onTaskClick, onAddTask }) {
  const grouped = columns.map((col) => ({
    ...col,
    items: tasks.filter((t) => t.status === col.key),
  }))

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
      {grouped.map((col) => (
        <div
          key={col.key}
          className="flex w-72 shrink-0 flex-col rounded-2xl bg-slate-100/70 p-3"
        >
          <div className="mb-3 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className={cn('h-2.5 w-2.5 rounded-full', col.accent)} />
              <h3 className="text-sm font-semibold text-slate-700">
                {col.title}
              </h3>
              <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-500">
                {col.items.length}
              </span>
            </div>
            <button
              onClick={() => onAddTask?.(col.key)}
              className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-white hover:text-brand-600"
              aria-label={`Add task to ${col.title}`}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            {col.items.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => onTaskClick?.(task)}
              />
            ))}
            {col.items.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 px-3 py-6 text-center text-xs text-slate-400">
                Drop tasks here
              </div>
            )}
            <button
              onClick={() => onAddTask?.(col.key)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 px-3 py-2 text-xs font-medium text-slate-500 transition-colors hover:border-brand-300 hover:bg-white hover:text-brand-600"
            >
              <Plus className="h-3.5 w-3.5" /> Add task
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
