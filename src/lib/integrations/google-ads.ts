export interface GoogleAdsMetrics {
  clicks: number
  impressions: number
  cost: number
  conversions: number
}

interface GaqlRow {
  metrics?: {
    clicks?: string
    impressions?: string
    costMicros?: string
    conversions?: string
  }
}

const ZERO: GoogleAdsMetrics = { clicks: 0, impressions: 0, cost: 0, conversions: 0 }

export async function fetchGoogleAdsData(
  accessToken: string,
  customerId: string
): Promise<GoogleAdsMetrics> {
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN
  if (!developerToken) throw new Error('GOOGLE_ADS_DEVELOPER_TOKEN not configured')

  const cleanCustomerId = customerId.replace(/-/g, '')

  const query = `
    SELECT
      metrics.clicks,
      metrics.impressions,
      metrics.cost_micros,
      metrics.conversions
    FROM campaign
    WHERE segments.date DURING LAST_30_DAYS
  `

  const res = await fetch(
    `https://googleads.googleapis.com/v19/customers/${cleanCustomerId}/googleAds:search`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'developer-token': developerToken,
        'login-customer-id': cleanCustomerId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    }
  )

  if (!res.ok) {
    const body = await res.text()
    console.error(`[google-ads] API error ${res.status}:`, body)
    throw new Error(`Google Ads API ${res.status}`)
  }

  const data = await res.json()
  const rows: GaqlRow[] = data.results ?? []

  if (rows.length === 0) {
    console.log('[google-ads] query returned 0 rows for customer:', cleanCustomerId)
    return ZERO
  }

  return rows.reduce<GoogleAdsMetrics>(
    (acc, row) => ({
      clicks: acc.clicks + Number(row.metrics?.clicks ?? 0),
      impressions: acc.impressions + Number(row.metrics?.impressions ?? 0),
      cost: acc.cost + Number(row.metrics?.costMicros ?? 0) / 1_000_000,
      conversions: acc.conversions + Number(row.metrics?.conversions ?? 0),
    }),
    { ...ZERO }
  )
}
