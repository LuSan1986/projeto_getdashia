import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { decrypt, encrypt } from '@/lib/crypto'

const GRAPH_API = 'https://graph.facebook.com/v21.0'

function fmt(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function get6MonthsRange(): { since: string; until: string } {
  const today = new Date()
  const start = new Date(today.getFullYear(), today.getMonth() - 5, 1)
  return { since: fmt(start), until: fmt(today) }
}

function sumActionValues(
  arr: Array<{ action_type: string; value: string }> | undefined,
  type: string
): number {
  if (!arr) return 0
  return arr
    .filter((a) => a.action_type === type || a.action_type === `offsite_conversion.fb_pixel_${type}`)
    .reduce((sum, a) => sum + Number(a.value ?? 0), 0)
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
      .eq('platform', 'meta_ads')
      .eq('status', 'active')
      .limit(1)
      .single()

    if (!integration || !integration.account_id || integration.account_id === 'pending') {
      return NextResponse.json({ connected: false, revenue7d: [], clicks6m: [] })
    }

    let accessToken: string
    try {
      accessToken = decrypt(integration.access_token_encrypted)
    } catch {
      return NextResponse.json({ connected: false, revenue7d: [], clicks6m: [] })
    }

    // Refresh long-lived token if within 7 days of expiry
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
          }
        }
      } catch (err) {
        console.error('[meta-ads/timeseries] token refresh failed:', err)
      }
    }

    const rawAccountId = integration.account_id as string
    const adAccountId = rawAccountId.startsWith('act_') ? rawAccountId : `act_${rawAccountId}`

    const { since: m6since, until: m6until } = get6MonthsRange()
    const m6timeRange = encodeURIComponent(JSON.stringify({ since: m6since, until: m6until }))

    const [rev7dRes, clicks6mRes] = await Promise.all([
      fetch(
        `${GRAPH_API}/${adAccountId}/insights` +
        `?fields=date_start,action_values` +
        `&level=account` +
        `&date_preset=last_7d` +
        `&time_increment=1` +
        `&access_token=${accessToken}`
      ),
      fetch(
        `${GRAPH_API}/${adAccountId}/insights` +
        `?fields=date_start,clicks` +
        `&level=account` +
        `&time_range=${m6timeRange}` +
        `&time_increment=monthly` +
        `&access_token=${accessToken}`
      ),
    ])

    // Revenue 7d — daily purchase action_values
    let revenue7d: Array<{ date: string; value: number }> = []
    if (rev7dRes.ok) {
      const body = await rev7dRes.json()
      revenue7d = ((body.data ?? []) as Array<{
        date_start: string
        action_values?: Array<{ action_type: string; value: string }>
      }>).map((row) => ({
        date:  row.date_start,
        value: sumActionValues(row.action_values, 'purchase'),
      }))
    } else {
      const text = await rev7dRes.text()
      console.error('[meta-ads/timeseries] revenue7d error:', text.substring(0, 300))
    }

    // Clicks 6m — monthly breakdown, date_start = first day of month
    let clicks6m: Array<{ month: string; clicks: number }> = []
    if (clicks6mRes.ok) {
      const body = await clicks6mRes.json()
      clicks6m = ((body.data ?? []) as Array<{
        date_start: string
        clicks?: string
      }>).map((row) => ({
        month:  row.date_start.substring(0, 7), // 'YYYY-MM'
        clicks: Number(row.clicks ?? 0),
      }))
    } else {
      const text = await clicks6mRes.text()
      console.error('[meta-ads/timeseries] clicks6m error:', text.substring(0, 300))
    }

    return NextResponse.json({ connected: true, revenue7d, clicks6m })
  } catch (err) {
    console.error('[meta-ads/timeseries] unexpected error:', err)
    return NextResponse.json({ connected: true, revenue7d: [], clicks6m: [] })
  }
}
