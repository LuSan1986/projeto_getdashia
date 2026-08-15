'use client'

import { useEffect, useState } from 'react'
import { TrendingUp } from 'lucide-react'

interface Campaign {
  cost: number
  clicks: number
  conversions: number
  impressions: number
}

interface Props {
  accountId: string
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

export default function DashboardGoogleMetrics({ accountId }: Props) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading,   setLoading]   = useState(true)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    fetch('/api/google-ads/campaigns?period=30d')
      .then((r) => r.json())
      .then((data) => {
        setConnected(data.connected ?? false)
        setCampaigns(data.campaigns ?? [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const totals = campaigns.reduce(
    (acc, c) => ({
      cost:        acc.cost        + c.cost,
      clicks:      acc.clicks      + c.clicks,
      conversions: acc.conversions + c.conversions,
      impressions: acc.impressions + c.impressions,
    }),
    { cost: 0, clicks: 0, conversions: 0, impressions: 0 }
  )

  const cards = [
    { label: 'Custo Total',  value: fmtBRL(totals.cost),              desc: 'Últimos 30 dias — Google Ads' },
    { label: 'Cliques',      value: fmtInt(totals.clicks),             desc: 'Últimos 30 dias — Google Ads' },
    { label: 'Conversões',   value: fmtInt(totals.conversions),        desc: 'Últimos 30 dias — Google Ads' },
    { label: 'Impressões',   value: fmtInt(totals.impressions),        desc: 'Últimos 30 dias — Google Ads' },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    )
  }

  return (
    <>
      {connected && campaigns.length === 0 && (
        <p className="mb-4 text-yellow-500 text-xs">
          Nenhuma campanha encontrada no período — conectado à conta {accountId}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map(({ label, value, desc }) => (
          <div
            key={label}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <p className="text-zinc-400 text-sm">{label}</p>
              <TrendingUp size={14} className="text-cyan-400" />
            </div>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-zinc-500 text-xs">{desc}</p>
          </div>
        ))}
      </div>
    </>
  )
}
