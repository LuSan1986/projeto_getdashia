'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BarChart3, Plug, Settings, X } from 'lucide-react'

const navItems = [
  { label: 'Visão Geral',   icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Relatórios',    icon: BarChart3,        href: '/dashboard/relatorios' },
  { label: 'Integrações',   icon: Plug,             href: '/dashboard/integracoes' },
  { label: 'Configurações', icon: Settings,         href: '/dashboard/configuracoes' },
]

function NavLinks({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname()
  return (
    <>
      {navItems.map(({ label, icon: Icon, href }) => {
        const active =
          href === '/dashboard'
            ? pathname === href
            : pathname.startsWith(href)
        return (
          <Link
            key={label}
            href={href}
            onClick={onItemClick}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition
              ${active
                ? 'bg-cyan-500/10 text-cyan-400 font-medium'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        )
      })}
    </>
  )
}

export default function DashboardSidebar({
  mobileOpen = false,
  onClose,
}: {
  mobileOpen?: boolean
  onClose?: () => void
}) {
  return (
    <>
      {/* Desktop sidebar — always visible on lg+ */}
      <aside className="fixed top-16 left-0 bottom-0 w-60 hidden lg:flex flex-col bg-[#070d1c] border-r border-cyan-900/20 py-6 px-3 gap-1">
        <NavLinks />
      </aside>

      {/* Mobile backdrop */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/60 lg:hidden transition-opacity duration-300
          ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Mobile drawer */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 z-50 flex flex-col bg-[#070d1c] border-r border-cyan-900/20 lg:hidden
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-cyan-900/20 shrink-0">
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
            GetDashia
          </span>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition p-1 rounded-lg hover:bg-zinc-800"
            aria-label="Fechar menu"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex flex-col gap-1 py-6 px-3 flex-1">
          <NavLinks onItemClick={onClose} />
        </nav>
      </aside>
    </>
  )
}
