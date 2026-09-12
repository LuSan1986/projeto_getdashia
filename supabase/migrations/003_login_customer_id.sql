-- =============================================================================
-- GetDashia — Migration 003: login_customer_id por conta Google Ads
-- =============================================================================
-- Rodar no SQL Editor do Supabase (dashboard > SQL Editor > New query)
-- =============================================================================

-- Coluna que armazena qual MCC deve ser usada como login-customer-id
-- ao buscar dados dessa conta na Google Ads API.
-- NULL = conta acessível diretamente (sem proxy via MCC).
ALTER TABLE integrations ADD COLUMN IF NOT EXISTS login_customer_id text;

-- Remove linhas órfãs com account_id = 'pending' deixadas por fluxos OAuth
-- iniciados mas nunca concluídos (seleção de conta nunca foi feita).
-- Seguro rodar: se houver um OAuth em andamento no exato momento, o token
-- já expirou de qualquer forma.
DELETE FROM integrations
WHERE platform = 'google_ads'
  AND account_id = 'pending'
  AND status = 'active';
