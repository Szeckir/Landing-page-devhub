# Guia de Configuração - DevHub Platform

Este guia vai te ajudar a configurar toda a plataforma de acesso do DevHub.

## 📋 Pré-requisitos

- Conta no Supabase (gratuita)
- Conta na Hotmart
- Node.js instalado (v18 ou superior)
- Git instalado

## 🚀 Passo a Passo

### 1. Configurar Supabase

#### 1.1 Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma nova conta ou faça login
3. Clique em "New Project"
4. Preencha:
   - **Name**: DevHub (ou outro nome de sua escolha)
   - **Database Password**: Escolha uma senha forte
   - **Region**: Escolha a região mais próxima
5. Aguarde o projeto ser criado (pode levar alguns minutos)

#### 1.2 Configurar Banco de Dados

1. No painel do Supabase, vá em **SQL Editor**
2. Clique em **New Query**
3. Copie e cole o conteúdo do arquivo `supabase-setup.sql`
4. Clique em **Run** para executar o script
5. Verifique se a tabela `users` foi criada em **Table Editor**

#### 1.3 Configurar Autenticação

1. No painel do Supabase, vá em **Authentication** > **Providers**
2. Habilite **Email** provider (já vem habilitado por padrão)
3. Para GitHub OAuth:
   - Vá em **Providers** > **GitHub**
   - Clique em **Enable GitHub**
   - Você precisará criar uma OAuth App no GitHub:
     - Acesse [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
     - Clique em **New OAuth App**
     - **Application name**: DevHub
     - **Homepage URL**: `http://localhost:5173` (para desenvolvimento)
     - **Authorization callback URL**: `https://seu-projeto.supabase.co/auth/v1/callback`
     - Copie o **Client ID** e **Client Secret** para o Supabase
   - Cole no Supabase e salve

#### 1.4 Obter Credenciais do Supabase

1. No painel do Supabase, vá em **Settings** > **API**
2. Anote:
   - **Project URL** (será `VITE_SUPABASE_URL`)
   - **anon public** key (será `VITE_SUPABASE_ANON_KEY`)
   - **service_role** key (será `SUPABASE_SERVICE_ROLE_KEY` no backend) - ⚠️ **MANTENHA SECRETO**

### 2. Configurar Frontend

#### 2.1 Instalar Dependências

```bash
npm install
```

#### 2.2 Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui
VITE_API_URL=http://localhost:3000
```

**Nota**: Em produção, `VITE_API_URL` deve apontar para a URL do seu backend deployado (ex: `https://seu-backend.vercel.app`)

#### 2.3 Executar em Desenvolvimento

```bash
npm run dev
```

O site estará disponível em `http://localhost:5173`

### 3. Configurar Backend

#### 3.1 Instalar Dependências

```bash
cd backend
npm install
```

#### 3.2 Configurar Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend`:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
PORT=3000
```

⚠️ **IMPORTANTE**: Nunca exponha o `SUPABASE_SERVICE_ROLE_KEY` no frontend!

#### 3.3 Executar em Desenvolvimento

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

### 4. Deploy do Backend

Escolha uma das opções abaixo:

#### Opção A: Vercel (Recomendado)

1. Instale a Vercel CLI: `npm i -g vercel`
2. Na pasta `backend`, execute: `vercel`
3. Configure as variáveis de ambiente no painel da Vercel
4. Anote a URL do deploy (ex: `https://seu-backend.vercel.app`)

### 5. Configurar Webhook na Hotmart

1. Acesse o painel da Hotmart
2. Vá em **Configurações** > **Webhooks** (ou **Integrações**)
3. Clique em **Adicionar Webhook** ou **Nova Integração**
4. Configure:
   - **URL**: `https://seu-backend.vercel.app/api/webhooks/hotmart` (use a URL do seu deploy)
   - **Eventos**: Selecione `PURCHASE_APPROVED` ou `Compra Aprovada`
   - **Método**: POST
5. Salve as configurações

### 6. Atualizar URLs de Redirect no Supabase

1. No painel do Supabase, vá em **Authentication** > **URL Configuration**
2. Adicione nas **Redirect URLs**:
   - `http://localhost:5173/**` (desenvolvimento)
   - `https://seu-dominio.com/**` (produção)
   - `https://seu-dominio.com/membros` (produção)

### 7. Testar o Fluxo Completo

1. **Teste de Autenticação**:
   - Acesse `http://localhost:5173/membros`
   - Deve redirecionar para `/auth`
   - Faça login com email ou GitHub
   - Deve mostrar mensagem de "Acesso Restrito"

2. **Teste de Compra**:
   - Faça uma compra de teste na Hotmart
   - Verifique se o webhook foi recebido (logs do backend)
   - Faça login novamente
   - Deve mostrar o dashboard com acesso liberado

3. **Teste Manual** (para debug):
   - No Supabase, vá em **Table Editor** > **users**
   - Encontre seu usuário
   - Marque `has_purchased_roadmap` como `true`
   - Faça logout e login novamente
   - Deve ter acesso ao dashboard

## 🔧 Troubleshooting

### Erro: "Missing Supabase environment variables"

- Verifique se o arquivo `.env` existe
- Verifique se as variáveis estão corretas
- Reinicie o servidor de desenvolvimento

### Erro: "User not found in auth"

- Isso é normal se o usuário ainda não se cadastrou
- Quando ele fizer login, o trigger criará o registro automaticamente

### Webhook não está funcionando

1. Verifique os logs do backend
2. Teste o endpoint manualmente com Postman/Insomnia
3. Verifique se a URL do webhook está correta na Hotmart
4. Verifique se o evento está configurado corretamente

### Usuário não tem acesso após compra

1. Verifique se o webhook foi recebido (logs)
2. Verifique se o email do comprador está correto
3. Verifique se o usuário existe na tabela `users`
4. Verifique se `has_purchased_roadmap` está como `true`

## 📝 Próximos Passos

- [ ] Atualizar o link do Notion no Dashboard.tsx (linha com `href="https://www.notion.so/seu-link-do-devhub"`)
- [ ] Configurar domínio personalizado
- [ ] Adicionar mais produtos na plataforma
- [ ] Implementar sistema de notificações
- [ ] Adicionar analytics

## 🆘 Suporte

Se tiver problemas, verifique:
1. Logs do backend
2. Console do navegador
3. Logs do Supabase (Dashboard > Logs)
4. Documentação do Supabase: https://supabase.com/docs

