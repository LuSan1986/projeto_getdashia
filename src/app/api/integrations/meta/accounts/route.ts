import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { decrypt } from '@/lib/crypto'

const API_VERSION = 'v21.0'

interface MetaAdAccount {
  id: string
  name: string
  account_status: number
  business_name?: string
}

export async function GET() {
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
      .eq('platform', 'meta_ads')
      .eq('account_id', 'pending')
      .limit(1)
      .single()

    if (!integration) {
      return NextResponse.json({ error: 'Nenhuma integração pendente encontrada' }, { status: 404 })
    }

    let accessToken: string
    try {
      accessToken = decrypt(integration.access_token_encrypted)
    } catch {
      return NextResponse.json({ error: 'Erro ao decifrar token' }, { status: 500 })
    }

    const url = new URL(`https://graph.facebook.com/${API_VERSION}/me/adaccounts`)
    url.searchParams.set('access_token', accessToken)
    url.searchParams.set('fields', 'id,name,account_status,business_name')
    url.searchParams.set('limit', '25')

    const res = await fetch(url.toString())
    const json = await res.json()

    if (!res.ok || !json.data) {
      console.error('[meta/accounts] Graph API error:', json)
      return NextResponse.json({ error: 'Erro ao buscar contas Meta Ads' }, { status: 502 })
    }

    const accounts = (json.data as MetaAdAccount[]).map(a => ({
      id: a.id,
      name: a.name,
      accountStatus: a.account_status,
      businessName: a.business_name ?? null,
    }))

    return NextResponse.json({ accounts })
  } catch (err) {
    console.error('[meta/accounts] erro inesperado:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
