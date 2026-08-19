import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const integrationId = (body as { integrationId?: string }).integrationId

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
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

    const orgId = membership.organization_id

    if (integrationId) {
      // Delete specific account
      const { data: target } = await supabase
        .from('integrations')
        .select('is_default')
        .eq('id', integrationId)
        .eq('organization_id', orgId)
        .eq('platform', 'google_ads')
        .single()

      const { error } = await supabase
        .from('integrations')
        .delete()
        .eq('id', integrationId)
        .eq('organization_id', orgId)

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      // If the deleted account was default, promote the oldest remaining account
      if (target?.is_default) {
        const { data: next } = await supabase
          .from('integrations')
          .select('id')
          .eq('organization_id', orgId)
          .eq('platform', 'google_ads')
          .eq('status', 'active')
          .neq('account_id', 'pending')
          .order('created_at', { ascending: true })
          .limit(1)
          .single()

        if (next) {
          await supabase.from('integrations').update({ is_default: true }).eq('id', next.id)
        }
      }
    } else {
      // Legacy: disconnect all (no integrationId provided)
      const { error } = await supabase
        .from('integrations')
        .delete()
        .eq('organization_id', orgId)
        .eq('platform', 'google_ads')

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
    }

    revalidatePath('/dashboard/integracoes')
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Disconnect error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
