# Script para atualizar múltiplos emails de uma vez
# Uso: .\update-emails.ps1

# Verificar se o arquivo existe
if (-not (Test-Path "emails.json")) {
    Write-Host "❌ Arquivo emails.json não encontrado!" -ForegroundColor Red
    Write-Host "Crie um arquivo emails.json com este formato:" -ForegroundColor Yellow
    Write-Host @"
{
  "secret": "sua-senha-secreta",
  "emails": [
    "email1@exemplo.com",
    "email2@exemplo.com"
  ]
}
"@
    exit 1
}

# Ler emails do arquivo JSON
try {
    $json = Get-Content -Path "emails.json" -Raw | ConvertFrom-Json
} catch {
    Write-Host "❌ Erro ao ler arquivo emails.json: $_" -ForegroundColor Red
    exit 1
}

# Verificar se tem secret e emails
if (-not $json.secret) {
    Write-Host "❌ Campo 'secret' não encontrado no arquivo JSON!" -ForegroundColor Red
    exit 1
}

if (-not $json.emails -or $json.emails.Count -eq 0) {
    Write-Host "❌ Campo 'emails' não encontrado ou está vazio!" -ForegroundColor Red
    exit 1
}

Write-Host "📋 Atualizando $($json.emails.Count) emails..." -ForegroundColor Cyan

# Criar body da requisição
$body = $json | ConvertTo-Json -Depth 10

# Executar requisição
try {
    $response = Invoke-RestMethod -Uri "https://devhub-backend-red.vercel.app/api/bulk-update" `
        -Method Post `
        -ContentType "application/json" `
        -Body $body

    # Mostrar resultado
    Write-Host ""
    Write-Host "✅ Atualização concluída!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Resumo:" -ForegroundColor Cyan
    Write-Host "  Total: $($response.summary.total)" -ForegroundColor White
    Write-Host "  ✅ Sucesso: $($response.summary.success)" -ForegroundColor Green
    Write-Host "  ⚠️  Não encontrados: $($response.summary.notFound)" -ForegroundColor Yellow
    Write-Host "  ❌ Erros: $($response.summary.errors)" -ForegroundColor Red

    if ($response.results.success.Count -gt 0) {
        Write-Host ""
        Write-Host "✅ Emails atualizados com sucesso:" -ForegroundColor Green
        $response.results.success | ForEach-Object { Write-Host "  - $_" -ForegroundColor White }
    }

    if ($response.results.notFound.Count -gt 0) {
        Write-Host ""
        Write-Host "⚠️  Emails não encontrados (usuário ainda não fez login):" -ForegroundColor Yellow
        $response.results.notFound | ForEach-Object { Write-Host "  - $_" -ForegroundColor White }
    }

    if ($response.results.errors.Count -gt 0) {
        Write-Host ""
        Write-Host "❌ Erros:" -ForegroundColor Red
        $response.results.errors | ForEach-Object { 
            Write-Host "  - $($_.email): $($_.error)" -ForegroundColor White 
        }
    }

    Write-Host ""

} catch {
    Write-Host ""
    Write-Host "❌ Erro ao executar requisição:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    
    if ($_.ErrorDetails.Message) {
        Write-Host ""
        Write-Host "Detalhes:" -ForegroundColor Yellow
        Write-Host $_.ErrorDetails.Message -ForegroundColor White
    }
    exit 1
}

