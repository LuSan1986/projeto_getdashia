import { TrendingUp } from 'lucide-react'
import Charts from '@/components/dashboard/Charts'
import ChannelsSection from '@/components/dashboard/ChannelsSection'
import PendingAccountBanner from '@/components/dashboard/PendingAccountBanner'
import AIConsultant from '@/components/dashboard/AIConsultant'
import { createClient } from '@/lib/supabase-server'
import { decrypt } from '@/lib/crypto'
import { fetchGoogleAdsData, type GoogleAdsMetrics } from '@/lib/integrations/google-ads'

interface MetricCard {
  label: string
  value: string
  desc: string
}

const DEMO_METRICS: MetricCard[] = [
  { label: 'Receita Total', value: 'R$ 48.320', desc: '+12% em relação ao mês anterior' },
  { label: 'Cliques', value: '128.450', desc: 'Total de cliques nos anúncios' },
  { label: 'Conversões', value: '3.210', desc: 'Conversões atribuídas no período' },
  { label: 'ROAS', value: '4,7×', desc: 'Retorno sobre investimento em anúncios' },
]

function buildMetrics(ads: GoogleAdsMetrics): MetricCard[] {
  return [
    {
      label: 'Custo Total',
      value: ads.cost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      desc: 'Últimos 30 dias — Google Ads',
    },
    {
      label: 'Cliques',
      value: ads.clicks.toLocaleString('pt-BR'),
      desc: 'Últimos 30 dias — Google Ads',
    },
    {
      label: 'Conversões',
      value: ads.conversions.toLocaleString('pt-BR'),
      desc: 'Últimos 30 dias — Google Ads',
    },
    {
      label: 'Impressões',
      value: ads.impressions.toLocaleString('pt-BR'),
      desc: 'Últimos 30 dias — Google Ads',
    },
  ]
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let metrics: MetricCard[] = DEMO_METRICS
  let hasIntegration = false
  let isPending = false
  let dataLabel = 'valores de demonstração'
  let noCampaigns = false
  let connectedAccountId = ''
  let metaConnected = false
  let aiMetrics = { cost: 0, revenue: 0, roas: 0, cpa: 0, clicks: 0, conversions: 0, impressions: 0 }

  if (user) {
    const { data: membership } = await supabase
      .from('organization_members')
      .select('organization_id')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (membership) {
      const { data: integration } = await supabase
        .from('integrations')
        .select('access_token_encrypted, account_id')
        .eq('organization_id', membership.organization_id)
        .eq('platform', 'google_ads')
        .eq('status', 'active')
        .limit(1)
        .single()

      // Check Meta integration
      const { data: metaIntegration } = await supabase
        .from('integrations')
        .select('id')
        .eq('organization_id', membership.organization_id)
        .eq('platform', 'meta_ads')
        .eq('status', 'active')
        .limit(1)
        .single()

      metaConnected = !!metaIntegration

      if (integration) {
        hasIntegration = true
        connectedAccountId = integration.account_id

        if (integration.account_id === 'pending') {
          isPending = true
        }

        // Always show real data when connected — zeros included, never DEMO_METRICS
        let adsData: GoogleAdsMetrics = { clicks: 0, impressions: 0, cost: 0, conversions: 0 }

        try {
          const accessToken = decrypt(integration.access_token_encrypted!)
          adsData = await fetchGoogleAdsData(accessToken, integration.account_id)
          dataLabel = 'Google Ads — últimos 30 dias'
        } catch (err) {
          console.error('[dashboard] fetchGoogleAdsData failed:', err)
          dataLabel = 'Google Ads conectado — erro ao buscar dados'
        }

        metrics = buildMetrics(adsData)
        noCampaigns = adsData.clicks === 0 && adsData.impressions === 0 && adsData.cost === 0
        aiMetrics = {
          cost: adsData.cost,
          revenue: 0,
          roas: 0,
          cpa: adsData.conversions > 0 ? adsData.cost / adsData.conversions : 0,
          clicks: adsData.clicks,
          conversions: adsData.conversions,
          impressions: adsData.impressions,
        }
      }
    }
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Visão Geral</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Dados do período atual — {dataLabel}
        </p>

        {hasIntegration && noCampaigns && !isPending && (
          <p className="mt-2 text-yellow-500 text-xs">
            Nenhuma campanha encontrada no período — conectado à conta {connectedAccountId}
          </p>
        )}

        {isPending && <PendingAccountBanner />}

        {!hasIntegration && (
          <a
            href="/api/integrations/google/connect"
            className="mt-4 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Conectar Google Ads
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map(({ label, value, desc }) => (
          <div
            key={label}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <p className="text-zinc-400 text-sm">{label}</p>
              <TrendingUp size={14} className="text-indigo-400" />
            </div>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-zinc-500 text-xs">{desc}</p>
          </div>
        ))}
      </div>

      <ChannelsSection metaConnected={metaConnected} />
      <Charts isLive={hasIntegration} />
      <AIConsultant metrics={aiMetrics} />
    </div>
  )
}
