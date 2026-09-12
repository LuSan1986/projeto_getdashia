import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { decrypt } from '@/lib/crypto'

export const dynamic    = 'force-dynamic'
export const fetchCache = 'force-no-store'

const ADS_API      = 'https://googleads.googleapis.com/v24'
const TARGET_ACCT  = '2588417691'

// MCCs to probe — add any other manager account IDs here
const MCC_CANDIDATES = [
  { label: 'GetDashia MCC 453-482-8300',      id: '4534828300' },
  { label: 'MMC Teste Robo 603-201-0268',      id: '6032010268' },
  { label: 'Teste Google ADS 01-05 884-095-0709', id: '8840950709' },
]

async function probeQuery(
  accountId: string,
  accessToken: string,
  devToken: string,
  loginCustomerId: string | null,
): Promise<{ ok: boolean; status: number; snippet: string }> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    'developer-token': devToken,
    'Content-Type': 'application/json',
  }
  if (loginCustomerId) headers['login-customer-id'] = loginCustomerId

  try {
    const res = await fetch(`${ADS_API}/customers/${accountId}/googleAds:search`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query: 'SELECT customer.id FROM customer LIMIT 1' }),
    })
    const text = await res.text()
    return { ok: res.ok, status: res.status, snippet: text.substring(0, 400) }
  } catch (err) {
    return { ok: false, status: 0, snippet: String(err) }
  }
}

async function mccListsClient(
  mccId: string,
  clientId: string,
  accessToken: string,
  devToken: string,
): Promise<{ found: boolean; snippet: string }> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    'developer-token': devToken,
    'login-customer-id': mccId,
    'Content-Type': 'application/json',
  }
  try {
    const res = await fetch(`${ADS_API}/customers/${mccId}/googleAds:search`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: `SELECT customer_client.id, customer_client.descriptive_name
                FROM customer_client
                WHERE customer_client.id = ${clientId}`,
      }),
    })
    const text = await res.text()
    if (!res.ok) return { found: false, snippet: text.substring(0, 300) }
    const body = JSON.parse(text)
    return { found: (body.results ?? []).length > 0, snippet: text.substring(0, 300) }
  } catch (err) {
    return { found: false, snippet: String(err) }
  }
}

export async function GET(_request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: membership } = await supabase
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', user.id)
    .limit(1)
    .single()

  if (!membership) return NextResponse.json({ error: 'No organization' }, { status: 404 })

  // Use whichever google_ads row exists — we need the access token
  const { data: integration } = await supabase
    .from('integrations')
    .select('*')
    .eq('organization_id', membership.organization_id)
    .eq('platform', 'google_ads')
    .eq('status', 'active')
    .neq('account_id', 'pending')
    .limit(1)
    .single()

  if (!integration) return NextResponse.json({ error: 'No active google_ads integration' }, { status: 404 })

  let accessToken: string
  try {
    accessToken = decrypt(integration.access_token_encrypted as string)
  } catch {
    return NextResponse.json({ error: 'Token decrypt failed' }, { status: 500 })
  }

  const devToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN ?? ''

  // Test 1: direct access — no login-customer-id
  const directResult = await probeQuery(TARGET_ACCT, accessToken, devToken, null)

  // Test 2: access via each MCC candidate
  const mccProbes = await Promise.all(
    MCC_CANDIDATES.map(async (mcc) => {
      const [query, customerList] = await Promise.all([
        probeQuery(TARGET_ACCT, accessToken, devToken, mcc.id),
        mccListsClient(mcc.id, TARGET_ACCT, accessToken, devToken),
      ])
      return { ...mcc, queryOk: query.ok, queryStatus: query.status, querySnippet: query.snippet, listedByMcc: customerList.found, listSnippet: customerList.snippet }
    })
  )

  const winner = mccProbes.find(m => m.queryOk) ?? null

  return NextResponse.json({
    targetAccount: TARGET_ACCT,
    savedLoginCustomerId: (integration.login_customer_id as string | null) ?? null,
    directAccess: { ok: directResult.ok, status: directResult.status, snippet: directResult.snippet },
    mccProbes,
    conclusion: directResult.ok
      ? `DIRETO — sem login-customer-id funciona`
      : winner
        ? `MCC correto: ${winner.id} (${winner.label})`
        : `NENHUMA combinação funcionou — token pode estar expirado ou conta sem acesso`,
  })
}
