# GetDashia — Handoff de Chat

> **Como usar:** Antes de migrar para um novo chat, atualize a seção **ESTADO ATUAL** com o que foi feito e o próximo passo. Depois copie o conteúdo completo deste arquivo e cole como primeira mensagem no chat novo.

---

## 1. IDENTIFICAÇÃO DO PROJETO

| Campo | Valor |
|---|---|
| **Nome** | GetDashia |
| **Descrição** | SaaS brasileiro de atribuição multi-canal e dashboards para gestores de tráfego e donos de e-commerce — centraliza Google Ads, Meta Ads e e-commerce em um único painel. |
| **Domínio** | getdashia.com.br (registrado na Hostinger) |
| **Repositório** | github.com/LuSan1986/projeto_getdashia (privado) |
| **Pasta local** | C:\Users\Jéssica Cristina\projeto\projeto_getdashia |
| **Sistema Operacional** | Windows 11 — terminal PowerShell, editor VS Code |
| **Usuário GitHub** | LuSan1986 |

---

## 2. STACK TÉCNICA COMPLETA

- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS
- **Componentes:** shadcn/ui — preset `nova`, base `zinc`, accent `indigo`
- **Banco de dados / Auth:** Supabase
- **Pagamentos:** Stripe
- **Deploy:** Vercel
- **E-mail transacional:** Resend

### Estrutura de pastas obrigatória

src/
components/
lib/
db/
integrations/
types/

---

## 3. DOCUMENTAÇÃO DO PRODUTO

O PRD completo está em **`docs/PRD_GetDashia.md`** no repositório.

---

## 4. ESTADO ATUAL

**Última atualização:** 2026-05-04

### Concluído

**Fase 1 — Landing v1 completa**
- Infraestrutura: Git local, GitHub privado, Next.js 16, shadcn/ui.
- Landing page com 10 seções completas.
- OG image, `sitemap.ts`, `robots.ts` implementados.
- Deploy na Vercel: `www.getdashia.com.br` com SSL ativo ✅

**Fase 2 — Waitlist (concluído)**
- Projeto `getdashia` criado no Supabase (região São Paulo) ✅
- Tabela `waitlist` com RLS e policy de inserção pública ✅
- `src/lib/supabase.ts` com cliente usando chaves legadas ✅
- API route `src/app/api/waitlist/route.ts` implementada ✅
- Variáveis de ambiente na Vercel corrigidas e funcionando ✅
- Formulário testado: dados chegando no Supabase ✅

### Em andamento

- Nada no momento.

### Pendente (ordem planejada)

1. Fase 2: autenticação de usuários (Supabase Auth)
2. Fase 2: dashboard básico

---

## 5. CONTEXTO PESSOAL

- **Quem sou:** Luciano (LuSan1986) — estou aprendendo programação na prática usando IA, não sou dev profissional.
- **Ferramentas:** uso o Claude Code dentro do VS Code (PowerShell).
- **Papel do chat:** mentor estratégico — revisa planos antes da execução, explica o "porquê", orienta passo-a-passo no Windows.
- **Tom preferido:** passo-a-passo simples, sem jargão, como se ensinasse alguém de 16 anos curioso e motivado.
- **Honestidade:** sem números inventados, sem depoimentos falsos.
- **Respostas curtas** sempre que possível.

---

## 6. DIRETRIZES TÉCNICAS (as 10 regras do projeto)

1. **Stack obrigatória** — Next.js 16+ App Router, TypeScript, Tailwind CSS, shadcn/ui, Supabase, Stripe, Vercel, Resend.
2. **Estrutura de pastas** — `src/components/`, `src/lib/db/`, `src/lib/integrations/`, `src/types/`.
3. **Multi-tenancy** — todas as queries ao Supabase filtram por `organization_id`.
4. **Segurança** — chaves e secrets nunca em código; sempre `process.env`.
5. **Mobile-first** — layout pensado primeiro para telas pequenas.
6. **Português brasileiro** — toda interface voltada ao usuário final em pt-BR.
7. **Foco no MVP** — não antecipar funcionalidades futuras.
8. **Commits semânticos** — `tipo(escopo): descrição em inglês`.
9. **Build local antes do push** — `npm run build` sem erros antes do `git push`.
10. **Dark-first** — paleta zinc/indigo, tema escuro como padrão.

---

## 7. PRÓXIMO PASSO IMEDIATO

Iniciar autenticação de usuários com Supabase Auth: criar fluxo de cadastro e login (e-mail + senha), proteger rotas do dashboard.

---

## 8. COMO USAR ESTE ARQUIVO

1. **Antes de migrar de chat:** atualize a seção **4. ESTADO ATUAL**.
2. **Ao abrir um chat novo:** cole o conteúdo completo como primeira mensagem.
3. **Versionamento:** commite sempre que atualizar.