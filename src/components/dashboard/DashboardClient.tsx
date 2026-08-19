'use client'

import { useState } from 'react'
import { SiGoogleads, SiFacebook, SiTiktok } from 'react-icons/si'
import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'
import DashboardMetricsCards, { type DataSource } from './DashboardMetricsCards'
import Charts from './Charts'
import type { AccountInfo } from '@/app/dashboard/page'

// ── Channel definitions ───────────────────────────────────────────────────────

type ChannelId = 'google' | 'instagram' | 'facebook' | 'tiktok'

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%"   stopColor="#f09433" />
          <stop offset="25%"  stopColor="#e6683c" />
          <stop offset="50%"  stopColor="#dc2743" />
          <stop offset="75%"  stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="5" fill="url(#ig-grad)" />
      <rect x="7" y="7" width="10" height="10" rx="3" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="2.5" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="white" />
    </svg>
  )
}

const CHANNELS: { id: ChannelId; name: string; renderIcon: () => ReactNode }[] = [
  { id: 'google',    name: 'Google Ads', renderIcon: () => <SiGoogleads color="#4285F4" size={20} /> },
  { id: 'instagram', name: 'Instagram',  renderIcon: () => <InstagramIcon /> },
  { id: 'facebook',  name: 'Facebook',   renderIcon: () => <SiFacebook  color="#1877F2" size={20} /> },
  { id: 'tiktok',   name: 'TikTok',     renderIcon: () => <SiTiktok    color="#FF0050" size={20} /> },
]

// ── Props ─────────────────────────────────────────────────────────────────────

interface Props {
  googleAccounts: AccountInfo[]
  metaAccounts:   AccountInfo[]
}

// ── Account selector dropdown ─────────────────────────────────────────────────

function AccountSelector({
  accounts,
  selectedId,
  onSelect,
}: {
  accounts: AccountInfo[]
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const [open, setOpen] = useState(false)
  const selected = accounts.find(a => a.account_id === selectedId) ?? accounts[0]

  if (!selected) return null

  const label = selected.account_name ?? selected.account_id

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 hover:border-zinc-500 transition"
      >
        <span className="max-w-[220px] truncate">{label}</span>
        <ChevronDown size={14} className={`text-zinc-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-20 min-w-[260px] rounded-xl border border-zinc-700 bg-zinc-900 shadow-xl overflow-hidden">
          {accounts.map(a => (
            <button
              key={a.id}
              onClick={() => { onSelect(a.account_id); setOpen(false) }}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-sm text-left hover:bg-zinc-800 transition
                ${a.account_id === selectedId ? 'bg-zinc-800' : ''}`}
            >
              <span className="truncate text-zinc-100">{a.account_name ?? a.account_id}</span>
              {a.is_default && (
                <span className="shrink-0 text-[10px] font-semibold bg-cyan-500/15 text-cyan-400 px-1.5 py-0.5 rounded-full">
                  padrão
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function DashboardClient({ googleAccounts, metaAccounts }: Props) {
  const [selected, setSelected] = useState<ChannelId>('google')

  const defaultGoogleId = (googleAccounts.find(a => a.is_default) ?? googleAccounts[0])?.account_id ?? null
  const defaultMetaId   = (metaAccounts.find(a => a.is_default)   ?? metaAccounts[0])?.account_id   ?? null

  const [selectedGoogleId, setSelectedGoogleId] = useState<string | null>(defaultGoogleId)
  const [selectedMetaId,   setSelectedMetaId]   = useState<string | null>(defaultMetaId)

  const googleConnected = googleAccounts.length > 0
  const metaConnected   = metaAccounts.length   > 0
  const isMetaChannel   = selected === 'instagram' || selected === 'facebook'

  const dataSource: DataSource =
    selected === 'google' ? (googleConnected ? 'google' : 'none') :
    isMetaChannel         ? (metaConnected   ? 'meta'   : 'none') :
    'none'

  const currentAccountId =
    selected === 'google' ? selectedGoogleId :
    isMetaChannel         ? selectedMetaId   :
    null

  const showGoogleSelector = selected === 'google'   && googleAccounts.length > 1
  const showMetaSelector   = isMetaChannel           && metaAccounts.length   > 1

  function getStatusInfo(): { text: string; badge: string; badgeClass: string } | null {
    if (selected === 'google' && googleConnected) return null
    if (selected === 'google' && !googleConnected) {
      return {
        text:       'Google Ads não conectado. Conecte sua conta em Integrações.',
        badge:      'Não conectado',
        badgeClass: 'text-zinc-400 bg-zinc-800 border-zinc-700',
      }
    }
    if (isMetaChannel && metaConnected) {
      return {
        text:       'Os dados abaixo representam toda a conta Meta Ads — Facebook e Instagram combinados, sem separação por placement.',
        badge:      'Dados do Meta Ads',
        badgeClass: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      }
    }
    if (isMetaChannel && !metaConnected) {
      return {
        text:       'Meta Ads não conectado. Conecte sua conta em Integrações.',
        badge:      'Não conectado',
        badgeClass: 'text-zinc-400 bg-zinc-800 border-zinc-700',
      }
    }
    return {
      text:       'TikTok Ads — integração em breve.',
      badge:      'Em breve',
      badgeClass: 'text-zinc-400 bg-zinc-800 border-zinc-700',
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <>
      {/* Channel tabs */}
      <div className="mb-6">
        <p className="text-sm font-medium text-zinc-300 mb-3">Canais</p>
        <div className="flex flex-wrap gap-3">
          {CHANNELS.map(({ id, name, renderIcon }) => (
            <button
              key={id}
              onClick={() => setSelected(id)}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition border text-sm font-medium
                ${selected === id
                  ? 'bg-cyan-500/10 border-cyan-500/50 text-white'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:border-zinc-600 hover:bg-zinc-800'
                }`}
            >
              {renderIcon()}
              {name}
            </button>
          ))}
        </div>

        {/* Account selector — only when 2+ accounts for the selected platform */}
        {(showGoogleSelector || showMetaSelector) && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-zinc-500">Conta:</span>
            {showGoogleSelector && (
              <AccountSelector
                accounts={googleAccounts}
                selectedId={selectedGoogleId}
                onSelect={setSelectedGoogleId}
              />
            )}
            {showMetaSelector && (
              <AccountSelector
                accounts={metaAccounts}
                selectedId={selectedMetaId}
                onSelect={setSelectedMetaId}
              />
            )}
          </div>
        )}

        {statusInfo && (
          <div className="mt-4 rounded-xl bg-zinc-900 border border-zinc-800 px-5 py-4 flex flex-col items-center gap-2">
            <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border ${statusInfo.badgeClass}`}>
              {statusInfo.badge}
            </span>
            <p className="text-zinc-400 text-sm text-center">{statusInfo.text}</p>
          </div>
        )}
      </div>

      {/* Metric cards — react to selected channel + account */}
      <DashboardMetricsCards source={dataSource} accountId={currentAccountId} />

      {/* Charts — react to selected channel + account */}
      <Charts source={dataSource} accountId={currentAccountId} />
    </>
  )
}
