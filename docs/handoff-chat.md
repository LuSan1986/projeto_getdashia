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
Última atualização: 2026-05-17 (sessão 3)
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
src/app/auth/reset-password/page.tsx ✅
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

src/app/onboarding/page.tsx ✅
src/app/onboarding/OnboardingForm.tsx ✅
Slug gerado automaticamente a partir do nome da empresa ✅
Após criar organização: redireciona para /dashboard ✅
Fluxo testado em produção ✅

Fase 2 — Páginas legais + Sobre Nós (concluído em 2026-05-10)

E-mail corporativo luciano@getdashia.com.br criado na Hostinger ✅
src/app/privacidade/page.tsx — Política de Privacidade LGPD compliant ✅
src/app/termos/page.tsx — Termos de Uso do SaaS ✅
src/components/AboutSection.tsx — Seção Sobre Nós com endereço físico ✅
Links no footer para /privacidade e /termos ✅
Tudo no ar em produção ✅

Dashboard — Logos de plataformas (concluído em 2026-05-10)

src/components/dashboard/ChannelsSection.tsx — seção "Canais" com logos oficiais ✅

Google Ads e Meta Ads: badge verde "Ativo"
Facebook, Instagram e TikTok: badge cinza "Em breve" com opacity


Legenda do gráfico de barras atualizada com ícones SiGoogleads e SiMeta ✅
Legenda do gráfico de donut atualizada com ícones de marca ✅
Cores das barras atualizadas para cores oficiais das plataformas ✅
Pacote react-icons instalado ✅

Dashboard — Página de Relatórios (concluído em 2026-05-10)

src/app/dashboard/layout.tsx — layout centralizado para todas as rotas /dashboard/* ✅
src/components/dashboard/DashboardSidebar.tsx — sidebar com usePathname() para item ativo ✅
src/app/dashboard/relatorios/page.tsx — página de relatórios ✅
src/components/dashboard/RelatoriosClient.tsx — client component com: ✅

Filtros de período (7/30/90 dias) e canal (Todos/Google Ads/Meta Ads)
4 cards: Investimento Total, Receita Gerada, ROAS Médio, CPA Médio
Gráfico de linha: Evolução do ROAS (últimos 30 dias)
Tabela de 6 campanhas com ícones de plataforma, badges de status e ROAS colorido por faixa


Link "Relatórios" na sidebar aponta para /dashboard/relatorios ✅

Fase 2 — Stripe (concluído em 2026-05-10)

Conta Stripe criada com luciano@getdashia.com.br ✅
3 planos criados no Stripe (modo teste): ✅

Starter: R$ 59,90/mês (lookup key: starter_mensal)
Pro: R$ 97,00/mês (lookup key: pro_mensal)
Business: R$ 197,00/mês (lookup key: business_mensal)
Todos com trial de 7 dias


src/lib/stripe.ts — cliente Stripe configurado ✅
src/app/api/stripe/checkout/route.ts — cria Checkout Session ✅
src/app/api/stripe/portal/route.ts — portal do cliente ✅
src/app/api/stripe/webhook/route.ts — handler de webhook ✅
src/app/precos/page.tsx — página de preços no ar ✅
src/app/precos/CheckoutButton.tsx — botão de checkout ✅
Webhook configurado no Stripe → https://www.getdashia.com.br/api/stripe/webhook ✅
Eventos monitorados: checkout.session.completed, customer.subscription., invoice.payment_ ✅
supabase/migrations/002_stripe_fields.sql rodado no Supabase ✅

Colunas adicionadas em profiles: stripe_customer_id, stripe_subscription_id, subscription_status, subscription_plan


Variáveis na Vercel: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET ✅
Checkout testado com cartão de teste 4242 4242 4242 4242 ✅

Fase 3 — Google Ads API (concluído em 2026-05-17)
Arquivos criados:

src/lib/crypto.ts — criptografia AES-256-GCM para tokens OAuth ✅
src/lib/integrations/google-ads.ts — função fetchGoogleAdsData(accessToken, accountId) via GAQL ✅
src/app/api/integrations/google/connect/route.ts — gera URL OAuth e redireciona para Google ✅
src/app/api/integrations/google/callback/route.ts — recebe code, troca por tokens, salva no Supabase ✅

Variáveis de ambiente adicionadas na Vercel:

GOOGLE_CLIENT_ID ✅
GOOGLE_CLIENT_SECRET ✅
GOOGLE_ADS_DEVELOPER_TOKEN ✅
TOKEN_ENCRYPTION_KEY (chave AES-256 de 64 hex chars) ✅

Fluxo OAuth implementado:

Usuário clica "Conectar Google Ads" → redireciona para Google
Google redireciona para /api/integrations/google/callback com code
Callback: getToken(code) → setCredentials(tokens) → busca Customer ID via listAccessibleCustomers v19
Salva na tabela integrations com campos: platform, access_token_encrypted, refresh_token_encrypted, token_expires_at, account_id, organization_id
Se Customer ID não encontrado: salva com account_id = 'pending' e redireciona para /dashboard?setup=pending

Dashboard atualizado:

Converte para async server component ✅
Quando sem integração: mostra DEMO_METRICS + botão "Conectar Google Ads" ✅
Quando com integração: busca dados reais via fetchGoogleAdsData() ✅
Quando integração conectada mas sem campanhas: mostra zeros reais + aviso amarelo ✅
Gráficos (Charts.tsx) recebem prop isLive={hasIntegration} — zeros quando conectado, demo quando não ✅

Conta Google Ads conectada:

Customer ID (MCC): 4534828300 (MCC de Automações Luciano)
Conta não tem campanhas ativas → dashboard mostra zeros reais corretamente
Token salvo na tabela integrations no Supabase ✅

Observação importante: O Customer ID 4534828300 é uma conta MCC (Manager Account). Quando um cliente conectar uma conta com campanhas ativas, os dados reais vão aparecer automaticamente.
Verificação do Google OAuth App (em andamento — 2026-05-17)

App publicado em modo "Em produção" (não mais "Teste") ✅
Logo 120x120px criado e enviado ✅
Branding configurado: página inicial, política de privacidade, termos ✅
Domínio getdashia.com.br verificado no Google Search Console ✅

Registro TXT adicionado no DNS da Hostinger ✅


Vídeo de demonstração gravado e publicado no YouTube (não listado): https://youtu.be/utnSgDH50m4 ✅
Justificativa do escopo preenchida ✅
App submetido para verificação do Google ✅ — aguardando análise (3-7 dias úteis)


Em andamento
Meta Ads API

Acesso ao developers.facebook.com iniciado mas não concluído
Problema: verificação por SMS não chegou no número (11) 94320-4940
Pendente: resolver verificação e criar o app de desenvolvedor


Pendente (ordem planejada)

Aguardar aprovação da verificação Google OAuth (3-7 dias úteis) — email para lucianosantana48@gmail.com
Resolver acesso Meta Ads API (developers.facebook.com)
Tela de onboarding para o cliente informar Customer ID do Google Ads (quando account_id = 'pending')
Stripe: migrar para modo produção (verificar empresa no Stripe)
Página de Configurações (perfil do usuário, nome da organização)
Substituir dados mock do dashboard e relatórios por dados reais do banco
Reconectar conta Google Ads do Luciano (foi deletada do Supabase para gravar vídeo demo)

5. CREDENCIAIS E CONTAS IMPORTANTES

E-mail corporativo: luciano@getdashia.com.br (Hostinger)
Stripe: dashboard.stripe.com — conta em modo teste
Google Ads MCC: 453-482-8300 (MCC de Automações Luciano) — Customer ID sem traços: 4534828300
Google Cloud projeto: GetDashia (ID: getdashia)
Supabase: projeto getdashia, região São Paulo
Vercel: projeto projeto-getdashia
YouTube vídeo demo OAuth: https://youtu.be/utnSgDH50m4

6. CONTEXTO PESSOAL

Quem sou: Luciano (LuSan1986) — estou aprendendo programação na prática usando IA, não sou dev profissional.
Ferramentas: uso o Claude Code dentro do VS Code (PowerShell) para grandes tarefas; o chat como mentor estratégico para planejar e revisar.
Papel do chat: mentor estratégico — revisa planos antes da execução, explica o "porquê", orienta passo-a-passo no Windows.
Tom preferido: passo-a-passo simples, sem jargão, como se ensinasse alguém de 16 anos curioso e motivado.
Honestidade: sem números inventados, sem depoimentos falsos.
Respostas curtas sempre que possível.

7. DIRETRIZES TÉCNICAS (as 10 regras do projeto)

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

8. PRÓXIMO PASSO IMEDIATO

Aguardar e-mail de aprovação da verificação Google OAuth (lucianosantana48@gmail.com)
Reconectar conta Google Ads do Luciano no dashboard (foi deletada para gravar vídeo)
Resolver verificação SMS no developers.facebook.com para criar app Meta Ads
Construir tela para cliente informar Customer ID do Google Ads (quando account_id = 'pending')
Stripe: migrar para modo produção
Página de Configurações (perfil do usuário, nome da organização)