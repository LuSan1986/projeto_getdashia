import { type NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { createClient } from '@/lib/supabase-server'
import { decrypt, encrypt } from '@/lib/crypto'

const REDIRECT_URI = 'https://www.getdashia.com.br/api/integrations/google/callback'
const ADS_API = 'https://googleads.googleapis.com/v24'

interface AccountInfo {
  id: string
  name: string
}

interface CustomerClientRow {
  customerClient?: {
    id?: number | string
    descriptiveName?: string
    manager?: boolean
  }
}

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

    const devToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN ?? ''

    // Step 1: get all top-level accessible customers
    const listRes = await fetch(
      `${ADS_API}/customers:listAccessibleCustomers`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'developer-token': devToken,
        },
      }
    )

    if (!listRes.ok) {
      const text = await listRes.text()
      console.error('[google/accounts] listAccessibleCustomers error:', text.substring(0, 300))
      return NextResponse.json({ error: 'Erro ao buscar contas do Google Ads' }, { status: 502 })
    }

    const listBody = await listRes.json()
    const resourceNames: string[] = listBody.resourceNames ?? []
    const topLevelIds = resourceNames.map((r: string) => r.replace('customers/', ''))
    console.log('[google/accounts] top-level IDs:', topLevelIds)

    // Step 2: for each top-level account, query customer_client to expand sub-accounts.
    // Manager accounts return their full client hierarchy; non-managers return an error
    // (in which case we add the account itself directly).
    const seenIds = new Set<string>()
    const result: AccountInfo[] = []

    const clientQuery = `
      SELECT customer_client.id, customer_client.descriptive_name, customer_client.manager
      FROM customer_client
      WHERE customer_client.level <= 1
    `

    await Promise.all(
      topLevelIds.map(async (topId) => {
        try {
          const res = await fetch(
            `${ADS_API}/customers/${topId}/googleAds:search`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'developer-token': devToken,
                'login-customer-id': topId,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ query: clientQuery }),
            }
          )

          if (!res.ok) {
            // Not a manager account — add it directly as a selectable account
            if (!seenIds.has(topId)) {
              seenIds.add(topId)
              result.push({ id: topId, name: '' })
            }
            return
          }

          const body = await res.json()
          const rows: CustomerClientRow[] = body.results ?? []
          let addedAny = false

          for (const row of rows) {
            const clientId = String(row.customerClient?.id ?? '')
            const isManager = row.customerClient?.manager === true
            if (!isManager && clientId && !seenIds.has(clientId)) {
              seenIds.add(clientId)
              result.push({
                id: clientId,
                name: row.customerClient?.descriptiveName ?? '',
              })
              addedAny = true
            }
          }

          // Query succeeded but returned no non-manager rows — add the account itself
          if (!addedAny && !seenIds.has(topId)) {
            seenIds.add(topId)
            result.push({ id: topId, name: '' })
          }
        } catch (err) {
          console.error('[google/accounts] error expanding account', topId, err)
          if (!seenIds.has(topId)) {
            seenIds.add(topId)
            result.push({ id: topId, name: '' })
          }
        }
      })
    )

    console.log('[google/accounts] final selectable accounts:', result.map(a => a.id))
    return NextResponse.json({ accounts: result })
  } catch (err) {
    console.error('[google/accounts] erro inesperado:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
