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
IA: OpenAI API (gpt-4o-mini)


Estrutura de pastas obrigatória:

src/
  components/
    landing/
    dashboard/
  lib/
    db/
    integrations/
  types/

3. DOCUMENTAÇÃO DO PRODUTO

O PRD completo está em docs/PRD_GetDashia.md no repositório.

4. ESTADO ATUAL

Sessão 10 — concluído em 2026-08-09

Bloqueio de faturamento resolvido na conta GetDashia (530-781-4497) ✅
- Conta estava sem perfil de pagamento vinculado
- Perfil de pagamento (Luciano de Santana Oliveira) + cartão Mastercard vinculados
- Pagamento manual configurado — saldo inicial R$ 40,00
- 1ª campanha de Pesquisa criada na conta correta (530-781-4497): "Campaign #1"
- Campanhas antigas Teste-GetDashia-2 e Teste-GetDashia-03 pausadas (economia de orçamento)
- Tag Google Ads (gtag.js, ID: AW-18379845957) instalada em src/app/layout.tsx via next/script ✅

Correção crítica na integração Google Ads do GetDashia ✅
- Bug encontrado: OAuth conectava automaticamente à primeira conta acessível 
  (428-562-3921), ignorando a conta correta do usuário
- Implementada tela /dashboard/integracoes/google-ads/selecionar-conta que lista 
  contas-cliente (incluindo as de dentro de contas gerenciadoras/MCC via query 
  customer_client) e deixa o usuário escolher qual conectar
- Resolve também o caso de futuros clientes com múltiplas contas de anúncio
- Testado e confirmado: app agora conecta corretamente à conta GetDashia (530-781-4497)

Pesquisa TikTok Ads API — decisão: adiar
- TikTok Marketing API é a mais rigorosa entre as redes (Business Center, revisão 
  de app com vídeo/documentação, verificação de negócio, auditoria de segurança de dados)
- Decisão: focar em concluir a verificação do Meta Ads primeiro, TikTok fica para depois

Integração real do Meta Ads implementada ✅
- Rota src/app/api/meta-ads/campaigns/route.ts criada, buscando campanhas e 
  insights reais da Marketing API (act_445093580217547)
- Dados mock do Meta Ads substituídos por dados reais em Relatórios
- Corrigido bug de date_preset inválido (last_30_days → last_30d)

App GetDashia rejeitado na revisão da Meta em 2026-08-04 — motivo identificado:
- business_management e ads_read: screencast não mostrou fluxo completo (Meta pede 
  novo vídeo em inglês, com legendas, mostrando login + concessão de permissão + uso real)
- Marketing API Access Tier: sem chamadas suficientes à API nos últimos 15 dias
- Ação em andamento: uso real da API do Meta Ads sendo gerado diariamente 
  (lembrete automático configurado às 20h) até completar ~15 dias (previsão: 24/08/2026)

Dois bugs corrigidos na Visão Geral do dashboard (/dashboard) ✅
- Bug 1: mensagem "Nenhuma campanha encontrada" aparecia mesmo com campanhas ativas 
  — corrigido criando DashboardGoogleMetrics.tsx, reaproveitando a mesma rota 
  /api/google-ads/campaigns já usada em Relatórios
- Bug 2: cards de Cliques e Impressões mostravam "0000" em vez de "0" — corrigido 
  formatação numérica

Sessão 9 — concluído em 2026-07-12

Redesign cyberpunk da landing page — estilo tech escuro com traços PCB, efeitos neon ciano/magenta:


Hero (src/components/landing/hero.tsx) ✅

Fundo #050B18 com traços PCB únicos (ciano + magenta + roxo)
Título: "montar" em ciano, "relatório" em magenta
Botões com gradiente ciano→magenta e glow
Dashboard animado com borda neon e box-shadow triplo
Diamante ✦ pulsante no canto inferior direito



Seção "O problema" (src/components/landing/problema.tsx) ✅

Cards com borda neon e background rgba(10,15,30,0.8)
Ícones coloridos: ciano / magenta / roxo
Traços PCB no fundo



Seção "Como funciona" (src/components/landing/como-funciona.tsx) ✅

Números 01/02/03 com glow neon (ciano/magenta/roxo)
Linha conectora tracejada entre os 3 passos
Ícones com círculo e border colorida



Seção "Tudo que você precisa" (src/components/landing/funcionalidades.tsx) ✅

6 cards com ícones de 6 cores diferentes
Atribuição multi-touch → ciano
Dashboard → magenta
PDF → roxo
Multi-cliente → azul
White-label → verde
Filtros → laranja



Seção "Ferramentas" (src/components/landing/prova-social.tsx) ⚠️ PENDENTE AJUSTE

Grid 2x2 com 4 plataformas: Google Ads, Meta Ads, Google Analytics, TikTok Ads
Logos reais em /public/logos/ (google-ads.png, meta-ads.png, google-analytics.png, tiktok-ads.png)
Conexões PCB entre os cards
Problema: Google Ads e TikTok Ads com logo não aparecendo corretamente
Próximo passo: substituir por SVG inline correto ou usar logos com fundo transparente





Sessão 8 — concluído em 2026-07-06


MEI aberto: CNPJ 67.845.823/0001-99 — Luciano de Santana Oliveira ✅
Portfólio empresarial "GetDashia" criado no Meta Business Manager ✅
App configurado como Provedor de Tecnologia no Meta Developer Portal ✅
Verificação da empresa: ✅ Aprovada
Verificação do acesso: ⏳ Em análise (até 5 dias úteis)

Formulário preenchido: Plataforma de SaaS, descrição do serviço, site getdashia.com.br





Sessão 7 — concluído em 2026-05-27


OAuth Google aprovado (escopo adwords) ✅
Rota /api/google-ads/campaigns criada — dados reais, refresh de token automático ✅
Mock data removido de RelatoriosClient ✅
API version corrigida de v19 para v18 ✅
Card "Plano Grátis" adicionado na página de Preços ✅
E-mail de confirmação funcionando via Resend + Supabase SMTP ✅


Pendente (ordem planejada)

Aguardar ~15 dias de uso real da API do Meta Ads (previsão: 24/08/2026), depois 
regravar screencast em inglês e reenviar business_management + ads_read + 
Marketing API Access Tier para revisão da Meta
Decidir o que fazer com a campanha duplicada em 428-562-3921 (pausar ou excluir)
TikTok Ads API — adiado, avaliar depois que Meta for aprovado (API mais rigorosa: 
Business Center, revisão de app, verificação de negócio, auditoria de segurança)
Corrigir logos na seção de ferramentas — Google Ads e TikTok Ads não aparecem
Redesign das seções restantes da landing page: Preços, FAQ, Footer, seção 
"Seu trabalho é gerar resultado"
Adicionar gestor de tráfego como Testador no Meta Developer Portal
Stripe → migrar para produção com CNPJ do MEI
Remover card "Plano Grátis" após período de testes beta


5. CREDENCIAIS E CONTAS IMPORTANTES


E-mail corporativo: luciano@getdashia.com.br (Hostinger)
Stripe: dashboard.stripe.com — modo teste
Google Ads MCC: 453-482-8300 — Customer ID: 4534828300 (sem campanhas ativas)
Google Cloud projeto: GetDashia (ID: getdashia)
OpenAI: platform.openai.com — chave GetDashia (gpt-4o-mini)
Supabase: projeto getdashia, região São Paulo
Vercel: projeto projeto-getdashia — branch main = produção
YouTube vídeo demo OAuth: https://youtu.be/utnSgDH50m4
Meta Developer: App GetDashia — App ID: 1291266016409615

Conta admin: jcjessica81@gmail.com (conta da Jéssica Cristina)
Ad Account conectado: act_445093580217547



Meta Business Manager: Portfólio "GetDashia" — Verificação da empresa ✅ Aprovada
MEI: CNPJ 67.845.823/0001-99 — Luciano de Santana Oliveira


6. CONTEXTO PESSOAL


Quem sou: Luciano (LuSan1986) — estou aprendendo programação na prática usando IA, não sou dev profissional.
Ferramentas: Claude Code no VS Code (PowerShell) para implementação; chat como mentor estratégico.
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


Corrigir logos na seção "Funciona com as ferramentas" — Google Ads e TikTok Ads não aparecem (usar SVG inline correto ou PNG com fundo transparente)
Continuar redesign cyberpunk nas seções restantes: Preços, FAQ, Footer
Aguardar e-mail do Meta com resultado da Verificação de Acesso