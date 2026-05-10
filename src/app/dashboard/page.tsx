import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { LayoutDashboard, BarChart3, Plug, Settings, TrendingUp } from 'lucide-react'
import Charts from '@/components/dashboard/Charts'
import ChannelsSection from '@/components/dashboard/ChannelsSection'

const navItems = [
  { label: 'Visão Geral', icon: LayoutDashboard, active: true },
  { label: 'Relatórios', icon: BarChart3, active: false },
  { label: 'Integrações', icon: Plug, active: false },
  { label: 'Configurações', icon: Settings, active: false },
]

const metrics = [
  {
    label: 'Receita Total',
    value: 'R$ 48.320',
    desc: '+12% em relação ao mês anterior',
  },
  {
    label: 'Cliques',
    value: '128.450',
    desc: 'Total de cliques nos anúncios',
  },
  {
    label: 'Conversões',
    value: '3.210',
    desc: 'Conversões atribuídas no período',
  },
  {
    label: 'ROAS',
    value: '4,7×',
    desc: 'Retorno sobre investimento em anúncios',
  },
]

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: membership } = await supabase
    .from('organization_members')
    .select('organizations(name)')
    .eq('user_id', user.id)
    .limit(1)
    .single()

  const orgName = (membership?.organizations as unknown as { name: string } | null)?.name ?? null

  if (!orgName) redirect('/onboarding')

  async function logout() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6">
        <span className="text-indigo-400 font-bold text-lg tracking-tight">
          GetDashia
        </span>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-white text-sm font-medium">{orgName}</span>
            <span className="text-zinc-500 text-xs">{user.email}</span>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg transition"
            >
              Sair
            </button>
          </form>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed top-16 left-0 bottom-0 w-60 hidden lg:flex flex-col bg-zinc-900 border-r border-zinc-800 py-6 px-3 gap-1">
        {navItems.map(({ label, icon: Icon, active }) => (
          <div
            key={label}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm cursor-pointer transition
              ${active
                ? 'bg-indigo-600/20 text-indigo-400 font-medium'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
          >
            <Icon size={16} />
            {label}
          </div>
        ))}
      </aside>

      {/* Main content */}
      <main className="lg:ml-60 pt-16">
        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Visão Geral</h1>
            <p className="text-zinc-500 text-sm mt-1">
              Dados do período atual — valores de demonstração
            </p>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {metrics.map(({ label, value, desc }) => (
              <div
                key={label}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <p className="text-zinc-400 text-sm">{label}</p>
                  <TrendingUp size={14} className="text-indigo-400" />
                </div>
                <p className="text-3xl font-bold text-white">{value}</p>
                <p className="text-zinc-500 text-xs">{desc}</p>
              </div>
            ))}
          </div>

          <ChannelsSection />
          <Charts />
        </div>
      </main>

    </div>
  )
}
