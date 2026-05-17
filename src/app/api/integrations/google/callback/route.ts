import { google } from 'googleapis'
import type { Credentials } from 'google-auth-library'
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { encrypt } from '@/lib/crypto'

const REDIRECT_URI = 'https://www.getdashia.com.br/api/integrations/google/callback'
const BASE = 'https://www.getdashia.com.br'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const oauthError = searchParams.get('error')

  if (oauthError || !code) {
    console.error('[google/callback] OAuth error or missing code:', oauthError)
    return NextResponse.redirect(`${BASE}/dashboard?error=integration_failed`)
  }

  // Step 1 — exchange code for tokens
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    REDIRECT_URI
  )

  let tokens: Credentials
  try {
    const result = await oauth2Client.getToken(code)
    tokens = result.tokens
    console.log('[google/callback] tokens received, access_token present:', !!tokens.access_token)
  } catch (err) {
    console.error('[google/callback] getToken failed:', err)
    return NextResponse.redirect(`${BASE}/dashboard?error=integration_failed`)
  }

  if (!tokens.access_token) {
    console.error('[google/callback] access_token missing from token response')
    return NextResponse.redirect(`${BASE}/dashboard?error=integration_failed`)
  }

  // Step 2 — set credentials immediately so the client uses them for subsequent calls
  oauth2Client.setCredentials(tokens)

  // Step 3 — fetch Google Ads customer ID
  let accountId: string
  try {
    const res = await fetch(
      'https://googleads.googleapis.com/v17/customers:listAccessibleCustomers',
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN ?? '',
        },
      }
    )
    const body = await res.json()
    console.log('[google/callback] listAccessibleCustomers status:', res.status, JSON.stringify(body))

    if (!res.ok) {
      throw new Error(`listAccessibleCustomers ${res.status}: ${JSON.stringify(body)}`)
    }

    const firstResource: string | undefined = body.resourceNames?.[0]
    if (!firstResource) throw new Error('No accessible Google Ads customers found')

    accountId = firstResource.replace('customers/', '')
    console.log('[google/callback] resolved account_id:', accountId)
  } catch (err) {
    console.error('[google/callback] failed to fetch customer ID:', err)
    return NextResponse.redirect(`${BASE}/dashboard?error=integration_failed`)
  }

  // Step 4 — get Supabase user from session cookie
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    console.error('[google/callback] no authenticated user:', userError)
    return NextResponse.redirect(`${BASE}/login`)
  }

  const { data: membership, error: membershipError } = await supabase
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', user.id)
    .limit(1)
    .single()

  if (membershipError || !membership) {
    console.error('[google/callback] no organization found:', membershipError)
    return NextResponse.redirect(`${BASE}/onboarding`)
  }

  // Step 5 — encrypt tokens and save to Supabase
  try {
    const { error: upsertError } = await supabase.from('integrations').upsert(
      {
        organization_id: membership.organization_id,
        platform: 'google_ads',
        account_id: accountId,
        access_token_encrypted: encrypt(tokens.access_token),
        refresh_token_encrypted: tokens.refresh_token ? encrypt(tokens.refresh_token) : null,
        token_expires_at: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : null,
        status: 'active',
      },
      { onConflict: 'organization_id,platform,account_id' }
    )

    if (upsertError) {
      throw new Error(upsertError.message)
    }

    console.log('[google/callback] integration saved successfully for org:', membership.organization_id)
  } catch (err) {
    console.error('[google/callback] failed to save integration:', err)
    return NextResponse.redirect(`${BASE}/dashboard?error=integration_failed`)
  }

  return NextResponse.redirect(`${BASE}/dashboard`)
}
