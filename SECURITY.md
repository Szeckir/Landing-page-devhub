# Segurança - DevHub Platform

## 🔒 Medidas de Segurança Implementadas

### 1. Verificação de Acesso no Backend

**Problema Original:**
- O frontend fazia queries diretas para a tabela `users` do Supabase
- Mesmo com RLS, tokens JWT poderiam ser manipulados ou interceptados
- A lógica de verificação estava no cliente, podendo ser contornada

**Solução Implementada:**
- Todas as verificações de acesso agora passam pelo backend (`/api/auth/check-access`)
- O backend valida o token JWT usando o Service Role Key
- O frontend recebe apenas um boolean simples (tem acesso ou não)
- Dados sensíveis nunca são expostos diretamente ao cliente

### 2. Row Level Security (RLS) Restritivo

**Políticas Implementadas:**
- ✅ Usuários podem ler apenas seus próprios dados (`SELECT` com `auth.uid() = id`)
- ❌ Usuários **NÃO** podem atualizar seus próprios dados diretamente
- ✅ Apenas o backend (Service Role) pode atualizar `has_purchased_roadmap`

### 3. Validação de Token no Backend

**Fluxo Seguro:**
```
1. Frontend envia token JWT no header Authorization
2. Backend valida token usando Supabase Admin API
3. Backend verifica acesso usando Service Role Key (bypass RLS)
4. Backend retorna apenas informações necessárias
```

### 4. Proteção Contra Manipulação

**O que foi protegido:**
- ❌ Não é possível manipular headers para obter acesso não autorizado
- ❌ Não é possível fazer queries diretas para modificar `has_purchased_roadmap`
- ❌ Não é possível usar Burp Suite ou ferramentas similares para contornar segurança
- ✅ Todas as verificações passam por validação server-side

## 🛡️ Camadas de Segurança

### Camada 1: Autenticação (Supabase Auth)
- Tokens JWT assinados e verificados
- Tokens expiram automaticamente
- Refresh tokens gerenciados pelo Supabase

### Camada 2: Autorização (Backend API)
- Validação de token em cada requisição
- Verificação de acesso usando Service Role Key
- Retorno apenas de dados necessários

### Camada 3: Banco de Dados (RLS)
- Row Level Security habilitado
- Políticas restritivas
- Service Role Key necessário para atualizações

## 🔍 Testes de Segurança

### Teste 1: Manipulação de Token
```bash
# Tentar usar token inválido
curl -X POST http://localhost:3000/api/auth/check-access \
  -H "Authorization: Bearer token_invalido"
# Resultado esperado: 401 Unauthorized
```

### Teste 2: Token Expirado
```bash
# Usar token expirado
curl -X POST http://localhost:3000/api/auth/check-access \
  -H "Authorization: Bearer token_expirado"
# Resultado esperado: 401 Unauthorized
```

### Teste 3: Tentativa de Query Direta
```bash
# Tentar fazer query direta no Supabase REST API
curl "https://seu-projeto.supabase.co/rest/v1/users?select=has_purchased_roadmap&id=eq.outro_usuario"
# Resultado esperado: RLS bloqueia acesso a dados de outros usuários
```

### Teste 4: Tentativa de UPDATE Direto
```sql
-- Tentar atualizar próprio registro
UPDATE public.users 
SET has_purchased_roadmap = true 
WHERE id = auth.uid();
-- Resultado esperado: Política RLS bloqueia UPDATE
```

## ⚠️ Boas Práticas

### ✅ FAZER:
- Sempre usar a API backend para verificar acesso
- Validar tokens no backend antes de retornar dados
- Usar HTTPS em produção
- Manter Service Role Key segura (nunca expor no frontend)
- Monitorar logs de acesso e tentativas de acesso não autorizado

### ❌ NÃO FAZER:
- Nunca fazer queries diretas do frontend para dados sensíveis
- Nunca expor Service Role Key no código do frontend
- Nunca confiar apenas em validação no frontend
- Nunca retornar dados completos do banco sem filtrar

## 🔐 Variáveis de Ambiente Seguras

**Frontend (.env):**
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_anon_key  # Segura para frontend
VITE_API_URL=https://seu-backend.com  # URL do backend
```

**Backend (.env):**
```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key  # ⚠️ SECRETO!
PORT=3000
```

## 📊 Monitoramento

### Logs Importantes:
1. **Backend**: Tentativas de acesso não autorizado
2. **Supabase**: Queries bloqueadas por RLS
3. **Frontend**: Erros de autenticação

### Alertas Recomendados:
- Múltiplas tentativas de acesso com token inválido
- Tentativas de acesso a dados de outros usuários
- Erros de validação de token

## 🚨 Resposta a Incidentes

Se detectar tentativa de acesso não autorizado:

1. **Verificar logs** do backend e Supabase
2. **Revogar tokens** suspeitos no Supabase Dashboard
3. **Atualizar Service Role Key** se comprometida
4. **Notificar usuários** afetados se necessário
5. **Documentar incidente** para análise futura

## 📚 Referências

- [Supabase Security Best Practices](https://supabase.com/docs/guides/auth/row-level-security)
- [JWT Security](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

