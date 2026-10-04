'use client'

import { useState } from 'react'
import { Sparkles, CheckCircle2, ArrowRight, AlertTriangle, Bot } from 'lucide-react'

interface Metrics {
  cost: number
  revenue: number
  roas: number
  cpa: number
  clicks: number
  conversions: number
  impressions: number
}

interface Analysis {
  diagnostico: string
  pontos_positivos: string[]
  oportunidades: string[]
  prioridade: string
}

interface Props {
  metrics: Metrics
}

export default function AIConsultant({ metrics }: Props) {
  const [loading,  setLoading]  = useState(false)
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [noData,   setNoData]   = useState(false)
  const [error,    setError]    = useState('')

  async function handleAnalyze() {
    setError('')
    setAnalysis(null)
    setNoData(false)
    setLoading(true)

    try {
      const res  = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metrics }),
      })
      const json = await res.json()

      if (!res.ok) {
        setError(json.error ?? 'Unknown error')
      } else if (json.semDados) {
        setNoData(true)
      } else {
        setAnalysis(json as Analysis)
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center justify-center size-9 rounded-xl bg-indigo-600/20 text-indigo-400">
          <Bot size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-100">AI Consultant</p>
          <p className="text-xs text-zinc-500">Intelligent analysis of your campaigns</p>
        </div>
      </div>

      {!analysis && !noData && !error && (
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 px-5 py-2.5 text-sm font-semibold text-white transition"
        >
          <Sparkles size={15} />
          {loading ? 'Analyzing…' : 'Analyze my campaigns'}
        </button>
      )}

      {noData && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-zinc-400">
            Connect an account with active campaigns to receive real analysis.
          </p>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="self-start flex items-center gap-2 rounded-xl border border-zinc-700 hover:border-zinc-600 px-4 py-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition"
          >
            <Sparkles size={13} />
            New analysis
          </button>
        </div>
      )}

      {error && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-red-400">{error}</p>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="self-start flex items-center gap-2 rounded-xl border border-zinc-700 hover:border-zinc-600 px-4 py-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition"
          >
            <Sparkles size={13} />
            Try again
          </button>
        </div>
      )}

      {analysis && (
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 mb-2">Diagnosis</p>
            <p className="text-sm text-zinc-300 leading-relaxed">{analysis.diagnostico}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 mb-2">Highlights</p>
            <ul className="flex flex-col gap-1.5">
              {analysis.pontos_positivos.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-green-400" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 mb-2">Improvement opportunities</p>
            <ul className="flex flex-col gap-1.5">
              {analysis.oportunidades.map((op, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                  <ArrowRight size={15} className="mt-0.5 shrink-0 text-yellow-400" />
                  {op}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-indigo-600/10 border border-indigo-500/30 px-4 py-3 flex items-start gap-3">
            <AlertTriangle size={15} className="mt-0.5 shrink-0 text-indigo-400" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-400 mb-1">Priority</p>
              <p className="text-sm text-zinc-200">{analysis.prioridade}</p>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="self-start flex items-center gap-2 rounded-xl border border-zinc-700 hover:border-zinc-600 px-4 py-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition"
          >
            <Sparkles size={13} />
            {loading ? 'Analyzing…' : 'New analysis'}
          </button>
        </div>
      )}
    </div>
  )
}
