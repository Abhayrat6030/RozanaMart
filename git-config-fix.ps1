#!/usr/bin/env powershell
# ROZANAMART - Git Config Fix Script
# यह script corrupt git config को fix करेगा

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Red
Write-Host "║         ⚠️  GIT CONFIG FIX SCRIPT - Corrupted Config      ║" -ForegroundColor Red
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Red
Write-Host ""

# Get current directory
$currentDir = Get-Location
Write-Host "Current Directory: $currentDir" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if .git exists
Write-Host "Step 1: Checking for corrupted .git folder..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "Found corrupted .git folder. Deleting..." -ForegroundColor Yellow
    Remove-Item .git -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Deleted corrupted .git folder" -ForegroundColor Green
} else {
    Write-Host "No .git folder found" -ForegroundColor White
}
Write-Host ""

# Step 2: Initialize fresh git
Write-Host "Step 2: Initializing fresh git repository..." -ForegroundColor Yellow
git init -b main
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Git initialized successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Git init failed!" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 3: Configure git
Write-Host "Step 3: Configuring git..." -ForegroundColor Yellow

$existingName = git config user.name 2>$null
$existingEmail = git config user.email 2>$null

if ([string]::IsNullOrEmpty($existingName)) {
    Write-Host "Enter your name: " -ForegroundColor Cyan -NoNewline
    $name = Read-Host
    git config user.name "$name"
    Write-Host "✅ Name configured: $name" -ForegroundColor Green
} else {
    Write-Host "✅ Name already set: $existingName" -ForegroundColor Green
}

if ([string]::IsNullOrEmpty($existingEmail)) {
    Write-Host "Enter your email: " -ForegroundColor Cyan -NoNewline
    $email = Read-Host
    git config user.email "$email"
    Write-Host "✅ Email configured: $email" -ForegroundColor Green
} else {
    Write-Host "✅ Email already set: $existingEmail" -ForegroundColor Green
}
Write-Host ""

# Step 4: Create .gitignore
Write-Host "Step 4: Creating .gitignore..." -ForegroundColor Yellow
if (-not (Test-Path ".gitignore")) {
    $gitignoreContent = @"
# Dependencies
node_modules/
/node_modules

# Environment variables
.env
.env.local
.env.*.local

# Build output
/build
/dist
*.js.map

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Optional npm cache
.npm

# Optional eslint cache
.eslintcache
"@
    Set-Content -Path ".gitignore" -Value $gitignoreContent -Encoding UTF8
    Write-Host "✅ .gitignore created" -ForegroundColor Green
} else {
    Write-Host "✅ .gitignore already exists" -ForegroundColor Green
}
Write-Host ""

# Step 5: Add all files
Write-Host "Step 5: Adding all files..." -ForegroundColor Yellow
git add .
Write-Host "✅ Files added" -ForegroundColor Green
Write-Host ""

# Step 6: Create commit
Write-Host "Step 6: Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit - RozanaMart complete setup with Firebase, animations, and deployment guides"
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Commit created" -ForegroundColor Green
} else {
    Write-Host "⚠️  Commit message failed (might already exist)" -ForegroundColor Yellow
}
Write-Host ""

# Step 7: Set default branch
Write-Host "Step 7: Setting default branch to main..." -ForegroundColor Yellow
git branch -M main
Write-Host "✅ Default branch set to main" -ForegroundColor Green
Write-Host ""

# Step 8: Get GitHub info
Write-Host "Step 8: Setting up GitHub remote..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  Before continuing, make sure you:" -ForegroundColor Yellow
Write-Host "1. Created GitHub account: https://github.com/signup" -ForegroundColor White
Write-Host "2. Created new repository: https://github.com/new" -ForegroundColor White
Write-Host "3. Named it: rozanamart" -ForegroundColor White
Write-Host "4. Did NOT add README or .gitignore" -ForegroundColor White
Write-Host ""

Write-Host "Enter your GitHub username: " -ForegroundColor Cyan -NoNewline
Abhayrat6030 = Read-Host

if ([string]::IsNullOrEmpty(Abhayrat6030)) {
    Write-Host ""
    Write-Host "❌ Username is required!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 9: Add remote
Write-Host "Step 9: Adding GitHub remote..." -ForegroundColor Yellow
$remoteUrl = "https://github.com/Abhayrat6030/rozanamart.git"

# Check if remote already exists
$remoteExists = git remote get-url origin 2>$null
if ([string]::IsNullOrEmpty($remoteExists)) {
    git remote add origin $remoteUrl
    Write-Host "✅ Remote added: $remoteUrl" -ForegroundColor Green
} else {
    Write-Host "Remote already exists. Updating..." -ForegroundColor Yellow
    git remote set-url origin $remoteUrl
    Write-Host "✅ Remote updated: $remoteUrl" -ForegroundColor Green
}
Write-Host ""

# Step 10: Verify config
Write-Host "Step 10: Verifying git configuration..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Git Config:" -ForegroundColor Cyan
git config --list --local | Select-String "user\|remote"
Write-Host ""

# Step 11: Push to GitHub
Write-Host "Step 11: Pushing code to GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  You will be asked for authentication!" -ForegroundColor Yellow
Write-Host "Use your GitHub Personal Access Token or Password" -ForegroundColor Yellow
Write-Host ""
Write-Host "Token से: https://github.com/settings/tokens" -ForegroundColor Cyan
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║         ✅ SUCCESS! Git Config Fixed & Code Pushed!       ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
    Write-Host "Repository URL: https://github.com/Abhayrat6030/rozanamart" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://vercel.com" -ForegroundColor White
    Write-Host "2. Import your GitHub repository" -ForegroundColor White
    Write-Host "3. Deploy frontend!" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Push failed! Check error message above." -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "1. Authentication failed: Use Personal Access Token" -ForegroundColor White
    Write-Host "   Get token: https://github.com/settings/tokens" -ForegroundColor White
    Write-Host "2. Repository doesn't exist: Create it at https://github.com/new" -ForegroundColor White
    Write-Host "3. Wrong username: Check your GitHub profile URL" -ForegroundColor White
    Write-Host ""
}

Write-Host "Done!" -ForegroundColor Cyan

Write-Host ""
Write-Host "📚 Troubleshooting Tips:" -ForegroundColor Yellow
Write-Host "1. First: https://github.com/new पर repository बनाओ" -ForegroundColor White
Write-Host "   - Name: rozanamart" -ForegroundColor White
Write-Host "   - Public चुनो" -ForegroundColor White
Write-Host "" -ForegroundColor White
Write-Host "2. फिर script चलाओ:" -ForegroundColor White
Write-Host "   .\git-config-fix.ps1" -ForegroundColor White
Write-Host "" -ForegroundColor White
Write-Host "3. Username दो जब पूछे" -ForegroundColor White
Write-Host "" -ForegroundColor White
Write-Host "4. Token paste करो (GitHub password की जगह)" -ForegroundColor White
Write-Host ""
