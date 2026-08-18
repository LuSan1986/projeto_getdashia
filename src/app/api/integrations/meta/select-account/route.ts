import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const { accountId } = await req.json() as { accountId: string }

    if (!accountId || typeof accountId !== 'string') {
      return NextResponse.json({ error: 'accountId inválido' }, { status: 400 })
    }

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

    const { data: pendingIntegration } = await supabase
      .from('integrations')
      .select('id')
      .eq('organization_id', membership.organization_id)
      .eq('platform', 'meta_ads')
      .eq('account_id', 'pending')
      .limit(1)
      .single()

    if (!pendingIntegration) {
      return NextResponse.json({ error: 'Nenhuma integração pendente encontrada' }, { status: 404 })
    }

    // Remove other non-pending meta_ads rows to avoid unique constraint conflict
    await supabase
      .from('integrations')
      .delete()
      .eq('organization_id', membership.organization_id)
      .eq('platform', 'meta_ads')
      .neq('account_id', 'pending')

    const { error: updateError } = await supabase
      .from('integrations')
      .update({ account_id: accountId, status: 'active' })
      .eq('id', pendingIntegration.id)

    if (updateError) {
      console.error('[meta/select-account] update error:', updateError)
      return NextResponse.json({ error: 'Erro ao salvar conta selecionada' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
