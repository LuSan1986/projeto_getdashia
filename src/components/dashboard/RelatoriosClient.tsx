'use client'

import { useState, useMemo } from 'react'
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

// ── Mock data ─────────────────────────────────────────────────────────────────

const allCampaigns: Campaign[] = [
  { id: 1, platform: 'google', name: 'Brand Search — Geral',       status: 'active', impressions: 142000, clicks: 8520, cost: 3240, conversions: 184, revenue: 16848 },
  { id: 2, platform: 'google', name: 'Display — Remarketing',       status: 'active', impressions: 380000, clicks: 4180, cost: 1890, conversions: 92,  revenue: 7749  },
  { id: 3, platform: 'google', name: 'Performance Max',             status: 'paused', impressions: 210000, clicks: 6300, cost: 2670, conversions: 145, revenue: 10146 },
  { id: 4, platform: 'meta',   name: 'Conversão — Lookalike 1%',   status: 'active', impressions: 520000, clicks: 9360, cost: 4120, conversions: 213, revenue: 25132 },
  { id: 5, platform: 'meta',   name: 'Tráfego — Interesse Frio',   status: 'active', impressions: 290000, clicks: 5220, cost: 2340, conversions: 98,  revenue: 8190  },
  { id: 6, platform: 'meta',   name: 'Retargeting — Visitantes',   status: 'paused', impressions: 88000,  clicks: 3520, cost: 1560, conversions: 134, revenue: 11232 },
]

const roasData = [
  { dia: '10/abr', roas: 3.8 },
  { dia: '12/abr', roas: 4.1 },
  { dia: '14/abr', roas: 3.9 },
  { dia: '16/abr', roas: 4.4 },
  { dia: '18/abr', roas: 5.0 },
  { dia: '20/abr', roas: 4.7 },
  { dia: '22/abr', roas: 5.2 },
  { dia: '24/abr', roas: 4.8 },
  { dia: '26/abr', roas: 5.4 },
  { dia: '28/abr', roas: 5.1 },
  { dia: '30/abr', roas: 5.7 },
  { dia: '02/mai', roas: 5.3 },
  { dia: '04/mai', roas: 6.0 },
  { dia: '06/mai', roas: 5.8 },
  { dia: '08/mai', roas: 6.2 },
  { dia: '10/mai', roas: 5.6 },
]

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

// ── Main component ────────────────────────────────────────────────────────────

export default function RelatoriosClient() {
  const [period,  setPeriod]  = useState<Period>('30d')
  const [channel, setChannel] = useState<Channel>('all')

  const campaigns = useMemo(
    () => channel === 'all' ? allCampaigns : allCampaigns.filter((c) => c.platform === channel),
    [channel],
  )

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

      {/* Summary cards */}
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

      {/* ROAS chart */}
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
              domain={[3, 7]}
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

      {/* Campaign table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800">
          <p className="text-sm font-medium text-zinc-300">
            Campanhas
            <span className="ml-2 text-xs text-zinc-500 font-normal">
              {campaigns.length} encontradas
            </span>
          </p>
        </div>

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
      </div>

      <AIConsultant metrics={aiMetrics} />

    </div>
  )
}
