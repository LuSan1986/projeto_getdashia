import { google } from 'googleapis'
import type { Credentials } from 'google-auth-library'
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { encrypt } from '@/lib/crypto'

const REDIRECT_URI = 'https://www.getdashia.com.br/api/integrations/google/callback'

function makeOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    REDIRECT_URI
  )
}

async function resolveAccountId(accessToken: string, fallback: string): Promise<string> {
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN
  if (!developerToken) return fallback

  try {
    const res = await fetch(
      'https://googleads.googleapis.com/v18/customers:listAccessibleCustomers',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'developer-token': developerToken,
        },
      }
    )
    if (!res.ok) return fallback
    const data = await res.json()
    const first: string | undefined = data.resourceNames?.[0]
    return first ? first.replace('customers/', '') : fallback
  } catch {
    return fallback
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  const dashboardUrl = new URL('/dashboard', 'https://www.getdashia.com.br')

  if (error || !code) {
    dashboardUrl.searchParams.set('error', error ?? 'no_code')
    return NextResponse.redirect(dashboardUrl)
  }

  const oauth2Client = makeOAuthClient()
  let tokens: Credentials

  try {
    const result = await oauth2Client.getToken(code)
    tokens = result.tokens
  } catch {
    dashboardUrl.searchParams.set('error', 'token_exchange_failed')
    return NextResponse.redirect(dashboardUrl)
  }

  if (!tokens.access_token) {
    dashboardUrl.searchParams.set('error', 'no_access_token')
    return NextResponse.redirect(dashboardUrl)
  }

  oauth2Client.setCredentials(tokens)
  const oauth2Api = google.oauth2({ version: 'v2', auth: oauth2Client })
  const { data: userInfo } = await oauth2Api.userinfo.get()

  const emailFallback = userInfo.email ?? userInfo.id ?? 'unknown'
  const accountId = await resolveAccountId(tokens.access_token, emailFallback)

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/login', 'https://www.getdashia.com.br'))
  }

  const { data: membership } = await supabase
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', user.id)
    .limit(1)
    .single()

  if (!membership) {
    return NextResponse.redirect(new URL('/onboarding', 'https://www.getdashia.com.br'))
  }

  const { error: upsertError } = await supabase.from('integrations').upsert(
    {
      organization_id: membership.organization_id,
      platform: 'google_ads',
      account_id: accountId,
      account_name: userInfo.name ?? null,
      access_token_encrypted: encrypt(tokens.access_token),
      refresh_token_encrypted: tokens.refresh_token ? encrypt(tokens.refresh_token) : null,
      token_expires_at: tokens.expiry_date
        ? new Date(tokens.expiry_date).toISOString()
        : null,
      status: 'active',
    },
    { onConflict: 'organization_id,platform,account_id' }
  )

  if (upsertError) {
    console.error('[google/callback] upsert error:', upsertError.message)
    dashboardUrl.searchParams.set('error', 'save_failed')
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.redirect(dashboardUrl)
}
