@echo off
REM Task Manager - Installation Script for Windows

echo Installing Task Manager Application...
echo =======================================

REM Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js not found. Please install Node.js v14+ from https://nodejs.org
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo [OK] Node.js found: %NODE_VERSION%

REM Install Backend
echo.
echo Installing Backend Dependencies...
cd backend
call npm install
copy .env.example .env
echo [OK] Backend ready! Configure MongoDB in backend\.env if needed
cd ..

REM Install Frontend
echo.
echo Installing Frontend Dependencies...
cd frontend
call npm install
copy .env.example .env
echo [OK] Frontend ready!
cd ..

REM Create startup script
echo.
echo Creating startup script...

(
echo @echo off
echo title Task Manager
echo.
echo echo Starting Backend...
echo start "Backend" cmd /k "cd backend && npm start"
echo.
echo timeout /t 3 /nobreak
echo.
echo echo Starting Frontend...
echo start "Frontend" cmd /k "cd frontend && npm start"
echo.
echo echo.
echo echo [OK] Application started!
echo echo Frontend: http://localhost:3000
echo echo Backend: http://localhost:5000
echo echo.
echo pause
) > start-dev.cmd

echo [OK] Startup script created: start-dev.cmd

echo.
echo =======================================
echo [OK] Installation Complete!
echo.
echo Next Steps:
echo 1. Edit backend\.env with your MongoDB URI
echo 2. Run: start-dev.cmd
echo 3. Or manually:
echo    - cd backend ^&^& npm start
echo    - cd frontend ^&^& npm start (new terminal^)
echo 4. Open http://localhost:3000
echo.
echo For Docker: docker-compose up -d
echo =======================================

pause
