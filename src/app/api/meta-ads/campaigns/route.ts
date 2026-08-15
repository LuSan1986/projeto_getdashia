import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { decrypt, encrypt } from '@/lib/crypto'

export const dynamic = 'force-dynamic'

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
  impressions?: string
  clicks?: string
  spend?: string
  actions?: Array<{ action_type: string; value: string }>
  action_values?: Array<{ action_type: string; value: string }>
}

type CampaignRow = {
  id: string
  name: string
  status: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period     = searchParams.get('period') ?? '30d'
    const isPrev     = searchParams.get('prev') === 'true'
    const datePreset = META_PERIOD_MAP[period] ?? 'last_30_days'

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

    const { data: integration } = await supabase
      .from('integrations')
      .select('*')
      .eq('organization_id', membership.organization_id)
      .eq('platform', 'meta_ads')
      .eq('status', 'active')
      .limit(1)
      .single()

    if (!integration || !integration.account_id || integration.account_id === 'pending') {
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

        const refreshRes = await fetch(refreshUrl)
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
        `&access_token=${accessToken}`
      )
      if (!res.ok) {
        const text = await res.text()
        console.error('[meta-ads/campaigns] prev query error:', text.substring(0, 300))
        return NextResponse.json({ connected: true, prevSummary: null })
      }
      const body = await res.json()
      const row  = (body.data ?? [])[0] as InsightRow | undefined
      const investment  = Number(row?.spend ?? 0)
      const clicks      = Number(row?.clicks ?? 0)
      const conversions = sumActionField(row?.actions, 'purchase')
      const revenue     = sumActionField(row?.action_values, 'purchase')
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
        `&access_token=${accessToken}`
      ),
      fetch(
        `${GRAPH_API}/${adAccountId}/insights` +
        `?fields=campaign_id,impressions,clicks,spend,actions,action_values` +
        `&level=campaign` +
        `&date_preset=${datePreset}` +
        `&limit=100` +
        `&access_token=${accessToken}`
      ),
    ])

    if (!campaignRes.ok) {
      const text = await campaignRes.text()
      console.error('[meta-ads/campaigns] erro na lista de campanhas:', text.substring(0, 500))
      return NextResponse.json({ connected: true, campaigns: [], apiError: true })
    }

    const campaignBody = await campaignRes.json()

    // Build insights map even if insights call failed (best-effort)
    const insightsMap = new Map<string, InsightRow>()
    if (insightsRes.ok) {
      const insightsBody = await insightsRes.json()
      for (const row of (insightsBody.data ?? []) as InsightRow[]) {
        insightsMap.set(row.campaign_id, row)
      }
    } else {
      const text = await insightsRes.text()
      console.error('[meta-ads/campaigns] erro nos insights:', text.substring(0, 500))
    }

    const campaigns = (campaignBody.data ?? [] as CampaignRow[]).map((c: CampaignRow) => {
      const ins = insightsMap.get(c.id)
      const cost = Number(ins?.spend ?? 0)
      const conversions = sumActionField(ins?.actions, 'purchase')
      const revenue = sumActionField(ins?.action_values, 'purchase')
      return {
        id:          Number(c.id),
        platform:    'meta' as const,
        name:        c.name,
        status:      metaStatusToLocal(c.status),
        impressions: Number(ins?.impressions ?? 0),
        clicks:      Number(ins?.clicks ?? 0),
        cost,
        conversions,
        revenue,
      }
    })

    console.log(`[meta-ads/campaigns] ${campaigns.length} campanhas retornadas para ${adAccountId}`)
    return NextResponse.json({ campaigns, connected: true })
  } catch (err) {
    console.error('[meta-ads/campaigns] erro inesperado:', err)
    return NextResponse.json({ connected: true, campaigns: [], apiError: true })
  }
}
