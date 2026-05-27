'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { SiGoogleads, SiMeta } from 'react-icons/si'
import AIConsultant from '@/components/dashboard/AIConsultant'

// ── Types ────────────────────────────────────────────────────────────────────

type Platform = 'google' | 'meta'
type Status   = 'active' | 'paused'
type Period   = '7d' | '30d' | '90d'
type Channel  = 'all' | 'google' | 'meta'

interface Campaign {
  id: number
  platform: Platform
  name: string
  status: Status
  impressions: number
  clicks: number
  cost: number
  conversions: number
  revenue: number
}

interface RoasPoint {
  dia: string
  roas: number
}

// ── Filter options ────────────────────────────────────────────────────────────

const periodOptions: { value: Period; label: string }[] = [
  { value: '7d',  label: 'Últimos 7 dias'  },
  { value: '30d', label: 'Últimos 30 dias' },
  { value: '90d', label: 'Últimos 90 dias' },
]

const channelOptions: { value: Channel; label: string }[] = [
  { value: 'all',    label: 'Todos os canais' },
  { value: 'google', label: 'Google Ads'      },
  { value: 'meta',   label: 'Meta Ads'        },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtBRL(n: number) {
  return `R$ ${n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function fmtInt(n: number) {
  return n.toLocaleString('pt-BR')
}

// ── Shared chart styles ───────────────────────────────────────────────────────

const tooltipStyle = {
  backgroundColor: '#18181b',
  border: '1px solid #27272a',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '12px',
}

const axisProps = {
  tick: { fill: '#71717a', fontSize: 11 },
  axisLine: { stroke: '#27272a' },
  tickLine: false as const,
}

// ── Filter button ─────────────────────────────────────────────────────────────

function FilterGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex bg-zinc-900 border border-zinc-800 rounded-xl p-1 gap-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap
            ${value === opt.value
              ? 'bg-indigo-600 text-white'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// ── Platform icon ─────────────────────────────────────────────────────────────

function PlatformIcon({ platform }: { platform: Platform }) {
  return platform === 'google'
    ? <SiGoogleads color="#4285F4" size={14} className="shrink-0" />
    : <SiMeta      color="#0082FB" size={14} className="shrink-0" />
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function CardSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-3">
      <div className="h-3 w-28 bg-zinc-800 rounded animate-pulse" />
      <div className="h-8 w-36 bg-zinc-800 rounded animate-pulse" />
      <div className="h-2 w-20 bg-zinc-800 rounded animate-pulse" />
    </div>
  )
}

function ChartSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
      <div className="h-3 w-48 bg-zinc-800 rounded animate-pulse mb-5" />
      <div className="h-[220px] bg-zinc-800 rounded animate-pulse" />
    </div>
  )
}

function TableSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-800">
        <div className="h-3 w-32 bg-zinc-800 rounded animate-pulse" />
      </div>
      <div className="p-4 flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 bg-zinc-800 rounded animate-pulse" />
        ))}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function RelatoriosClient() {
  const [period,  setPeriod]  = useState<Period>('30d')
  const [channel, setChannel] = useState<Channel>('all')

  const [googleCampaigns, setGoogleCampaigns] = useState<Campaign[]>([])
  const [roasData,        setRoasData]        = useState<RoasPoint[]>([])
  const [loading,         setLoading]         = useState(true)
  const [error,           setError]           = useState<string | null>(null)
  const [connected,       setConnected]       = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(`/api/google-ads/campaigns?period=${period}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        setConnected(data.connected ?? false)
        setGoogleCampaigns(data.campaigns ?? [])
        setRoasData(data.roasData ?? [])
      })
      .catch(() => {
        if (!cancelled) setError('Erro ao carregar campanhas.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [period])

  const campaigns = useMemo<Campaign[]>(() => {
    if (channel === 'meta') return []
    return googleCampaigns
  }, [channel, googleCampaigns])

  const summary = useMemo(() => {
    const cost        = campaigns.reduce((s, c) => s + c.cost, 0)
    const revenue     = campaigns.reduce((s, c) => s + c.revenue, 0)
    const conversions = campaigns.reduce((s, c) => s + c.conversions, 0)
    return {
      investment: cost,
      revenue,
      roas: cost > 0 ? revenue / cost : 0,
      cpa:  conversions > 0 ? cost / conversions : 0,
    }
  }, [campaigns])

  const periodLabel = periodOptions.find((o) => o.value === period)?.label ?? ''

  const aiMetrics = {
    cost:        summary.investment,
    revenue:     summary.revenue,
    roas:        summary.roas,
    cpa:         summary.cpa,
    clicks:      campaigns.reduce((s, c) => s + c.clicks,      0),
    conversions: campaigns.reduce((s, c) => s + c.conversions, 0),
    impressions: campaigns.reduce((s, c) => s + c.impressions, 0),
  }

  return (
    <div className="p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Relatórios</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Análise detalhada das suas campanhas
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <FilterGroup options={periodOptions}  value={period}  onChange={setPeriod}  />
        <FilterGroup options={channelOptions} value={channel} onChange={setChannel} />
      </div>

      {/* Not connected banner */}
      {!loading && !connected && (
        <div className="mb-6 rounded-xl bg-yellow-500/10 border border-yellow-500/30 px-4 py-3 text-yellow-400 text-sm">
          Google Ads não conectado. Acesse{' '}
          <a href="/dashboard/integrations" className="underline font-medium">
            Integrações
          </a>{' '}
          para conectar.
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Meta placeholder */}
      {channel === 'meta' && (
        <div className="mb-6 rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-8 text-center text-zinc-500 text-sm">
          Meta Ads em breve
        </div>
      )}

      {/* Summary cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Investimento Total', value: fmtBRL(summary.investment), desc: periodLabel },
            { label: 'Receita Gerada',     value: fmtBRL(summary.revenue),    desc: periodLabel },
            { label: 'ROAS Médio',         value: `${summary.roas.toFixed(1).replace('.', ',')}×`, desc: 'Retorno sobre o investimento' },
            { label: 'CPA Médio',          value: fmtBRL(summary.cpa),        desc: 'Custo por aquisição' },
          ].map(({ label, value, desc }) => (
            <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-2">
              <p className="text-zinc-400 text-sm">{label}</p>
              <p className="text-3xl font-bold text-white">{value}</p>
              <p className="text-zinc-500 text-xs">{desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* ROAS chart */}
      {loading ? (
        <ChartSkeleton />
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
          <p className="text-sm font-medium text-zinc-300 mb-5">
            Evolução do ROAS — {periodLabel}
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={roasData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="dia" {...axisProps} />
              <YAxis
                {...axisProps}
                tickFormatter={(v) => `${v}×`}
                domain={['auto', 'auto']}
                width={36}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                cursor={{ stroke: 'rgba(99,102,241,0.3)', strokeWidth: 1 }}
                formatter={(v: unknown) => {
                  const n = typeof v === 'number' ? v : 0
                  return [`${n.toFixed(1)}×`, 'ROAS']
                }}
              />
              <Line
                type="monotone"
                dataKey="roas"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#4f46e5' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Campaign table */}
      {loading ? (
        <TableSkeleton />
      ) : channel === 'meta' ? null : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800">
            <p className="text-sm font-medium text-zinc-300">
              Campanhas
              <span className="ml-2 text-xs text-zinc-500 font-normal">
                {campaigns.length} encontradas
              </span>
            </p>
          </div>

          {connected && campaigns.length === 0 ? (
            <p className="px-6 py-8 text-center text-zinc-500 text-sm">
              Nenhuma campanha encontrada no período.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    {['Campanha', 'Status', 'Impressões', 'Cliques', 'CTR', 'Custo', 'Conversões', 'ROAS'].map((col) => (
                      <th
                        key={col}
                        className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wide whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c) => {
                    const ctr  = c.impressions > 0 ? (c.clicks / c.impressions) * 100 : 0
                    const roas = c.cost > 0 ? c.revenue / c.cost : 0
                    return (
                      <tr key={c.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 min-w-[200px]">
                            <PlatformIcon platform={c.platform} />
                            <span className="text-zinc-200 font-medium">{c.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {c.status === 'active' ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-green-500/15 text-green-400 px-2 py-0.5 rounded-full">
                              <span className="size-1.5 rounded-full bg-green-400" />
                              Ativo
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-zinc-700/50 text-zinc-400 px-2 py-0.5 rounded-full">
                              <span className="size-1.5 rounded-full bg-zinc-500" />
                              Pausado
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">{fmtInt(c.impressions)}</td>
                        <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">{fmtInt(c.clicks)}</td>
                        <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">{ctr.toFixed(1).replace('.', ',')}%</td>
                        <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">{fmtBRL(c.cost)}</td>
                        <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">{fmtInt(c.conversions)}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`font-semibold ${roas >= 5 ? 'text-green-400' : roas >= 3.5 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {roas.toFixed(1).replace('.', ',')}×
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <AIConsultant metrics={aiMetrics} />

    </div>
  )
}
