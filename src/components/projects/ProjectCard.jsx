import { motion } from 'framer-motion'
import { MoreHorizontal, Calendar } from 'lucide-react'
import { AvatarGroup } from '../ui/Avatar'
import Badge from '../ui/Badge'
import { cn } from '../../lib/cn'

// Progress bar color by project status.
const barColor = {
  'On Track': 'bg-emerald-500',
  'At Risk': 'bg-amber-500',
  Delayed: 'bg-rose-500',
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

// Card view of a single project. Used on Projects + Overview.
export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="fs-card group flex flex-col p-5 transition-shadow hover:shadow-card"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={cn('h-9 w-1.5 rounded-full', project.color)} />
          <div>
            <h3 className="font-semibold text-slate-900 group-hover:text-brand-700">
              {project.name}
            </h3>
            <p className="mt-0.5 text-xs text-slate-400">{project.workspace}</p>
          </div>
        </div>
        <button className="rounded-lg p-1 text-slate-400 opacity-0 transition-opacity hover:bg-slate-100 group-hover:opacity-100">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-medium text-slate-500">Progress</span>
          <span className="font-semibold text-slate-700">{project.progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn(
              'h-full rounded-full',
              barColor[project.status] || 'bg-brand-500'
            )}
          />
        </div>
        <p className="mt-2 text-xs text-slate-400">
          {project.tasksDone} of {project.tasksTotal} tasks completed
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <AvatarGroup people={project.members} max={3} />
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(project.dueDate)}
          </span>
          <Badge>{project.status}</Badge>
        </div>
      </div>
    </motion.div>
  )
}
