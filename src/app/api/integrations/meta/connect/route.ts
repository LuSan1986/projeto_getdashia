import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

const BASE = 'https://projeto-getdashia.vercel.app'
const REDIRECT_URI = `${BASE}/api/integrations/meta/callback`
const SCOPES = ['ads_read', 'ads_management'].join(',')
const API_VERSION = 'v21.0'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/login', BASE))
  }

  const appId = process.env.META_APP_ID
  if (!appId) {
    console.error('[meta/connect] META_APP_ID not configured')
    return NextResponse.redirect(`${BASE}/dashboard/integracoes?error=meta_not_configured`)
  }

  const authUrl = new URL(`https://www.facebook.com/${API_VERSION}/dialog/oauth`)
  authUrl.searchParams.set('client_id', appId)
  authUrl.searchParams.set('redirect_uri', REDIRECT_URI)
  authUrl.searchParams.set('scope', SCOPES)
  authUrl.searchParams.set('response_type', 'code')

  return NextResponse.redirect(authUrl.toString())
}
