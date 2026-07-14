'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SiGoogleads, SiMeta, SiGoogleanalytics, SiTiktok } from 'react-icons/si'
import type { IconType } from 'react-icons'

export interface PlatformIntegration {
  status: 'connected' | 'pending' | 'inactive' | null
  accountId: string | null
  connectedAt: string | null
}

interface Props {
  google: PlatformIntegration
  meta: PlatformIntegration
}

type ChannelStatus = 'connected' | 'pending' | 'inactive' | 'soon'

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

interface IntegrationCardProps {
  icon: IconType
  iconColor: string
  name: string
  description: string
  status: ChannelStatus
  accountId?: string | null
  accountLabel?: string
  connectedAt?: string | null
  connectHref: string
  disconnectApiRoute: string
}

function IntegrationCard({
  icon: Icon,
  iconColor,
  name,
  description,
  status,
  accountId,
  accountLabel = 'Account ID',
  connectedAt,
  connectHref,
  disconnectApiRoute,
}: IntegrationCardProps) {
  const [loading, setLoading] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [disconnectError, setDisconnectError] = useState<string | null>(null)
  const router = useRouter()

  const isActive = status === 'connected' || status === 'pending'

  async function handleDisconnect() {
    setLoading(true)
    setDisconnectError(null)
    try {
      const res = await fetch(disconnectApiRoute, { method: 'POST' })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setDisconnectError((body as { error?: string }).error ?? 'Erro ao desconectar')
        return
      }
      setConfirmOpen(false)
      router.refresh()
    } catch {
      setDisconnectError('Erro ao conectar ao servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
            <Icon color={isActive ? iconColor : '#71717a'} size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-100">{name}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Account info */}
      {isActive && accountId && accountId !== 'pending' && (
        <div className="flex flex-col gap-1 bg-zinc-800/50 rounded-xl px-4 py-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-zinc-500">{accountLabel}</span>
            <span className="text-xs font-mono text-zinc-300">{accountId}</span>
          </div>
          {connectedAt && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-500">Conectado em</span>
              <span className="text-xs text-zinc-400">{formatDate(connectedAt)}</span>
            </div>
          )}
        </div>
      )}

      {status === 'pending' && (
        <p className="text-xs text-amber-400 bg-amber-500/10 rounded-xl px-4 py-3">
          Conta conectada — aguardando configuração no painel principal.
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-2">
        {!isActive ? (
          <a
            href={connectHref}
            className="flex-1 text-center rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition"
          >
            Conectar
          </a>
        ) : confirmOpen ? (
          <div className="flex-1 flex flex-col gap-2">
            {disconnectError && (
              <p className="text-xs text-red-400 bg-red-500/10 rounded-xl px-3 py-2">
                {disconnectError}
              </p>
            )}
            <div className="flex gap-2">
              <button
                onClick={handleDisconnect}
                disabled={loading}
                className="flex-1 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 px-4 py-2 text-sm font-semibold text-white transition"
              >
                {loading ? 'Desconectando…' : 'Confirmar'}
              </button>
              <button
                onClick={() => { setConfirmOpen(false); setDisconnectError(null) }}
                className="flex-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-300 transition"
              >
                Cancelar
              </button>
            </div>
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

function ComingSoonCard({ icon: Icon, name, description }: {
  icon: IconType
  name: string
  description: string
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4 opacity-60">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
            <Icon color="#71717a" size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-100">{name}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
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

export default function IntegracoesClient({ google, meta }: Props) {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Integrações</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Conecte suas plataformas de anúncios para importar dados automaticamente
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 max-w-3xl">
        <IntegrationCard
          icon={SiGoogleads}
          iconColor="#4285F4"
          name="Google Ads"
          description="Importe campanhas, cliques e conversões do Google Ads"
          status={google.status ?? 'inactive'}
          accountId={google.accountId}
          accountLabel="Customer ID"
          connectedAt={google.connectedAt}
          connectHref="/api/integrations/google/connect"
          disconnectApiRoute="/api/integrations/google/disconnect"
        />

        <IntegrationCard
          icon={SiMeta}
          iconColor="#0082FB"
          name="Meta Ads"
          description="Facebook e Instagram Ads"
          status={meta.status ?? 'inactive'}
          accountId={meta.accountId}
          accountLabel="Ad Account ID"
          connectedAt={meta.connectedAt}
          connectHref="/api/integrations/meta/connect"
          disconnectApiRoute="/api/integrations/meta/disconnect"
        />

        <ComingSoonCard
          icon={SiGoogleanalytics}
          name="Google Analytics"
          description="Dados de tráfego orgânico e comportamento do usuário"
        />

        <ComingSoonCard
          icon={SiTiktok}
          name="TikTok Ads"
          description="Campanhas e métricas do TikTok for Business"
        />
      </div>
    </div>
  )
}
