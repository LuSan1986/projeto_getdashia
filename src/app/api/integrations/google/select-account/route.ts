import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { sendAdminAlert } from '@/lib/emails/admin-alert'

export async function POST(req: NextRequest) {
  try {
    const { customerId, mccId, accountName } = await req.json() as {
      customerId: string
      mccId?: string | null
      accountName?: string | null
    }

    if (!customerId || typeof customerId !== 'string') {
      return NextResponse.json({ error: 'customerId inválido' }, { status: 400 })
    }

    const cleanId = customerId.replace(/-/g, '')
    const loginCustomerId = mccId ? mccId.replace(/-/g, '') : null

    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const { data: membership, error: memberError } = await supabase
      .from('organization_members')
      .select('organization_id')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (memberError || !membership) {
      return NextResponse.json({ error: 'Organização não encontrada' }, { status: 404 })
    }

    const orgId = membership.organization_id

    const { data: pendingIntegration } = await supabase
      .from('integrations')
      .select('id')
      .eq('organization_id', orgId)
      .eq('platform', 'google_ads')
      .eq('account_id', 'pending')
      .limit(1)
      .single()

    if (!pendingIntegration) {
      return NextResponse.json({ error: 'Nenhuma integração pendente encontrada' }, { status: 404 })
    }

    // Check if this is the first real account (pending row excluded)
    const { count: existingCount } = await supabase
      .from('integrations')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', orgId)
      .eq('platform', 'google_ads')
      .eq('status', 'active')
      .neq('account_id', 'pending')

    const isDefault = (existingCount ?? 0) === 0

    const { error: updateError } = await supabase
      .from('integrations')
      .update({
        account_id: cleanId,
        account_name: accountName ?? null,
        status: 'active',
        is_default: isDefault,
        login_customer_id: loginCustomerId,
      })
      .eq('id', pendingIntegration.id)

    if (updateError) {
      console.error('[google/select-account] update error:', updateError)
      return NextResponse.json({ error: 'Erro ao salvar conta selecionada' }, { status: 500 })
    }

    sendAdminAlert(
      'Nova integração conectada',
      [`E-mail: ${user.email}`, `Plataforma: Google Ads`, `Conta: ${accountName ?? cleanId}`],
      user.email
    ).catch(console.error)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
