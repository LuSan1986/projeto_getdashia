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
import type { DataSource } from './DashboardMetricsCards'

// ── Date helpers ──────────────────────────────────────────────────────────────

const MONTH_LC  = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']
const MONTH_CAP = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

function lastNDayLabels(n: number): string[] {
  const today = new Date()
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (n - 1) + i)
    return `${String(d.getDate()).padStart(2, '0')}/${MONTH_LC[d.getMonth()]}`
  })
}

function last6MonthLabels(): string[] {
  const today = new Date()
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth() - 5 + i, 1)
    return MONTH_CAP[d.getMonth()]
  })
}

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function monthKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

// ── Timeseries API types ──────────────────────────────────────────────────────

interface TimeseriesResponse {
  connected: boolean
  revenue7d: Array<{ date: string; value: number }>
  clicks6m:  Array<{ month: string; clicks: number }>
}

// ── Chart styles ──────────────────────────────────────────────────────────────

const PIE_COLORS = ['#06B6D4', '#A855F7', '#E879F9', '#22d3ee']

const ZERO_CONVERSION_DATA = [
  { name: 'Google Ads', value: 0 },
  { name: 'Meta Ads',   value: 0 },
  { name: 'Orgânico',   value: 0 },
  { name: 'Direto',     value: 0 },
]

const tooltipProps = {
  contentStyle: {
    backgroundColor: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '12px',
  },
  cursor: { fill: 'rgba(6,182,212,0.06)' },
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

function ChartCard({ title, children, headerRight }: { title: string; children: React.ReactNode; headerRight?: React.ReactNode }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm font-medium text-zinc-300">{title}</p>
        {headerRight}
      </div>
      {children}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Charts({ source = 'none', accountId, metaPlatform }: { source?: DataSource | 'all'; accountId?: string | null; metaPlatform?: 'facebook' | 'instagram' }) {
  const monthLabels = last6MonthLabels()

  const [revDays,          setRevDays]          = useState<7 | 15 | 30>(7)
  const [liveRevenue,      setLiveRevenue]      = useState<number[]>(Array(7).fill(0))
  const [liveGoogleClicks, setLiveGoogleClicks] = useState<number[]>(Array(6).fill(0))
  const [liveMetaClicks,   setLiveMetaClicks]   = useState<number[]>(Array(6).fill(0))

  useEffect(() => {
    setLiveRevenue(Array(revDays).fill(0))
    setLiveGoogleClicks(Array(6).fill(0))
    setLiveMetaClicks(Array(6).fill(0))

    if (source === 'none') return

    const wantGoogle = source === 'google' || source === 'all'
    const wantMeta   = source === 'meta'   || source === 'all'

    const revParam = `revenue_days=${revDays}`
    const googleUrl = accountId && wantGoogle
      ? `/api/google-ads/timeseries?account_id=${encodeURIComponent(accountId)}&${revParam}`
      : `/api/google-ads/timeseries?${revParam}`
    const metaPlatformSuffix = metaPlatform ? `&platform=${metaPlatform}` : ''
    const metaUrl = accountId && wantMeta
      ? `/api/meta-ads/timeseries?account_id=${encodeURIComponent(accountId)}${metaPlatformSuffix}&${revParam}`
      : `/api/meta-ads/timeseries?${revParam}${metaPlatformSuffix}`

    Promise.all([
      wantGoogle
        ? fetch(googleUrl).then((r) => r.json() as Promise<TimeseriesResponse>).catch(() => null)
        : Promise.resolve(null),
      wantMeta
        ? fetch(metaUrl).then((r) => r.json() as Promise<TimeseriesResponse>).catch(() => null)
        : Promise.resolve(null),
    ]).then(([googleData, metaData]) => {
      // ── Revenue (configurable period) ───────────────────────────────────────
      const revenueMap = new Map<string, number>()
      for (const { date, value } of (googleData?.revenue7d ?? [])) {
        revenueMap.set(date, (revenueMap.get(date) ?? 0) + value)
      }
      for (const { date, value } of (metaData?.revenue7d ?? [])) {
        revenueMap.set(date, (revenueMap.get(date) ?? 0) + value)
      }
      const today = new Date()
      setLiveRevenue(
        Array.from({ length: revDays }, (_, i) => {
          const d = new Date(today)
          d.setDate(today.getDate() - (revDays - 1) + i)
          return revenueMap.get(dayKey(d)) ?? 0
        })
      )

      // ── Clicks 6m ──────────────────────────────────────────────────────────
      const buildMonthArr = (data: TimeseriesResponse | null) => {
        const map = new Map<string, number>()
        for (const { month, clicks } of (data?.clicks6m ?? [])) {
          map.set(month, (map.get(month) ?? 0) + clicks)
        }
        const t = new Date()
        return Array.from({ length: 6 }, (_, i) => {
          const d = new Date(t.getFullYear(), t.getMonth() - 5 + i, 1)
          return map.get(monthKey(d)) ?? 0
        })
      }

      setLiveGoogleClicks(buildMonthArr(googleData))
      setLiveMetaClicks(buildMonthArr(metaData))
    })
  }, [source, accountId, metaPlatform, revDays])

  // ── Build chart data ────────────────────────────────────────────────────────

  const revLabels   = lastNDayLabels(revDays)
  const revenueData = revLabels.map((dia, i) => ({
    dia,
    receita: liveRevenue[i],
  }))

  // Only include columns for the channels visible in this source
  const showGoogle = source !== 'meta'
  const showMeta   = source !== 'google'

  const clicksData = monthLabels.map((mes, i) => {
    const row: Record<string, string | number> = { mes }
    if (showGoogle) row['Google Ads'] = liveGoogleClicks[i]
    if (showMeta)   row['Meta Ads']   = liveMetaClicks[i]
    return row
  })

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">

      {/* Área — Receita (período selecionável) */}
      <ChartCard
        title={`Receita Total — últimos ${revDays} dias`}
        headerRight={
          <div className="flex gap-1">
            {([7, 15, 30] as const).map(d => (
              <button
                key={d}
                onClick={() => setRevDays(d)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition
                  ${revDays === d
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 border border-transparent'
                  }`}
              >
                {d}d
              </button>
            ))}
          </div>
        }
      >
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradReceita" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#06B6D4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis dataKey="dia" {...axisProps} interval={revDays <= 7 ? 0 : revDays <= 15 ? 1 : 4} />
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
            {showGoogle && <Bar dataKey="Google Ads" fill="#4285F4" radius={[4, 4, 0, 0]} />}
            {showMeta   && <Bar dataKey="Meta Ads"   fill="#0082FB" radius={[4, 4, 0, 0]} />}
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Pizza — Distribuição de conversões por fonte */}
      <ChartCard title="Conversões por Fonte">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={ZERO_CONVERSION_DATA}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {ZERO_CONVERSION_DATA.map((_, i) => (
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
