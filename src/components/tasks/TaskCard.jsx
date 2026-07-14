import { motion } from 'framer-motion'
import { Calendar, MessageSquare, Paperclip } from 'lucide-react'
import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import { cn } from '../../lib/cn'

// Left border color hints at priority.
const priorityBar = {
  High: 'border-l-rose-400',
  Medium: 'border-l-amber-400',
  Low: 'border-l-sky-400',
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

// Single kanban card. `onClick` opens the task detail modal.
export default function TaskCard({ task, onClick }) {
  return (
    <motion.button
      layout
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      className={cn(
        'w-full cursor-pointer rounded-xl border border-l-4 border-slate-200 bg-white p-3.5 text-left shadow-sm transition-shadow hover:shadow-md',
        priorityBar[task.priority] || 'border-l-slate-300'
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        {task.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-sm font-medium leading-snug text-slate-800">
        {task.title}
      </p>
      <p className="mt-1 text-xs text-slate-400">{task.project}</p>

      <div className="mt-3 flex items-center justify-between">
        <Badge tone={undefined}>{task.priority}</Badge>
        <div className="flex items-center gap-2.5 text-slate-400">
          <span className="inline-flex items-center gap-1 text-xs">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(task.dueDate)}
          </span>
          <Avatar
            initials={task.assignee.initials}
            color={task.assignee.avatarColor}
            size="xs"
          />
        </div>
      </div>
    </motion.button>
  )
}
