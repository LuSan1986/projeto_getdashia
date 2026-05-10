import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
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

      <DashboardSidebar />

      <main className="lg:ml-60 pt-16">
        {children}
      </main>

    </div>
  )
}
