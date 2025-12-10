-- ============================================
-- Script de Migração: has_purchased_roadmap -> has_purchased_devhub
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- 1. Renomear a coluna has_purchased_roadmap para has_purchased_devhub
ALTER TABLE public.users 
RENAME COLUMN has_purchased_roadmap TO has_purchased_devhub;

-- 2. Atualizar o comentário da coluna
COMMENT ON COLUMN public.users.has_purchased_devhub IS 'Indica se o usuário comprou o DevHub';

-- 3. Verificar se a migração foi bem-sucedida
-- Execute esta query para confirmar:
-- SELECT column_name, data_type, column_default 
-- FROM information_schema.columns 
-- WHERE table_name = 'users' AND column_name = 'has_purchased_devhub';

