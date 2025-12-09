# 🚀 Quick Start - Backend

## Iniciar o Backend em Desenvolvimento

### 1. Instalar Dependências

```bash
cd backend
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend`:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
PORT=3000
```

### 3. Iniciar o Servidor

```bash
npm run dev
```

Você deve ver:
```
🚀 Server running on port 3000
```

### 4. Verificar se Está Funcionando

Abra no navegador ou use curl:
```bash
curl http://localhost:3000/health
```

Deve retornar:
```json
{
  "status": "ok",
  "timestamp": "2025-01-XX..."
}
```

## ⚠️ Problemas Comuns

### Erro: "Missing Supabase environment variables"

- Verifique se o arquivo `.env` existe na pasta `backend`
- Verifique se as variáveis estão corretas
- Reinicie o servidor após criar/editar o `.env`

### Erro: "Port 3000 already in use"

- Altere a porta no `.env`: `PORT=3001`
- Ou pare o processo que está usando a porta 3000

### Frontend não consegue conectar

1. Verifique se o backend está rodando (`npm run dev`)
2. Verifique se a porta está correta no `.env` do frontend
3. Verifique se `VITE_API_URL=http://localhost:3000` está no `.env` do frontend
4. Reinicie o frontend após alterar variáveis de ambiente

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia em modo desenvolvimento (watch mode)
- `npm run build` - Compila TypeScript para JavaScript
- `npm start` - Inicia servidor em produção (após build)

## 🔍 Endpoints Disponíveis

- `GET /health` - Health check
- `POST /api/auth/check-access` - Verificar acesso do usuário
- `POST /api/auth/user-data` - Obter dados do usuário
- `POST /api/webhooks/hotmart` - Webhook da Hotmart

