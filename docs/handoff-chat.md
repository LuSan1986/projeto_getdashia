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
```
src/
  components/
  lib/
    db/
    integrations/
  types/
```

---

## 3. DOCUMENTAÇÃO DO PRODUTO

O PRD completo está em **`docs/PRD_GetDashia.md`** no repositório. Contém:
- Problema, solução e proposta de valor
- Personas (gestor de tráfego, dono de e-commerce)
- Roadmap dividido em 3 fases
- 10 diretrizes de desenvolvimento

---

## 4. ESTADO ATUAL

**Última atualização:** 2026-05-03

### Concluído

**Fase 1 / Passos 0–4 — Landing v1 completa**
- Infraestrutura: Git local, GitHub privado, Next.js 16 com diretório `src/`, shadcn/ui inicializado.
- Landing page com 10 seções: Header, Hero, Problema, Como Funciona, Funcionalidades, Prova Social, Planos, FAQ, CTA Final, Footer.
- OG image, `sitemap.ts`, `robots.ts` implementados.
- Build local limpo (`npm run build` sem erros).
- Tudo commitado e pushado para o GitHub.

**Deploy na Vercel — concluído**
- Projeto `projeto-getdashia` deployado no plano Hobby.
- URL provisória ativa: `projeto-getdashia.vercel.app` ✅
- DNS configurado no Hostinger: `A @ → 216.198.79.1` e `CNAME www → cname.vercel-dns.com` ✅
- `www.getdashia.com.br` conectado e SSL sendo gerado ✅

### Em andamento

- **Propagação DNS do domínio raiz:** `getdashia.com.br` ainda mostra "Invalid Configuration" na Vercel — aguardando propagação (pode levar até 30 min).

### Pendente (ordem planejada)

1. Confirmar que `getdashia.com.br` ficou verde na Vercel (Refresh após propagação DNS)
2. Testar `https://getdashia.com.br` no navegador
3. **Fase 2:** Supabase (auth + banco), OAuth Google Ads, dashboard básico, captura de e-mails da waitlist em banco real

---

## 5. CONTEXTO PESSOAL

- **Quem sou:** Luciano (LuSan1986) — estou aprendendo programação na prática usando IA, não sou dev profissional.
- **Ferramentas:** uso o Claude Code dentro do VS Code (PowerShell) para construir o código.
- **Papel do chat:** o assistente neste chat é mentor estratégico — revisa planos antes da execução, explica o "porquê" das coisas, orienta passo-a-passo no Windows.
- **Tom preferido:** passo-a-passo simples, explicar conceitos antes de comandos, sem jargão não definido, como se ensinasse alguém de 16 anos curioso e motivado.
- **Honestidade:** sem números inventados, sem depoimentos falsos — o produto deve refletir seu estado real.
- **Respostas curtas** sempre que possível para economizar o limite de contexto do chat.

---

## 6. DIRETRIZES TÉCNICAS (as 10 regras do projeto)

1. **Stack obrigatória** — sem alternativas: Next.js 16+ App Router, TypeScript, Tailwind CSS, shadcn/ui, Supabase, Stripe, Vercel, Resend.
2. **Estrutura de pastas** — `src/components/`, `src/lib/db/`, `src/lib/integrations/`, `src/types/`.
3. **Multi-tenancy** — todas as queries ao Supabase filtram por `organization_id`.
4. **Segurança** — chaves e secrets nunca em código; sempre `process.env`. Arquivo `.env` protegido pelo `.gitignore`.
5. **Mobile-first** — layout pensado primeiro para telas pequenas, expandido com breakpoints Tailwind.
6. **Português brasileiro** — toda interface voltada ao usuário final escrita em pt-BR.
7. **Foco no MVP da Fase 1** — não antecipar funcionalidades das Fases 2 ou 3.
8. **Commits semânticos** — formato `tipo(escopo): descrição em inglês`. Ex.: `feat(landing): add hero section`.
9. **Build local antes do push** — rodar `npm run build` sem erros antes de qualquer `git push`.
10. **Dark-first** — paleta zinc/indigo, tema escuro como padrão.

---

## 7. PRÓXIMO PASSO IMEDIATO

Aguardar propagação DNS (15–30 min) e clicar em **Refresh** ao lado de `getdashia.com.br` na Vercel (Settings → Domains).

Quando ficar verde, testar `https://getdashia.com.br` no navegador.
Em seguida, iniciar a **Fase 2** com Supabase.

---

## 8. COMO USAR ESTE ARQUIVO

1. **Antes de migrar de chat:** atualize a seção **4. ESTADO ATUAL** — mova o que foi concluído para "Concluído", atualize "Em andamento" e "Pendente", e escreva o próximo passo concreto na seção **7. PRÓXIMO PASSO IMEDIATO**.
2. **Ao abrir um chat novo:** copie o conteúdo completo deste arquivo e cole como primeira mensagem.
3. **Versionamento:** commite este arquivo sempre que atualizar, para manter o histórico de progresso no Git.

```powershell
# Após atualizar o arquivo:
git add docs/handoff-chat.md
git commit -m "docs: update handoff with current project state"
git push
```