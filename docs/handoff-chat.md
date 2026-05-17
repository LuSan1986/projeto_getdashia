# GetDashia — Handoff de Chat
Como usar: Antes de migrar para um novo chat, atualize a seção ESTADO ATUAL com o que foi feito e o próximo passo. Depois copie o conteúdo completo deste arquivo e cole como primeira mensagem no chat novo.

## 1. IDENTIFICAÇÃO DO PROJETO
Campo | Valor
--- | ---
Nome | GetDashia
Descrição | SaaS brasileiro de atribuição multi-canal e dashboards para gestores de tráfego e donos de e-commerce — centraliza Google Ads, Meta Ads e e-commerce em um único painel.
Domínio | getdashia.com.br (registrado na Hostinger)
Repositório | github.com/LuSan1986/projeto_getdashia (privado)
Pasta local | C:\Users\Jéssica Cristina\projeto\projeto_getdashia
Sistema Operacional | Windows 11 — terminal PowerShell, editor VS Code
Usuário GitHub | LuSan1986

## 2. STACK TÉCNICA COMPLETA
- Framework: Next.js 16 (App Router)
- Linguagem: TypeScript
- Estilo: Tailwind CSS
- Componentes: shadcn/ui — preset nova, base zinc, accent indigo
- Banco de dados / Auth: Supabase
- Pagamentos: Stripe
- Deploy: Vercel
- E-mail transacional: Resend
- Gráficos: Recharts
- IA: Google Gemini API (gemini-1.5-flash) — gratuito

Estrutura de pastas obrigatória:
src/
  components/
    dashboard/
  lib/
    db/
    integrations/
  types/

## 3. DOCUMENTAÇÃO DO PRODUTO
O PRD completo está em docs/PRD_GetDashia.md no repositório.

## 4. ESTADO ATUAL
Última atualização: 2026-05-17 (sessão 4)

### Concluído

**Fase 1 — Landing v1 completa**
- Infraestrutura: Git local, GitHub privado, Next.js 16, shadcn/ui
- Landing page com 10 seções completas
- OG image, sitemap.ts, robots.ts implementados
- Deploy na Vercel: www.getdashia.com.br com SSL ativo ✅
- Botão "Entrar" no header → /login ✅

**Fase 2 — Waitlist, Auth, Dashboard v1, Resend, Banco, Onboarding, Páginas legais, Stripe (modo teste)**
(todos concluídos em sessões anteriores — ver histórico)

**Fase 3 — Google Ads API (concluído em 2026-05-17)**
- OAuth completo, tokens salvos no Supabase ✅
- Customer ID MCC: 4534828300 ✅
- App submetido para verificação Google OAuth ✅ — aguardando aprovação

**Fase 3 — Sessão 4 (concluído em 2026-05-17)**
- Banner de Customer ID pendente no dashboard ✅
- Bug Meta Ads badge "Ativo" corrigido → "Em breve" ✅
- Página de Configurações (/dashboard/configuracoes) ✅
  - Seção Perfil: nome completo + e-mail readonly
  - Seção Organização: nome da empresa
  - API routes: /api/user/update-profile e /api/organization/update
- Consultor IA com Gemini ✅
  - src/app/api/ai/analyze/route.ts — chama gemini-1.5-flash
  - src/components/dashboard/AIConsultant.tsx — card com 4 blocos de análise
  - Quando sem campanhas: mostra mensagem explicativa
  - Quando com campanhas reais: análise completa em pt-BR

**Regra de deploy confirmada:**
- Branch `main` → produção na Vercel ✅
- Comando correto: `git push origin main`

### Em andamento
- Meta Ads API — bloqueio de segurança do Facebook (dispositivo não reconhecido). Aguardar 2-5 dias usando Facebook normalmente e tentar de novo em developers.facebook.com

### Pendente (ordem planejada)
1. Aguardar aprovação Google OAuth (email: lucianosantana48@gmail.com)
2. Resolver Meta Ads API (developers.facebook.com — aguardar desbloqueio)
3. Stripe — migrar para modo produção (decidir CPF ou CNPJ primeiro)
4. Substituir dados mock de Relatórios por dados reais da API
5. Página de Integrações (/dashboard/integracoes)

## 5. CREDENCIAIS E CONTAS IMPORTANTES
- E-mail corporativo: luciano@getdashia.com.br (Hostinger)
- Stripe: dashboard.stripe.com — conta em modo teste
- Google Ads MCC: 453-482-8300 (MCC de Automações Luciano) — sem campanhas ativas
- Google Cloud projeto: GetDashia (ID: getdashia)
- Gemini API: projeto GetDashia no Google AI Studio (aistudio.google.com)
- Supabase: projeto getdashia, região São Paulo
- Vercel: projeto projeto-getdashia — branch `main` = produção
- YouTube vídeo demo OAuth: https://youtu.be/utnSgDH50m4

## 6. CONTEXTO PESSOAL
- Quem sou: Luciano (LuSan1986) — estou aprendendo programação na prática usando IA, não sou dev profissional.
- Ferramentas: uso o Claude Code dentro do VS Code (PowerShell) para grandes tarefas; o chat como mentor estratégico.
- Papel do chat: mentor estratégico — revisa planos antes da execução, explica o "porquê", orienta passo-a-passo no Windows.
- Tom preferido: passo-a-passo simples, sem jargão, como se ensinasse alguém de 16 anos curioso e motivado.
- Honestidade: sem números inventados, sem depoimentos falsos.
- Respostas curtas sempre que possível.

## 7. DIRETRIZES TÉCNICAS (as 10 regras do projeto)
1. Stack obrigatória — Next.js 16+ App Router, TypeScript, Tailwind CSS, shadcn/ui, Supabase, Stripe, Vercel, Resend.
2. Estrutura de pastas — src/components/, src/lib/db/, src/lib/integrations/, src/types/.
3. Multi-tenancy — todas as queries ao Supabase filtram por organization_id.
4. Segurança — chaves e secrets nunca em código; sempre process.env.
5. Mobile-first — layout pensado primeiro para telas pequenas.
6. Português brasileiro — toda interface voltada ao usuário final em pt-BR.
7. Foco no MVP — não antecipar funcionalidades futuras.
8. Commits semânticos — tipo(escopo): descrição em inglês.
9. Build local antes do push — npm run build sem erros antes do git push.
10. Dark-first — paleta zinc/indigo, tema escuro como padrão.

## 8. PRÓXIMO PASSO IMEDIATO
1. Aguardar desbloqueio do Facebook (2-5 dias) e criar app no developers.facebook.com
2. Aguardar aprovação Google OAuth (lucianosantana48@gmail.com)
3. Decidir CPF ou CNPJ para ativar Stripe modo produção
4. Substituir dados mock da página de Relatórios por dados reais