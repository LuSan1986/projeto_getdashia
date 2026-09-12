import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function PendingAccountBanner() {
  return (
    <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-500/50 bg-amber-900/30 px-5 py-4">
      <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-400" />
      <div className="flex-1">
        <p className="text-sm font-medium text-amber-200">
          Selecione qual conta Google Ads deseja conectar para começar a ver seus dados.
        </p>
        <Link
          href="/dashboard/integracoes/google-ads/selecionar-conta"
          className="mt-3 inline-block rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-amber-400"
        >
          Selecionar conta
        </Link>
      </div>
    </div>
  )
}
