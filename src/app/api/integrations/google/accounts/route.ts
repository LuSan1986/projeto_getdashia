import { type NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { createClient } from '@/lib/supabase-server'
import { decrypt, encrypt } from '@/lib/crypto'

const REDIRECT_URI = 'https://www.getdashia.com.br/api/integrations/google/callback'

export async function GET(_request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const { data: membership } = await supabase
      .from('organization_members')
      .select('organization_id')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (!membership) {
      return NextResponse.json({ error: 'Organização não encontrada' }, { status: 404 })
    }

    const { data: integration } = await supabase
      .from('integrations')
      .select('*')
      .eq('organization_id', membership.organization_id)
      .eq('platform', 'google_ads')
      .eq('account_id', 'pending')
      .limit(1)
      .single()

    if (!integration) {
      return NextResponse.json({ error: 'Nenhuma integração pendente encontrada' }, { status: 404 })
    }

    let accessToken: string
    let refreshToken: string | null = null
    try {
      accessToken = decrypt(integration.access_token_encrypted)
      if (integration.refresh_token_encrypted) {
        refreshToken = decrypt(integration.refresh_token_encrypted)
      }
    } catch {
      return NextResponse.json({ error: 'Erro ao decifrar tokens' }, { status: 500 })
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
        console.error('[google/accounts] token refresh failed:', err)
      }
    }

    const response = await fetch(
      'https://googleads.googleapis.com/v24/customers:listAccessibleCustomers',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN ?? '',
        },
      }
    )

    if (!response.ok) {
      const text = await response.text()
      console.error('[google/accounts] listAccessibleCustomers error:', text.substring(0, 300))
      return NextResponse.json({ error: 'Erro ao buscar contas do Google Ads' }, { status: 502 })
    }

    const body = await response.json()
    const resourceNames: string[] = body.resourceNames ?? []
    const accounts = resourceNames.map((r: string) => r.replace('customers/', ''))

    return NextResponse.json({ accounts })
  } catch (err) {
    console.error('[google/accounts] erro inesperado:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
