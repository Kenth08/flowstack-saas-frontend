import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import StatCard from '../components/dashboard/StatCard'
import ChartCard from '../components/dashboard/ChartCard'
import LineChartMock from '../components/dashboard/LineChartMock'
import DonutChartMock from '../components/dashboard/DonutChartMock'
import ActivityFeed from '../components/dashboard/ActivityFeed'
import Badge from '../components/ui/Badge'
import { AvatarGroup } from '../components/ui/Avatar'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import ErrorState from '../components/ui/ErrorState'
import { useAsync } from '../hooks/useAsync'
import { getMe } from '../api/me'
import { getOverview } from '../api/analytics'
import { listProjects } from '../api/projects'

// Data sources for this page:
//   GET /api/v1/me/                                  -> welcome name
//   GET /api/v1/workspaces/{uuid}/analytics/         -> stats, charts, activity
//   GET /api/v1/workspaces/{uuid}/projects/          -> recent projects list

const urgencyTone = {
  today: 'danger',
  soon: 'warning',
  week: 'info',
  later: 'neutral',
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export default function Overview() {
  const { data: me } = useAsync(() => getMe(), [])
  const { data: overview, loading, error, reload } = useAsync(
    () => getOverview(),
    []
  )
  const { data: projectsData } = useAsync(() => listProjects(), [])

  const firstName = me?.firstName ?? 'there'
  const recentProjects = (projectsData ?? []).slice(0, 4)

  if (error) {
    return (
      <div className="space-y-6">
        <ErrorState error={error} onRetry={reload} />
      </div>
    )
  }

  if (loading || !overview) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Welcome back, {firstName} 👋
          </h2>
          <p className="text-sm text-slate-500">
            Here's what's happening across your workspaces today.
          </p>
        </div>
        <LoadingSkeleton variant="stats" />
        <LoadingSkeleton variant="charts" />
      </div>
    )
  }

  const { stats, charts, activities, upcomingDeadlines } = overview

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Welcome back, {firstName} 👋
        </h2>
        <p className="text-sm text-slate-500">
          Here's what's happening across your workspaces today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.key} stat={stat} index={i} />
        ))}
      </div>

      {/* Main charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ChartCard
          title="Task Progress Overview"
          subtitle="Created vs. completed over the last 8 weeks"
          className="lg:col-span-2"
          action={
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="h-2 w-2 rounded-full bg-brand-600" /> Completed
              </span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="h-2 w-2 rounded-full bg-brand-200" /> Created
              </span>
            </div>
          }
        >
          <LineChartMock data={charts.taskProgress} />
        </ChartCard>

        <ChartCard title="Tasks by Status" subtitle="Current distribution">
          <DonutChartMock data={charts.tasksByStatus} />
        </ChartCard>
      </div>

      {/* Recent projects + activity + deadlines */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent projects table */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Recent Projects"
            action={
              <Link
                to="/projects"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            }
            bodyClassName="-mx-5 -mb-5"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-y border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
                    <th className="px-5 py-3 font-medium">Project</th>
                    <th className="px-5 py-3 font-medium">Team</th>
                    <th className="px-5 py-3 font-medium">Progress</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Due</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentProjects.map((p) => (
                    <tr
                      key={p.id}
                      className="transition-colors hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <span className={`h-7 w-1 rounded-full ${p.color}`} />
                          <div>
                            <p className="font-medium text-slate-800">{p.name}</p>
                            <p className="text-xs text-slate-400">
                              {p.workspace}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <AvatarGroup people={p.members} max={3} />
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-brand-500"
                              style={{ width: `${p.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-slate-500">
                            {p.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <Badge>{p.status}</Badge>
                      </td>
                      <td className="px-5 py-3 text-slate-500">
                        {formatDate(p.dueDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ChartCard>
        </div>

        {/* Right column: deadlines + activity */}
        <div className="space-y-6">
          <ChartCard title="Upcoming Deadlines">
            <ul className="space-y-3">
              {upcomingDeadlines.map((d) => (
                <li
                  key={d.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3 transition-colors hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <Calendar className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {d.title}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="h-3 w-3" /> {formatDate(d.date)}
                      </p>
                    </div>
                  </div>
                  <Badge tone={urgencyTone[d.urgency]}>
                    {d.urgency === 'today' ? 'Today' : formatDate(d.date)}
                  </Badge>
                </li>
              ))}
            </ul>
          </ChartCard>

          <ChartCard title="Recent Activity">
            <ActivityFeed items={activities} />
          </ChartCard>
        </div>
      </div>
    </div>
  )
}
