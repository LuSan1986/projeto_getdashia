'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SiGoogleads, SiMeta, SiGoogleanalytics, SiTiktok } from 'react-icons/si'
import type { IconType } from 'react-icons'

interface GoogleIntegration {
  status: 'connected' | 'pending' | 'inactive' | null
  accountId: string | null
  connectedAt: string | null
}

interface Props {
  google: GoogleIntegration
}

type ChannelStatus = 'connected' | 'pending' | 'inactive' | 'soon'

interface Channel {
  key: string
  name: string
  description: string
  icon: IconType
  color: string
  status: ChannelStatus
  accountId?: string | null
  connectedAt?: string | null
}

function StatusBadge({ status }: { status: ChannelStatus }) {
  if (status === 'connected') {
    return (
      <span className="text-xs font-semibold bg-green-500/15 text-green-400 px-2.5 py-1 rounded-full">
        Conectado
      </span>
    )
  }
  if (status === 'pending') {
    return (
      <span className="text-xs font-semibold bg-amber-500/15 text-amber-400 px-2.5 py-1 rounded-full">
        Pendente
      </span>
    )
  }
  if (status === 'inactive') {
    return (
      <span className="text-xs font-semibold bg-zinc-700 text-zinc-400 px-2.5 py-1 rounded-full">
        Desconectado
      </span>
    )
  }
  return (
    <span className="text-xs font-semibold bg-zinc-800 text-zinc-500 px-2.5 py-1 rounded-full">
      Em breve
    </span>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function GoogleAdsCard({ channel, onDisconnect }: {
  channel: Channel
  onDisconnect: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const router = useRouter()

  async function handleDisconnect() {
    setLoading(true)
    try {
      await fetch('/api/integrations/google/disconnect', { method: 'POST' })
      router.refresh()
    } catch {
      // silently fail — page will still refresh
    } finally {
      setLoading(false)
      setConfirmOpen(false)
    }
  }

  const isActive = channel.status === 'connected' || channel.status === 'pending'

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
            <channel.icon color={isActive ? channel.color : '#71717a'} size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-100">{channel.name}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{channel.description}</p>
          </div>
        </div>
        <StatusBadge status={channel.status} />
      </div>

      {/* Info */}
      {isActive && channel.accountId && channel.accountId !== 'pending' && (
        <div className="flex flex-col gap-1 bg-zinc-800/50 rounded-xl px-4 py-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-zinc-500">Customer ID</span>
            <span className="text-xs font-mono text-zinc-300">{channel.accountId}</span>
          </div>
          {channel.connectedAt && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-500">Conectado em</span>
              <span className="text-xs text-zinc-400">{formatDate(channel.connectedAt)}</span>
            </div>
          )}
        </div>
      )}

      {channel.status === 'pending' && (
        <p className="text-xs text-amber-400 bg-amber-500/10 rounded-xl px-4 py-3">
          Conta conectada — informe o Customer ID no painel principal para ativar.
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-2">
        {!isActive ? (
          <a
            href="/api/integrations/google/connect"
            className="flex-1 text-center rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition"
          >
            Conectar
          </a>
        ) : confirmOpen ? (
          <div className="flex-1 flex gap-2">
            <button
              onClick={handleDisconnect}
              disabled={loading}
              className="flex-1 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 px-4 py-2 text-sm font-semibold text-white transition"
            >
              {loading ? 'Desconectando…' : 'Confirmar'}
            </button>
            <button
              onClick={() => setConfirmOpen(false)}
              className="flex-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-300 transition"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmOpen(true)}
            className="flex-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-300 transition"
          >
            Desconectar
          </button>
        )}
      </div>
    </div>
  )
}

function ComingSoonCard({ channel }: { channel: Channel }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4 opacity-60">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
            <channel.icon color="#71717a" size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-100">{channel.name}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{channel.description}</p>
          </div>
        </div>
        <StatusBadge status="soon" />
      </div>
      <div className="mt-auto pt-2">
        <button
          disabled
          className="w-full rounded-xl bg-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-500 cursor-not-allowed"
        >
          Em breve
        </button>
      </div>
    </div>
  )
}

export default function IntegracoesClient({ google }: Props) {
  const googleStatus: ChannelStatus =
    google.status === 'active' || (google.status === null && google.accountId && google.accountId !== 'pending')
      ? 'connected'
      : google.status === null && google.accountId === 'pending'
      ? 'pending'
      : google.accountId === 'pending'
      ? 'pending'
      : google.status === 'inactive'
      ? 'inactive'
      : google.status === null
      ? 'inactive'
      : 'connected'

  const channels: Channel[] = [
    {
      key: 'google_ads',
      name: 'Google Ads',
      description: 'Importe campanhas, cliques e conversões do Google Ads',
      icon: SiGoogleads,
      color: '#4285F4',
      status: googleStatus,
      accountId: google.accountId,
      connectedAt: google.connectedAt,
    },
    {
      key: 'meta_ads',
      name: 'Meta Ads',
      description: 'Facebook e Instagram Ads — em desenvolvimento',
      icon: SiMeta,
      color: '#0082FB',
      status: 'soon',
    },
    {
      key: 'google_analytics',
      name: 'Google Analytics',
      description: 'Dados de tráfego orgânico e comportamento do usuário',
      icon: SiGoogleanalytics,
      color: '#E37400',
      status: 'soon',
    },
    {
      key: 'tiktok_ads',
      name: 'TikTok Ads',
      description: 'Campanhas e métricas do TikTok for Business',
      icon: SiTiktok,
      color: '#FF0050',
      status: 'soon',
    },
  ]

  const googleChannel = channels[0]

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Integrações</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Conecte suas plataformas de anúncios para importar dados automaticamente
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 max-w-3xl">
        <GoogleAdsCard channel={googleChannel} onDisconnect={() => {}} />
        {channels.slice(1).map((ch) => (
          <ComingSoonCard key={ch.key} channel={ch} />
        ))}
      </div>
    </div>
  )
}
