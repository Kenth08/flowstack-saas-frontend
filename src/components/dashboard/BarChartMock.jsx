import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts'

// Generic bar chart. `dataKey` selects the numeric field; `color` sets fill.
export default function BarChartMock({
  data,
  dataKey = 'value',
  color = '#6366f1',
  height = 260,
  gradient = true,
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id={`bar-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.95} />
            <stop offset="100%" stopColor={color} stopOpacity={0.5} />
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
          cursor={{ fill: '#f8fafc' }}
          contentStyle={{
            borderRadius: 12,
            border: '1px solid #e2e8f0',
            fontSize: 13,
          }}
        />
        <Bar dataKey={dataKey} radius={[6, 6, 0, 0]} maxBarSize={44}>
          {data.map((_, i) => (
            <Cell key={i} fill={gradient ? `url(#bar-${dataKey})` : color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
