import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createClient } from '@/lib/supabase-server'

interface Metrics {
  cost: number
  revenue: number
  roas: number
  cpa: number
  clicks: number
  conversions: number
  impressions: number
}

const SYSTEM_PROMPT = `Você é um consultor especialista em mídia paga (Google Ads e Meta Ads) para e-commerce brasileiro.
Analise os dados abaixo e responda EXATAMENTE neste formato JSON:
{
  "diagnostico": "diagnóstico geral em 2-3 frases",
  "pontos_positivos": ["ponto 1", "ponto 2", "ponto 3"],
  "oportunidades": ["ação concreta 1", "ação concreta 2", "ação concreta 3"],
  "prioridade": "uma recomendação prioritária urgente"
}
Seja direto, prático e use números dos dados fornecidos nas suas análises.`

function buildPrompt(m: Metrics): string {
  return `${SYSTEM_PROMPT}

Dados dos últimos 30 dias:
- Custo total: R$ ${m.cost.toFixed(2)}
- Receita atribuída: ${m.revenue > 0 ? `R$ ${m.revenue.toFixed(2)}` : 'não disponível'}
- ROAS: ${m.roas > 0 ? `${m.roas.toFixed(2)}×` : 'não disponível'}
- CPA: ${m.cpa > 0 ? `R$ ${m.cpa.toFixed(2)}` : 'não disponível'}
- Cliques: ${m.clicks.toLocaleString('pt-BR')}
- Conversões: ${m.conversions.toLocaleString('pt-BR')}
- Impressões: ${m.impressions.toLocaleString('pt-BR')}
- CTR: ${m.impressions > 0 ? ((m.clicks / m.impressions) * 100).toFixed(2) : 0}%`
}

function stripMarkdown(text: string): string {
  return text
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim()
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const { metrics } = await req.json() as { metrics: Metrics }

    const allZero =
      metrics.cost === 0 &&
      metrics.clicks === 0 &&
      metrics.conversions === 0 &&
      metrics.impressions === 0

    if (allZero) {
      return NextResponse.json({ semDados: true })
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'Chave da API não configurada' }, { status: 500 })
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: buildPrompt(metrics) }],
      temperature: 0.7,
    })
    const raw = completion.choices[0].message.content ?? ''
    const cleaned = stripMarkdown(raw)

    const analysis = JSON.parse(cleaned)
    return NextResponse.json(analysis)
  } catch (err) {
    console.error('[ai/analyze]', err)
    return NextResponse.json({ error: 'Erro ao gerar análise' }, { status: 500 })
  }
}
