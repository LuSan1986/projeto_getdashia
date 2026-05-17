import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { encrypt } from '@/lib/crypto'

const BASE = 'https://projeto-getdashia.vercel.app'
const REDIRECT_URI = `${BASE}/api/integrations/meta/callback`
const API_VERSION = 'v21.0'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const oauthError = searchParams.get('error')

  if (oauthError || !code) {
    console.error('[meta/callback] OAuth error or missing code:', oauthError)
    return NextResponse.redirect(`${BASE}/dashboard/integracoes?error=meta_failed`)
  }

  const appId = process.env.META_APP_ID
  const appSecret = process.env.META_APP_SECRET

  if (!appId || !appSecret) {
    console.error('[meta/callback] META_APP_ID or META_APP_SECRET not configured')
    return NextResponse.redirect(`${BASE}/dashboard/integracoes?error=meta_not_configured`)
  }

  // Step 1 — exchange code for short-lived access token
  let shortLivedToken: string
  try {
    const tokenUrl = new URL(`https://graph.facebook.com/${API_VERSION}/oauth/access_token`)
    tokenUrl.searchParams.set('client_id', appId)
    tokenUrl.searchParams.set('redirect_uri', REDIRECT_URI)
    tokenUrl.searchParams.set('client_secret', appSecret)
    tokenUrl.searchParams.set('code', code)

    const res = await fetch(tokenUrl.toString())
    const json = await res.json()

    if (!res.ok || !json.access_token) {
      throw new Error(json.error?.message ?? 'Token exchange failed')
    }

    shortLivedToken = json.access_token
    console.log('[meta/callback] short-lived token received')
  } catch (err) {
    console.error('[meta/callback] token exchange failed:', err)
    return NextResponse.redirect(`${BASE}/dashboard/integracoes?error=meta_failed`)
  }

  // Step 2 — exchange for long-lived token (valid ~60 days)
  let longLivedToken: string
  try {
    const ltUrl = new URL(`https://graph.facebook.com/${API_VERSION}/oauth/access_token`)
    ltUrl.searchParams.set('grant_type', 'fb_exchange_token')
    ltUrl.searchParams.set('client_id', appId)
    ltUrl.searchParams.set('client_secret', appSecret)
    ltUrl.searchParams.set('fb_exchange_token', shortLivedToken)

    const res = await fetch(ltUrl.toString())
    const json = await res.json()

    if (!res.ok || !json.access_token) {
      throw new Error(json.error?.message ?? 'Long-lived token exchange failed')
    }

    longLivedToken = json.access_token
    console.log('[meta/callback] long-lived token received')
  } catch (err) {
    console.error('[meta/callback] long-lived token exchange failed, using short-lived:', err)
    longLivedToken = shortLivedToken
  }

  // Step 3 — fetch ad accounts linked to this user
  let accountId = 'pending'
  try {
    const adAccountsUrl = new URL(`https://graph.facebook.com/${API_VERSION}/me/adaccounts`)
    adAccountsUrl.searchParams.set('access_token', longLivedToken)
    adAccountsUrl.searchParams.set('fields', 'id,name')
    adAccountsUrl.searchParams.set('limit', '1')

    const res = await fetch(adAccountsUrl.toString())
    const json = await res.json()

    if (json.data && json.data.length > 0) {
      accountId = json.data[0].id // e.g. "act_123456789"
      console.log('[meta/callback] resolved ad account:', accountId)
    } else {
      console.warn('[meta/callback] no ad accounts found, saving as pending')
    }
  } catch (err) {
    console.error('[meta/callback] failed to fetch ad accounts:', err)
  }

  // Step 4 — get authenticated user
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error('[meta/callback] no authenticated user:', userError)
    return NextResponse.redirect(`${BASE}/login`)
  }

  const { data: membership, error: membershipError } = await supabase
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', user.id)
    .limit(1)
    .single()

  if (membershipError || !membership) {
    console.error('[meta/callback] no organization found:', membershipError)
    return NextResponse.redirect(`${BASE}/onboarding`)
  }

  // Step 5 — save encrypted token to Supabase
  try {
    const { error: upsertError } = await supabase.from('integrations').upsert(
      {
        organization_id: membership.organization_id,
        platform: 'meta_ads',
        account_id: accountId,
        access_token_encrypted: encrypt(longLivedToken),
        refresh_token_encrypted: null,
        token_expires_at: null, // long-lived tokens expire in ~60 days; refresh handled separately
        status: 'active',
      },
      { onConflict: 'organization_id,platform,account_id' }
    )

    if (upsertError) {
      throw new Error(upsertError.message)
    }

    console.log('[meta/callback] Meta Ads integration saved for org:', membership.organization_id)
  } catch (err) {
    console.error('[meta/callback] failed to save integration:', err)
    return NextResponse.redirect(`${BASE}/dashboard/integracoes?error=meta_failed`)
  }

  return NextResponse.redirect(`${BASE}/dashboard/integracoes?success=meta_connected`)
}
