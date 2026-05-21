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
- IA: OpenAI API (gpt-4o-mini)

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
Última atualização: 2026-05-17 (sessão 5)

### Concluído

**Fases 1 e 2 — completas** (ver sessões anteriores)

**Fase 3 — Google Ads API** ✅
- OAuth completo, Customer ID MCC 4534828300 salvo no Supabase
- App submetido para verificação Google OAuth — aguardando aprovação

**Sessão 4 — concluído em 2026-05-17**
- Banner de Customer ID pendente ✅
- Bug Meta Ads badge "Ativo" corrigido → "Em breve" ✅
- Página de Configurações (/dashboard/configuracoes) ✅
- Consultor IA com OpenAI gpt-4o-mini ✅
  - src/app/api/ai/analyze/route.ts
  - src/components/dashboard/AIConsultant.tsx
  - Integrado no dashboard (Visão Geral) e em Relatórios

**Sessão 5 — concluído em 2026-05-17**
- Página de Integrações (/dashboard/integracoes) ✅
  - src/app/dashboard/integracoes/page.tsx
  - src/components/dashboard/IntegracoesClient.tsx
  - Cards: Google Ads (funcional) + Meta Ads (funcional) + Google Analytics + TikTok Ads (em breve)
  - Botão Conectar/Desconectar com confirmação para Google e Meta
- OAuth Meta Ads completo ✅
  - src/app/api/integrations/meta/connect/route.ts
  - src/app/api/integrations/meta/callback/route.ts
  - src/app/api/integrations/meta/disconnect/route.ts
  - Token salvo criptografado no Supabase (access_token_encrypted)
  - Ad Account ID: act_445093580217547 conectado com sucesso
- App GetDashia criado no Meta Developer Portal ✅
  - App ID: 1291266016409615
  - Permissões: ads_read + ads_management (Pronto para teste)
  - Status: Publicado
  - OAuth Redirect URI: https://projeto-getdashia.vercel.app/api/integrations/meta/callback
  - Domínio: projeto-getdashia.vercel.app
- DashboardSidebar: link Integrações atualizado de '#' para '/dashboard/integracoes' ✅

**Regra de deploy:**
- Branch `main` → produção na Vercel
- Comando: `git push origin main`

### Pendente (ordem planejada)
1. Meta Ads → Tornar-se Provedor de Tecnologia (requer CNPJ/documentação empresarial)
   - Sem isso: apenas contas admin do app conseguem conectar
   - Após verificação: submeter ads_read + ads_management para revisão Meta (1-4 semanas)
2. Aguardar aprovação Google OAuth (email: lucianosantana48@gmail.com, 3-7 dias úteis)
3. Stripe — migrar para modo produção (decidir CPF ou CNPJ — decisão irreversível)
4. Substituir dados mock da página de Relatórios por dados reais da Google Ads API
5. Dados do Meta Ads — buscar campanhas reais via Marketing API

## 5. CREDENCIAIS E CONTAS IMPORTANTES
- E-mail corporativo: luciano@getdashia.com.br (Hostinger)
- Stripe: dashboard.stripe.com — modo teste
- Google Ads MCC: 453-482-8300 — Customer ID: 4534828300 (sem campanhas ativas)
- Google Cloud projeto: GetDashia (ID: getdashia)
- OpenAI: platform.openai.com — chave GetDashia (gpt-4o-mini)
- Supabase: projeto getdashia, região São Paulo
- Vercel: projeto projeto-getdashia — branch `main` = produção
- YouTube vídeo demo OAuth: https://youtu.be/utnSgDH50m4
- Meta Developer: App GetDashia — App ID: 1291266016409615
  - Conta admin: jcjessica81@gmail.com (conta da Jéssica Cristina)
  - Ad Account conectado: act_445093580217547

## 6. CONTEXTO PESSOAL
- Quem sou: Luciano (LuSan1986) — estou aprendendo programação na prática usando IA, não sou dev profissional.
- Ferramentas: Claude Code no VS Code (PowerShell) para implementação; chat como mentor estratégico.
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
1. Meta Ads → iniciar verificação como Provedor de Tecnologia (CNPJ necessário)
2. Aguardar aprovação Google OAuth (lucianosantana48@gmail.com)
3. Decidir CPF ou CNPJ → ativar Stripe modo produção
4. Substituir dados mock de Relatórios por dados reais da Google Ads API
5. Dados do Meta Ads via Marketing API (após verificação Provedor de Tecnologia)
