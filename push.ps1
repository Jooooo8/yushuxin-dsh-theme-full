# Run this from the VS Code integrated terminal:
#   .\push.ps1
# It uses HTTPS, so Git Credential Manager will pop up a GitHub sign-in window.
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

$User = 'Jooooo8'
$Repo = 'yushuxin-dsh-theme-full'
$Url = "https://github.com/$User/$Repo.git"

Write-Host "Repo : $Url" -ForegroundColor Cyan
Write-Host "Commit:" -ForegroundColor Cyan
git log -1 --oneline

git remote set-url origin $Url
git branch -M main

Write-Host "`nPushing (sign in if a GitHub window appears)..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSUCCESS: pushed to $Url" -ForegroundColor Green
} else {
    Write-Host "`nFAILED. Checklist:" -ForegroundColor Red
    Write-Host "  1. Create the empty repo first: https://github.com/new"
    Write-Host "  2. Complete the GitHub sign-in window (do not cancel)"
    Write-Host "  3. If using a PAT, grant the 'repo' scope"
}
