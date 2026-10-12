'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SiGoogleads, SiMeta, SiGoogleanalytics, SiTiktok } from 'react-icons/si'
import type { IconType } from 'react-icons'

export interface ConnectedAccount {
  id: string
  accountId: string
  accountName: string | null
  isDefault: boolean
  connectedAt: string
  conversionValue: number | null
}

export interface PlatformState {
  accounts: ConnectedAccount[]
  hasPending: boolean
}

interface Props {
  google: PlatformState
  meta: PlatformState
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
  return new Date(iso).toLocaleDateString('pt-BR')
}

function AccountRow({
  account,
  disconnectApiRoute,
}: {
  account: ConnectedAccount
  disconnectApiRoute: string
}) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [disconnecting, setDisconnecting] = useState(false)
  const [disconnectError, setDisconnectError] = useState<string | null>(null)

  const [cvInput, setCvInput] = useState(
    account.conversionValue != null ? String(account.conversionValue) : ''
  )
  const [cvSaving, setCvSaving] = useState(false)
  const [cvError, setCvError] = useState<string | null>(null)
  const [cvSaved, setCvSaved] = useState(false)

  const router = useRouter()

  async function handleDisconnect() {
    setDisconnecting(true)
    setDisconnectError(null)
    try {
      const res = await fetch(disconnectApiRoute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ integrationId: account.id }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setDisconnectError((body as { error?: string }).error ?? 'Erro ao desconectar')
        return
      }
      setConfirmOpen(false)
      router.refresh()
    } catch {
      setDisconnectError('Erro de conexão')
    } finally {
      setDisconnecting(false)
    }
  }

  async function handleSaveConversionValue() {
    const trimmed = cvInput.trim()
    const parsed = trimmed === '' ? null : parseFloat(trimmed.replace(',', '.'))
    if (parsed !== null && (isNaN(parsed) || parsed < 0)) {
      setCvError('Valor inválido. Use um número >= 0.')
      return
    }
    setCvSaving(true)
    setCvError(null)
    setCvSaved(false)
    try {
      const res = await fetch('/api/integrations/update-conversion-value', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ integrationId: account.id, value: parsed }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setCvError((body as { error?: string }).error ?? 'Erro ao salvar')
        return
      }
      setCvSaved(true)
      setTimeout(() => setCvSaved(false), 2500)
    } catch {
      setCvError('Erro de conexão')
    } finally {
      setCvSaving(false)
    }
  }

  const label = account.accountName ?? account.accountId

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3 bg-zinc-800/50 rounded-xl px-4 py-3">
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-100 truncate">{label}</span>
            {account.isDefault && (
              <span className="shrink-0 text-[10px] font-semibold bg-cyan-500/15 text-cyan-400 px-1.5 py-0.5 rounded-full border border-cyan-500/30">
                padrão
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-500 truncate">{account.accountId}</span>
            <span className="text-xs text-zinc-600">·</span>
            <span className="text-xs text-zinc-500 shrink-0">desde {formatDate(account.connectedAt)}</span>
          </div>
        </div>
        {!confirmOpen && (
          <button
            onClick={() => setConfirmOpen(true)}
            className="shrink-0 text-xs text-zinc-400 hover:text-red-400 transition px-3 py-1.5 rounded-lg hover:bg-red-500/10"
          >
            Desconectar
          </button>
        )}
      </div>

      {/* Conversion value field */}
      <div className="bg-zinc-800/30 rounded-xl px-4 py-3 flex flex-col gap-2">
        <label className="text-xs font-medium text-zinc-300">Valor por conversão (R$)</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            inputMode="decimal"
            value={cvInput}
            onChange={e => { setCvInput(e.target.value); setCvError(null); setCvSaved(false) }}
            placeholder="Ex.: 50,00"
            className="flex-1 min-w-0 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/60 transition"
          />
          <button
            onClick={handleSaveConversionValue}
            disabled={cvSaving}
            className="shrink-0 text-xs font-semibold bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500/25 border border-cyan-500/30 disabled:opacity-50 px-3 py-1.5 rounded-lg transition"
          >
            {cvSaving ? 'Salvando…' : cvSaved ? 'Salvo ✓' : 'Salvar'}
          </button>
        </div>
        {cvError && <p className="text-xs text-red-400">{cvError}</p>}
        <p className="text-[11px] text-zinc-600 leading-relaxed">
          Usado para estimar Receita e ROAS quando a plataforma não informa o valor das conversões.
        </p>
      </div>

      {confirmOpen && (
        <div className="flex flex-col gap-2 px-1">
          {disconnectError && (
            <p className="text-xs text-red-400 bg-red-500/10 rounded-xl px-3 py-2">{disconnectError}</p>
          )}
          <div className="flex gap-2">
            <button
              onClick={handleDisconnect}
              disabled={disconnecting}
              className="flex-1 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 px-4 py-2 text-sm font-semibold text-white transition"
            >
              {disconnecting ? 'Desconectando…' : 'Confirmar'}
            </button>
            <button
              onClick={() => { setConfirmOpen(false); setDisconnectError(null) }}
              className="flex-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-300 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

interface PlatformCardProps {
  icon: IconType
  iconColor: string
  name: string
  description: string
  state: PlatformState
  connectHref: string
  disconnectApiRoute: string
}

function PlatformCard({
  icon: Icon,
  iconColor,
  name,
  description,
  state,
  connectHref,
  disconnectApiRoute,
}: PlatformCardProps) {
  const { accounts, hasPending } = state
  const hasConnected = accounts.length > 0
  const isActive = hasConnected || hasPending
  const overallStatus: ChannelStatus = hasConnected ? 'connected' : hasPending ? 'pending' : 'inactive'

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
        <StatusBadge status={overallStatus} />
      </div>

      {/* Pending warning */}
      {hasPending && (
        <p className="text-xs text-amber-400 bg-amber-500/10 rounded-xl px-4 py-3">
          Aguardando seleção de conta no painel principal.
        </p>
      )}

      {/* Account list */}
      {hasConnected && (
        <div className="flex flex-col gap-2">
          {accounts.map(account => (
            <AccountRow
              key={account.id}
              account={account}
              disconnectApiRoute={disconnectApiRoute}
            />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="mt-auto pt-2">
        {!hasConnected && !hasPending ? (
          <a
            href={connectHref}
            className="block text-center rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-400 hover:opacity-90 px-4 py-2 text-sm font-semibold text-white transition"
          >
            Conectar
          </a>
        ) : (
          <a
            href={connectHref}
            className="block text-center rounded-xl bg-zinc-800 hover:bg-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition"
          >
            + Conectar outra conta
          </a>
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
        <PlatformCard
          icon={SiGoogleads}
          iconColor="#4285F4"
          name="Google Ads"
          description="Importe campanhas, cliques e conversões do Google Ads"
          state={google}
          connectHref="/api/integrations/google/connect"
          disconnectApiRoute="/api/integrations/google/disconnect"
        />

        <PlatformCard
          icon={SiMeta}
          iconColor="#0082FB"
          name="Meta Ads"
          description="Anúncios no Facebook e Instagram"
          state={meta}
          connectHref="/api/integrations/meta/connect"
          disconnectApiRoute="/api/integrations/meta/disconnect"
        />

        <ComingSoonCard
          icon={SiGoogleanalytics}
          name="Google Analytics"
          description="Dados de tráfego orgânico e comportamento de usuário"
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
