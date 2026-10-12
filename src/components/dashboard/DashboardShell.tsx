'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'

interface Props {
  orgName: string
  userEmail: string
  logout: () => Promise<void>
  children: React.ReactNode
}

export default function DashboardShell({ orgName, userEmail, logout, children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#050B18] text-white">
      <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-[#070d1c] border-b border-cyan-900/20 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden text-zinc-400 hover:text-white transition"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={22} />
          </button>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
            GetDashia
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-white text-sm font-medium">{orgName}</span>
            <span className="text-zinc-500 text-xs">{userEmail}</span>
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

      <DashboardSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <main className="lg:ml-60 pt-16 min-w-0">
        {children}
      </main>
    </div>
  )
}
