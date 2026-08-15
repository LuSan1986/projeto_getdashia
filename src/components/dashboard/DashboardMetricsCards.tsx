'use client'

import { useEffect, useState } from 'react'
import { TrendingUp } from 'lucide-react'

export type DataSource = 'google' | 'meta' | 'none'

interface Campaign {
  cost: number
  clicks: number
  conversions: number
  impressions: number
}

function fmtBRL(n: number) {
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function fmtInt(n: number) {
  return n.toLocaleString('pt-BR')
}

function CardSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-2">
      <div className="h-3 w-28 bg-zinc-800 rounded animate-pulse" />
      <div className="h-8 w-36 bg-zinc-800 rounded animate-pulse mt-1" />
      <div className="h-2 w-20 bg-zinc-800 rounded animate-pulse mt-1" />
    </div>
  )
}

export default function DashboardMetricsCards({ source }: { source: DataSource }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading,   setLoading]   = useState(false)

  useEffect(() => {
    if (source === 'none') {
      setCampaigns([])
      return
    }
    setLoading(true)
    const url = source === 'google'
      ? '/api/google-ads/campaigns?period=30d'
      : '/api/meta-ads/campaigns?period=30d'
    fetch(url)
      .then((r) => r.json())
      .then((data) => setCampaigns((data.campaigns ?? []) as Campaign[]))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [source])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    )
  }

  const totals = campaigns.reduce(
    (acc, c) => ({
      cost:        acc.cost        + c.cost,
      clicks:      acc.clicks      + c.clicks,
      conversions: acc.conversions + c.conversions,
      impressions: acc.impressions + c.impressions,
    }),
    { cost: 0, clicks: 0, conversions: 0, impressions: 0 }
  )

  const connected = source !== 'none'
  const platformLabel = source === 'google' ? 'Google Ads' : source === 'meta' ? 'Meta Ads' : ''
  const cardDesc = connected ? `Últimos 30 dias — ${platformLabel}` : 'Canal não conectado'

  const cards = [
    { label: 'Custo Total', value: connected ? fmtBRL(totals.cost)       : 'R$ 0,00' },
    { label: 'Cliques',     value: connected ? fmtInt(totals.clicks)      : '0'       },
    { label: 'Conversões',  value: connected ? fmtInt(totals.conversions) : '0'       },
    { label: 'Impressões',  value: connected ? fmtInt(totals.impressions) : '0'       },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map(({ label, value }) => (
        <div
          key={label}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-2"
        >
          <div className="flex items-center justify-between">
            <p className="text-zinc-400 text-sm">{label}</p>
            <TrendingUp size={14} className="text-cyan-400" />
          </div>
          <p className={`text-3xl font-bold ${connected ? 'text-white' : 'text-zinc-600'}`}>
            {value}
          </p>
          <p className="text-zinc-500 text-xs">{cardDesc}</p>
        </div>
      ))}
    </div>
  )
}
