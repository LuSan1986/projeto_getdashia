import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase-server'
import IntegracoesClient from '@/components/dashboard/IntegracoesClient'

export const metadata: Metadata = {
  title: 'Integrações | GetDashia',
}

export default async function IntegracoesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let googleStatus: 'active' | 'inactive' | null = null
  let googleAccountId: string | null = null
  let googleConnectedAt: string | null = null

  if (user) {
    const { data: membership } = await supabase
      .from('organization_members')
      .select('organization_id')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (membership) {
      const { data: integration } = await supabase
        .from('integrations')
        .select('status, account_id, created_at')
        .eq('organization_id', membership.organization_id)
        .eq('platform', 'google_ads')
        .limit(1)
        .single()

      if (integration) {
        googleStatus = integration.status as 'active' | 'inactive'
        googleAccountId = integration.account_id ?? null
        googleConnectedAt = integration.created_at ?? null
      }
    }
  }

  return (
    <IntegracoesClient
      google={{
        status: googleStatus,
        accountId: googleAccountId,
        connectedAt: googleConnectedAt,
      }}
    />
  )
}
