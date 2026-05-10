import { TrendingUp } from 'lucide-react'
import Charts from '@/components/dashboard/Charts'
import ChannelsSection from '@/components/dashboard/ChannelsSection'

const metrics = [
  {
    label: 'Receita Total',
    value: 'R$ 48.320',
    desc: '+12% em relação ao mês anterior',
  },
  {
    label: 'Cliques',
    value: '128.450',
    desc: 'Total de cliques nos anúncios',
  },
  {
    label: 'Conversões',
    value: '3.210',
    desc: 'Conversões atribuídas no período',
  },
  {
    label: 'ROAS',
    value: '4,7×',
    desc: 'Retorno sobre investimento em anúncios',
  },
]

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Visão Geral</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Dados do período atual — valores de demonstração
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map(({ label, value, desc }) => (
          <div
            key={label}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <p className="text-zinc-400 text-sm">{label}</p>
              <TrendingUp size={14} className="text-indigo-400" />
            </div>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-zinc-500 text-xs">{desc}</p>
          </div>
        ))}
      </div>

      <ChannelsSection />
      <Charts />
    </div>
  )
}
