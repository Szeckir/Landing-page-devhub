-- ============================================
-- Script de Configuração do Banco de Dados Supabase
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- 1. Criar tabela users
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  has_purchased_devhub BOOLEAN DEFAULT false,
  subscription_status TEXT DEFAULT 'inactive',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 3. Remover políticas antigas se existirem (para evitar conflitos)
DROP POLICY IF EXISTS "Users can read own data" ON public.users;
DROP POLICY IF EXISTS "Users can update own data" ON public.users;

-- 4. Criar política para usuários lerem seus próprios dados
-- IMPORTANTE: Esta política permite que usuários leiam apenas seus próprios dados
-- Mas a verificação de acesso real deve ser feita no backend para segurança
CREATE POLICY "Users can read own data"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- 5. REMOVIDO: Usuários NÃO podem atualizar seus próprios dados diretamente
-- Apenas o backend (via Service Role Key) pode atualizar has_purchased_devhub
-- Isso previne manipulação de dados sensíveis pelo frontend

-- 6. Criar função para sincronizar usuários quando criarem conta
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Criar trigger para executar a função quando um novo usuário for criado
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. Criar trigger para atualizar updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 10. Criar índice para melhorar performance nas buscas por email
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- 11. Comentários nas colunas (opcional, mas útil)
COMMENT ON TABLE public.users IS 'Tabela de usuários com status de compra e assinatura';
COMMENT ON COLUMN public.users.has_purchased_devhub IS 'Indica se o usuário comprou o DevHub';
COMMENT ON COLUMN public.users.subscription_status IS 'Status da assinatura: inactive, active, cancelled';

