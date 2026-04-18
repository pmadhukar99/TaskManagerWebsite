@echo off
REM Quick Setup Script for GitHub Pages + Firebase Deployment

echo.
echo ======================================
echo Task Manager - Free Setup
echo ======================================
echo.

echo Step 1: Install dependencies...
cd frontend
call npm install
echo Dependencies installed!

echo.
echo Step 2: Update package.json...
echo Please edit frontend/package.json and replace:
echo   "homepage": "https://YOUR_GITHUB_USERNAME.github.io/TaskManagerWebsite"
echo.
pause

echo.
echo Step 3: Update Firebase config...
echo Please edit frontend/src/firebase.js with your Firebase config
echo Get config from: https://firebase.google.com (Project Settings)
echo.
pause

echo.
echo Step 4: Install gh-pages...
call npm install --save-dev gh-pages
echo gh-pages installed!

echo.
echo Step 5: Building project...
call npm run build
echo Build complete!

echo.
echo ======================================
echo Setup Complete!
echo ======================================
echo.
echo Next steps:
echo 1. Push to GitHub: git push origin main
echo 2. Deploy: npm run deploy
echo 3. Enable GitHub Pages in repo settings
echo 4. Visit: https://YOUR_USERNAME.github.io/TaskManagerWebsite
echo.
pause
