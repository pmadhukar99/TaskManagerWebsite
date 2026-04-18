@echo off
title Task Manager

echo Starting Backend...
start "Backend" cmd /k "cd backend && npm start"

timeout /t 3 /nobreak

echo Starting Frontend...
start "Frontend" cmd /k "cd frontend && npm start"

echo.
echo [OK] Application started!
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000
echo.
pause
