# 🚀 Deploy do Backend no Vercel

Guia completo para fazer deploy do backend no Vercel.

⚠️ **NOTA**: Se seu frontend já está rodando no Vercel, você precisa criar um **projeto separado** para o backend. O Vercel permite múltiplos projetos no mesmo repositório.

## 📋 Pré-requisitos

- Conta no Vercel (gratuita): [vercel.com](https://vercel.com)
- Git instalado
- Repositório GitHub/GitLab/Bitbucket (ou use Vercel CLI)
- Frontend já deployado no Vercel (opcional, mas comum)

## 🎯 Opção 1: Deploy via Vercel Dashboard (Recomendado)

### Passo 1: Preparar o Repositório

1. Certifique-se de que o código está no GitHub/GitLab/Bitbucket
2. O backend deve estar na pasta `backend/` do repositório

### Passo 2: Criar Projeto no Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New Project"** ou **"Import Project"**
3. Conecte seu repositório (GitHub/GitLab/Bitbucket)
4. Selecione o **mesmo repositório** do frontend (se estiver no mesmo repo)
5. ⚠️ **IMPORTANTE**: Dê um nome diferente para o projeto backend (ex: `devhub-backend` ou `devhub-api`)

### Passo 3: Configurar o Projeto

⚠️ **IMPORTANTE**: Se seu frontend já está no Vercel, você precisa criar um **projeto separado** para o backend.

**Root Directory:**
- Se o backend está na pasta `backend/` do mesmo repositório:
  - **Root Directory**: `backend`
- Se o backend está em um repositório separado:
  - **Root Directory**: `.` (raiz)

**Framework Preset:**
- Selecione **"Other"** ou **"Node.js"**
- ⚠️ **NÃO** selecione Vite (isso é para o frontend)

**Build Command:**
```bash
npm run vercel-build
```
Ou deixe em branco se não precisar de build.

**Output Directory:**
- Deixe em branco (não é necessário para APIs)

**Install Command:**
```bash
npm install
```

### Passo 4: Configurar Variáveis de Ambiente

No painel do Vercel, vá em **Settings** > **Environment Variables** e adicione:

```
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
PORT=3000
NODE_ENV=production
```

⚠️ **IMPORTANTE**: 
- Marque todas as variáveis para **Production**, **Preview** e **Development**
- Nunca exponha o `SUPABASE_SERVICE_ROLE_KEY` publicamente

### Passo 5: Fazer Deploy

1. Clique em **"Deploy"**
2. Aguarde o build completar (pode levar alguns minutos)
3. Quando terminar, você verá a URL do deploy (ex: `https://seu-backend.vercel.app`)

### Passo 6: Testar o Deploy

Teste o health check:
```bash
curl https://seu-backend.vercel.app/health
```

Deve retornar:
```json
{
  "status": "ok",
  "timestamp": "..."
}
```

## 🎯 Opção 2: Deploy via Vercel CLI

### Passo 1: Instalar Vercel CLI

```bash
npm i -g vercel
```

### Passo 2: Login no Vercel

```bash
vercel login
```

### Passo 3: Navegar para a Pasta do Backend

```bash
cd backend
```

### Passo 4: Fazer Deploy

```bash
vercel
```

Siga as instruções:
- **Set up and deploy?** → `Y`
- **Which scope?** → Selecione sua conta
- **Link to existing project?** → `N` (primeira vez) ou `Y` (atualizações)
- **Project name?** → Deixe padrão ou escolha um nome
- **Directory?** → `.` (ponto)

### Passo 5: Configurar Variáveis de Ambiente

```bash
vercel env add SUPABASE_URL
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add PORT
```

Ou configure todas de uma vez:
```bash
vercel env add SUPABASE_URL production
# Cole o valor quando solicitado
```

### Passo 6: Fazer Deploy de Produção

```bash
vercel --prod
```

## 🔧 Configuração Adicional

### Atualizar Frontend no Vercel

Após o deploy do backend, você precisa atualizar as variáveis de ambiente do **projeto frontend** no Vercel:

1. No dashboard do Vercel, vá para o **projeto do frontend**
2. Vá em **Settings** > **Environment Variables**
3. Adicione ou atualize:
   ```
   VITE_API_URL=https://seu-backend.vercel.app
   ```
4. ⚠️ **IMPORTANTE**: Marque para **Production**, **Preview** e **Development**
5. Faça um novo deploy do frontend ou aguarde o próximo deploy automático

**Ou** atualize manualmente no código e faça commit:
- Edite `.env.production` ou configure no Vercel (recomendado)

### Configurar Domínio Personalizado (Opcional)

1. No painel do Vercel, vá em **Settings** > **Domains**
2. Adicione seu domínio
3. Configure os registros DNS conforme instruções

### Configurar Webhook da Hotmart

1. Acesse o painel da Hotmart
2. Vá em **Configurações** > **Webhooks**
3. Configure a URL: `https://seu-backend.vercel.app/api/webhooks/hotmart`

## 📊 Monitoramento

### Ver Logs

```bash
vercel logs
```

Ou no dashboard do Vercel: **Deployments** > Selecione um deploy > **Functions** > Ver logs

### Ver Métricas

No dashboard do Vercel:
- **Analytics** - Métricas de uso
- **Functions** - Logs e execuções

## 🔄 Atualizações Futuras

### Deploy Automático

O Vercel faz deploy automático quando você faz push para:
- `main` branch → Production
- Outras branches → Preview

### Deploy Manual

```bash
cd backend
vercel --prod
```

## ⚠️ Troubleshooting

### Erro: "Module not found"

- Verifique se todas as dependências estão no `package.json`
- Certifique-se de que `npm install` está rodando no build

### Erro: "Environment variable not found"

- Verifique se as variáveis estão configuradas no Vercel
- Certifique-se de que estão marcadas para o ambiente correto (Production/Preview/Development)

### Erro: "Function timeout"

- O Vercel tem limite de 10 segundos para Hobby plan
- Para funções mais longas, considere upgrade ou otimizar o código

### Erro: "Build failed"

- Verifique os logs no dashboard do Vercel
- Certifique-se de que o `vercel-build` script está correto
- Verifique se o TypeScript está compilando corretamente

## 📝 Checklist de Deploy

- [ ] Código commitado no Git
- [ ] Repositório conectado ao Vercel
- [ ] Root Directory configurado (se backend está em subpasta)
- [ ] Build Command configurado (`npm run vercel-build`)
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy realizado com sucesso
- [ ] Health check funcionando (`/health`)
- [ ] Frontend atualizado com nova URL da API
- [ ] Webhook da Hotmart configurado com nova URL

## 🎉 Pronto!

Seu backend está rodando no Vercel! A URL será algo como:
`https://seu-backend.vercel.app`

Use essa URL no frontend e no webhook da Hotmart.

