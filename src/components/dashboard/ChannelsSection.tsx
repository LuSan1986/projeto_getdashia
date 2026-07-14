'use client'

import { useState } from 'react'
import { SiGoogleads, SiFacebook, SiTiktok } from 'react-icons/si'
import type { ReactNode } from 'react'

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig-bg" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%"   stopColor="#f09433" />
          <stop offset="25%"  stopColor="#e6683c" />
          <stop offset="50%"  stopColor="#dc2743" />
          <stop offset="75%"  stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="5" fill="url(#ig-bg)" />
      <rect x="7" y="7" width="10" height="10" rx="3" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="2.5" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="white" />
    </svg>
  )
}

type ChannelId = 'google' | 'instagram' | 'facebook' | 'tiktok'

interface Channel {
  id: ChannelId
  name: string
  renderIcon: () => ReactNode
  metaChannel: boolean  // true = depende de Meta conectado
}

const channels: Channel[] = [
  { id: 'google',    name: 'Google Ads', renderIcon: () => <SiGoogleads color="#4285F4" size={20} />, metaChannel: false },
  { id: 'instagram', name: 'Instagram',  renderIcon: () => <InstagramIcon />,                          metaChannel: true  },
  { id: 'facebook',  name: 'Facebook',   renderIcon: () => <SiFacebook  color="#1877F2" size={20} />, metaChannel: true  },
  { id: 'tiktok',   name: 'TikTok',     renderIcon: () => <SiTiktok    color="#FF0050" size={20} />, metaChannel: false },
]

interface Props {
  metaConnected?: boolean
}

export default function ChannelsSection({ metaConnected = false }: Props) {
  const [selected, setSelected] = useState<ChannelId>('google')

  const activeChannel = channels.find(c => c.id === selected)!

  // Canal disponível para ver dados?
  const isAvailable = (ch: Channel) => {
    if (ch.id === 'google') return true
    if (ch.metaChannel) return false  // Meta conectado mas dados ainda não implementados
    return false
  }

  const available = isAvailable(activeChannel)

  // Mensagem customizada por canal
  function getMsg() {
    if (activeChannel.metaChannel && metaConnected) {
      return {
        title: `${activeChannel.name} — conectado`,
        sub: `Sua conta Meta está conectada. Os dados de ${activeChannel.name} estarão disponíveis em breve.`,
        badge: 'Conectado',
        badgeColor: 'text-green-400 bg-green-500/10 border-green-500/30',
      }
    }
    return {
      title: `${activeChannel.name} — integração em breve`,
      sub: `Em breve você poderá visualizar campanhas do ${activeChannel.name} aqui.`,
      badge: 'Em breve',
      badgeColor: 'text-zinc-400 bg-zinc-800 border-zinc-700',
    }
  }

  const msg = getMsg()

  return (
    <div className="mt-6">
      <p className="text-sm font-medium text-zinc-300 mb-3">Canais</p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3">
        {channels.map(({ id, name, renderIcon }) => (
          <button
            key={id}
            onClick={() => setSelected(id)}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition border text-sm font-medium
              ${selected === id
                ? 'bg-indigo-600/20 border-indigo-500 text-white'
                : 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:border-zinc-600 hover:bg-zinc-800'
              }`}
          >
            {renderIcon()}
            {name}
          </button>
        ))}
      </div>

      {/* Mensagem para canais sem dados */}
      {!available && (
        <div className="mt-4 rounded-xl bg-zinc-900 border border-zinc-800 px-5 py-6 text-center">
          <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border mb-3 ${msg.badgeColor}`}>
            {msg.badge}
          </span>
          <p className="text-zinc-300 text-sm font-medium mb-1">{msg.title}</p>
          <p className="text-zinc-500 text-xs">{msg.sub}</p>
        </div>
      )}
    </div>
  )
}
