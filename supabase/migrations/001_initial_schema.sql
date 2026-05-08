-- =============================================================================
-- GetDashia — Migration 001: Schema inicial
-- =============================================================================
-- Rodar no SQL Editor do Supabase (dashboard > SQL Editor > New query)
-- =============================================================================


-- =============================================================================
-- 1. EXTENSÕES
-- =============================================================================

-- pgcrypto: usada internamente pelo Supabase para UUIDs e hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- =============================================================================
-- 2. TABELAS
-- =============================================================================

-- -----------------------------------------------------------------------------
-- TABELA 1: profiles
-- Um perfil por usuário autenticado (1:1 com auth.users do Supabase).
-- Armazena dados do gestor/colaborador/viewer que usa o GetDashia.
-- -----------------------------------------------------------------------------

CREATE TABLE profiles (
  -- Mesmo UUID do auth.users. Deletar usuário deleta o perfil.
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Nome completo do usuário
  full_name       TEXT,

  -- URL do avatar (Google OAuth preenche automaticamente)
  avatar_url      TEXT,

  -- Plano ativo do usuário no GetDashia
  -- Define quantos clientes e integrações ele pode criar.
  -- 'starter' | 'pro' | 'agencia'
  plan            TEXT NOT NULL DEFAULT 'starter'
                  CHECK (plan IN ('starter', 'pro', 'agencia')),

  -- IDs do Stripe para controle de assinatura (preenchidos quando o usuário paga)
  stripe_customer_id      TEXT UNIQUE,
  stripe_subscription_id  TEXT UNIQUE,

  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- -----------------------------------------------------------------------------
-- TABELA 2: organizations
-- Representa cada empresa/cliente que o gestor gerencia.
-- É a unidade central de multi-tenancy: todos os dados pertencem a uma org.
-- Exemplo: um gestor de tráfego cria uma org para cada cliente seu.
-- -----------------------------------------------------------------------------

CREATE TABLE organizations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Nome da empresa do cliente (ex: "Loja da Maria")
  name        TEXT NOT NULL,

  -- Identificador único em URL amigável (ex: "loja-da-maria")
  -- Gerado pelo app a partir do nome no momento da criação.
  slug        TEXT NOT NULL UNIQUE,

  -- Quem criou essa organização. Referência rápida sem JOIN em organization_members.
  owner_id    UUID NOT NULL REFERENCES auth.users(id),

  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- -----------------------------------------------------------------------------
-- TABELA 3: organization_members
-- Tabela de junção entre usuários e organizações.
-- Controla quem tem acesso a qual cliente e com qual nível de permissão.
--
-- Papéis:
--   owner  → gestor principal: cria/edita/deleta tudo, convida membros
--   member → colaborador da agência: vê e edita dados, não exclui org
--   viewer → cliente final: só visualiza dashboards, sem edição
-- -----------------------------------------------------------------------------

CREATE TABLE organization_members (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  organization_id  UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id          UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Papel do usuário nesta organização específica
  role             TEXT NOT NULL DEFAULT 'member'
                   CHECK (role IN ('owner', 'member', 'viewer')),

  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Um usuário só pode ter um papel por organização
  UNIQUE (organization_id, user_id)
);

-- Índices para queries frequentes de RLS
CREATE INDEX idx_org_members_user_id ON organization_members(user_id);
CREATE INDEX idx_org_members_org_id  ON organization_members(organization_id);


-- -----------------------------------------------------------------------------
-- TABELA 4: integrations
-- Cada conexão de API que uma organização tem com uma plataforma externa.
-- Ex: org "Loja da Maria" tem Google Ads (conta 123) e Meta Ads (conta 456).
--
-- Tokens OAuth são armazenados CRIPTOGRAFADOS (responsabilidade do backend).
-- Nunca trafegar tokens em plaintext pelo client.
-- -----------------------------------------------------------------------------

CREATE TABLE integrations (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Organização (cliente) a que essa integração pertence
  organization_id  UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,

  -- Plataforma conectada
  platform         TEXT NOT NULL
                   CHECK (platform IN (
                     'google_ads',
                     'meta_ads',
                     'google_analytics_4',
                     'shopify',
                     'woocommerce',
                     'hotmart',
                     'kiwify'
                   )),

  -- ID da conta na plataforma (ex: Customer ID do Google Ads, Ad Account ID do Meta)
  account_id       TEXT NOT NULL,

  -- Nome legível da conta (ex: "Conta Google Ads - Loja da Maria")
  account_name     TEXT,

  -- Tokens OAuth criptografados com AES-256 pelo backend antes de salvar.
  -- Nunca salvar tokens em plaintext. Coluna TEXT comporta o ciphertext em base64.
  access_token_encrypted   TEXT,
  refresh_token_encrypted  TEXT,

  -- Quando o access_token expira (para saber quando renovar com o refresh_token)
  token_expires_at         TIMESTAMPTZ,

  -- Estado atual da integração
  -- 'active'       → funcionando normalmente
  -- 'expired'      → token expirou, precisa reconectar
  -- 'error'        → última sincronização falhou
  -- 'disconnected' → usuário desconectou manualmente
  status           TEXT NOT NULL DEFAULT 'active'
                   CHECK (status IN ('active', 'expired', 'error', 'disconnected')),

  -- Quando foi a última sincronização bem-sucedida de dados
  last_synced_at   TIMESTAMPTZ,

  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Mesma plataforma + mesma conta só pode aparecer uma vez por organização
  UNIQUE (organization_id, platform, account_id)
);

CREATE INDEX idx_integrations_org_id ON integrations(organization_id);


-- -----------------------------------------------------------------------------
-- TABELA 5: metrics_daily
-- Métricas de performance agregadas por dia, por campanha, por integração.
-- É a tabela mais volumosa — cada linha é um "dia × campanha × plataforma".
--
-- Exemplo de linha:
--   integration_id = <Google Ads da Loja da Maria>
--   date           = 2026-05-01
--   campaign_id    = "12345678"
--   campaign_name  = "Campanha Black Friday"
--   spend          = 850.00
--   conversions    = 12
--   revenue        = 4200.00
--   cpa            = 70.83  ← calculado automaticamente (spend / conversions)
--   roas           = 4.9412 ← calculado automaticamente (revenue / spend)
-- -----------------------------------------------------------------------------

CREATE TABLE metrics_daily (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Redundância intencional: facilita queries sem JOIN com integrations
  organization_id  UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  integration_id   UUID NOT NULL REFERENCES integrations(id) ON DELETE CASCADE,

  -- Data a que os dados se referem (não a data de inserção)
  date             DATE NOT NULL,

  -- Plataforma (redundante com integration.platform, mas agiliza filtros)
  platform         TEXT NOT NULL,

  -- ID e nome da campanha na plataforma de origem.
  -- String vazia ('') significa linha agregada (todos as campanhas juntas).
  campaign_id      TEXT NOT NULL DEFAULT '',
  campaign_name    TEXT,

  -- Métricas brutas vindas da API da plataforma
  impressions      BIGINT        NOT NULL DEFAULT 0,  -- quantas vezes o anúncio foi exibido
  clicks           BIGINT        NOT NULL DEFAULT 0,  -- quantos cliques recebeu
  spend            NUMERIC(12,2) NOT NULL DEFAULT 0,  -- valor gasto em R$
  conversions      INTEGER       NOT NULL DEFAULT 0,  -- número de conversões atribuídas
  revenue          NUMERIC(12,2) NOT NULL DEFAULT 0,  -- receita gerada em R$

  -- Métricas derivadas: calculadas automaticamente pelo banco.
  -- GENERATED ALWAYS AS ... STORED = calculado no INSERT/UPDATE, salvo em disco.
  -- Evita inconsistência entre colunas e cálculo na query.
  cpa   NUMERIC(12,2) GENERATED ALWAYS AS (
          CASE WHEN conversions > 0 THEN spend / conversions ELSE NULL END
        ) STORED,

  roas  NUMERIC(8,4) GENERATED ALWAYS AS (
          CASE WHEN spend > 0 THEN revenue / spend ELSE NULL END
        ) STORED,

  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Garante que não há duplicatas para o mesmo dia + campanha + integração.
  -- campaign_id = '' representa o nível "todas as campanhas".
  UNIQUE (integration_id, date, campaign_id)
);

-- Índices para as queries mais comuns do dashboard
CREATE INDEX idx_metrics_org_id           ON metrics_daily(organization_id);
CREATE INDEX idx_metrics_integration_date ON metrics_daily(integration_id, date DESC);
CREATE INDEX idx_metrics_date             ON metrics_daily(date DESC);
CREATE INDEX idx_metrics_platform_date    ON metrics_daily(platform, date DESC);


-- =============================================================================
-- 3. FUNÇÕES AUXILIARES
-- =============================================================================

-- -----------------------------------------------------------------------------
-- FUNÇÃO: updated_at automático
-- Atualiza a coluna updated_at em qualquer UPDATE. Usada por triggers abaixo.
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- -----------------------------------------------------------------------------
-- FUNÇÃO: IDs das organizations do usuário atual
-- SECURITY DEFINER = roda com privilégio do owner (sem RLS), quebrando
-- a recursão que ocorreria se organization_members tentasse consultar
-- a si mesma dentro de uma policy.
-- Só pode ser chamada após organization_members existir.
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION get_my_organization_ids()
RETURNS SETOF UUID AS $$
  SELECT organization_id
  FROM organization_members
  WHERE user_id = auth.uid()
$$ LANGUAGE sql STABLE SECURITY DEFINER;


-- =============================================================================
-- 4. ATIVAÇÃO DO RLS
-- =============================================================================

ALTER TABLE profiles             ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations        ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations         ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics_daily        ENABLE ROW LEVEL SECURITY;


-- =============================================================================
-- 5. POLICIES
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Policies: profiles
-- Cada usuário só vê e edita o seu próprio perfil.
-- -----------------------------------------------------------------------------

CREATE POLICY "profiles: ver o próprio" ON profiles
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "profiles: criar o próprio" ON profiles
  FOR INSERT WITH CHECK (id = auth.uid());

CREATE POLICY "profiles: editar o próprio" ON profiles
  FOR UPDATE USING (id = auth.uid());


-- -----------------------------------------------------------------------------
-- Policies: organizations
-- Qualquer membro pode ver. Só owners podem editar ou deletar.
-- -----------------------------------------------------------------------------

CREATE POLICY "organizations: ver se é membro" ON organizations
  FOR SELECT USING (id IN (SELECT get_my_organization_ids()));

CREATE POLICY "organizations: criar se autenticado" ON organizations
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "organizations: editar se é owner" ON organizations
  FOR UPDATE USING (
    id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid() AND role = 'owner'
    )
  );

CREATE POLICY "organizations: deletar se é owner" ON organizations
  FOR DELETE USING (
    id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid() AND role = 'owner'
    )
  );


-- -----------------------------------------------------------------------------
-- Policies: organization_members
-- Membros veem todos os membros da mesma org.
-- Só owners convidam, alteram papéis ou removem membros.
-- Qualquer um pode remover a si mesmo (sair da org).
-- -----------------------------------------------------------------------------

CREATE POLICY "org_members: ver membros da mesma org" ON organization_members
  FOR SELECT USING (
    -- Pode ver a própria linha...
    user_id = auth.uid()
    -- ...ou qualquer linha de org que o usuário já pertence
    OR organization_id IN (SELECT get_my_organization_ids())
  );

CREATE POLICY "org_members: convidar se é owner" ON organization_members
  FOR INSERT WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid() AND role = 'owner'
    )
  );

CREATE POLICY "org_members: alterar papel se é owner" ON organization_members
  FOR UPDATE USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid() AND role = 'owner'
    )
  );

CREATE POLICY "org_members: remover membro — owner ou o próprio" ON organization_members
  FOR DELETE USING (
    -- Pode se remover da org
    user_id = auth.uid()
    -- Ou owner pode remover qualquer membro
    OR organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid() AND role = 'owner'
    )
  );


-- -----------------------------------------------------------------------------
-- Policies: integrations
-- Todos os membros veem. Owners e members gerenciam. Viewers só visualizam.
-- -----------------------------------------------------------------------------

CREATE POLICY "integrations: ver se é membro" ON integrations
  FOR SELECT USING (organization_id IN (SELECT get_my_organization_ids()));

CREATE POLICY "integrations: conectar se é owner ou member" ON integrations
  FOR INSERT WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'member')
    )
  );

CREATE POLICY "integrations: editar se é owner ou member" ON integrations
  FOR UPDATE USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'member')
    )
  );

CREATE POLICY "integrations: deletar se é owner" ON integrations
  FOR DELETE USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid() AND role = 'owner'
    )
  );


-- -----------------------------------------------------------------------------
-- Policies: metrics_daily
-- Todos os membros (incluindo viewers) podem ver os dados.
-- INSERT/UPDATE/DELETE só via service_role (backend de sincronização).
-- service_role bypassa RLS por padrão — não precisa de policy para isso.
-- -----------------------------------------------------------------------------

CREATE POLICY "metrics_daily: ver se é membro" ON metrics_daily
  FOR SELECT USING (organization_id IN (SELECT get_my_organization_ids()));


-- =============================================================================
-- 6. TRIGGERS
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Triggers de updated_at (atualiza o timestamp a cada UPDATE em cada tabela)
-- -----------------------------------------------------------------------------

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER integrations_updated_at
  BEFORE UPDATE ON integrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER metrics_daily_updated_at
  BEFORE UPDATE ON metrics_daily
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- -----------------------------------------------------------------------------
-- Trigger: cria perfil automaticamente quando um usuário se cadastra
-- Raw user meta_data é preenchido pelo Google OAuth ou pelo signup manual.
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- -----------------------------------------------------------------------------
-- Trigger: quando uma org é criada, insere automaticamente o criador como
-- 'owner' em organization_members. SECURITY DEFINER para contornar RLS
-- no INSERT (o usuário ainda não é membro no momento da criação).
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION handle_new_organization()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.organization_members (organization_id, user_id, role)
  VALUES (NEW.id, NEW.owner_id, 'owner')
  ON CONFLICT (organization_id, user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_organization_created
  AFTER INSERT ON organizations
  FOR EACH ROW EXECUTE FUNCTION handle_new_organization();
