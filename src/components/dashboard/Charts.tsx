'use client'

import { useState, useEffect } from 'react'
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

// ── Date helpers ──────────────────────────────────────────────────────────────

const MONTH_LC  = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']
const MONTH_CAP = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

/** 'DD/mmm' labels for the last 7 days ending today */
function last7DayLabels(): string[] {
  const today = new Date()
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - 6 + i)
    return `${String(d.getDate()).padStart(2, '0')}/${MONTH_LC[d.getMonth()]}`
  })
}

/** 'Mmm' labels for the last 6 months ending this month */
function last6MonthLabels(): string[] {
  const today = new Date()
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth() - 5 + i, 1)
    return MONTH_CAP[d.getMonth()]
  })
}

/** 'YYYY-MM-DD' key using local date (avoids UTC shift) */
function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** 'YYYY-MM' key using local date */
function monthKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

// ── Demo values ───────────────────────────────────────────────────────────────

const DEMO_REVENUE_VALUES = [5200, 6800, 4900, 7200, 8100, 6600, 9400]

const DEMO_CLICKS_VALUES = [
  { google: 18200, meta: 14500 },
  { google: 22100, meta: 17800 },
  { google: 19500, meta: 16200 },
  { google: 24300, meta: 19100 },
  { google: 26700, meta: 21400 },
  { google: 28900, meta: 23600 },
]

const DEMO_CONVERSION_DATA = [
  { name: 'Google Ads', value: 1240 },
  { name: 'Meta Ads',   value: 890  },
  { name: 'Orgânico',   value: 640  },
  { name: 'Direto',     value: 440  },
]

const ZERO_CONVERSION_DATA = [
  { name: 'Google Ads', value: 0 },
  { name: 'Meta Ads',   value: 0 },
  { name: 'Orgânico',   value: 0 },
  { name: 'Direto',     value: 0 },
]

// ── Timeseries API types ──────────────────────────────────────────────────────

interface TimeseriesResponse {
  connected: boolean
  revenue7d: Array<{ date: string; value: number }>
  clicks6m:  Array<{ month: string; clicks: number }>
}

// ── Chart styles ──────────────────────────────────────────────────────────────

const PIE_COLORS = ['#06B6D4', '#A855F7', '#E879F9', '#22d3ee']

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

// ── Legend components ─────────────────────────────────────────────────────────

const barLegendIcons: Record<string, React.ReactNode> = {
  'Google Ads': <SiGoogleads color="#4285F4" size={12} />,
  'Meta Ads':   <SiMeta      color="#0082FB" size={12} />,
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

// ── Main component ────────────────────────────────────────────────────────────

export default function Charts({ isLive = false }: { isLive?: boolean }) {
  const dayLabels   = last7DayLabels()
  const monthLabels = last6MonthLabels()

  // Live data — initialized to zero; filled in by useEffect below
  const [liveRevenue,     setLiveRevenue]     = useState<number[]>(Array(7).fill(0))
  const [liveGoogleClicks, setLiveGoogleClicks] = useState<number[]>(Array(6).fill(0))
  const [liveMetaClicks,   setLiveMetaClicks]   = useState<number[]>(Array(6).fill(0))

  useEffect(() => {
    if (!isLive) return

    Promise.all([
      fetch('/api/google-ads/timeseries').then((r) => r.json() as Promise<TimeseriesResponse>).catch(() => null),
      fetch('/api/meta-ads/timeseries').then((r) => r.json()   as Promise<TimeseriesResponse>).catch(() => null),
    ]).then(([googleData, metaData]) => {
      // ── Revenue 7d ──────────────────────────────────────────────────────────
      // Build map: 'YYYY-MM-DD' → combined revenue
      const revenueMap = new Map<string, number>()
      for (const { date, value } of (googleData?.revenue7d ?? [])) {
        revenueMap.set(date, (revenueMap.get(date) ?? 0) + value)
      }
      for (const { date, value } of (metaData?.revenue7d ?? [])) {
        revenueMap.set(date, (revenueMap.get(date) ?? 0) + value)
      }

      const today = new Date()
      setLiveRevenue(
        Array.from({ length: 7 }, (_, i) => {
          const d = new Date(today)
          d.setDate(today.getDate() - 6 + i)
          return revenueMap.get(dayKey(d)) ?? 0
        })
      )

      // ── Clicks 6m ───────────────────────────────────────────────────────────
      const googleClicksMap = new Map<string, number>()
      for (const { month, clicks } of (googleData?.clicks6m ?? [])) {
        googleClicksMap.set(month, (googleClicksMap.get(month) ?? 0) + clicks)
      }

      const metaClicksMap = new Map<string, number>()
      for (const { month, clicks } of (metaData?.clicks6m ?? [])) {
        metaClicksMap.set(month, (metaClicksMap.get(month) ?? 0) + clicks)
      }

      const today2 = new Date()
      const makeMonthArray = (map: Map<string, number>) =>
        Array.from({ length: 6 }, (_, i) => {
          const d = new Date(today2.getFullYear(), today2.getMonth() - 5 + i, 1)
          return map.get(monthKey(d)) ?? 0
        })

      setLiveGoogleClicks(makeMonthArray(googleClicksMap))
      setLiveMetaClicks(makeMonthArray(metaClicksMap))
    })
  }, [isLive])

  // ── Build chart data ──────────────────────────────────────────────────────

  const revenueData = dayLabels.map((dia, i) => ({
    dia,
    receita: isLive ? liveRevenue[i] : DEMO_REVENUE_VALUES[i],
  }))

  const clicksData = monthLabels.map((mes, i) => ({
    mes,
    'Google Ads': isLive ? liveGoogleClicks[i] : DEMO_CLICKS_VALUES[i].google,
    'Meta Ads':   isLive ? liveMetaClicks[i]   : DEMO_CLICKS_VALUES[i].meta,
  }))

  const conversionData = isLive ? ZERO_CONVERSION_DATA : DEMO_CONVERSION_DATA

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">

      {/* Área — Receita últimos 7 dias */}
      <ChartCard title="Receita Total — últimos 7 dias">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradReceita" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
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
              stroke="#06B6D4"
              strokeWidth={2}
              fill="url(#gradReceita)"
              dot={false}
              activeDot={{ r: 4, fill: '#06B6D4' }}
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
            <Bar dataKey="Meta Ads"   fill="#0082FB" radius={[4, 4, 0, 0]} />
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
