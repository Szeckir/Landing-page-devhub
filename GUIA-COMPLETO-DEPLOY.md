# 🚀 Guia Completo: Adicionar Backend ao Projeto Existente

## 📋 Situação Atual

✅ **Frontend já está rodando no Vercel:**
- Projeto: `devhub`
- URL: `devhub-szeckir.vercel.app` ou `algoritmoecafe.com`
- Framework: Vite (React)

🎯 **Objetivo:**
- Criar um projeto **SEPARADO** no Vercel para o backend
- Conectar frontend ao backend
- Manter tudo funcionando

---

## 🎯 PASSO 1: Preparar o Código do Backend

### 1.1 Verificar se o backend está pronto

Abra o terminal e verifique se a pasta `backend` existe:

```bash
cd "C:\Users\thoma\OneDrive\Área de Trabalho\Landing-page-devhub"
dir backend
```

Você deve ver:
- ✅ `backend/src/server.ts`
- ✅ `backend/src/routes/auth.ts`
- ✅ `backend/src/routes/webhooks.ts`
- ✅ `backend/vercel.json`
- ✅ `backend/api/index.ts`
- ✅ `backend/package.json`

### 1.2 Testar o backend localmente (opcional mas recomendado)

```bash
cd backend
npm install
```

Crie o arquivo `.env` na pasta `backend`:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
PORT=3000
```

Depois teste:
```bash
npm run dev
```

Deve aparecer: `🚀 Server running on port 3000`

Teste no navegador: `http://localhost:3000/health`

---

## 🎯 PASSO 2: Fazer Commit e Push do Código

### 2.1 Verificar se o código está no Git

```bash
cd "C:\Users\thoma\OneDrive\Área de Trabalho\Landing-page-devhub"
git status
```

### 2.2 Adicionar e commitar o backend

```bash
git add backend/
git add src/lib/api.ts
git add src/pages/Members.tsx
git add src/pages/Dashboard.tsx
git commit -m "Adicionar backend e integração com API"
git push
```

⚠️ **IMPORTANTE**: Certifique-se de que o arquivo `backend/.env` está no `.gitignore` (não deve ser commitado!)

---

## 🎯 PASSO 3: Criar Novo Projeto no Vercel para o Backend

### 3.1 Acessar o Vercel

1. Abra [vercel.com](https://vercel.com)
2. Faça login
3. Você verá seu projeto `devhub` (frontend)

### 3.2 Criar Novo Projeto

1. Clique no botão **"Add New..."** ou **"New Project"** (geralmente no canto superior direito)
2. Selecione **"Import Git Repository"**
3. Escolha o **MESMO repositório** que você usa para o frontend
4. Clique em **"Import"**

### 3.3 Configurar o Projeto Backend

Agora você verá a tela de configuração. Configure assim:

#### **Project Name:**
```
devhub-backend
```
(ou qualquer nome que você preferir, mas diferente do frontend)

#### **Root Directory:**
Clique em **"Edit"** e digite:
```
backend
```

#### **Framework Preset:**
Selecione:
```
Other
```
⚠️ **NÃO selecione Vite!** Vite é só para o frontend.

#### **Build Command:**
Deixe em branco ou digite:
```
npm run vercel-build
```

#### **Output Directory:**
Deixe em **branco** (vazio)

#### **Install Command:**
Deixe o padrão:
```
npm install
```

### 3.4 Configurar Variáveis de Ambiente

Antes de fazer deploy, configure as variáveis:

1. Na mesma tela de configuração, role para baixo até **"Environment Variables"**
2. Clique em **"Add"** e adicione uma por uma:

**Variável 1:**
- **Name:** `SUPABASE_URL`
- **Value:** `https://seu-projeto.supabase.co` (cole sua URL do Supabase)
- Marque: ✅ Production, ✅ Preview, ✅ Development

**Variável 2:**
- **Name:** `SUPABASE_SERVICE_ROLE_KEY`
- **Value:** `sua_service_role_key_aqui` (cole sua Service Role Key)
- Marque: ✅ Production, ✅ Preview, ✅ Development
- ⚠️ **CUIDADO**: Esta é uma chave secreta! Nunca exponha publicamente.

**Variável 3 (opcional):**
- **Name:** `PORT`
- **Value:** `3000`
- Marque: ✅ Production, ✅ Preview, ✅ Development

**Variável 4 (opcional):**
- **Name:** `NODE_ENV`
- **Value:** `production`
- Marque: ✅ Production

### 3.5 Fazer Deploy

1. Clique no botão **"Deploy"** (geralmente no canto inferior direito)
2. Aguarde o build completar (pode levar 2-5 minutos)
3. Quando terminar, você verá uma mensagem de sucesso

### 3.6 Anotar a URL do Backend

Após o deploy, você verá algo como:
```
✅ Deployment successful!
URL: https://devhub-backend-xxxxx.vercel.app
```

**ANOTE ESSA URL!** Você vai precisar dela.

---

## 🎯 PASSO 4: Testar o Backend

### 4.1 Testar Health Check

Abra no navegador ou use curl:
```
https://devhub-backend-xxxxx.vercel.app/health
```

Deve retornar:
```json
{
  "status": "ok",
  "timestamp": "2025-01-XX..."
}
```

Se funcionar, ✅ Backend está rodando!

---

## 🎯 PASSO 5: Atualizar o Frontend para Usar o Backend

### 5.1 Atualizar Variáveis de Ambiente do Frontend no Vercel

1. No dashboard do Vercel, vá para o projeto **`devhub`** (frontend)
2. Clique em **"Settings"** (no menu superior)
3. Clique em **"Environment Variables"** (no menu lateral esquerdo)
4. Clique em **"Add New"**

**Adicionar variável:**
- **Name:** `VITE_API_URL`
- **Value:** `https://devhub-backend-xxxxx.vercel.app` (a URL do seu backend)
- Marque: ✅ Production, ✅ Preview, ✅ Development

### 5.2 Fazer Novo Deploy do Frontend

Após adicionar a variável:

1. Vá em **"Deployments"** (no menu superior)
2. Clique nos **3 pontinhos** (⋯) do último deploy
3. Clique em **"Redeploy"**
4. Ou simplesmente faça um novo commit e push (deploy automático)

### 5.3 Verificar se Funcionou

Após o deploy do frontend:

1. Acesse seu site: `https://devhub-szeckir.vercel.app` ou `https://algoritmoecafe.com`
2. Tente fazer login em `/membros`
3. Verifique o console do navegador (F12) - não deve ter mais erros de conexão

---

## 🎯 PASSO 6: Configurar Webhook da Hotmart

### 6.1 Acessar Painel da Hotmart

1. Acesse o painel da Hotmart
2. Vá em **Configurações** > **Webhooks** (ou **Integrações**)

### 6.2 Configurar Webhook

1. Clique em **"Adicionar Webhook"** ou **"Nova Integração"**
2. Configure:
   - **URL:** `https://devhub-backend-xxxxx.vercel.app/api/webhooks/hotmart`
   - **Eventos:** Selecione `PURCHASE_APPROVED` ou `Compra Aprovada`
   - **Método:** POST
3. Salve

---

## 🎯 PASSO 7: Testar Fluxo Completo

### 7.1 Teste de Autenticação

1. Acesse: `https://devhub-szeckir.vercel.app/membros`
2. Deve redirecionar para `/auth`
3. Faça login com email ou GitHub
4. Deve mostrar "Acesso Restrito" (se ainda não comprou)

### 7.2 Teste de Compra (Simulado)

Para testar sem comprar de verdade:

1. Acesse o Supabase Dashboard
2. Vá em **Table Editor** > **users**
3. Encontre seu usuário pelo email
4. Marque `has_purchased_roadmap` como `true`
5. Salve
6. Faça logout e login novamente no site
7. Deve mostrar o Dashboard com acesso liberado

### 7.3 Teste de Webhook (Opcional)

Você pode testar o webhook manualmente usando curl ou Postman:

```bash
curl -X POST https://devhub-backend-xxxxx.vercel.app/api/webhooks/hotmart \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "buyer": {
        "email": "seu-email@exemplo.com"
      },
      "product": {
        "id": "J96549882U"
      }
    }
  }'
```

---

## 📊 Resumo da Estrutura Final

```
Vercel Dashboard:
├── devhub (Frontend)
│   ├── URL: devhub-szeckir.vercel.app
│   ├── Domínio: algoritmoecafe.com
│   └── Variável: VITE_API_URL → aponta para backend
│
└── devhub-backend (Backend) ← NOVO!
    ├── URL: devhub-backend-xxxxx.vercel.app
    ├── Root Directory: backend/
    └── Variáveis:
        ├── SUPABASE_URL
        ├── SUPABASE_SERVICE_ROLE_KEY
        └── PORT
```

---

## ✅ Checklist Final

- [ ] Backend testado localmente (opcional)
- [ ] Código commitado e pushado no Git
- [ ] Novo projeto criado no Vercel (`devhub-backend`)
- [ ] Root Directory configurado (`backend`)
- [ ] Framework selecionado (`Other`)
- [ ] Variáveis de ambiente configuradas no backend
- [ ] Deploy do backend realizado com sucesso
- [ ] Health check funcionando (`/health`)
- [ ] Variável `VITE_API_URL` adicionada no frontend
- [ ] Novo deploy do frontend realizado
- [ ] Login funcionando no site
- [ ] Webhook da Hotmart configurado
- [ ] Teste completo realizado

---

## 🆘 Problemas Comuns e Soluções

### Erro: "Module not found" no deploy

**Solução:**
- Verifique se todas as dependências estão no `backend/package.json`
- Certifique-se de que `npm install` está rodando

### Erro: "Environment variable not found"

**Solução:**
- Verifique se as variáveis estão configuradas no projeto correto
- Certifique-se de que estão marcadas para Production/Preview/Development

### Frontend ainda mostra erro de conexão

**Solução:**
1. Verifique se `VITE_API_URL` está configurada no projeto frontend
2. Faça um novo deploy do frontend após adicionar a variável
3. Limpe o cache do navegador (Ctrl+Shift+R)

### Backend não responde

**Solução:**
1. Verifique os logs no Vercel: **Deployments** > Selecione deploy > **Functions** > Ver logs
2. Teste o health check: `https://seu-backend.vercel.app/health`
3. Verifique se as variáveis de ambiente estão corretas

---

## 🎉 Pronto!

Agora você tem:
- ✅ Frontend rodando no Vercel
- ✅ Backend rodando no Vercel (projeto separado)
- ✅ Tudo conectado e funcionando
- ✅ Webhook da Hotmart configurado

Seu projeto está completo e seguro! 🚀

