import {
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  Database,
  Building2,
  Activity,
} from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import ChartCard from '../components/dashboard/ChartCard'
import LineChartMock from '../components/dashboard/LineChartMock'
import BarChartMock from '../components/dashboard/BarChartMock'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import ErrorState from '../components/ui/ErrorState'
import { cn } from '../lib/cn'
import { useAsync } from '../hooks/useAsync'
import { getAnalytics } from '../api/analytics'

// Data: GET /api/v1/workspaces/{uuid}/analytics/ for all panels below.

function KpiTile({ kpi }) {
  const positive = kpi.trend >= 0
  return (
    <div className="fs-card p-5">
      <p className="text-sm text-slate-500">{kpi.label}</p>
      <div className="mt-2 flex items-end justify-between">
        <span className="text-2xl font-bold tracking-tight text-slate-900">
          {kpi.value}
        </span>
        <span
          className={cn(
            'inline-flex items-center gap-0.5 text-xs font-semibold',
            positive ? 'text-emerald-600' : 'text-rose-600'
          )}
        >
          {positive ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}
          {Math.abs(kpi.trend)}%
        </span>
      </div>
    </div>
  )
}

const usageIcons = [Building2, Database, Activity]

function formatUsage(item) {
  if (item.unit) return `${item.value}${item.unit} / ${item.max}${item.unit}`
  return `${item.value.toLocaleString()} / ${item.max.toLocaleString()}`
}

export default function Analytics() {
  const { data: analytics, loading, error, reload } = useAsync(
    () => getAnalytics(),
    []
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        subtitle="Productivity and performance across your workspace."
      >
        <select className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 focus:outline-none">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>This quarter</option>
        </select>
        <Button variant="secondary">Export</Button>
      </PageHeader>

      {error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : loading || !analytics ? (
        <>
          <LoadingSkeleton variant="stats" />
          <LoadingSkeleton variant="charts" />
        </>
      ) : (
        <>
      {/* KPI tiles */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {analytics.kpis.map((kpi) => (
          <KpiTile key={kpi.label} kpi={kpi} />
        ))}
      </div>

      {/* Productivity overview (area) */}
      <ChartCard
        title="Productivity Overview"
        subtitle="Tasks created vs. completed"
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
        <LineChartMock data={analytics.taskProgress} />
      </ChartCard>

      {/* Two-up charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard
          title="Tasks Completed"
          subtitle="Per team member (last 30 days)"
        >
          <BarChartMock
            data={analytics.teamWorkload}
            dataKey="tasks"
            color="#6366f1"
          />
        </ChartCard>

        <ChartCard title="Projects Progress" subtitle="Completion by project">
          <BarChartMock
            data={analytics.projectsProgress}
            dataKey="progress"
            color="#8b5cf6"
          />
        </ChartCard>
      </div>

      {/* Workload + overdue + usage */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ChartCard
          title="Team Workload"
          subtitle="Active tasks per member"
          className="lg:col-span-2"
        >
          <BarChartMock
            data={analytics.teamWorkload}
            dataKey="tasks"
            color="#4f46e5"
            height={220}
          />
        </ChartCard>

        <div className="space-y-6">
          {/* Overdue tasks card */}
          <div className="fs-card overflow-hidden">
            <div className="bg-gradient-to-br from-rose-500 to-rose-600 p-5 text-white">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium">
                  -12% vs last month
                </span>
              </div>
              <p className="mt-4 text-3xl font-bold">8</p>
              <p className="text-sm text-rose-100">Overdue tasks</p>
            </div>
            <div className="p-4">
              <p className="text-sm text-slate-500">
                Down from 9 last month. Keep it up — assign owners to reduce
                overdue work further.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Workspace usage stats */}
      <ChartCard title="Workspace Usage" subtitle="Resource consumption this period">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {analytics.usage.map((item, i) => {
            const Icon = usageIcons[i % usageIcons.length]
            const pct = Math.min(100, Math.round((item.value / item.max) * 100))
            return (
              <div key={item.label} className="rounded-xl border border-slate-100 p-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-medium text-slate-600">
                    {item.label}
                  </p>
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-800">
                  {formatUsage(item)}
                </p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-brand-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </ChartCard>
        </>
      )}
    </div>
  )
}
