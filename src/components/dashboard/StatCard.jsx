import { motion } from 'framer-motion'
import {
  FolderKanban,
  ListChecks,
  CircleCheckBig,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import Sparkline from './Sparkline'
import { cn } from '../../lib/cn'

// Icon name -> component. Keeps mockData serializable (string icons).
const iconMap = {
  FolderKanban,
  ListChecks,
  CircleCheckBig,
  Users,
}

// KPI card: icon, value, trend chip, and a mini sparkline.
export default function StatCard({ stat, index = 0 }) {
  const Icon = iconMap[stat.icon] || FolderKanban
  const positive = stat.trend >= 0
  const sparkColor = positive ? '#6366f1' : '#f43f5e'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="fs-card p-5 transition-shadow hover:shadow-card"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={cn(
            'inline-flex items-center gap-0.5 rounded-full px-2 py-1 text-xs font-semibold',
            positive
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-rose-50 text-rose-600'
          )}
        >
          {positive ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}
          {Math.abs(stat.trend)}%
        </span>
      </div>

      <div className="mt-4">
        <p className="text-2xl font-bold tracking-tight text-slate-900">
          {stat.value.toLocaleString()}
        </p>
        <p className="mt-0.5 text-sm text-slate-500">{stat.label}</p>
      </div>

      <div className="mt-3 -mx-1">
        <Sparkline data={stat.spark} color={sparkColor} id={stat.key} />
      </div>
    </motion.div>
  )
}
