import type { Metadata } from 'next'
import RelatoriosClient from '@/components/dashboard/RelatoriosClient'

export const metadata: Metadata = {
  title: 'Relatórios | GetDashia',
  description: 'Análise detalhada das suas campanhas de Google Ads e Meta Ads.',
}

export default function RelatoriosPage() {
  return <RelatoriosClient />
}
