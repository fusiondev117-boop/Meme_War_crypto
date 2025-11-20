@echo off
color 0A
title Crypto GameFi - Complete Startup

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║         CRYPTO GAMEFI - AUTOMATED STARTUP                     ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

REM Check for admin rights
net session >nul 2>&1
if %errorLevel% == 0 (
    echo [✓] Running with Administrator privileges
    echo.
) else (
    color 0C
    echo [!] WARNING: Not running as Administrator
    echo [!] Some operations may fail
    echo.
    echo Right-click this file and select "Run as Administrator"
    echo.
    pause
    exit
)

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo STEP 1: Starting MongoDB
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

net start MongoDB 2>nul
if %errorLevel% == 0 (
    echo [✓] MongoDB started successfully
) else (
    sc query MongoDB | find "RUNNING" >nul
    if %errorLevel% == 0 (
        echo [✓] MongoDB is already running
    ) else (
        color 0E
        echo [!] MongoDB failed to start or is not installed
        echo [!] Please install MongoDB or use MongoDB Atlas
        echo.
        pause
    )
)
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo STEP 2: Cleaning up old processes
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

set "ports=5001 5100 5200 5300 5400 5500 5600 5700 4000 4900 6100 8800 9000"

for %%p in (%ports%) do (
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":%%p" ^| findstr "LISTENING"') do (
        echo Killing process on port %%p (PID: %%a)
        taskkill /F /PID %%a >nul 2>&1
    )
)

echo [✓] Port cleanup complete
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo STEP 3: Starting all services
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo This will start:
echo   • Backend API (Port 5001)
echo   • Frontend (Port 8800)
echo   • Admin Panel UI (Port 9000)
echo   • Admin Backend API (Port 6100)
echo   • All game services
echo.
echo Compilation will take 30-60 seconds...
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

timeout /t 2 /nobreak >nul

echo Starting services now...
echo.
echo Once you see "webpack compiled", open your browser to:
echo   Main App:    http://localhost:8800
echo   Admin Panel: http://localhost:9000 (admin/admin)
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

npm start
