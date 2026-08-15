'use client'

import { useState } from 'react'
import { SiGoogleads, SiFacebook, SiTiktok } from 'react-icons/si'
import type { ReactNode } from 'react'
import DashboardMetricsCards, { type DataSource } from './DashboardMetricsCards'
import Charts from './Charts'

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
  googleConnected: boolean
  metaConnected: boolean
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function DashboardClient({ googleConnected, metaConnected }: Props) {
  const [selected, setSelected] = useState<ChannelId>('google')

  const isMetaChannel = selected === 'instagram' || selected === 'facebook'

  const dataSource: DataSource =
    selected === 'google' ? (googleConnected ? 'google' : 'none') :
    isMetaChannel         ? (metaConnected   ? 'meta'   : 'none') :
    'none' // tiktok

  // Status message shown under the tabs (null = no message needed)
  function getStatusInfo(): { text: string; badge: string; badgeClass: string } | null {
    if (selected === 'google' && googleConnected)   return null
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
    // tiktok
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

        {statusInfo && (
          <div className="mt-4 rounded-xl bg-zinc-900 border border-zinc-800 px-5 py-4 flex flex-col items-center gap-2">
            <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border ${statusInfo.badgeClass}`}>
              {statusInfo.badge}
            </span>
            <p className="text-zinc-400 text-sm text-center">{statusInfo.text}</p>
          </div>
        )}
      </div>

      {/* Metric cards — react to selected channel */}
      <DashboardMetricsCards source={dataSource} />

      {/* Charts — react to selected channel */}
      <Charts source={dataSource} />
    </>
  )
}
