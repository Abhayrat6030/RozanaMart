@echo off
REM ROZANAMART - GitHub Push Commands
REM Run these commands one by one in PowerShell

REM STEP 1: Go to project folder
cd "c:\Users\abhay\OneDrive\Desktop\My Website\RozanaMart"

REM STEP 2: Initialize git (if not done)
git init

REM STEP 3: Configure git
git config --global user.name "Abhay Raj"
git config --global user.email "your-email@gmail.com"

REM STEP 4: Add all files
git add .

REM STEP 5: Create commit
git commit -m "Initial commit - RozanaMart complete setup with Firebase, animations, and deployment"

REM STEP 6: Set default branch to main
git branch -M main

REM STEP 7: Add remote (REPLACE YOUR-USERNAME with your GitHub username!)
git remote add origin https://github.com/YOUR-USERNAME/rozanamart.git

REM STEP 8: Push to GitHub (will ask for password/token)
git push -u origin main

REM DONE!
echo.
echo ========================================
echo GitHub Push Complete!
echo ========================================
echo.
echo Check your repository at:
echo https://github.com/YOUR-USERNAME/rozanamart
echo.
pause
