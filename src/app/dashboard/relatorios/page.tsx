import type { Metadata } from 'next'
import RelatoriosClient from '@/components/dashboard/RelatoriosClient'
import { createClient } from '@/lib/supabase-server'
import type { AccountInfo } from '@/app/dashboard/page'

export const metadata: Metadata = {
  title: 'Relatórios | GetDashia',
  description: 'Análise detalhada das suas campanhas de Google Ads e Meta Ads.',
}

export default async function RelatoriosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let googleAccounts: AccountInfo[] = []
  let metaAccounts:   AccountInfo[] = []

  if (user) {
    const { data: membership } = await supabase
      .from('organization_members')
      .select('organization_id')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (membership) {
      const orgId = membership.organization_id
      const [{ data: googleRows }, { data: metaRows }] = await Promise.all([
        supabase
          .from('integrations')
          .select('id, account_id, account_name, is_default')
          .eq('organization_id', orgId)
          .eq('platform', 'google_ads')
          .eq('status', 'active')
          .neq('account_id', 'pending')
          .order('is_default', { ascending: false }),
        supabase
          .from('integrations')
          .select('id, account_id, account_name, is_default')
          .eq('organization_id', orgId)
          .eq('platform', 'meta_ads')
          .eq('status', 'active')
          .neq('account_id', 'pending')
          .order('is_default', { ascending: false }),
      ])
      googleAccounts = (googleRows ?? []) as AccountInfo[]
      metaAccounts   = (metaRows   ?? []) as AccountInfo[]
    }
  }

  return <RelatoriosClient googleAccounts={googleAccounts} metaAccounts={metaAccounts} />
}
