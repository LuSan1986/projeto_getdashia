@AGENTS.md

# GetDashia — Handoff de sessão

## Visão geral do projeto
SaaS de atribuição multi-canal para gestores de tráfego e agências brasileiras.
Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Supabase, Vercel.
Repositório: https://github.com/LuSan1986/projeto_getdashia
Produção: https://www.getdashia.com.br

---

## Estado atual — Landing Page (cyberpunk redesign COMPLETO)

Todas as seções da landing foram redesenhadas com estética cyberpunk:
- Fundo: `#050B18`
- Cores neon: ciano `#06B6D4`, magenta `#E879F9`, roxo `#A855F7`
- Glassmorphism: `rgba(10,15,40,0.70)` + `backdrop-filter: blur(10px)`
- PCB SVG traces em todas as seções
- Gradiente nos títulos: `linear-gradient(90deg, #06B6D4, #E879F9)`

### Seções e arquivos — todas concluídas:

| Seção | Arquivo | Status |
|---|---|---|
| Header | `src/components/landing/header.tsx` | ✅ Cyberpunk — logo gradiente, linha neon, menu mobile |
| Hero | `src/components/landing/hero.tsx` | ✅ Cyberpunk — PCB traces, dashboard animado, waitlist |
| Problema | `src/components/landing/problema.tsx` | ✅ Cyberpunk — cards glassmorphism, ícones neon |
| ComoFunciona | `src/components/landing/como-funciona.tsx` | ✅ Cyberpunk — números neon, linha conectora tracejada |
| Funcionalidades | `src/components/landing/funcionalidades.tsx` | ✅ Cyberpunk — grid de cards com hover neon |
| ProvaSocial | `src/components/landing/prova-social.tsx` | ✅ Logos corrigidos (.jpeg e .webp) |
| Planos | `src/components/landing/planos.tsx` | ✅ Cyberpunk — 3 cards Starter/Pro/Business |
| FAQ | `src/components/landing/faq.tsx` | ✅ Cyberpunk — accordion custom com useState |
| CtaFinal | `src/components/landing/cta-final.tsx` | ✅ Cyberpunk — glow radial, badge, gradiente |
| About | `src/components/AboutSection.tsx` | ✅ Cyberpunk — card glassmorphism, pills LGPD |
| Footer | `src/components/landing/footer.tsx` | ✅ Cyberpunk — dot pulsante, links com glow |

---

## Dashboard

- `src/app/dashboard/page.tsx` — busca integração Google Ads e Meta Ads no Supabase
- `src/components/dashboard/ChannelsSection.tsx` — tabs clicáveis com badge "Conectado" / "Em breve"
  - Props: `metaConnected` e `googleConnected` (booleanos vindos do server component)
- Google Ads conectado mostra dados reais (custo, cliques, conversões, impressões)
- Meta Ads conectado mostra badge "Conectado" mas dados "Em breve"
- TikTok sempre mostra "Em breve"

---

## Integrações

### Google Ads
- OAuth flow: `/api/integrations/google/connect` → callback → salva em `integrations` (platform: `google_ads`)
- Token criptografado com `src/lib/crypto.ts`
- Dados buscados via `src/lib/integrations/google-ads.ts`

### Meta Ads
- OAuth flow: `/api/integrations/meta/connect` → callback → salva em `integrations` (platform: `meta_ads`)
- App em revisão na Meta (submetido, até 20 dias úteis)
- Permissões solicitadas: `ads_read`, `business_management`

---

## Supabase

- Tabelas: `organization_members`, `integrations`, `waitlist`
- Conta de teste criada para analista Meta: `teste@getdashia.com.br` / `GetDashia@2026`
- Auth: Supabase email/password
- Criptografia: tokens de integração criptografados antes de salvar

---

## Vercel / Deploy

- GitHub webhook para Vercel está instável (para de funcionar esporadicamente)
- **Solução de contorno:** Deploy Hook manual
  ```powershell
  Invoke-WebRequest -Uri "https://api.vercel.com/v1/integrations/deploy/prj_eUbSMrD8mpaMlSpvSNxCzZwcpWWh/lleaBsTDA8" -Method POST
  ```
- Build: `npm run build` na máquina Windows (sandbox não tem internet para baixar SWC)

---

## Tarefas pendentes

- [ ] Corrigir webhook GitHub → Vercel definitivamente (recriar em Settings → Git → Webhooks)
- [ ] Aguardar aprovação do App Review da Meta (até 20 dias úteis)
- [ ] Implementar visualização de campanhas Meta Ads quando aprovado
- [ ] Adicionar página `/precos` completa (atualmente redireciona para `#waitlist`)
- [ ] Implementar exportação de relatório PDF
- [ ] Implementar gestão multi-cliente (múltiplas organizações)

---

## Comandos úteis

```powershell
# Build
cd "C:\Users\Jéssica Cristina\projeto\projeto_getdashia"
npm run build

# Push
git add . && git commit -m "mensagem" && git push origin main

# Deploy hook manual
Invoke-WebRequest -Uri "https://api.vercel.com/v1/integrations/deploy/prj_eUbSMrD8mpaMlSpvSNxCzZwcpWWh/lleaBsTDA8" -Method POST
```
