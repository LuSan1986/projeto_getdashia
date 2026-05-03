# PRD — GetDashia

**Product Requirement Document**
SaaS de atribuição multi-canal e dashboards inteligentes para gestores de tráfego e donos de e-commerce.

| Campo | Valor |
|---|---|
| Projeto | GetDashia |
| Domínio | getdashia.com.br |
| Repositório | github.com/LuSan1986/projeto_getdashia |
| Versão do PRD | v1.0 |
| Data | Maio de 2026 |

---

## 1. Visão Geral

GetDashia é um SaaS brasileiro que centraliza dados de Google Ads, Meta Ads e tráfego orgânico em um único painel com foco em **atribuição multi-canal**. O diferencial em relação aos concorrentes (Dashcortex, DashPremium, Mochila do Gestor) é reconstruir a jornada real do cliente em compras complexas com múltiplos pontos de contato — provando, com clareza, qual canal de fato gerou cada venda.

O produto opera em modelo de assinatura mensal/anual, é multiempresa (cada gestor administra vários clientes em painéis isolados) e oferece white-label opcional para agências.

---

## 2. Problema Identificado

Gestores de tráfego e donos de e-commerce perdem horas montando relatórios manuais para tentar provar quais canais estão gerando vendas reais. O problema piora porque a jornada de compra moderna é fragmentada: o cliente vê um anúncio no Google Ads, depois um no Meta Ads, pesquisa no orgânico, e só então compra. Cada plataforma "leva o crédito" da venda, gerando relatórios contraditórios e decisões de orçamento erradas.

Hoje, gestores precisam abrir Google Ads, Meta Ads, Google Analytics e planilhas manuais para tentar consolidar uma visão única — perdem tempo, cometem erros de cálculo e ainda assim não conseguem provar com clareza para o cliente onde o investimento está realmente trazendo retorno.

### Impacto mensurável

- **Tempo**: gestores gastam em média 1 dia inteiro por semana montando relatório manual.
- **Dinheiro**: decisões de orçamento erradas levam a desperdício de R$ 500 a R$ 5.000/mês por cliente.
- **Reputação**: falta de prova clara de retorno reduz retenção de clientes em agências.
- **Confiança**: cliente final não entende números fragmentados e desconfia do trabalho.

---

## 3. Descrição da Solução

GetDashia resolve esse problema com três pilares:

### 3.1 Centralização inteligente de dados

Conexão automática via APIs oficiais com Google Ads, Meta Ads, Google Analytics 4 e plataformas de e-commerce (Shopify, WooCommerce, Hotmart, Kiwify). Os dados são sincronizados em tempo real e armazenados de forma estruturada para análise.

### 3.2 Atribuição multi-touch

Diferente dos concorrentes que mostram métricas isoladas, o GetDashia reconstrói a jornada completa do cliente — desde o primeiro clique até a venda — e identifica quais pontos de contato foram decisivos. Modelos suportados: First Touch, Last Touch, Linear, Time Decay e Position-Based (40-20-40).

### 3.3 Painéis prontos e personalizáveis

Templates pré-configurados (CPA, ROAS, funil de conversão, comparativo entre canais) e painéis customizáveis por arrastar e soltar. Exportação em PDF agendada por e-mail (semanal ou mensal), com white-label opcional no plano Agência.

---

## 4. Funcionalidades

### 4.1 Selecionadas no escopo

- **Login e Autenticação**: e-mail/senha + Google OAuth + Magic Link via Resend.
- **Painéis de controle**: templates pré-prontos (CPA, ROAS, funil, jornada multi-touch, comparativo de canais) + painéis customizáveis.
- **Multiusuário**: vários colaboradores numa mesma conta agência, com perfis diferenciados.
- **Multiempresa**: cada gestor cadastra N empresas/clientes; cada empresa tem seu conjunto isolado de contas conectadas e usuários.
- **Permissões por usuário**: três níveis — Owner (gestor), Member (colaborador), Viewer (cliente final só visualiza).
- **Parte premium (paga)**: três planos com limites por contas conectadas e clientes ativos. Detalhes em 4.3.
- **Relatórios e Exportação**: PDF agendado por e-mail, com white-label opcional no plano Agência.
- **Integrações (API)**: Google Ads, Meta Marketing, Google Analytics 4, Shopify, WooCommerce, Hotmart, Kiwify.
- **Busca e Filtros**: filtragem por período, canal, campanha, cliente, ROAS mínimo, etc.
- **Página inicial**: landing page institucional em `getdashia.com.br` com seções de proposta de valor, prova social, FAQ e CTA.
- **Onboarding**: wizard guiado em 5 passos (criar conta → conectar primeira plataforma → configurar empresa → conectar e-commerce → ver primeiro insight).

### 4.2 Fora de escopo (não construir)

- Kanban — não se aplica a SaaS de dashboards.
- Calendário — não é necessário no fluxo principal.
- Bate-papo — não é core; suporte pode ser via Crisp/Intercom externamente.
- Upload de Arquivos — só fará sentido em v2, para logos white-label de agências.

### 4.3 Planos comerciais (estimativa inicial)

| Plano | Preço | Contas conectadas | Clientes ativos |
|---|---|---|---|
| Starter | R$ 97/mês | 3 | 1 |
| Pro | R$ 197/mês | 10 | Até 5 |
| Agência | R$ 497/mês | 50 | Até 30 + white-label |

---

## 5. Personas

### 5.1 Gestor de Tráfego Independente (persona principal)

Profissional autônomo ou freelancer, gerencia entre 3 e 15 clientes, ganha por mensalidade ou percentual do investimento. Usa Google Ads e Meta Ads diariamente. Hoje monta relatórios manualmente em Looker Studio ou Google Slides.

- **Dor principal**: perde 1 dia por semana só fazendo relatório.
- **Objetivo**: impressionar clientes e justificar honorários com dados claros.
- **Plano provável**: Starter ou Pro.

### 5.2 Agência de Marketing Digital (persona expansão)

Equipe de 3 a 20 pessoas, com 20 a 100 clientes ativos. Precisa de white-label, múltiplos colaboradores com permissões diferentes e padronização de relatórios.

- **Dor principal**: horas de operação consolidando dados manualmente.
- **Objetivo**: profissionalizar entrega e escalar atendimento sem aumentar custo.
- **Plano provável**: Agência (white-label).

### 5.3 Dono de E-commerce / Infoprodutor (consumidor final do dashboard)

Não é cliente direto do GetDashia, é quem o gestor atende. Não entende números a fundo, só quer saber "está dando lucro?". Acessa o painel só pra ver indicadores principais.

- **Critério de sucesso**: linguagem simples, gráficos claros, sem jargão técnico.
- **Objetivo**: confiar nos resultados sem precisar interpretar dezenas de métricas.
- **Plano provável**: acesso fornecido pelo gestor (Viewer).

### 5.4 Admin Master (interno do GetDashia)

O próprio time do GetDashia gerenciando o sistema, monitorando assinantes, métricas de uso, suporte e ajustes de produto.

- **Foco**: manter saúde do sistema, retenção e churn.
- **Acesso**: painel administrativo separado fora do produto principal.

---

## 6. Pilha Tecnológica

### 6.1 Stack adotada

- **Next.js 16+** (App Router): framework full-stack React com server components e server actions.
- **React 19**: biblioteca de UI (já vem com Next.js).
- **Tailwind CSS**: estilização utility-first.
- **shadcn/ui**: componentes acessíveis e bonitos prontos pra produção.
- **Supabase**: autenticação, PostgreSQL gerenciado, storage e Edge Functions.
- **Stripe**: pagamentos recorrentes com checkout pronto e cupons.
- **Vercel**: deploy, CI/CD, edge runtime e domínio personalizado.
- **TypeScript**: tipagem estática para prevenir bugs.
- **Resend**: e-mails transacionais (boas-vindas, magic link, relatórios PDF).

### 6.2 Não selecionadas (já cobertas)

- **Node.js**: Next.js já roda em Node automaticamente.
- **PostgreSQL**: já incluso no Supabase, não precisa contratar separado.
- **Prisma**: Supabase tem cliente próprio (`supabase-js`); Prisma seria redundância.
- **tRPC**: Server Actions do Next.js cobrem o caso de uso.

---

## 7. Referências de Design

- **Dashcortex** (https://dashcortex.com): estrutura geral de dashboards multi-canal e posicionamento para gestor de tráfego.
- **Meavisaai** (https://meavisaai.com.br): inspiração de simplicidade no onboarding e linguagem brasileira informal.
- **Linear** (https://linear.app): clean, escuro, tipografia premium — referência de qualidade visual.
- **Vercel Dashboard**: cards e métricas inline, espaçamento generoso, hierarquia tipográfica.
- **Stripe Dashboard**: hierarquia visual de números importantes vs. secundários, gráficos limpos.
- **Notion**: blocos modulares e personalização de painéis pelo usuário.

---

## 8. Roadmap em Fases

### Fase 1 — MVP (4 a 6 semanas)

Validação rápida com o próprio fundador como primeiro cliente.

- Landing page em `getdashia.com.br`.
- Login e autenticação (Supabase Auth + magic link).
- Conexão Google Ads (OAuth).
- 1 dashboard padrão (CPA, ROAS, gasto, conversões).
- Cadastro de 1 cliente/empresa.
- Exportar relatório em PDF.
- Deploy em Vercel + DNS Hostinger.

### Fase 2 — v0.5 (mais 4 semanas)

Abrir para os primeiros assinantes pagantes.

- Conexão Meta Ads.
- Multiempresa (vários clientes por conta).
- Cobrança via Stripe (planos Starter e Pro).
- Onboarding guiado em 5 passos.
- E-mails transacionais via Resend.

### Fase 3 — v1.0 (mais 6 semanas)

Diferencial competitivo e plano premium.

- Atribuição multi-touch (5 modelos de atribuição).
- Conexão Google Analytics 4.
- Conexão plataformas de e-commerce (Shopify, Hotmart).
- White-label para plano Agência.
- Permissões granulares (Owner/Member/Viewer).
- Painéis customizáveis (drag-and-drop).

---

## 9. Infraestrutura e Domínio

Domínio próprio: `getdashia.com.br`, registrado na Hostinger. Arquitetura de URLs:

- **getdashia.com.br** — landing page institucional, blog, política de privacidade, termos de uso.
- **app.getdashia.com.br** — aplicativo SaaS (login, painéis, configurações).
- **admin.getdashia.com.br** — painel administrativo interno (acesso restrito ao time GetDashia).

Toda a infraestrutura roda no Vercel com SSL automático. DNS configurado no Hostinger apontando registros A e CNAME para os endpoints da Vercel.

---

## 10. Segurança e Conformidade

- **Autenticação**: Supabase Auth com hash bcrypt, sessões JWT, suporte a SSO Google.
- **Banco de dados**: PostgreSQL gerenciado pelo Supabase, com Row Level Security (RLS) ativado em todas as tabelas multi-tenant.
- **Credenciais de API**: tokens OAuth dos clientes armazenados criptografados (AES-256) em coluna dedicada do banco.
- **LGPD**: política de privacidade, consentimento explícito no signup, possibilidade de exportar e excluir dados pessoais (Direito do Titular).
- **Backups**: snapshots diários automáticos do Supabase com retenção de 7 dias (plano Pro) ou 30 dias (plano Team).

---

## 11. Análise de Concorrentes

| Produto | Foco | Preço aprox. | Diferencial GetDashia |
|---|---|---|---|
| Dashcortex | Dashboards multi-canal via Looker Studio | R$ 200-500/mês | Atribuição multi-touch própria, sem dependência do Looker |
| DashPremium | Centralização Meta + Google + e-commerce | R$ 297/mês | UX moderna, white-label nativo, jornada do cliente |
| Mochila do Gestor | Painel pronto para gestor | R$ 197/mês | Multi-cliente real e relatórios automatizados por e-mail |
| Master Insights AD$ | Personalizável sem mensalidade | Pagamento único | SaaS com atualizações constantes vs produto estático |
| DashBoost (Hotmart) | Dashboard básico | R$ 97/mês | Foco em atribuição, não só visualização de números |

---

## 12. Próximos Passos Imediatos

1. ~~Fazer backup dos arquivos atuais do Hostinger~~ ✅ feito.
2. ~~Estruturar projeto Next.js novo no VS Code~~ ✅ feito.
3. ~~Criar `.gitignore` impedindo commit de arquivos sensíveis~~ ✅ feito.
4. ~~Inicializar repositório Git local~~ ✅ feito.
5. ~~Criar repositório no GitHub e fazer primeiro push~~ ✅ feito.
6. **Configurar deploy na Vercel + DNS Hostinger**.
7. **Configurar Supabase** (autenticação + banco) e criar projeto.
8. **Implementar landing page e fluxo de signup**.
9. **Implementar conexão Google Ads** (Fase 1).
10. **Lançar MVP** para testar com a MCC do fundador.

---

## Diretrizes para o Desenvolvimento (importante para Claude Code)

Claude Code, este é o documento mestre do projeto GetDashia. Ao trabalhar neste codebase:

1. **Stack obrigatória**: use sempre Next.js 16+ com App Router, TypeScript, Tailwind CSS, shadcn/ui, Supabase. Nunca proponha alternativas como Express, Vue ou Remix.

2. **Estrutura de pastas**: respeite a convenção do Next.js App Router. Componentes em `src/components/`, lógica de banco em `src/lib/db/`, integrações de API em `src/lib/integrations/`, tipos em `src/types/`.

3. **Multi-tenancy**: todos os dados são multi-empresa. Toda query no Supabase deve filtrar por `organization_id` (ou similar) para isolamento.

4. **Segurança em primeiro lugar**: chaves de API e tokens OAuth nunca podem aparecer em código. Sempre use variáveis de ambiente (`.env.local`) e o `process.env` do Node.

5. **Component-first**: prefira shadcn/ui antes de criar componente novo. Só crie componente custom quando shadcn não cobrir.

6. **Mobile-first**: todo design começa pelo mobile e progride para desktop com breakpoints do Tailwind.

7. **Português do Brasil**: textos da interface, mensagens de erro, comentários e nomes de variáveis em português brasileiro quando se referirem ao domínio do produto. Variáveis técnicas podem manter inglês.

8. **Roadmap por fases**: foco atual é MVP (Fase 1). Não construa funcionalidades de Fase 2 ou 3 antes da Fase 1 estar funcional e testada.

9. **Commits semânticos**: mensagens de commit no formato `tipo(escopo): descrição` em inglês curto. Tipos: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`.

10. **Sempre teste antes de declarar pronto**: rode `npm run build` localmente antes de qualquer push para validar.
