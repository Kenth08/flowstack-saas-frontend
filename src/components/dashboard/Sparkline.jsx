import { ResponsiveContainer, AreaChart, Area } from 'recharts'

// Tiny trend line for stat cards. Renders a numeric array as an area spark.
export default function Sparkline({ data = [], color = '#6366f1', id }) {
  const chartData = data.map((v, i) => ({ i, v }))
  const gradientId = `spark-${id}`
  return (
    <ResponsiveContainer width="100%" height={40}>
      <AreaChart data={chartData} margin={{ top: 2, bottom: 2, left: 0, right: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
