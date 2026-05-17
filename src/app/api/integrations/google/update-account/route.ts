import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const { customerId } = await req.json() as { customerId: string }

    if (!customerId || typeof customerId !== 'string') {
      return NextResponse.json({ error: 'customerId inválido' }, { status: 400 })
    }

    const cleanId = customerId.replace(/-/g, '')

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

    const { error: updateError } = await supabase
      .from('integrations')
      .update({ account_id: cleanId })
      .eq('organization_id', membership.organization_id)
      .eq('platform', 'google_ads')

    if (updateError) {
      return NextResponse.json({ error: 'Erro ao atualizar' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
