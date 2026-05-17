'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertTriangle } from 'lucide-react'

export default function PendingAccountBanner() {
  const router = useRouter()
  const [customerId, setCustomerId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSave() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/integrations/google/update-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? 'Erro desconhecido')
      } else {
        router.refresh()
      }
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-500/50 bg-amber-900/30 px-5 py-4">
      <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-400" />
      <div className="flex-1">
        <p className="text-sm font-medium text-amber-200">
          Conecte sua conta Google Ads — informe o Customer ID para começar a ver seus dados.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="Ex: 453-482-8300"
            className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-amber-500"
          />
          <button
            onClick={handleSave}
            disabled={loading || !customerId.trim()}
            className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-amber-400 disabled:opacity-50"
          >
            {loading ? 'Salvando…' : 'Salvar'}
          </button>
        </div>
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      </div>
    </div>
  )
}
