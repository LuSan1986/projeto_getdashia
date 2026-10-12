import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const { integrationId, value } = await req.json() as {
      integrationId: string
      value: number | null
    }

    if (!integrationId || typeof integrationId !== 'string') {
      return NextResponse.json({ error: 'integrationId inválido' }, { status: 400 })
    }
    if (value !== null && (typeof value !== 'number' || value < 0)) {
      return NextResponse.json({ error: 'Valor deve ser >= 0 ou nulo' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
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

    const { error: updateError } = await supabase
      .from('integrations')
      .update({ conversion_value: value })
      .eq('id', integrationId)
      .eq('organization_id', membership.organization_id)

    if (updateError) {
      return NextResponse.json({ error: 'Erro ao salvar' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
