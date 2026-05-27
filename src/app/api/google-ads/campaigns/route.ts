import { type NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { createClient } from '@/lib/supabase-server'
import { decrypt, encrypt } from '@/lib/crypto'

const REDIRECT_URI = 'https://www.getdashia.com.br/api/integrations/google/callback'

const PERIOD_MAP: Record<string, string> = {
  '7d':  'LAST_7_DAYS',
  '30d': 'LAST_30_DAYS',
  '90d': 'LAST_90_DAYS',
}

const MONTH_ABBR = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']

function formatDate(yyyymmdd: string): string {
  const [, mm, dd] = yyyymmdd.split('-')
  return `${dd}/${MONTH_ABBR[parseInt(mm, 10) - 1]}`
}

function googleStatusToLocal(s: string): 'active' | 'paused' {
  return s === 'ENABLED' ? 'active' : 'paused'
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const period = searchParams.get('period') ?? '30d'
  const dateRange = PERIOD_MAP[period] ?? 'LAST_30_DAYS'

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
    return NextResponse.json({ campaigns: [], roasData: [], connected: false })
  }

  const { data: integration } = await supabase
    .from('integrations')
    .select('*')
    .eq('organization_id', membership.organization_id)
    .eq('platform', 'google_ads')
    .eq('status', 'active')
    .limit(1)
    .single()

  if (!integration) {
    return NextResponse.json({ campaigns: [], roasData: [], connected: false })
  }

  // Decrypt tokens
  let accessToken: string
  let refreshToken: string | null = null
  try {
    accessToken = decrypt(integration.access_token_encrypted)
    if (integration.refresh_token_encrypted) {
      refreshToken = decrypt(integration.refresh_token_encrypted)
    }
  } catch {
    return NextResponse.json({ campaigns: [], roasData: [], connected: false })
  }

  // Refresh token if expiring within 60s
  const expiresAt = integration.token_expires_at
    ? new Date(integration.token_expires_at).getTime()
    : 0

  if (expiresAt < Date.now() + 60_000 && refreshToken) {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        REDIRECT_URI
      )
      oauth2Client.setCredentials({ refresh_token: refreshToken })
      const { credentials } = await oauth2Client.refreshAccessToken()

      if (credentials.access_token) {
        accessToken = credentials.access_token
        await supabase
          .from('integrations')
          .update({
            access_token_encrypted: encrypt(credentials.access_token),
            token_expires_at: credentials.expiry_date
              ? new Date(credentials.expiry_date).toISOString()
              : null,
          })
          .eq('id', integration.id)
      }
    } catch (err) {
      console.error('[google-ads/campaigns] token refresh failed:', err)
    }
  }

  const accountId = integration.account_id
  const devToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN ?? ''
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'developer-token': devToken,
    'Content-Type': 'application/json',
  }

  const campaignQuery = `
    SELECT
      campaign.id,
      campaign.name,
      campaign.status,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions,
      metrics.conversions_value
    FROM campaign
    WHERE segments.date DURING ${dateRange}
      AND campaign.status != 'REMOVED'
    ORDER BY metrics.cost_micros DESC
  `

  const roasQuery = `
    SELECT
      segments.date,
      metrics.cost_micros,
      metrics.conversions_value
    FROM campaign
    WHERE segments.date DURING ${dateRange}
      AND campaign.status != 'REMOVED'
    ORDER BY segments.date ASC
  `

  const [campaignRes, roasRes] = await Promise.all([
    fetch(
      `https://googleads.googleapis.com/v19/customers/${accountId}/googleAds:search`,
      { method: 'POST', headers, body: JSON.stringify({ query: campaignQuery }) }
    ),
    fetch(
      `https://googleads.googleapis.com/v19/customers/${accountId}/googleAds:search`,
      { method: 'POST', headers, body: JSON.stringify({ query: roasQuery }) }
    ),
  ])

  const [campaignBody, roasBody] = await Promise.all([
    campaignRes.json(),
    roasRes.json(),
  ])

  if (!campaignRes.ok) {
    console.error('[google-ads/campaigns] campaign query error:', JSON.stringify(campaignBody).substring(0, 500))
    return NextResponse.json({ campaigns: [], roasData: [], connected: true })
  }

  // Parse campaigns
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const campaigns = (campaignBody.results ?? []).map((row: any) => {
    const cost = (row.metrics?.costMicros ?? 0) / 1_000_000
    const revenue = row.metrics?.conversionsValue ?? 0
    return {
      id:          row.campaign.id,
      platform:    'google' as const,
      name:        row.campaign.name,
      status:      googleStatusToLocal(row.campaign.status),
      impressions: row.metrics?.impressions ?? 0,
      clicks:      row.metrics?.clicks ?? 0,
      cost,
      conversions: row.metrics?.conversions ?? 0,
      revenue,
    }
  })

  // Aggregate daily ROAS
  if (!roasRes.ok) {
    console.error('[google-ads/campaigns] roas query error:', JSON.stringify(roasBody).substring(0, 500))
    return NextResponse.json({ campaigns, roasData: [], connected: true })
  }

  const dailyMap = new Map<string, { cost: number; value: number }>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const row of (roasBody.results ?? []) as any[]) {
    const date  = row.segments?.date ?? ''
    const cost  = (row.metrics?.costMicros ?? 0) / 1_000_000
    const value = row.metrics?.conversionsValue ?? 0
    const prev  = dailyMap.get(date) ?? { cost: 0, value: 0 }
    dailyMap.set(date, { cost: prev.cost + cost, value: prev.value + value })
  }

  const roasData = Array.from(dailyMap.entries()).map(([date, { cost, value }]) => ({
    dia:  formatDate(date),
    roas: cost > 0 ? value / cost : 0,
  }))

  return NextResponse.json({ campaigns, roasData, connected: true })
}
