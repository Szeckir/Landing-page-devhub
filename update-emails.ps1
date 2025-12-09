# Script para atualizar multiplos emails de uma vez
# Uso: .\update-emails.ps1

# Verificar se o arquivo existe
if (-not (Test-Path "emails.json")) {
    Write-Host "ERRO: Arquivo emails.json nao encontrado!" -ForegroundColor Red
    Write-Host "Crie um arquivo emails.json com este formato:" -ForegroundColor Yellow
    Write-Host '{'
    Write-Host '  "secret": "sua-senha-secreta",'
    Write-Host '  "emails": ['
    Write-Host '    "email1@exemplo.com",'
    Write-Host '    "email2@exemplo.com"'
    Write-Host '  ]'
    Write-Host '}'
    exit 1
}

# Ler emails do arquivo JSON
try {
    $json = Get-Content -Path "emails.json" -Raw | ConvertFrom-Json
} catch {
    Write-Host "ERRO ao ler arquivo emails.json: $_" -ForegroundColor Red
    exit 1
}

# Verificar se tem secret e emails
if (-not $json.secret) {
    Write-Host "ERRO: Campo 'secret' nao encontrado no arquivo JSON!" -ForegroundColor Red
    exit 1
}

if (-not $json.emails -or $json.emails.Count -eq 0) {
    Write-Host "ERRO: Campo 'emails' nao encontrado ou esta vazio!" -ForegroundColor Red
    exit 1
}

Write-Host "Atualizando $($json.emails.Count) emails..." -ForegroundColor Cyan

# Criar body da requisicao
$body = $json | ConvertTo-Json -Depth 10

# Executar requisicao
try {
    $response = Invoke-RestMethod -Uri "https://devhub-backend-red.vercel.app/api/bulk-update" -Method Post -ContentType "application/json" -Body $body

    # Mostrar resultado
    Write-Host ""
    Write-Host "SUCESSO: Atualizacao concluida!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Resumo:" -ForegroundColor Cyan
    Write-Host "  Total: $($response.summary.total)" -ForegroundColor White
    Write-Host "  Sucesso: $($response.summary.success)" -ForegroundColor Green
    Write-Host "  Nao encontrados: $($response.summary.notFound)" -ForegroundColor Yellow
    Write-Host "  Erros: $($response.summary.errors)" -ForegroundColor Red

    if ($response.results.success.Count -gt 0) {
        Write-Host ""
        Write-Host "Emails atualizados com sucesso:" -ForegroundColor Green
        foreach ($email in $response.results.success) {
            Write-Host "  - $email" -ForegroundColor White
        }
    }

    if ($response.results.notFound.Count -gt 0) {
        Write-Host ""
        Write-Host "Emails nao encontrados (usuario ainda nao fez login):" -ForegroundColor Yellow
        foreach ($email in $response.results.notFound) {
            Write-Host "  - $email" -ForegroundColor White
        }
    }

    if ($response.results.errors.Count -gt 0) {
        Write-Host ""
        Write-Host "Erros:" -ForegroundColor Red
        foreach ($errorItem in $response.results.errors) {
            Write-Host "  - $($errorItem.email): $($errorItem.error)" -ForegroundColor White
        }
    }

    Write-Host ""

} catch {
    Write-Host ""
    Write-Host "ERRO ao executar requisicao:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    
    if ($_.ErrorDetails.Message) {
        Write-Host ""
        Write-Host "Detalhes:" -ForegroundColor Yellow
        Write-Host $_.ErrorDetails.Message -ForegroundColor White
    }
    exit 1
}
