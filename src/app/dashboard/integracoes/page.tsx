import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase-server'
import IntegracoesClient, { type PlatformIntegration } from '@/components/dashboard/IntegracoesClient'

export const metadata: Metadata = {
  title: 'Integrações | GetDashia',
}

async function fetchIntegration(
  supabase: Awaited<ReturnType<typeof createClient>>,
  organizationId: string,
  platform: string
): Promise<PlatformIntegration> {
  const { data } = await supabase
    .from('integrations')
    .select('status, account_id, created_at')
    .eq('organization_id', organizationId)
    .eq('platform', platform)
    .limit(1)
    .single()

  if (!data) return { status: null, accountId: null, connectedAt: null }

  const rawStatus = data.status as string
  const accountId = data.account_id ?? null

  let status: PlatformIntegration['status']
  if (rawStatus === 'inactive') {
    status = 'inactive'
  } else if (accountId === 'pending') {
    status = 'pending'
  } else {
    status = 'connected'
  }

  return { status, accountId, connectedAt: data.created_at ?? null }
}

export default async function IntegracoesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const empty: PlatformIntegration = { status: null, accountId: null, connectedAt: null }

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
    fetchIntegration(supabase, membership.organization_id, 'google_ads'),
    fetchIntegration(supabase, membership.organization_id, 'meta_ads'),
  ])

  return <IntegracoesClient google={google} meta={meta} />
}
