#!/usr/bin/env powershell
# ROZANAMART - GitHub Setup & Push Script
# This script will push your code to GitHub automatically

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║       ROZANAMART - GitHub Push Setup Script              ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if git is installed
Write-Host "Step 1: Checking Git Installation..." -ForegroundColor Yellow
$gitCheck = git --version 2>$null
if ($null -eq $gitCheck) {
    Write-Host "❌ Git not installed! Download from: https://git-scm.com/download" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Git installed: $gitCheck" -ForegroundColor Green
Write-Host ""

# Step 2: Configure Git (if not done)
Write-Host "Step 2: Configuring Git..." -ForegroundColor Yellow
$gitName = git config --global user.name
$gitEmail = git config --global user.email

if ([string]::IsNullOrEmpty($gitName)) {
    Write-Host "Git name not set. Enter your name: " -ForegroundColor Cyan -NoNewline
    $name = Read-Host
    git config --global user.name "$name"
    Write-Host "✅ Name set: $name" -ForegroundColor Green
} else {
    Write-Host "✅ Git name already set: $gitName" -ForegroundColor Green
}

if ([string]::IsNullOrEmpty($gitEmail)) {
    Write-Host "Git email not set. Enter your email: " -ForegroundColor Cyan -NoNewline
    $email = Read-Host
    git config --global user.email "$email"
    Write-Host "✅ Email set: $email" -ForegroundColor Green
} else {
    Write-Host "✅ Git email already set: $gitEmail" -ForegroundColor Green
}
Write-Host ""

# Step 3: Initialize Git repository (if not done)
Write-Host "Step 3: Initializing Git Repository..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "✅ Repository already initialized" -ForegroundColor Green
} else {
    git init
    Write-Host "✅ Repository initialized" -ForegroundColor Green
}
Write-Host ""

# Step 4: Create .gitignore (if not exists)
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
Write-Host "Step 5: Adding files to Git..." -ForegroundColor Yellow
git add .
Write-Host "✅ Files added" -ForegroundColor Green
Write-Host ""

# Step 6: Create initial commit
Write-Host "Step 6: Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit - RozanaMart complete setup with Firebase, animations, and deployment guides"
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Commit created" -ForegroundColor Green
} else {
    Write-Host "⚠️  Commit might already exist (that's okay)" -ForegroundColor Yellow
}
Write-Host ""

# Step 7: Get GitHub information
Write-Host "Step 7: GitHub Repository Setup..." -ForegroundColor Yellow
Write-Host ""
Write-Host "You need to create a GitHub repository first!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Follow these steps:" -ForegroundColor White
Write-Host "1. Go to: https://github.com/new" -ForegroundColor White
Write-Host "2. Create new repository named: 'rozanamart'" -ForegroundColor White
Write-Host "3. DO NOT initialize with README (we already have one)" -ForegroundColor White
Write-Host "4. Click 'Create repository'" -ForegroundColor White
Write-Host ""
Write-Host "Then enter your GitHub information:" -ForegroundColor Cyan
Write-Host ""

Write-Host "Enter your GitHub username: " -ForegroundColor Cyan -NoNewline
$username = Read-Host
Write-Host ""

# Step 8: Add remote and push
Write-Host "Step 8: Connecting to GitHub..." -ForegroundColor Yellow
$remoteUrl = "https://github.com/$username/rozanamart.git"
Write-Host "Remote URL: $remoteUrl" -ForegroundColor White
Write-Host ""

# Check if remote already exists
$remoteExists = git remote get-url origin 2>$null
if ([string]::IsNullOrEmpty($remoteExists)) {
    git remote add origin $remoteUrl
    Write-Host "✅ Remote added" -ForegroundColor Green
} else {
    Write-Host "✅ Remote already exists: $remoteExists" -ForegroundColor Green
}
Write-Host ""

# Step 9: Set default branch
Write-Host "Step 9: Setting default branch..." -ForegroundColor Yellow
git branch -M main
Write-Host "✅ Default branch set to 'main'" -ForegroundColor Green
Write-Host ""

# Step 10: Push to GitHub
Write-Host "Step 10: Pushing code to GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  This will ask for authentication!" -ForegroundColor Yellow
Write-Host "Use your GitHub password or Personal Access Token" -ForegroundColor Yellow
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║           ✅ SUCCESS! Code pushed to GitHub!              ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your repository URL: https://github.com/$username/rozanamart" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://vercel.com" -ForegroundColor White
    Write-Host "2. Click 'Import Project'" -ForegroundColor White
    Write-Host "3. Select your GitHub repository" -ForegroundColor White
    Write-Host "4. Deploy frontend!" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Push failed! Check the errors above." -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "1. Authentication failed: Create Personal Access Token" -ForegroundColor White
    Write-Host "   Go to: https://github.com/settings/tokens" -ForegroundColor White
    Write-Host "2. Remote URL wrong: Run 'git remote set-url origin <correct-url>'" -ForegroundColor White
    Write-Host ""
}

Write-Host "Script completed!" -ForegroundColor Cyan
