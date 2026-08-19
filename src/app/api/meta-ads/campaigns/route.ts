import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { decrypt, encrypt } from '@/lib/crypto'

export const dynamic    = 'force-dynamic'
export const fetchCache = 'force-no-store'

const GRAPH_API = 'https://graph.facebook.com/v21.0'

const META_PERIOD_MAP: Record<string, string> = {
  '7d':  'last_7_days',
  '30d': 'last_30d',
  '90d': 'last_90_days',
}

function metaStatusToLocal(s: string): 'active' | 'paused' {
  return s === 'ACTIVE' ? 'active' : 'paused'
}

function getPrevDateRange(period: string): { start: string; end: string } {
  const days = period === '7d' ? 7 : period === '30d' ? 30 : 90
  const today = new Date()
  const prevEnd = new Date(today)
  prevEnd.setDate(today.getDate() - days - 1)
  const prevStart = new Date(today)
  prevStart.setDate(today.getDate() - 2 * days)
  const fmt = (d: Date) => d.toISOString().split('T')[0]
  return { start: fmt(prevStart), end: fmt(prevEnd) }
}

function sumActionField(
  arr: Array<{ action_type: string; value: string }> | undefined,
  type: string
): number {
  if (!arr) return 0
  return arr
    .filter((a) => a.action_type === type || a.action_type === `offsite_conversion.fb_pixel_${type}`)
    .reduce((sum, a) => sum + Number(a.value ?? 0), 0)
}

type InsightRow = {
  campaign_id: string
  publisher_platform?: string
  impressions?: string
  clicks?: string
  spend?: string
  actions?: Array<{ action_type: string; value: string }>
  action_values?: Array<{ action_type: string; value: string }>
}

type CampaignInsight = {
  impressions: number
  clicks: number
  spend: number
  conversions: number
  revenue: number
}

type CampaignRow = {
  id: string
  name: string
  status: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period         = searchParams.get('period') ?? '30d'
    const isPrev         = searchParams.get('prev') === 'true'
    const accountIdParam = searchParams.get('account_id')
    const platformParam  = searchParams.get('platform') // 'facebook' | 'instagram' | null
    const datePreset     = META_PERIOD_MAP[period] ?? 'last_30_days'

    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: membership } = await supabase
      .from('organization_members')
      .select('organization_id')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (!membership) {
      return NextResponse.json({ campaigns: [], connected: false })
    }

    let integrationQuery = supabase
      .from('integrations')
      .select('*')
      .eq('organization_id', membership.organization_id)
      .eq('platform', 'meta_ads')
      .eq('status', 'active')
      .neq('account_id', 'pending')

    if (accountIdParam) {
      integrationQuery = integrationQuery.eq('account_id', accountIdParam)
    } else {
      integrationQuery = integrationQuery.order('is_default', { ascending: false })
    }

    const { data: integration } = await integrationQuery.limit(1).single()

    if (!integration) {
      return NextResponse.json({ campaigns: [], connected: false })
    }

    let accessToken: string
    try {
      accessToken = decrypt(integration.access_token_encrypted)
    } catch {
      return NextResponse.json({ campaigns: [], connected: false })
    }

    // Refresh Meta long-lived token if within 7 days of expiry
    const expiresAt = integration.token_expires_at
      ? new Date(integration.token_expires_at).getTime()
      : 0

    if (expiresAt > 0 && expiresAt < Date.now() + 7 * 24 * 60 * 60 * 1000) {
      try {
        const refreshUrl =
          `${GRAPH_API}/oauth/access_token` +
          `?grant_type=fb_exchange_token` +
          `&client_id=${process.env.META_APP_ID ?? ''}` +
          `&client_secret=${process.env.META_APP_SECRET ?? ''}` +
          `&fb_exchange_token=${encodeURIComponent(accessToken)}`

        const refreshRes = await fetch(refreshUrl, { cache: 'no-store' })
        if (refreshRes.ok) {
          const refreshData = await refreshRes.json()
          if (refreshData.access_token) {
            accessToken = refreshData.access_token
            const newExpiry = refreshData.expires_in
              ? new Date(Date.now() + Number(refreshData.expires_in) * 1000).toISOString()
              : null
            await supabase
              .from('integrations')
              .update({
                access_token_encrypted: encrypt(accessToken),
                token_expires_at: newExpiry,
              })
              .eq('id', integration.id)
            console.log('[meta-ads/campaigns] token renovado com sucesso')
          }
        }
      } catch (err) {
        console.error('[meta-ads/campaigns] falha ao renovar token:', err)
      }
    }

    const rawAccountId = integration.account_id as string
    const adAccountId = rawAccountId.startsWith('act_') ? rawAccountId : `act_${rawAccountId}`

    // Previous period summary — returns aggregate only, no campaign detail
    if (isPrev) {
      const { start, end } = getPrevDateRange(period)
      const timeRange = encodeURIComponent(JSON.stringify({ since: start, until: end }))
      const res = await fetch(
        `${GRAPH_API}/${adAccountId}/insights` +
        `?fields=impressions,clicks,spend,actions,action_values` +
        `&level=account` +
        `&time_range=${timeRange}` +
        `&breakdowns=publisher_platform` +
        `&access_token=${accessToken}`,
        { cache: 'no-store' }
      )
      if (!res.ok) {
        const text = await res.text()
        console.error('[meta-ads/campaigns] prev query error:', text.substring(0, 300))
        return NextResponse.json({ connected: true, prevSummary: null })
      }
      const body = await res.json()
      const rows = (body.data ?? []) as InsightRow[]
      const filtered = platformParam ? rows.filter(r => r.publisher_platform === platformParam) : rows
      const investment  = filtered.reduce((s, r) => s + Number(r.spend ?? 0), 0)
      const clicks      = filtered.reduce((s, r) => s + Number(r.clicks ?? 0), 0)
      const conversions = filtered.reduce((s, r) => s + sumActionField(r.actions, 'purchase'), 0)
      const revenue     = filtered.reduce((s, r) => s + sumActionField(r.action_values, 'purchase'), 0)
      return NextResponse.json({
        connected: true,
        prevSummary: { investment, revenue, clicks, conversions },
      })
    }

    const filterParam = encodeURIComponent(
      JSON.stringify([{ field: 'effective_status', operator: 'IN', value: ['ACTIVE', 'PAUSED'] }])
    )

    const [campaignRes, insightsRes] = await Promise.all([
      fetch(
        `${GRAPH_API}/${adAccountId}/campaigns` +
        `?fields=id,name,status` +
        `&filtering=${filterParam}` +
        `&limit=100` +
        `&access_token=${accessToken}`,
        { cache: 'no-store' }
      ),
      fetch(
        `${GRAPH_API}/${adAccountId}/insights` +
        `?fields=campaign_id,impressions,clicks,spend,actions,action_values` +
        `&level=campaign` +
        `&date_preset=${datePreset}` +
        `&breakdowns=publisher_platform` +
        `&limit=500` +
        `&access_token=${accessToken}`,
        { cache: 'no-store' }
      ),
    ])

    if (!campaignRes.ok) {
      const text = await campaignRes.text()
      console.error('[meta-ads/campaigns] erro na lista de campanhas:', text.substring(0, 500))
      return NextResponse.json({ connected: true, campaigns: [], apiError: true })
    }

    const campaignBody = await campaignRes.json()

    // Aggregate breakdown rows by campaign_id, filtering by platform when requested
    const insightsMap = new Map<string, CampaignInsight>()
    if (insightsRes.ok) {
      const insightsBody = await insightsRes.json()
      for (const row of (insightsBody.data ?? []) as InsightRow[]) {
        if (platformParam && row.publisher_platform !== platformParam) continue
        const prev = insightsMap.get(row.campaign_id) ?? { impressions: 0, clicks: 0, spend: 0, conversions: 0, revenue: 0 }
        insightsMap.set(row.campaign_id, {
          impressions: prev.impressions + Number(row.impressions ?? 0),
          clicks:      prev.clicks      + Number(row.clicks ?? 0),
          spend:       prev.spend       + Number(row.spend ?? 0),
          conversions: prev.conversions + sumActionField(row.actions, 'purchase'),
          revenue:     prev.revenue     + sumActionField(row.action_values, 'purchase'),
        })
      }
    } else {
      const text = await insightsRes.text()
      console.error('[meta-ads/campaigns] erro nos insights:', text.substring(0, 500))
    }

    const campaigns = (campaignBody.data ?? [] as CampaignRow[]).map((c: CampaignRow) => {
      // Campaigns with no activity on the requested platform default to zero — not an error
      const ins = insightsMap.get(c.id) ?? { impressions: 0, clicks: 0, spend: 0, conversions: 0, revenue: 0 }
      return {
        id:          Number(c.id),
        platform:    'meta' as const,
        name:        c.name,
        status:      metaStatusToLocal(c.status),
        impressions: ins.impressions,
        clicks:      ins.clicks,
        cost:        ins.spend,
        conversions: ins.conversions,
        revenue:     ins.revenue,
      }
    })

    console.log(`[meta-ads/campaigns] ${campaigns.length} campanhas retornadas para ${adAccountId}`)
    return NextResponse.json({ campaigns, connected: true })
  } catch (err) {
    console.error('[meta-ads/campaigns] erro inesperado:', err)
    return NextResponse.json({ connected: true, campaigns: [], apiError: true })
  }
}
