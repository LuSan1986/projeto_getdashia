'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SiGoogleads } from 'react-icons/si'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

function formatCustomerId(id: string): string {
  const clean = id.replace(/-/g, '')
  if (clean.length === 10) {
    return `${clean.slice(0, 3)}-${clean.slice(3, 6)}-${clean.slice(6)}`
  }
  return id
}

export default function SelecionarContaPage() {
  const router = useRouter()
  const [accounts, setAccounts] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [connecting, setConnecting] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/integrations/google/accounts')
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setAccounts(data.accounts ?? [])
        }
      })
      .catch(() => setError('Erro ao carregar contas. Tente novamente.'))
      .finally(() => setLoading(false))
  }, [])

  async function handleSelect(accountId: string) {
    setConnecting(accountId)
    setError(null)
    try {
      const res = await fetch('/api/integrations/google/select-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: accountId }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? 'Erro ao conectar conta')
        setConnecting(null)
        return
      }
      router.push('/dashboard')
    } catch {
      setError('Erro de conexão. Tente novamente.')
      setConnecting(null)
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-lg">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
          <SiGoogleads color="#4285F4" size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Selecionar conta Google Ads</h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            Escolha qual conta deseja conectar ao GetDashia
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex items-center gap-2 py-12 text-zinc-400">
          <Loader2 size={18} className="animate-spin" />
          <span className="text-sm">Buscando contas acessíveis…</span>
        </div>
      )}

      {!loading && error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-900/20 px-5 py-4">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-400" />
          <div>
            <p className="text-sm font-medium text-red-300">{error}</p>
            <a
              href="/api/integrations/google/connect"
              className="mt-2 inline-block text-xs text-red-400 underline hover:text-red-300"
            >
              Tentar reconectar
            </a>
          </div>
        </div>
      )}

      {!loading && !error && accounts.length === 0 && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-900/20 px-5 py-4">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-400" />
          <p className="text-sm text-amber-300">
            Nenhuma conta Google Ads encontrada para este usuário.
          </p>
        </div>
      )}

      {!loading && !error && accounts.length > 0 && (
        <div className="flex flex-col gap-3">
          {accounts.map(accountId => (
            <div
              key={accountId}
              className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4"
            >
              <div>
                <p className="text-sm font-mono font-medium text-zinc-100">
                  {formatCustomerId(accountId)}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">Customer ID</p>
              </div>
              <button
                onClick={() => handleSelect(accountId)}
                disabled={connecting !== null}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-sm font-semibold text-white transition"
              >
                {connecting === accountId ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Conectando…
                  </>
                ) : (
                  <>
                    <CheckCircle size={14} />
                    Conectar
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
