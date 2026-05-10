'use client'

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { SiGoogleads, SiMeta, SiFacebook } from 'react-icons/si'

const revenueData = [
  { dia: '28/abr', receita: 5200 },
  { dia: '29/abr', receita: 6800 },
  { dia: '30/abr', receita: 4900 },
  { dia: '01/mai', receita: 7200 },
  { dia: '02/mai', receita: 8100 },
  { dia: '03/mai', receita: 6600 },
  { dia: '04/mai', receita: 9400 },
]

const clicksData = [
  { mes: 'Nov', 'Google Ads': 18200, 'Meta Ads': 14500 },
  { mes: 'Dez', 'Google Ads': 22100, 'Meta Ads': 17800 },
  { mes: 'Jan', 'Google Ads': 19500, 'Meta Ads': 16200 },
  { mes: 'Fev', 'Google Ads': 24300, 'Meta Ads': 19100 },
  { mes: 'Mar', 'Google Ads': 26700, 'Meta Ads': 21400 },
  { mes: 'Abr', 'Google Ads': 28900, 'Meta Ads': 23600 },
]

const conversionData = [
  { name: 'Google Ads', value: 1240 },
  { name: 'Meta Ads', value: 890 },
  { name: 'Orgânico', value: 640 },
  { name: 'Direto', value: 440 },
]

const PIE_COLORS = ['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc']

const tooltipProps = {
  contentStyle: {
    backgroundColor: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '12px',
  },
  cursor: { fill: 'rgba(99,102,241,0.08)' },
}

const axisProps = {
  tick: { fill: '#71717a', fontSize: 11 },
  axisLine: { stroke: '#27272a' },
  tickLine: false as const,
}

const barLegendIcons: Record<string, React.ReactNode> = {
  'Google Ads': <SiGoogleads color="#4285F4" size={12} />,
  'Meta Ads': <SiMeta color="#0082FB" size={12} />,
}

function BarLegend({ payload }: { payload?: Array<{ value: string }> }) {
  if (!payload?.length) return null
  return (
    <div className="flex gap-4 justify-center pt-2">
      {payload.map(({ value }) => (
        <span key={value} className="flex items-center gap-1.5 text-[11px] text-zinc-400">
          {barLegendIcons[value]}
          {value}
        </span>
      ))}
    </div>
  )
}

const pieLegendBrandIcons: Record<string, React.ReactNode> = {
  'Google Ads': <SiGoogleads color="#4285F4" size={12} />,
  'Meta Ads':   <SiMeta      color="#0082FB" size={12} />,
  'Facebook':   <SiFacebook  color="#1877F2" size={12} />,
}

function PieLegend({ payload }: { payload?: Array<{ value: string; color: string }> }) {
  if (!payload?.length) return null
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center pt-2">
      {payload.map(({ value, color }) => (
        <span key={value} className="flex items-center gap-1.5 text-[11px] text-zinc-400">
          {pieLegendBrandIcons[value] ?? (
            <svg width="8" height="8" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="4" fill={color} />
            </svg>
          )}
          {value}
        </span>
      ))}
    </div>
  )
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <p className="text-sm font-medium text-zinc-300 mb-5">{title}</p>
      {children}
    </div>
  )
}

export default function Charts() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">

      {/* Área — Receita últimos 7 dias */}
      <ChartCard title="Receita Total — últimos 7 dias">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradReceita" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis dataKey="dia" {...axisProps} />
            <YAxis
              {...axisProps}
              tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
              width={48}
            />
            <Tooltip
              {...tooltipProps}
              formatter={(v: unknown) => {
                const num = typeof v === 'number' ? v : 0
                return [`R$ ${num.toLocaleString('pt-BR')}`, 'Receita']
              }}
            />
            <Area
              type="monotone"
              dataKey="receita"
              stroke="#4f46e5"
              strokeWidth={2}
              fill="url(#gradReceita)"
              dot={false}
              activeDot={{ r: 4, fill: '#4f46e5' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Barras — Cliques por canal, últimos 6 meses */}
      <ChartCard title="Cliques por Canal — últimos 6 meses">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={clicksData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis dataKey="mes" {...axisProps} />
            <YAxis
              {...axisProps}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              width={36}
            />
            <Tooltip
              {...tooltipProps}
              formatter={(v: unknown, name: unknown) => {
                const num = typeof v === 'number' ? v : 0
                const label = typeof name === 'string' ? name : ''
                return [num.toLocaleString('pt-BR'), label]
              }}
            />
            <Legend content={(props) => <BarLegend payload={props.payload as Array<{ value: string }>} />} />
            <Bar dataKey="Google Ads" fill="#4285F4" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Meta Ads" fill="#0082FB" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Pizza — Distribuição de conversões por fonte */}
      <ChartCard title="Conversões por Fonte">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={conversionData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {conversionData.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i]} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipProps.contentStyle}
              formatter={(v: unknown, name: unknown) => {
                const num = typeof v === 'number' ? v : 0
                const label = typeof name === 'string' ? name : ''
                return [num.toLocaleString('pt-BR'), label]
              }}
            />
            <Legend content={(props) => <PieLegend payload={props.payload as Array<{ value: string; color: string }>} />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

    </div>
  )
}
