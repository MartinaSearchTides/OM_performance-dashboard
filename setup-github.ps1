# Quick Setup Script
# Spusť tento soubor v PowerShell po vytvoření GitHub repository

Write-Host "=== OM Performance Dashboard - GitHub Push ===" -ForegroundColor Cyan
Write-Host ""

# Prompt pro GitHub URL
$githubUrl = Read-Host "Zadej URL tvého GitHub repository (např. https://github.com/username/om-performance-dashboard.git)"

if ([string]::IsNullOrWhiteSpace($githubUrl)) {
    Write-Host "ERROR: GitHub URL nesmí být prázdné!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Nastavuji remote origin..." -ForegroundColor Yellow

# Set working directory
Set-Location "C:\Users\Majitel\Downloads\Searchtides\Dashboards\OM_performance\OM_performance-dashboard"

# Remove existing origin if exists
git remote remove origin 2>$null

# Add new origin
git remote add origin $githubUrl

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Nepodařilo se přidat remote origin!" -ForegroundColor Red
    exit 1
}

Write-Host "Remote origin nastaven: $githubUrl" -ForegroundColor Green
Write-Host ""
Write-Host "Přejmenovávám branch na main..." -ForegroundColor Yellow

git branch -M main

Write-Host ""
Write-Host "Pushuji do GitHubu..." -ForegroundColor Yellow

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCESS! Repository byl úspěšně pushnut do GitHubu!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Další kroky:" -ForegroundColor Cyan
    Write-Host "1. Jdi na https://vercel.com/new" -ForegroundColor White
    Write-Host "2. Importuj tento GitHub repository" -ForegroundColor White
    Write-Host "3. Nastav Environment Variables:" -ForegroundColor White
    Write-Host "   - HSS_API_TOKEN" -ForegroundColor Yellow
    Write-Host "   - SUPERFEEDERS_API_TOKEN" -ForegroundColor Yellow
    Write-Host "4. Deploy!" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "ERROR: Push do GitHubu selhal!" -ForegroundColor Red
    Write-Host "Zkontroluj své GitHub credentials a zkus to znovu." -ForegroundColor Yellow
}
