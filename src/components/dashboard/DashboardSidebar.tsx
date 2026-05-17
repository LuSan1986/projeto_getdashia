'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BarChart3, Plug, Settings } from 'lucide-react'

const navItems = [
  { label: 'Visão Geral',    icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Relatórios',     icon: BarChart3,        href: '/dashboard/relatorios' },
  { label: 'Integrações',    icon: Plug,             href: '#' },
  { label: 'Configurações',  icon: Settings,         href: '/dashboard/configuracoes' },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed top-16 left-0 bottom-0 w-60 hidden lg:flex flex-col bg-zinc-900 border-r border-zinc-800 py-6 px-3 gap-1">
      {navItems.map(({ label, icon: Icon, href }) => {
        const active =
          href === '/dashboard'
            ? pathname === href
            : pathname.startsWith(href)
        return (
          <Link
            key={label}
            href={href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition
              ${active
                ? 'bg-indigo-600/20 text-indigo-400 font-medium'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        )
      })}
    </aside>
  )
}
