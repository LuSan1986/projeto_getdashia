'use client'

import { useEffect, useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { fmtBRL, fmtInt, fmtRoas, convValueUnconfigured } from '@/lib/format'

export type DataSource = 'google' | 'meta' | 'none'

interface Campaign {
  cost: number
  clicks: number
  conversions: number
  impressions: number
  revenue: number
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

export default function DashboardMetricsCards({
  source,
  accountId,
  metaPlatform,
  conversionValue,
}: {
  source: DataSource
  accountId?: string | null
  metaPlatform?: 'facebook' | 'instagram'
  conversionValue?: number | null
}) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading,   setLoading]   = useState(false)

  useEffect(() => {
    if (source === 'none') {
      setCampaigns([])
      return
    }
    setLoading(true)
    const base = source === 'google'
      ? '/api/google-ads/campaigns?period=30d'
      : '/api/meta-ads/campaigns?period=30d'
    const platformSuffix = source === 'meta' && metaPlatform ? `&platform=${metaPlatform}` : ''
    const url = accountId
      ? `${base}${platformSuffix}&account_id=${encodeURIComponent(accountId)}`
      : `${base}${platformSuffix}`
    fetch(url)
      .then((r) => r.json())
      .then((data) => setCampaigns((data.campaigns ?? []) as Campaign[]))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [source, accountId, metaPlatform])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    )
  }

  const totals = campaigns.reduce(
    (acc, c) => ({
      cost:        acc.cost        + c.cost,
      clicks:      acc.clicks      + c.clicks,
      conversions: acc.conversions + c.conversions,
      impressions: acc.impressions + c.impressions,
      revenue:     acc.revenue     + c.revenue,
    }),
    { cost: 0, clicks: 0, conversions: 0, impressions: 0, revenue: 0 }
  )

  const connected = source !== 'none'
  const platformLabel =
    source === 'google' ? 'Google Ads' :
    source === 'meta' && metaPlatform === 'facebook'  ? 'Facebook Ads' :
    source === 'meta' && metaPlatform === 'instagram' ? 'Instagram Ads' :
    source === 'meta' ? 'Meta Ads' : ''
  const cardDesc = connected ? `Últimos 30 dias — ${platformLabel}` : 'Canal não conectado'

  // Revenue / ROAS estimation
  const unconfigured = connected && convValueUnconfigured(totals.revenue, totals.conversions)
  const hasConvValue = conversionValue != null && conversionValue > 0
  const estimatedRevenue = unconfigured && hasConvValue ? totals.conversions * conversionValue! : null
  const effectiveRevenue = unconfigured ? (estimatedRevenue ?? 0) : totals.revenue
  const effectiveRoas    = totals.cost > 0 ? effectiveRevenue / totals.cost : 0
  const revenueMode: 'real' | 'estimated' | 'unconfigured' =
    !connected           ? 'real' :
    !unconfigured        ? 'real' :
    hasConvValue         ? 'estimated' :
    'unconfigured'

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-zinc-400 text-sm">Custo Total</p>
          <TrendingUp size={14} className="text-cyan-400" />
        </div>
        <p className={`text-3xl font-bold ${connected ? 'text-white' : 'text-zinc-600'}`}>
          {connected ? fmtBRL(totals.cost) : fmtBRL(0)}
        </p>
        <p className="text-zinc-500 text-xs">{cardDesc}</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-zinc-400 text-sm">Cliques</p>
          <TrendingUp size={14} className="text-cyan-400" />
        </div>
        <p className={`text-3xl font-bold ${connected ? 'text-white' : 'text-zinc-600'}`}>
          {connected ? fmtInt(totals.clicks) : '0'}
        </p>
        <p className="text-zinc-500 text-xs">{cardDesc}</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-zinc-400 text-sm">Conversões</p>
          <TrendingUp size={14} className="text-cyan-400" />
        </div>
        <p className={`text-3xl font-bold ${connected ? 'text-white' : 'text-zinc-600'}`}>
          {connected ? fmtInt(totals.conversions) : '0'}
        </p>
        <p className="text-zinc-500 text-xs">{cardDesc}</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-zinc-400 text-sm">Impressões</p>
          <TrendingUp size={14} className="text-cyan-400" />
        </div>
        <p className={`text-3xl font-bold ${connected ? 'text-white' : 'text-zinc-600'}`}>
          {connected ? fmtInt(totals.impressions) : '0'}
        </p>
        <p className="text-zinc-500 text-xs">{cardDesc}</p>
      </div>

      {/* Receita Gerada */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-2">
        <p className="text-zinc-400 text-sm">
          {revenueMode === 'estimated' ? 'Receita Estimada' : 'Receita Gerada'}
        </p>
        {revenueMode === 'unconfigured' ? (
          <>
            <p className="text-sm font-medium text-zinc-500 leading-snug">Valor de conversão não configurado</p>
            <p className="text-zinc-600 text-xs">Configure em Integrações para ver este dado.</p>
          </>
        ) : (
          <>
            <p className="text-3xl font-bold text-white">
              {connected ? fmtBRL(effectiveRevenue) : fmtBRL(0)}
            </p>
            <p className="text-zinc-500 text-xs">
              {revenueMode === 'estimated' ? 'Baseado no valor por conversão configurado' : cardDesc}
            </p>
          </>
        )}
      </div>

      {/* ROAS Médio */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-2">
        <p className="text-zinc-400 text-sm">
          {revenueMode === 'estimated' ? 'ROAS Estimado' : 'ROAS Médio'}
        </p>
        {revenueMode === 'unconfigured' ? (
          <>
            <p className="text-sm font-medium text-zinc-500 leading-snug">Valor de conversão não configurado</p>
            <p className="text-zinc-600 text-xs">Configure em Integrações para ver este dado.</p>
          </>
        ) : (
          <>
            <p className="text-3xl font-bold text-white">
              {connected ? fmtRoas(effectiveRoas) : fmtRoas(0)}
            </p>
            <p className="text-zinc-500 text-xs">
              {revenueMode === 'estimated' ? 'Baseado no valor por conversão configurado' : 'Retorno sobre investimento'}
            </p>
          </>
        )}
      </div>

    </div>
  )
}
