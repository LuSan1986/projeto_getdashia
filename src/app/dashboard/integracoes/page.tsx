import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase-server'
import IntegracoesClient, { type PlatformState } from '@/components/dashboard/IntegracoesClient'

export const metadata: Metadata = {
  title: 'Integrações | GetDashia',
}

async function fetchPlatformState(
  supabase: Awaited<ReturnType<typeof createClient>>,
  organizationId: string,
  platform: string
): Promise<PlatformState> {
  const { data: rows } = await supabase
    .from('integrations')
    .select('id, account_id, account_name, is_default, status, created_at')
    .eq('organization_id', organizationId)
    .eq('platform', platform)
    .eq('status', 'active')
    .order('created_at', { ascending: true })

  if (!rows || rows.length === 0) {
    return { accounts: [], hasPending: false }
  }

  const connected = rows
    .filter(r => r.account_id !== 'pending')
    .map(r => ({
      id: r.id as string,
      accountId: r.account_id as string,
      accountName: (r.account_name as string | null) ?? null,
      isDefault: (r.is_default as boolean) ?? false,
      connectedAt: r.created_at as string,
    }))

  const hasPending = rows.some(r => r.account_id === 'pending')

  return { accounts: connected, hasPending }
}

export default async function IntegracoesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const empty: PlatformState = { accounts: [], hasPending: false }

  if (!user) {
    return <IntegracoesClient google={empty} meta={empty} />
  }

  const { data: membership } = await supabase
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', user.id)
    .limit(1)
    .single()

  if (!membership) {
    return <IntegracoesClient google={empty} meta={empty} />
  }

  const [google, meta] = await Promise.all([
    fetchPlatformState(supabase, membership.organization_id, 'google_ads'),
    fetchPlatformState(supabase, membership.organization_id, 'meta_ads'),
  ])

  return <IntegracoesClient google={google} meta={meta} />
}
