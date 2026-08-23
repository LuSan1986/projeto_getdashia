'use client'

import { useState, useEffect, useMemo } from 'react'
import type { ReactNode } from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { SiGoogleads, SiMeta, SiFacebook } from 'react-icons/si'
import { ChevronDown } from 'lucide-react'
import AIConsultant from '@/components/dashboard/AIConsultant'
import type { AccountInfo } from '@/app/dashboard/page'

// ── Constants ─────────────────────────────────────────────────────────────────

const ALL_ACCOUNTS = '__all__'

// ── Types ─────────────────────────────────────────────────────────────────────

type Platform    = 'google' | 'meta'
type SubPlatform = 'facebook' | 'instagram'
type Status      = 'active' | 'paused'
type Period      = '7d' | '30d' | '90d'
type Channel     = 'all' | 'google' | 'meta' | 'instagram' | 'facebook'

interface Campaign {
  id:           string | number
  platform:     Platform
  subPlatform?: SubPlatform
  accountName?: string
  name:         string
  status:       Status
  impressions:  number
  clicks:       number
  cost:         number
  conversions:  number
  revenue:      number
}

interface RoasPoint   { dia: string; roas: number }
interface PrevSummary { investment: number; revenue: number; clicks: number; conversions: number }

interface Props {
  googleAccounts: AccountInfo[]
  metaAccounts:   AccountInfo[]
}

type FetchResult = {
  campaigns:   Campaign[]
  roasData:    RoasPoint[]
  connected:   boolean
  prevSummary: PrevSummary | null
  source:      'google' | 'meta'
}

// ── Options ───────────────────────────────────────────────────────────────────

const periodOptions: { value: Period; label: string }[] = [
  { value: '7d',  label: 'Últimos 7 dias'  },
  { value: '30d', label: 'Últimos 30 dias' },
  { value: '90d', label: 'Últimos 90 dias' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtBRL(n: number) {
  return `R$ ${n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
function fmtInt(n: number) { return n.toLocaleString('pt-BR') }
function pct(current: number, prev: number): number | null {
  if (prev === 0) return null
  return ((current - prev) / prev) * 100
}
function sumPrevResults(results: FetchResult[]): PrevSummary | null {
  const withData = results.filter(r => r.prevSummary)
  if (withData.length === 0) return null
  return withData.reduce<PrevSummary>((acc, r) => ({
    investment:  acc.investment  + (r.prevSummary!.investment  ?? 0),
    revenue:     acc.revenue     + (r.prevSummary!.revenue     ?? 0),
    clicks:      acc.clicks      + (r.prevSummary!.clicks      ?? 0),
    conversions: acc.conversions + (r.prevSummary!.conversions ?? 0),
  }), { investment: 0, revenue: 0, clicks: 0, conversions: 0 })
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <defs>
        <linearGradient id="rel-ig-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%"   stopColor="#f09433" />
          <stop offset="25%"  stopColor="#e6683c" />
          <stop offset="50%"  stopColor="#dc2743" />
          <stop offset="75%"  stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="5" fill="url(#rel-ig-grad)" />
      <rect x="7" y="7" width="10" height="10" rx="3" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="2.5" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="white" />
    </svg>
  )
}

function PlatformIcon({ platform, subPlatform }: { platform: Platform; subPlatform?: SubPlatform }) {
  if (platform === 'google')              return <SiGoogleads color="#4285F4" size={14} className="shrink-0" />
  if (subPlatform === 'instagram')        return <InstagramIcon size={14} />
  return <SiFacebook color="#1877F2" size={14} className="shrink-0" />
}

// ── Chart styles ──────────────────────────────────────────────────────────────

const tooltipStyle = {
  backgroundColor: '#18181b',
  border: '1px solid #27272a',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '12px',
}
const axisProps = {
  tick: { fill: '#71717a', fontSize: 11 },
  axisLine: { stroke: '#27272a' },
  tickLine: false as const,
}

// ── Account selector with "Todas as contas" ───────────────────────────────────

function AccountSelectorWithAll({
  accounts,
  selectedId,
  onSelect,
}: {
  accounts:   AccountInfo[]
  selectedId: string
  onSelect:   (id: string) => void
}) {
  const [open, setOpen] = useState(false)
  const label = selectedId === ALL_ACCOUNTS
    ? 'Todas as contas'
    : (accounts.find(a => a.account_id === selectedId)?.account_name ?? selectedId)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 hover:border-zinc-500 transition"
      >
        <span className="max-w-[220px] truncate">{label}</span>
        <ChevronDown size={14} className={`text-zinc-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 z-20 min-w-[260px] rounded-xl border border-zinc-700 bg-zinc-900 shadow-xl overflow-hidden">
          <button
            onClick={() => { onSelect(ALL_ACCOUNTS); setOpen(false) }}
            className={`w-full flex items-center px-4 py-3 text-sm text-left hover:bg-zinc-800 transition
              ${selectedId === ALL_ACCOUNTS ? 'bg-zinc-800 text-cyan-400' : 'text-zinc-300'}`}
          >
            Todas as contas
          </button>
          {accounts.map(a => (
            <button
              key={a.id}
              onClick={() => { onSelect(a.account_id); setOpen(false) }}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-sm text-left hover:bg-zinc-800 transition
                ${a.account_id === selectedId ? 'bg-zinc-800' : ''}`}
            >
              <span className="truncate text-zinc-100">{a.account_name ?? a.account_id}</span>
              {a.is_default && (
                <span className="shrink-0 text-[10px] font-semibold bg-cyan-500/15 text-cyan-400 px-1.5 py-0.5 rounded-full">
                  padrão
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Filter group ──────────────────────────────────────────────────────────────

function FilterGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string; icon?: ReactNode }[]
  value:   T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex flex-wrap bg-zinc-900 border border-zinc-800 rounded-xl p-1 gap-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap
            ${value === opt.value
              ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-400 text-white'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
        >
          {opt.icon}
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// ── Change indicator ──────────────────────────────────────────────────────────

function ChangeIndicator({ change, higherIsBad }: { change: number | null; higherIsBad?: boolean }) {
  if (change === null) return <span className="text-zinc-600 text-xs">—</span>
  const isUp   = change > 0
  const isGood = higherIsBad ? !isUp : isUp
  return (
    <span className={`text-xs font-medium ${isGood ? 'text-green-400' : 'text-red-400'}`}>
      {isUp ? '▲' : '▼'} {Math.abs(change).toFixed(1).replace('.', ',')}% vs. período anterior
    </span>
  )
}

// ── Skeletons ─────────────────────────────────────────────────────────────────

function CardSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-3">
      <div className="h-3 w-28 bg-zinc-800 rounded animate-pulse" />
      <div className="h-8 w-36 bg-zinc-800 rounded animate-pulse" />
      <div className="h-2 w-20 bg-zinc-800 rounded animate-pulse" />
    </div>
  )
}

function ChartSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
      <div className="h-3 w-48 bg-zinc-800 rounded animate-pulse mb-5" />
      <div className="h-[220px] bg-zinc-800 rounded animate-pulse" />
    </div>
  )
}

function TableSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-800">
        <div className="h-3 w-32 bg-zinc-800 rounded animate-pulse" />
      </div>
      <div className="p-4 flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 bg-zinc-800 rounded animate-pulse" />
        ))}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function RelatoriosClient({ googleAccounts, metaAccounts }: Props) {
  const [period,  setPeriod]  = useState<Period>('30d')
  const [channel, setChannel] = useState<Channel>('all')

  const [selectedGoogleId, setSelectedGoogleId] = useState<string>(ALL_ACCOUNTS)
  const [selectedMetaId,   setSelectedMetaId]   = useState<string>(ALL_ACCOUNTS)

  const [googleCampaigns,   setGoogleCampaigns]   = useState<Campaign[]>([])
  const [metaCampaigns,     setMetaCampaigns]     = useState<Campaign[]>([])
  const [roasData,          setRoasData]          = useState<RoasPoint[]>([])
  const [googlePrevSummary, setGooglePrevSummary] = useState<PrevSummary | null>(null)
  const [metaPrevSummary,   setMetaPrevSummary]   = useState<PrevSummary | null>(null)
  const [loading,           setLoading]           = useState(true)
  const [error,             setError]             = useState<string | null>(null)
  const [googleConnected,   setGoogleConnected]   = useState(false)
  const [metaConnected,     setMetaConnected]     = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    async function load() {
      const isGoogleChannel = channel === 'all' || channel === 'google'
      const isMetaChannel   = channel !== 'google'

      const googleAcctsToFetch = isGoogleChannel
        ? (selectedGoogleId === ALL_ACCOUNTS
            ? googleAccounts
            : googleAccounts.filter(a => a.account_id === selectedGoogleId))
        : []

      const metaAcctsToFetch = isMetaChannel
        ? (selectedMetaId === ALL_ACCOUNTS
            ? metaAccounts
            : metaAccounts.filter(a => a.account_id === selectedMetaId))
        : []

      // Which Meta platforms to query depends on channel
      const metaPlats: SubPlatform[] =
        channel === 'facebook'  ? ['facebook'] :
        channel === 'instagram' ? ['instagram'] :
        ['facebook', 'instagram']

      const multiGoogle = googleAcctsToFetch.length > 1
      const multiMeta   = metaAcctsToFetch.length   > 1

      const fetches: Promise<FetchResult>[] = []

      // Google: one fetch per account
      for (const acct of googleAcctsToFetch) {
        const accountName = multiGoogle ? (acct.account_name ?? acct.account_id) : undefined
        const base = `/api/google-ads/campaigns?period=${period}&account_id=${encodeURIComponent(acct.account_id)}`
        fetches.push(
          Promise.all([
            fetch(base).then(r => r.json()),
            fetch(`${base}&prev=true`).then(r => r.json()).catch(() => null),
          ]).then(([data, prevData]) => ({
            campaigns: (data.campaigns ?? []).map((c: Campaign) => ({
              ...c,
              ...(accountName ? { accountName } : {}),
            })),
            roasData:    data.roasData ?? [],
            connected:   data.connected ?? false,
            prevSummary: (prevData as { prevSummary?: PrevSummary } | null)?.prevSummary ?? null,
            source:      'google' as const,
          }))
        )
      }

      // Meta: one fetch per account × platform
      for (const acct of metaAcctsToFetch) {
        for (const plat of metaPlats) {
          const accountName = multiMeta ? (acct.account_name ?? acct.account_id) : undefined
          const base = `/api/meta-ads/campaigns?period=${period}&account_id=${encodeURIComponent(acct.account_id)}&platform=${plat}`
          fetches.push(
            Promise.all([
              fetch(base).then(r => r.json()),
              fetch(`${base}&prev=true`).then(r => r.json()).catch(() => null),
            ]).then(([data, prevData]) => ({
              campaigns: (data.campaigns ?? []).map((c: Campaign) => ({
                ...c,
                subPlatform: plat,
                ...(accountName ? { accountName } : {}),
              })),
              roasData:    [],
              connected:   data.connected ?? false,
              prevSummary: (prevData as { prevSummary?: PrevSummary } | null)?.prevSummary ?? null,
              source:      'meta' as const,
            }))
          )
        }
      }

      if (fetches.length === 0) {
        if (!cancelled) {
          setGoogleCampaigns([])
          setMetaCampaigns([])
          setRoasData([])
          setGooglePrevSummary(null)
          setMetaPrevSummary(null)
          setGoogleConnected(false)
          setMetaConnected(false)
        }
        return
      }

      const results = await Promise.all(fetches)
      if (cancelled) return

      const gResults = results.filter(r => r.source === 'google')
      const mResults = results.filter(r => r.source === 'meta')

      setGoogleCampaigns(gResults.flatMap(r => r.campaigns))
      setMetaCampaigns(mResults.flatMap(r => r.campaigns))
      // ROAS chart: only meaningful for a single Google account
      setRoasData(gResults.length === 1 ? gResults[0].roasData : [])
      setGooglePrevSummary(sumPrevResults(gResults))
      setMetaPrevSummary(sumPrevResults(mResults))
      setGoogleConnected(gResults.some(r => r.connected))
      setMetaConnected(mResults.some(r => r.connected))
    }

    load().catch(() => {
      if (!cancelled) setError('Erro ao carregar campanhas.')
    }).finally(() => {
      if (!cancelled) setLoading(false)
    })

    return () => { cancelled = true }
  }, [period, channel, selectedGoogleId, selectedMetaId, googleAccounts, metaAccounts])

  const campaigns = useMemo<Campaign[]>(() => {
    if (channel === 'google') return googleCampaigns
    if (channel === 'meta' || channel === 'facebook' || channel === 'instagram') return metaCampaigns
    return [...googleCampaigns, ...metaCampaigns]
  }, [channel, googleCampaigns, metaCampaigns])

  const summary = useMemo(() => {
    const cost        = campaigns.reduce((s, c) => s + c.cost, 0)
    const revenue     = campaigns.reduce((s, c) => s + c.revenue, 0)
    const conversions = campaigns.reduce((s, c) => s + c.conversions, 0)
    return {
      investment: cost,
      revenue,
      roas: cost > 0 ? revenue / cost : 0,
      cpa:  conversions > 0 ? cost / conversions : 0,
    }
  }, [campaigns])

  const prevSummary = useMemo<{ investment: number; revenue: number; roas: number; cpa: number } | null>(() => {
    const gPrev = (channel === 'all' || channel === 'google') ? googlePrevSummary : null
    const mPrev = channel !== 'google'                        ? metaPrevSummary   : null
    if (!gPrev && !mPrev) return null
    const investment  = (gPrev?.investment  ?? 0) + (mPrev?.investment  ?? 0)
    const revenue     = (gPrev?.revenue     ?? 0) + (mPrev?.revenue     ?? 0)
    const conversions = (gPrev?.conversions ?? 0) + (mPrev?.conversions ?? 0)
    return {
      investment,
      revenue,
      roas: investment > 0 ? revenue / investment : 0,
      cpa:  conversions > 0 ? investment / conversions : 0,
    }
  }, [channel, googlePrevSummary, metaPrevSummary])

  const isConnected =
    channel === 'google'                                                         ? googleConnected :
    (channel === 'meta' || channel === 'facebook' || channel === 'instagram')    ? metaConnected   :
    (googleConnected || metaConnected)

  const showRoasChart     = channel !== 'meta' && channel !== 'facebook' && channel !== 'instagram'
  const hasAccountNames   = campaigns.some(c => c.accountName)
  const periodLabel       = periodOptions.find(o => o.value === period)?.label ?? ''

  const notConnectedMessage =
    channel === 'google'                                                      ? 'Google Ads não conectado.' :
    (channel === 'meta' || channel === 'facebook' || channel === 'instagram') ? 'Meta Ads não conectado.'   :
    'Nenhuma integração conectada.'

  const prevChanges = {
    investment: prevSummary ? pct(summary.investment, prevSummary.investment) : null,
    revenue:    prevSummary ? pct(summary.revenue,    prevSummary.revenue)    : null,
    roas:       prevSummary ? pct(summary.roas,       prevSummary.roas)       : null,
    cpa:        prevSummary ? pct(summary.cpa,        prevSummary.cpa)        : null,
  }

  const aiMetrics = {
    cost:        summary.investment,
    revenue:     summary.revenue,
    roas:        summary.roas,
    cpa:         summary.cpa,
    clicks:      campaigns.reduce((s, c) => s + c.clicks,      0),
    conversions: campaigns.reduce((s, c) => s + c.conversions, 0),
    impressions: campaigns.reduce((s, c) => s + c.impressions, 0),
  }

  const showGoogleSelector = (channel === 'all' || channel === 'google') && googleAccounts.length > 1
  const showMetaSelector   = channel !== 'google' && metaAccounts.length > 1

  const channelOptions: { value: Channel; label: string; icon?: ReactNode }[] = [
    { value: 'all',       label: 'Todos os canais' },
    { value: 'google',    label: 'Google Ads',  icon: <SiGoogleads  color="#4285F4" size={12} /> },
    { value: 'meta',      label: 'Meta Ads',    icon: <SiMeta       color="#0082FB" size={12} /> },
    { value: 'facebook',  label: 'Facebook',    icon: <SiFacebook   color="#1877F2" size={12} /> },
    { value: 'instagram', label: 'Instagram',   icon: <InstagramIcon size={12} /> },
  ]

  return (
    <div className="p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Relatórios</h1>
        <p className="text-zinc-500 text-sm mt-1">Análise detalhada das suas campanhas</p>
      </div>

      {/* Period + channel filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <FilterGroup options={periodOptions}  value={period}  onChange={setPeriod}  />
        <FilterGroup options={channelOptions} value={channel} onChange={setChannel} />
      </div>

      {/* Account selectors — shown when 2+ accounts */}
      {(showGoogleSelector || showMetaSelector) && (
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {showGoogleSelector && (
            <div className="flex items-center gap-2">
              <SiGoogleads color="#4285F4" size={13} />
              <span className="text-xs text-zinc-500">Conta:</span>
              <AccountSelectorWithAll
                accounts={googleAccounts}
                selectedId={selectedGoogleId}
                onSelect={setSelectedGoogleId}
              />
            </div>
          )}
          {showMetaSelector && (
            <div className="flex items-center gap-2">
              <SiMeta color="#0082FB" size={13} />
              <span className="text-xs text-zinc-500">Conta Meta:</span>
              <AccountSelectorWithAll
                accounts={metaAccounts}
                selectedId={selectedMetaId}
                onSelect={setSelectedMetaId}
              />
            </div>
          )}
        </div>
      )}
      {!(showGoogleSelector || showMetaSelector) && <div className="mb-6" />}

      {/* Not connected banner */}
      {!loading && !isConnected && (
        <div className="mb-6 rounded-xl bg-yellow-500/10 border border-yellow-500/30 px-4 py-3 text-yellow-400 text-sm">
          {notConnectedMessage}{' '}
          <a href="/dashboard/integracoes" className="underline font-medium">
            Acesse Integrações para conectar.
          </a>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Summary cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Investimento Total', value: fmtBRL(summary.investment), desc: periodLabel,                        change: prevChanges.investment, higherIsBad: true  },
            { label: 'Receita Gerada',     value: fmtBRL(summary.revenue),    desc: periodLabel,                        change: prevChanges.revenue,    higherIsBad: false },
            { label: 'ROAS Médio',         value: `${summary.roas.toFixed(1).replace('.', ',')}×`, desc: 'Retorno sobre o investimento', change: prevChanges.roas, higherIsBad: false },
            { label: 'CPA Médio',          value: fmtBRL(summary.cpa),        desc: 'Custo por aquisição',              change: prevChanges.cpa,        higherIsBad: true  },
          ].map(({ label, value, desc, change, higherIsBad }) => (
            <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-2">
              <p className="text-zinc-400 text-sm">{label}</p>
              <p className="text-3xl font-bold text-white">{value}</p>
              <p className="text-zinc-500 text-xs">{desc}</p>
              <ChangeIndicator change={change} higherIsBad={higherIsBad} />
            </div>
          ))}
        </div>
      )}

      {/* ROAS chart — Google only; hidden for meta channels */}
      {showRoasChart && (
        loading ? (
          <ChartSkeleton />
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
            <p className="text-sm font-medium text-zinc-300 mb-5">
              Evolução do ROAS — {periodLabel}
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={roasData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="dia" {...axisProps} />
                <YAxis
                  {...axisProps}
                  tickFormatter={v => `${v}×`}
                  domain={['auto', 'auto']}
                  width={36}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ stroke: 'rgba(6,182,212,0.3)', strokeWidth: 1 }}
                  formatter={(v: unknown) => {
                    const n = typeof v === 'number' ? v : 0
                    return [`${n.toFixed(1)}×`, 'ROAS']
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="roas"
                  stroke="#06B6D4"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#06B6D4' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )
      )}

      {/* Campaign table */}
      {loading ? (
        <TableSkeleton />
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800">
            <p className="text-sm font-medium text-zinc-300">
              Campanhas
              <span className="ml-2 text-xs text-zinc-500 font-normal">
                {campaigns.length} encontradas
              </span>
            </p>
          </div>

          {isConnected && campaigns.length === 0 ? (
            <p className="px-6 py-8 text-center text-zinc-500 text-sm">
              Nenhuma campanha encontrada no período.
            </p>
          ) : !isConnected ? null : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wide whitespace-nowrap">
                      Campanha
                    </th>
                    {hasAccountNames && (
                      <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wide whitespace-nowrap">
                        Conta
                      </th>
                    )}
                    {['Status', 'Impressões', 'Cliques', 'CTR', 'CPC Médio', 'Custo', 'Conversões', 'Taxa de Conv.', 'ROAS'].map(col => (
                      <th
                        key={col}
                        className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wide whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c) => {
                    const ctr      = c.impressions > 0 ? (c.clicks / c.impressions) * 100 : 0
                    const cpc      = c.clicks > 0 ? c.cost / c.clicks : 0
                    const convRate = c.clicks > 0 ? (c.conversions / c.clicks) * 100 : 0
                    const roas     = c.cost > 0 ? c.revenue / c.cost : 0
                    const rowKey   = `${c.platform}-${c.id}-${c.subPlatform ?? ''}-${c.accountName ?? ''}`
                    return (
                      <tr key={rowKey} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition">

                        {/* Campaign name + sub-platform label */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 min-w-[180px]">
                            <PlatformIcon platform={c.platform} subPlatform={c.subPlatform} />
                            <div className="min-w-0">
                              <div className="text-zinc-200 font-medium truncate">{c.name}</div>
                              {c.subPlatform && (
                                <div className="text-[10px] text-zinc-500 mt-0.5">
                                  {c.subPlatform === 'instagram' ? 'Instagram' : 'Facebook'}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Account name column — only when multi-account mode */}
                        {hasAccountNames && (
                          <td className="px-4 py-3 whitespace-nowrap max-w-[160px]">
                            <span className="text-xs text-zinc-400 truncate block">{c.accountName ?? '—'}</span>
                          </td>
                        )}

                        {/* Status */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          {c.status === 'active' ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-green-500/15 text-green-400 px-2 py-0.5 rounded-full">
                              <span className="size-1.5 rounded-full bg-green-400" />Ativo
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-zinc-700/50 text-zinc-400 px-2 py-0.5 rounded-full">
                              <span className="size-1.5 rounded-full bg-zinc-500" />Pausado
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">{fmtInt(c.impressions)}</td>
                        <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">{fmtInt(c.clicks)}</td>
                        <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">{ctr.toFixed(1).replace('.', ',')}%</td>
                        <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">{fmtBRL(cpc)}</td>
                        <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">{fmtBRL(c.cost)}</td>
                        <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">{fmtInt(c.conversions)}</td>
                        <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">{convRate.toFixed(2).replace('.', ',')}%</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`font-semibold ${roas >= 5 ? 'text-green-400' : roas >= 3.5 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {roas.toFixed(1).replace('.', ',')}×
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <AIConsultant metrics={aiMetrics} />

    </div>
  )
}
