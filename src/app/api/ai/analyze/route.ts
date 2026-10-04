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

const SYSTEM_PROMPT = `You are an expert paid media consultant (Google Ads and Meta Ads) for e-commerce businesses.
Analyze the data below and respond EXACTLY in this JSON format:
{
  "diagnostico": "general diagnosis in 2-3 sentences",
  "pontos_positivos": ["highlight 1", "highlight 2", "highlight 3"],
  "oportunidades": ["concrete action 1", "concrete action 2", "concrete action 3"],
  "prioridade": "one urgent priority recommendation"
}
Be direct, practical and use numbers from the provided data in your analysis. Respond entirely in English.`

function buildPrompt(m: Metrics): string {
  return `${SYSTEM_PROMPT}

Data from the last 30 days:
- Total cost: R$ ${m.cost.toFixed(2)}
- Attributed revenue: ${m.revenue > 0 ? `R$ ${m.revenue.toFixed(2)}` : 'not available'}
- ROAS: ${m.roas > 0 ? `${m.roas.toFixed(2)}×` : 'not available'}
- CPA: ${m.cpa > 0 ? `R$ ${m.cpa.toFixed(2)}` : 'not available'}
- Clicks: ${m.clicks.toLocaleString('en-US')}
- Conversions: ${m.conversions.toLocaleString('en-US')}
- Impressions: ${m.impressions.toLocaleString('en-US')}
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
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
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
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
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
    return NextResponse.json({ error: 'Error generating analysis' }, { status: 500 })
  }
}
