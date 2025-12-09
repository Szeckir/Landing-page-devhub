# DevHub Backend API

Backend API para integração de webhooks da Hotmart com Supabase.

## Funcionalidades

- Recebe webhooks da Hotmart quando uma compra é aprovada
- Atualiza automaticamente o status de compra do usuário no Supabase
- Libera acesso ao conteúdo do DevHub automaticamente

## Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `src/env.example` para `.env` e preencha com suas credenciais:

```bash
cp src/env.example .env
```

Variáveis necessárias:
- `SUPABASE_URL`: URL do seu projeto Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Service Role Key do Supabase (permite bypass RLS)
- `PORT`: Porta do servidor (opcional, padrão: 3000)
- `HOTMART_WEBHOOK_SECRET`: Secret do webhook da Hotmart (opcional)

### 3. Executar em desenvolvimento

```bash
npm run dev
```

### 4. Build para produção

```bash
npm run build
npm start
```

## Endpoints

### POST /api/auth/check-access

Verifica se o usuário autenticado tem acesso ao conteúdo.

**Headers:**
- `Authorization: Bearer <jwt_token>` - Token JWT do Supabase

**Resposta de sucesso:**
```json
{
  "hasAccess": true,
  "hasPurchased": true,
  "subscriptionStatus": "active"
}
```

**Resposta de erro (401):**
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### POST /api/auth/user-data

Obtém dados básicos do usuário para exibição.

**Headers:**
- `Authorization: Bearer <jwt_token>` - Token JWT do Supabase

**Resposta de sucesso:**
```json
{
  "email": "usuario@email.com",
  "hasPurchased": true,
  "subscriptionStatus": "active"
}
```

### POST /api/webhooks/hotmart

Recebe webhooks da Hotmart quando uma compra é aprovada.

**Payload esperado (exemplo):**
```json
{
  "data": {
    "buyer": {
      "email": "usuario@email.com"
    },
    "product": {
      "id": "J96549882U"
    },
    "purchase": {
      "status": "APPROVED"
    }
  },
  "event": "PURCHASE_APPROVED"
}
```

**Resposta de sucesso:**
```json
{
  "message": "Purchase status updated successfully",
  "user": {
    "id": "uuid",
    "email": "usuario@email.com",
    "has_purchased_roadmap": true,
    "subscription_status": "active"
  }
}
```

### GET /health

Endpoint de health check.

## Configuração do Webhook na Hotmart

1. Acesse o painel da Hotmart
2. Vá em Configurações > Webhooks
3. Adicione uma nova URL de webhook: `https://seu-backend.com/api/webhooks/hotmart`
4. Selecione o evento: `PURCHASE_APPROVED`
5. Salve as configurações

## Deploy

### Opções de deploy recomendadas:

- **Vercel**: Configure como serverless function
- **Railway**: Deploy direto do repositório
- **Render**: Deploy automático
- **Heroku**: Deploy tradicional

### Variáveis de ambiente no deploy:

Certifique-se de configurar todas as variáveis de ambiente no painel do seu provedor de hospedagem.

## Estrutura do Banco de Dados

O backend espera uma tabela `users` no Supabase com a seguinte estrutura:

```sql
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  has_purchased_roadmap BOOLEAN DEFAULT false,
  subscription_status TEXT DEFAULT 'inactive',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Troubleshooting

### Erro: "User not found in auth"

Isso é normal se o usuário ainda não se cadastrou na plataforma. Quando ele fizer login pela primeira vez, o trigger do Supabase criará o registro na tabela `users`, e o webhook pode ser processado novamente ou você pode criar um sistema de retry.

### Erro: "Error updating user purchase status"

Verifique se:
- O Service Role Key está correto
- A tabela `users` existe no Supabase
- As políticas RLS estão configuradas corretamente (ou use Service Role Key que bypassa RLS)

## Segurança

- Use HTTPS em produção
- Valide o webhook da Hotmart usando o secret (implementação opcional)
- Mantenha o Service Role Key seguro e nunca o exponha no frontend
- Considere implementar rate limiting

