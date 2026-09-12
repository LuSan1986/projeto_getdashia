import { type NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { createClient } from '@/lib/supabase-server'
import { decrypt, encrypt } from '@/lib/crypto'

const REDIRECT_URI = 'https://www.getdashia.com.br/api/integrations/google/callback'
const ADS_API = 'https://googleads.googleapis.com/v24'

interface AccountInfo {
  id: string
  name: string
  // Which MCC exposed this account via customer_client expansion.
  // null = account is directly accessible (top-level in listAccessibleCustomers).
  mccId: string | null
}

interface CustomerClientRow {
  customerClient?: {
    id?: number | string
    descriptiveName?: string
  }
}

// Fetches an account's display name directly from the customer resource.
// Used as fallback when customer_client expansion fails (e.g. non-manager accounts).
async function fetchAccountName(
  id: string,
  accessToken: string,
  devToken: string
): Promise<string> {
  try {
    const res = await fetch(`${ADS_API}/customers/${id}/googleAds:search`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'developer-token': devToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'SELECT customer.id, customer.descriptive_name FROM customer LIMIT 1',
      }),
    })
    if (!res.ok) return ''
    const body = await res.json()
    const rows = body.results ?? []
    return (rows[0]?.customer?.descriptiveName as string | undefined) ?? ''
  } catch {
    return ''
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
      accessToken = decrypt(integration.access_token_encrypted as string)
      if (integration.refresh_token_encrypted) {
        refreshToken = decrypt(integration.refresh_token_encrypted as string)
      }
    } catch {
      return NextResponse.json({ error: 'Erro ao decifrar tokens' }, { status: 500 })
    }

    const expiresAt = integration.token_expires_at
      ? new Date(integration.token_expires_at as string).getTime()
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
    const listRes = await fetch(`${ADS_API}/customers:listAccessibleCustomers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'developer-token': devToken,
      },
    })

    if (!listRes.ok) {
      const text = await listRes.text()
      console.error('[google/accounts] listAccessibleCustomers error:', text.substring(0, 300))
      return NextResponse.json({ error: 'Erro ao buscar contas do Google Ads' }, { status: 502 })
    }

    const listBody = await listRes.json()
    const resourceNames: string[] = listBody.resourceNames ?? []
    const topLevelIds = resourceNames.map((r: string) => r.replace('customers/', ''))
    console.log('[google/accounts] top-level IDs:', topLevelIds)

    // Step 2: For each top-level account, expand via customer_client to find all leaf
    // (non-manager) sub-accounts at any hierarchy depth. The level restriction is intentionally
    // absent — without it, MCCs with nested sub-MCCs reveal their deepest client accounts.
    //
    // Two-phase expansion to guarantee MCC sub-accounts get the correct mccId.
    //
    // Race condition in a single Promise.all: an account can appear both as a
    // top-level entry in listAccessibleCustomers AND as a sub-account of an MCC.
    // If we add it directly (mccId=null) before the MCC expansion resolves, the
    // MCC version (with the correct mccId) never gets a chance to win seenIds.
    //
    // Fix: collect all expansion results first, then process MCC sub-accounts
    // before adding any direct top-level accounts. This gives the MCC version
    // priority regardless of which API response arrived first.

    const clientQuery = `
      SELECT customer_client.id, customer_client.descriptive_name
      FROM customer_client
      WHERE customer_client.manager = false
    `

    type ExpansionResult = {
      topId: string
      subAccounts: Array<{ id: string; name: string }> | null
    }

    // Phase 1 — run all customer_client expansions in parallel (no mutation yet)
    const expansions: ExpansionResult[] = await Promise.all(
      topLevelIds.map(async (topId): Promise<ExpansionResult> => {
        try {
          const res = await fetch(`${ADS_API}/customers/${topId}/googleAds:search`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'developer-token': devToken,
              'login-customer-id': topId,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: clientQuery }),
          })
          if (!res.ok) return { topId, subAccounts: null }
          const body = await res.json()
          const rows: CustomerClientRow[] = body.results ?? []
          const subAccounts = rows
            .map(r => ({
              id:   String(r.customerClient?.id ?? ''),
              name: (r.customerClient?.descriptiveName as string | undefined) ?? '',
            }))
            .filter(a => a.id !== '')
          return { topId, subAccounts }
        } catch (err) {
          console.error('[google/accounts] error expanding account', topId, err)
          return { topId, subAccounts: null }
        }
      })
    )

    // Phase 2 — add MCC sub-accounts first so they win seenIds over direct listing
    const seenIds = new Set<string>()
    const result: AccountInfo[] = []

    for (const { topId, subAccounts } of expansions) {
      if (!subAccounts || subAccounts.length === 0) continue
      for (const acc of subAccounts) {
        if (!seenIds.has(acc.id)) {
          seenIds.add(acc.id)
          result.push({ id: acc.id, name: acc.name, mccId: topId })
        }
      }
    }

    // Phase 3 — add top-level accounts not already covered by an MCC expansion
    await Promise.all(
      expansions.map(async ({ topId, subAccounts }) => {
        if (seenIds.has(topId)) return
        // Include if: non-manager (subAccounts=null) or MCC with no leaf sub-accounts
        const name = await fetchAccountName(topId, accessToken, devToken)
        if (!seenIds.has(topId)) {
          seenIds.add(topId)
          result.push({ id: topId, name, mccId: null })
        }
      })
    )

    console.log('[google/accounts] final selectable accounts:', result.map(a => `${a.id}(mcc:${a.mccId})`))
    return NextResponse.json({ accounts: result })
  } catch (err) {
    console.error('[google/accounts] erro inesperado:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
