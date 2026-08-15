import { type NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { createClient } from '@/lib/supabase-server'
import { decrypt, encrypt } from '@/lib/crypto'

const REDIRECT_URI = 'https://www.getdashia.com.br/api/integrations/google/callback'
const ADS_API = 'https://googleads.googleapis.com/v24'

function fmt(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function get6MonthsRange(): { start: string; end: string } {
  const today = new Date()
  const start = new Date(today.getFullYear(), today.getMonth() - 5, 1)
  return { start: fmt(start), end: fmt(today) }
}

export async function GET(_request: NextRequest) {
  try {
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
      return NextResponse.json({ connected: false, revenue7d: [], clicks6m: [] })
    }

    const { data: integration } = await supabase
      .from('integrations')
      .select('*')
      .eq('organization_id', membership.organization_id)
      .eq('platform', 'google_ads')
      .eq('status', 'active')
      .limit(1)
      .single()

    if (!integration || integration.account_id === 'pending') {
      return NextResponse.json({ connected: false, revenue7d: [], clicks6m: [] })
    }

    let accessToken: string
    let refreshToken: string | null = null
    try {
      accessToken = decrypt(integration.access_token_encrypted)
      if (integration.refresh_token_encrypted) {
        refreshToken = decrypt(integration.refresh_token_encrypted)
      }
    } catch {
      return NextResponse.json({ connected: false, revenue7d: [], clicks6m: [] })
    }

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
        console.error('[google-ads/timeseries] token refresh failed:', err)
      }
    }

    const accountId = integration.account_id
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN ?? '',
      'login-customer-id': process.env.GOOGLE_ADS_MCC_ID ?? '',
      'Content-Type': 'application/json',
    }

    const { start: m6start, end: m6end } = get6MonthsRange()

    const [rev7dRes, clicks6mRes] = await Promise.all([
      fetch(`${ADS_API}/customers/${accountId}/googleAds:search`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: `
            SELECT segments.date, metrics.conversions_value
            FROM campaign
            WHERE segments.date DURING LAST_7_DAYS
              AND campaign.status != 'REMOVED'
            ORDER BY segments.date ASC
          `,
        }),
      }),
      fetch(`${ADS_API}/customers/${accountId}/googleAds:search`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: `
            SELECT segments.date, metrics.clicks
            FROM campaign
            WHERE segments.date BETWEEN '${m6start}' AND '${m6end}'
              AND campaign.status != 'REMOVED'
            ORDER BY segments.date ASC
          `,
        }),
      }),
    ])

    // Revenue 7d — aggregate by date
    let revenue7d: Array<{ date: string; value: number }> = []
    if (rev7dRes.ok) {
      const body = await rev7dRes.json()
      const dayMap = new Map<string, number>()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const row of (body.results ?? []) as any[]) {
        const date = row.segments?.date as string ?? ''
        const val  = Number(row.metrics?.conversionsValue ?? 0)
        dayMap.set(date, (dayMap.get(date) ?? 0) + val)
      }
      revenue7d = Array.from(dayMap.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, value]) => ({ date, value }))
    } else {
      const text = await rev7dRes.text()
      console.error('[google-ads/timeseries] revenue7d error:', text.substring(0, 300))
    }

    // Clicks 6m — aggregate by YYYY-MM
    let clicks6m: Array<{ month: string; clicks: number }> = []
    if (clicks6mRes.ok) {
      const body = await clicks6mRes.json()
      const monthMap = new Map<string, number>()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const row of (body.results ?? []) as any[]) {
        const date  = row.segments?.date as string ?? ''
        const month = date.substring(0, 7) // 'YYYY-MM'
        const clicks = Number(row.metrics?.clicks ?? 0)
        monthMap.set(month, (monthMap.get(month) ?? 0) + clicks)
      }
      clicks6m = Array.from(monthMap.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, clicks]) => ({ month, clicks }))
    } else {
      const text = await clicks6mRes.text()
      console.error('[google-ads/timeseries] clicks6m error:', text.substring(0, 300))
    }

    return NextResponse.json({ connected: true, revenue7d, clicks6m })
  } catch (err) {
    console.error('[google-ads/timeseries] unexpected error:', err)
    return NextResponse.json({ connected: true, revenue7d: [], clicks6m: [] })
  }
}
