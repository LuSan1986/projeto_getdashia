import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json() as { name: string }

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Nome inválido' }, { status: 400 })
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

    const { error: updateError } = await supabase
      .from('organizations')
      .update({ name })
      .eq('id', membership.organization_id)

    if (updateError) {
      return NextResponse.json({ error: 'Erro ao atualizar organização' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
