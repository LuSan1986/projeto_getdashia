GetDashia — Handoff de Chat

Como usar: Antes de migrar para um novo chat, atualize a seção ESTADO ATUAL com o que foi feito e o próximo passo. Depois copie o conteúdo completo deste arquivo e cole como primeira mensagem no chat novo.


1. IDENTIFICAÇÃO DO PROJETO
CampoValorNomeGetDashiaDescriçãoSaaS brasileiro de atribuição multi-canal e dashboards para gestores de tráfego e donos de e-commerce — centraliza Google Ads, Meta Ads e e-commerce em um único painel.Domíniogetdashia.com.br (registrado na Hostinger)Repositóriogithub.com/LuSan1986/projeto_getdashia (privado)Pasta localC:\Users\Jéssica Cristina\projeto\projeto_getdashiaSistema OperacionalWindows 11 — terminal PowerShell, editor VS CodeUsuário GitHubLuSan1986

2. STACK TÉCNICA COMPLETA

Framework: Next.js 16 (App Router)
Linguagem: TypeScript
Estilo: Tailwind CSS
Componentes: shadcn/ui — preset nova, base zinc, accent indigo
Banco de dados / Auth: Supabase
Pagamentos: Stripe
Deploy: Vercel
E-mail transacional: Resend
Gráficos: Recharts

Estrutura de pastas obrigatória
src/
  components/
    dashboard/
  lib/
    db/
    integrations/
  types/

3. DOCUMENTAÇÃO DO PRODUTO
O PRD completo está em docs/PRD_GetDashia.md no repositório.

4. ESTADO ATUAL
Última atualização: 2026-05-07

Concluído
Fase 1 — Landing v1 completa

Infraestrutura: Git local, GitHub privado, Next.js 16, shadcn/ui.
Landing page com 10 seções completas.
OG image, sitemap.ts, robots.ts implementados.
Deploy na Vercel: www.getdashia.com.br com SSL ativo ✅
Botão "Entrar" no header da landing page → leva para /login ✅

Fase 2 — Waitlist (concluído)

Projeto getdashia criado no Supabase (região São Paulo) ✅
Tabela waitlist com RLS e policy de inserção pública ✅
API route src/app/api/waitlist/route.ts implementada ✅
Variáveis de ambiente na Vercel corrigidas e funcionando ✅
Formulário testado: dados chegando no Supabase ✅

Fase 2 — Autenticação (concluído)

Pacote @supabase/ssr instalado ✅
src/lib/supabase-client.ts — cliente browser ✅
src/lib/supabase-server.ts — cliente server ✅
middleware.ts — protege rotas /dashboard e /onboarding ✅
src/app/login/page.tsx — página de login ✅
src/app/cadastro/page.tsx — página de cadastro com emailRedirectTo ✅
src/app/auth/confirm/route.ts — rota de confirmação de e-mail ✅
src/app/auth/callback/route.ts — rota de callback ✅
Supabase: Site URL e Redirect URLs configurados para produção ✅
Template de e-mail atualizado para usar /auth/confirm ✅
Fluxo completo testado em produção: cadastro → e-mail → confirmação → dashboard ✅

Fase 2 — Dashboard v1 (concluído)

src/app/dashboard/page.tsx — header, sidebar e cards de métricas ✅
src/components/dashboard/Charts.tsx — 3 gráficos com Recharts ✅
Gráfico de Área: Receita Total últimos 7 dias ✅
Gráfico de Barras: Cliques por Canal (Google Ads vs Meta Ads) ✅
Gráfico de Pizza (donut): Conversões por Fonte ✅
Layout responsivo testado em produção ✅
Dashboard exibe nome da organização do usuário logado ✅

Fase 2 — Resend + Esqueci minha senha (concluído)

Conta Resend criada, domínio verificado, DNS configurado ✅
SMTP personalizado configurado no Supabase ✅
src/app/esqueci-senha/page.tsx ✅
src/app/auth/reset-password/page.tsx — usa getSession() para verificar sessão estabelecida pelo confirm route ✅
src/app/auth/confirm/route.ts — redireciona para /auth/reset-password quando type === 'recovery' ✅
Mensagem de erro específica quando nova senha é igual à atual ✅
Template de e-mail de redefinição traduzido para pt-BR no Supabase ✅
Fluxo completo funcionando em produção ✅

Fase 2 — Banco de dados (concluído)

supabase/migrations/001_initial_schema.sql criado ✅
5 tabelas criadas no Supabase: profiles, organizations, organization_members, integrations, metrics_daily ✅
RLS ativado em todas as tabelas ✅
Multi-tenancy por organization_id ✅
Trigger automático: cria profile quando usuário se cadastra ✅
Trigger automático: insere criador como owner em organization_members ✅
CPA e ROAS calculados automaticamente (colunas GENERATED ALWAYS AS) ✅

Fase 2 — Onboarding (concluído)

src/app/onboarding/page.tsx — server component que verifica se já tem org ✅
src/app/onboarding/OnboardingForm.tsx — formulário client component ✅
Slug gerado automaticamente a partir do nome da empresa ✅
Após criar organização: redireciona para /dashboard ✅
middleware.ts corrigido: matcher duplo (/dashboard e /dashboard/:path+) ✅
Fail-closed: qualquer erro no getUser() trata como não autenticado ✅
Fluxo testado em produção: aba anônima → /dashboard → /login → dashboard ✅

Em andamento

Nada no momento.

Pendente (ordem planejada)

Fase 3: integrações com Google Ads e Meta Ads
Criar página de Configurações (perfil do usuário, nome da organização)
Substituir dados mock do dashboard por dados reais do banco
Stripe: planos e cobrança


5. CONTEXTO PESSOAL

Quem sou: Luciano (LuSan1986) — estou aprendendo programação na prática usando IA, não sou dev profissional.
Ferramentas: uso o Claude Code dentro do VS Code (PowerShell) para grandes tarefas; o chat como mentor estratégico para planejar e revisar.
Papel do chat: mentor estratégico — revisa planos antes da execução, explica o "porquê", orienta passo-a-passo no Windows.
Tom preferido: passo-a-passo simples, sem jargão, como se ensinasse alguém de 16 anos curioso e motivado.
Honestidade: sem números inventados, sem depoimentos falsos.
Respostas curtas sempre que possível.


6. DIRETRIZES TÉCNICAS (as 10 regras do projeto)

Stack obrigatória — Next.js 16+ App Router, TypeScript, Tailwind CSS, shadcn/ui, Supabase, Stripe, Vercel, Resend.
Estrutura de pastas — src/components/, src/lib/db/, src/lib/integrations/, src/types/.
Multi-tenancy — todas as queries ao Supabase filtram por organization_id.
Segurança — chaves e secrets nunca em código; sempre process.env.
Mobile-first — layout pensado primeiro para telas pequenas.
Português brasileiro — toda interface voltada ao usuário final em pt-BR.
Foco no MVP — não antecipar funcionalidades futuras.
Commits semânticos — tipo(escopo): descrição em inglês.
Build local antes do push — npm run build sem erros antes do git push.
Dark-first — paleta zinc/indigo, tema escuro como padrão.


7. PRÓXIMO PASSO IMEDIATO

Fase 3 — Integrações com Google Ads e Meta Ads:
Criar página de Integrações no dashboard (/dashboard/integracoes)
Implementar OAuth com Google Ads API
Implementar OAuth com Meta Ads API
Salvar tokens na tabela integrations (criptografados)
Iniciar sincronização de métricas reais para metrics_daily


8. COMO USAR ESTE ARQUIVO

Antes de migrar de chat: atualize a seção 4. ESTADO ATUAL.
Ao abrir um chat novo: cole o conteúdo completo como primeira mensagem.
Versionamento: commite sempre que atualizar.