import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

// Area chart for "Task Progress Overview". Data shape: [{ name, created, completed }]
export default function LineChartMock({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="gradCompleted" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradCreated" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c7d2fe" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#c7d2fe" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#94a3b8', fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#94a3b8', fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: '1px solid #e2e8f0',
            boxShadow: '0 8px 24px -8px rgba(15,23,42,0.15)',
            fontSize: 13,
          }}
        />
        <Area
          type="monotone"
          dataKey="created"
          stroke="#a5b4fc"
          strokeWidth={2}
          fill="url(#gradCreated)"
          name="Created"
        />
        <Area
          type="monotone"
          dataKey="completed"
          stroke="#4f46e5"
          strokeWidth={2.5}
          fill="url(#gradCompleted)"
          name="Completed"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
