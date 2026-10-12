import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase-server'
import ConfiguracoesClient from '@/components/dashboard/ConfiguracoesClient'

export const metadata: Metadata = {
  title: 'Configurações | GetDashia',
}

export default async function ConfiguracoesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let fullName = ''
  let email    = user?.email ?? ''
  let orgName  = ''

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .limit(1)
      .single()

    if (profile) fullName = profile.full_name ?? ''

    const { data: membership } = await supabase
      .from('organization_members')
      .select('organizations(name)')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (membership) {
      const raw = membership.organizations as unknown
      const org = Array.isArray(raw) ? (raw[0] as { name: string } | undefined) : (raw as { name: string } | null)
      orgName = org?.name ?? ''
    }
  }

  return (
    <ConfiguracoesClient
      fullName={fullName}
      email={email}
      orgName={orgName}
    />
  )
}
