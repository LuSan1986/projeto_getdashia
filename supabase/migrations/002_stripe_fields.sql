-- =============================================================================
-- GetDashia — Migration 002: Stripe subscription fields
-- =============================================================================
-- Rodar no SQL Editor do Supabase (dashboard > SQL Editor > New query)
-- =============================================================================


-- Adiciona status da assinatura (trialing, active, past_due, canceled, etc.)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_status TEXT;

-- Adiciona plano vindo do Stripe (starter, pro, business)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_plan TEXT;

-- Migra valores legados 'agencia' para 'business'
UPDATE profiles SET plan = 'business' WHERE plan = 'agencia';

-- Atualiza o CHECK constraint do plano para refletir os planos atuais
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_plan_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_plan_check
  CHECK (plan IN ('starter', 'pro', 'business'));


-- Função auxiliar para o webhook do Stripe encontrar um usuário pelo email.
-- Chamada com service_role via RPC — não exposta ao client público.
-- SECURITY DEFINER para acessar auth.users sem RLS.
CREATE OR REPLACE FUNCTION get_user_id_by_email(user_email TEXT)
RETURNS UUID AS $$
  SELECT id FROM auth.users WHERE email = user_email LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;
