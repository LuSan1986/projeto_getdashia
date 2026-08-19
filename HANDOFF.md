# GetDashia — Handoff de Chat

**Como usar:** Antes de migrar para um novo chat, atualize a seção ESTADO ATUAL com o que foi feito e o próximo passo. Depois copie o conteúdo completo deste arquivo e cole como primeira mensagem no chat novo.

## 1. IDENTIFICAÇÃO DO PROJETO

| Campo | Valor |
|---|---|
| Nome | GetDashia |
| Descrição | SaaS brasileiro de atribuição multi-canal e dashboards para gestores de tráfego e donos de e-commerce — centraliza Google Ads, Meta Ads e e-commerce em um único painel. |
| Domínio | getdashia.com.br (registrado na Hostinger) |
| Repositório | github.com/LuSan1986/projeto_getdashia (privado) |
| Pasta local | C:\Users\Jéssica Cristina\projeto\projeto_getdashia |
| Sistema Operacional | Windows 11 — terminal PowerShell, editor VS Code |
| Usuário GitHub | LuSan1986 |

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

**Estrutura de pastas obrigatória:**

src/
components/
landing/
dashboard/
lib/
db/
integrations/
types/

## 3. DOCUMENTAÇÃO DO PRODUTO

O PRD completo está em `docs/PRD_GetDashia.md` no repositório.

## 4. ESTADO ATUAL

### Resumo do estado do projeto (atualizado 18/08/2026)

O GetDashia está em fase de teste beta real, com cadastro aberto direto (sem mais captura de waitlist) e uma campanha paga rodando no Meta Ads para gerar os primeiros usuários reais. As integrações com Google Ads e Meta Ads já buscam dados reais (não mock) e agora suportam múltiplas contas de anúncio conectadas por cliente, com seletor no dashboard. O e-mail automático de boas-vindas (Resend) está funcionando na confirmação de cadastro. O dashboard recebeu tema visual cyberpunk (cores/tipografia, sem elementos decorativos extras) e métricas voltadas a gestores de tráfego (CPC médio, taxa de conversão, comparativo com período anterior). A verificação do Meta App Review segue pendente, aguardando ~15 dias de uso real da API (previsão de reenvio: ~24/08/2026) e um novo screencast em inglês.

### Sessão 13 — concluído em 2026-08-18

**Bug corrigido: conta errada do Meta Ads na integração**
- A campanha real "GetDashia - Divulgação Beta" estava na conta `act_825633728259357`, mas a integração salva no GetDashia apontava para `act_445093580217547` ("Jessica 1", conta compartilhada com outros clientes da agência)
- Corrigido via update direto na tabela `integrations`, depois resolvido de forma definitiva com a nova arquitetura multi-conta (abaixo)

**Nova arquitetura: múltiplas contas conectadas (Google Ads e Meta Ads)** ✅
- Callback OAuth do Meta lista todas as contas de anúncio acessíveis via Graph API (`/me/adaccounts`); se houver mais de uma, redireciona para tela de seleção `/dashboard/integracoes/meta-ads/selecionar-conta` (mesmo padrão do seletor já existente para Google Ads)
- Tabela `integrations` agora suporta múltiplas linhas por organização/plataforma (coluna `is_default` adicionada via migração SQL)
- Página de Integrações lista todas as contas conectadas por plataforma, com botão individual de "Desconectar" por conta, mais "+ Conectar outra conta"
- Dashboard (Visão Geral) ganhou seletor de "Conta" além dos canais, permitindo trocar qual conta de anúncios visualizar sem desconectar
- Testado: 3 contas Meta disponíveis (Jessica 1, Jessica Cristina, Casaco Infantil) — conectada a correta (`act_825633728259357`)

**Separação de dados Facebook x Instagram** ✅
- Rotas `/api/meta-ads/campaigns` e `/api/meta-ads/timeseries` agora usam `breakdowns=publisher_platform` na Meta Insights API
- Novo parâmetro `platform` (facebook | instagram) filtra os dados antes de agregar
- Abas Facebook e Instagram no dashboard mostram dados reais e diferentes (testado: Instagram R$0,10 / 18 impressões vs Facebook R$0,00 / 3 impressões)
- Removida a nota de "dados combinados" que existia antes

### Sessão 12 — concluído em 2026-08-16

**E-mail de boas-vindas (Resend) funcionando** ✅
- Função `sendWelcomeEmail` em `src/lib/emails/welcome.ts`, instanciando o Resend de forma lazy (dentro da função) para evitar erro de build
- Corrigido: gatilho estava na rota errada (`/auth/callback`) — movido para `/auth/confirm/route.ts`, que é a rota real usada pelo fluxo de confirmação do Supabase
- Corrigido: `RESEND_API_KEY` estava ausente nas variáveis de ambiente da Vercel — chave criada e adicionada
- Corrigido: condição checava `type === 'signup'`, mas o Supabase envia `type === 'email'` nesse fluxo — aceita os dois agora
- E-mail explica fase beta, status das integrações (Google Ads funcionando, Meta Ads em revisão) e contato via WhatsApp (11) 94320-4940

**Landing page: cadastro direto (fim da waitlist)** ✅
- Botões "Garantir meu lugar" (Hero, Header, CTA Final) agora levam direto para `/cadastro`, em vez de capturar e-mail na waitlist — decisão tomada porque os testes reais já começaram

**Campanha "GetDashia - Divulgação Beta" criada e publicada no Meta Ads** ✅
- Orçamento: R$10/dia, objetivo Tráfego/Cadastros, destino `getdashia.com.br/cadastro` com UTM (`utm_source=meta&utm_medium=cpc&utm_campaign=beta_divulgacao`)
- Criativo: screenshot da landing page (hero); texto focado no problema (múltiplas plataformas) + oferta beta gratuita; CTA "Cadastre-se"
- Identidade: Página do Facebook "GetDashia" criada (ID 1261264030411157) e vinculada ao Business Manager "Jessica Cristina"; perfil comercial do Instagram `@getdashia` criado e vinculado à mesma conta de anúncios
- Corrigido: cartão de pagamento desatualizado na conta de anúncios (bloqueava veiculação mesmo com status "Ativo")
- Campanha aprovada e ativa, gerando impressões/cliques reais

### Sessão 11 — concluído em 2026-08-15

**Segurança: campanha de teste do Google Ads pausada**
- Constatado que a campanha de teste gerou tráfego e leads reais antes do produto estar pronto — pausada por segurança
- 5 leads reais identificados na tabela `waitlist` do Supabase; mensagens de contato preparadas (e-mail/WhatsApp, telefone 11 94320-4940) — confirmar se envio foi concluído

**Métricas de gestor de tráfego adicionadas em Relatórios** ✅
- Colunas: CPC Médio (`custo / cliques`), Taxa de Conversão (`conversões / cliques * 100`)
- Ordem final das colunas: Campanha · Status · Impressões · Cliques · CTR · CPC Médio · Custo · Conversões · Taxa de Conv. · ROAS
- Comparativo com período anterior (▲/▼%) nos 4 cards principais, com lógica de cor por métrica (Investimento/CPA: ▲ vermelho, ▼ verde; Receita/ROAS: ▲ verde, ▼ vermelho)

**Bugs corrigidos no dashboard**
- Datas dos gráficos hardcoded (mostravam meses errados) → geração dinâmica a partir de `new Date()`
- Dados reais não atualizavam por cache do Next.js → `cache: 'no-store'` adicionado nas rotas de campanhas/timeseries, além de `force-dynamic`
- Abas de canal (Google/Facebook/Instagram/TikTok) não filtravam de fato os dados → nova arquitetura `DashboardClient` com estado `selectedChannel` controlando a fonte de dados exibida

**Redesign visual cyberpunk aplicado ao dashboard** ✅ (cores/tipografia apenas, sem elementos decorativos extras)
- Fundo #050B18, header com borda ciano, sidebar escura com destaque ciano nos itens ativos
- Botões e elementos de destaque com gradiente ciano→magenta
- Gráficos com paleta ciano/magenta/roxo

### Sessão 10 — concluído em 2026-08-09

**Bloqueio de faturamento resolvido na conta GetDashia (530-781-4497)** ✅
- Conta estava sem perfil de pagamento vinculado
- Perfil de pagamento (Luciano de Santana Oliveira) + cartão Mastercard vinculados
- Pagamento manual configurado — saldo inicial R$ 40,00
- 1ª campanha de Pesquisa criada na conta correta (530-781-4497): "Campaign #1"
- Campanhas antigas Teste-GetDashia-2 e Teste-GetDashia-03 pausadas (economia de orçamento)
- Tag Google Ads (gtag.js, ID: AW-18379845957) instalada em `src/app/layout.tsx` via `next/script` ✅

**Correção crítica na integração Google Ads do GetDashia** ✅
- Bug encontrado: OAuth conectava automaticamente à primeira conta acessível (428-562-3921), ignorando a conta correta do usuário
- Implementada tela `/dashboard/integracoes/google-ads/selecionar-conta` que lista contas-cliente (incluindo as de dentro de contas gerenciadoras/MCC via query `customer_client`) e deixa o usuário escolher qual conectar
- Resolve também o caso de futuros clientes com múltiplas contas de anúncio (evoluído na Sessão 13 para múltiplas contas conectadas simultaneamente)
- Testado e confirmado: app conecta corretamente à conta GetDashia (530-781-4497)

**Pesquisa TikTok Ads API — decisão: adiar**
- TikTok Marketing API é a mais rigorosa entre as redes (Business Center, revisão de app com vídeo/documentação, verificação de negócio, auditoria de segurança de dados)
- Decisão: focar em concluir a verificação do Meta Ads primeiro, TikTok fica para depois

**Integração real do Meta Ads implementada** ✅
- Rota `src/app/api/meta-ads/campaigns/route.ts` criada, buscando campanhas e insights reais da Marketing API
- Dados mock do Meta Ads substituídos por dados reais em Relatórios
- Corrigido bug de `date_preset` inválido (`last_30_days` → `last_30d`)

**App GetDashia rejeitado na revisão da Meta em 2026-08-04 — motivo identificado:**
- `business_management` e `ads_read`: screencast não mostrou fluxo completo (Meta pede novo vídeo em inglês, com legendas, mostrando login + concessão de permissão + uso real)
- Marketing API Access Tier: sem chamadas suficientes à API nos últimos 15 dias
- Ação em andamento: uso real da API do Meta Ads sendo gerado diariamente (lembrete automático configurado às 20h) até completar ~15 dias (previsão: 24/08/2026)

**Dois bugs corrigidos na Visão Geral do dashboard (`/dashboard`)** ✅
- Bug 1: mensagem "Nenhuma campanha encontrada" aparecia mesmo com campanhas ativas — corrigido criando `DashboardGoogleMetrics.tsx`, reaproveitando a mesma rota `/api/google-ads/campaigns` já usada em Relatórios
- Bug 2: cards de Cliques e Impressões mostravam "0000" em vez de "0" — corrigido formatação numérica

### Sessão 9 — concluído em 2026-07-12

Redesign cyberpunk da landing page — estilo tech escuro com traços PCB, efeitos neon ciano/magenta:

- **Hero** (`src/components/landing/hero.tsx`) ✅ — Fundo #050B18 com traços PCB (ciano + magenta + roxo); título com "montar" em ciano e "relatório" em magenta; botões com gradiente ciano→magenta e glow; dashboard animado com borda neon; diamante ✦ pulsante
- **Seção "O problema"** (`src/components/landing/problema.tsx`) ✅ — Cards com borda neon e fundo `rgba(10,15,30,0.8)`; ícones ciano/magenta/roxo; traços PCB no fundo
- **Seção "Como funciona"** (`src/components/landing/como-funciona.tsx`) ✅ — Números 01/02/03 com glow neon; linha conectora tracejada; ícones com borda colorida
- **Seção "Tudo que você precisa"** (`src/components/landing/funcionalidades.tsx`) ✅ — 6 cards com ícones de cores diferentes (atribuição multi-touch ciano, dashboard magenta, PDF roxo, multi-cliente azul, white-label verde, filtros laranja)
- **Seção "Ferramentas"** (`src/components/landing/prova-social.tsx`) ⚠️ **PENDENTE AJUSTE** — Grid 2x2 (Google Ads, Meta Ads, Google Analytics, TikTok Ads) com logos em `/public/logos/`; problema: logos do Google Ads e TikTok Ads não aparecem corretamente; próximo passo: substituir por SVG inline ou logos com fundo transparente

### Sessão 8 — concluído em 2026-07-06

- MEI aberto: CNPJ 67.845.823/0001-99 — Luciano de Santana Oliveira ✅
- Portfólio empresarial "GetDashia" criado no Meta Business Manager ✅
- App configurado como Provedor de Tecnologia no Meta Developer Portal ✅
- Verificação da empresa: ✅ Aprovada
- Verificação do acesso: ⏳ Em análise na época (concluída/rejeitada na Sessão 10 — ver acima)
- Formulário preenchido: Plataforma de SaaS, descrição do serviço, site getdashia.com.br

### Sessão 7 — concluído em 2026-05-27

- OAuth Google aprovado (escopo adwords) ✅
- Rota `/api/google-ads/campaigns` criada — dados reais, refresh de token automático ✅
- Mock data removido de `RelatoriosClient` ✅
- API version corrigida de v19 para v18 ✅
- Card "Plano Grátis" adicionado na página de Preços ✅
- E-mail de confirmação funcionando via Resend + Supabase SMTP ✅

## Pendente (ordem sugerida)

1. Aguardar completar ~15 dias de uso real da API do Meta Ads (previsão: 24/08/2026), regravar screencast em inglês mostrando login + concessão de permissão + uso real dos dados, e reenviar `business_management` + `ads_read` + Marketing API Access Tier para revisão da Meta
2. Investigar por que o menu lateral do dashboard (Relatórios/Integrações/Configurações) não aparece no navegador mobile real (a confirmar com print tirado direto do celular)
3. Confirmar se as mensagens de contato já foram enviadas aos 5 leads reais identificados no waitlist
4. Decidir o que fazer com a campanha duplicada em 428-562-3921 (pausar ou excluir)
5. Considerar criar alerta (e-mail/WhatsApp) para avisar sobre novos cadastros confirmados no GetDashia
6. Instalar o Pixel do Meta no site (adiado deliberadamente até agora)
7. Retomar/concluir o conector Supermetrics Facebook Ads (FA) — ficou autenticado mas com 503 persistente; útil para criar campanhas futuras direto no Claude
8. Corrigir logos na seção "Ferramentas" da landing page — Google Ads e TikTok Ads não aparecem
9. Redesign das seções restantes da landing page: Preços, FAQ, Footer
10. TikTok Ads API — avaliar depois que Meta for aprovado
11. Adicionar gestor de tráfego como Testador no Meta Developer Portal
12. Migrar Stripe para produção com CNPJ do MEI antes de cobrar de verdade — nesse momento, também migrar hosting do plano Vercel Hobby (gratuito, uso comercial não permitido) para o plano Pro (~$20/mês) e revisar limites gratuitos de Supabase/Resend caso o volume cresça
13. Remover card "Plano Grátis" após período de testes beta

## 5. CREDENCIAIS E CONTAS IMPORTANTES

- E-mail corporativo: luciano@getdashia.com.br (Hostinger)
- Stripe: dashboard.stripe.com — modo teste
- Google Ads MCC: 453-482-8300 — conta ativa GetDashia: 530-781-4497
- Google Cloud projeto: GetDashia (ID: getdashia)
- OpenAI: platform.openai.com — chave GetDashia (gpt-4o-mini)
- Supabase: projeto getdashia, região São Paulo — tabela `integrations` agora suporta múltiplas contas por plataforma (coluna `is_default`)
- Vercel: projeto projeto-getdashia — branch main = produção
- Resend: chave `getdashia-welcome-email` (permissão "Sending access") — usada em `src/lib/emails/welcome.ts`
- YouTube vídeo demo OAuth: https://youtu.be/utnSgDH50m4
- Meta Developer: App GetDashia — App ID: 1291266016409615
  - Conta admin: jcjessica81@gmail.com (conta da Jéssica Cristina)
  - Business Manager: "Jessica Cristina" (possui Página GetDashia, conta de anúncios `act_825633728259357` usada pela campanha real, e outras contas de outros clientes como `act_445093580217547` "Jessica 1")
  - Página do Facebook: GetDashia (ID 1261264030411157)
  - Instagram comercial: @getdashia (vinculado à mesma Business Manager)
- Meta Business Manager: Portfólio "GetDashia" — Verificação da empresa ✅ Aprovada (portfólio próprio, sem ativos — ativos reais estão em "Jessica Cristina")
- MEI: CNPJ 67.845.823/0001-99 — Luciano de Santana Oliveira

## 6. CONTEXTO PESSOAL

- Quem sou: Luciano (LuSan1986) — estou aprendendo programação na prática usando IA, não sou dev profissional.
- Ferramentas: Claude Code no VS Code (PowerShell) para implementação; chat como mentor estratégico.
- Tom preferido: passo-a-passo simples, sem jargão, como se ensinasse alguém de 16 anos curioso e motivado.
- Honestidade: sem números inventados, sem depoimentos falsos.
- Respostas curtas sempre que possível.

## 7. DIRETRIZES TÉCNICAS (as 10 regras do projeto)

1. Stack obrigatória — Next.js 16+ App Router, TypeScript, Tailwind CSS, shadcn/ui, Supabase, Stripe, Vercel, Resend.
2. Estrutura de pastas — `src/components/`, `src/lib/db/`, `src/lib/integrations/`, `src/types/`.
3. Multi-tenancy — todas as queries ao Supabase filtram por `organization_id`.
4. Segurança — chaves e secrets nunca em código; sempre `process.env`.
5. Mobile-first — layout pensado primeiro para telas pequenas.
6. Português brasileiro — toda interface voltada ao usuário final em pt-BR.
7. Foco no MVP — não antecipar funcionalidades futuras.
8. Commits semânticos — `tipo(escopo): descrição` em inglês.
9. Build local antes do push — `npm run build` sem erros antes do `git push`.
10. Dark-first — paleta zinc/indigo, tema escuro como padrão (dashboard evoluiu para tema cyberpunk ciano/magenta na Sessão 9-11).

## 8. PRÓXIMO PASSO IMEDIATO

1. Acompanhar a campanha "GetDashia - Divulgação Beta" e o acúmulo de dias de uso real da API do Meta Ads rumo a ~24/08/2026
2. Investigar o menu lateral não aparecendo no mobile real (pedir print direto do celular)
3. Corrigir logos na seção "Funciona com as ferramentas" da landing page (Google Ads e TikTok Ads não aparecem)
4. Continuar redesign cyberpunk nas seções restantes da landing page: Preços, FAQ, Footer

---

Não altere nada além de substituir o conteúdo pelo texto acima.