# PowerShell Script to Clean and Start the Project
# Run this as Administrator

Write-Host "=== Crypto GameFi Project Startup ===" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "WARNING: Not running as Administrator. Some operations may fail." -ForegroundColor Yellow
    Write-Host "Right-click PowerShell and select 'Run as Administrator' for best results." -ForegroundColor Yellow
    Write-Host ""
}

# Function to kill process on port
function Kill-ProcessOnPort {
    param([int]$Port)
    
    $connections = netstat -ano | Select-String ":$Port\s" | Select-String "LISTENING"
    
    if ($connections) {
        foreach ($connection in $connections) {
            $parts = $connection -split '\s+' | Where-Object { $_ -ne '' }
            $pid = $parts[-1]
            
            if ($pid -and $pid -match '^\d+$') {
                try {
                    Write-Host "Killing process $pid on port $Port..." -ForegroundColor Yellow
                    Stop-Process -Id $pid -Force -ErrorAction Stop
                    Write-Host "  ✓ Process killed" -ForegroundColor Green
                } catch {
                    Write-Host "  ✗ Failed to kill process: $_" -ForegroundColor Red
                }
            }
        }
    }
}

# Step 1: Check MongoDB
Write-Host "Step 1: Checking MongoDB..." -ForegroundColor Cyan
$mongoService = Get-Service -Name "MongoDB" -ErrorAction SilentlyContinue

if ($mongoService) {
    if ($mongoService.Status -eq "Running") {
        Write-Host "  ✓ MongoDB is running" -ForegroundColor Green
    } else {
        Write-Host "  Starting MongoDB..." -ForegroundColor Yellow
        try {
            Start-Service -Name "MongoDB"
            Write-Host "  ✓ MongoDB started" -ForegroundColor Green
        } catch {
            Write-Host "  ✗ Failed to start MongoDB: $_" -ForegroundColor Red
            Write-Host "  Please start MongoDB manually or run this script as Administrator" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "  ✗ MongoDB service not found" -ForegroundColor Red
    Write-Host "  Please install MongoDB or use MongoDB Atlas" -ForegroundColor Yellow
}

Write-Host ""

# Step 2: Clean up ports
Write-Host "Step 2: Cleaning up ports..." -ForegroundColor Cyan
$ports = @(5001, 5100, 5200, 5300, 5400, 5500, 5600, 5700, 4000, 4900, 6100, 8800, 9000)

foreach ($port in $ports) {
    Kill-ProcessOnPort -Port $port
}

Write-Host "  ✓ Port cleanup complete" -ForegroundColor Green
Write-Host ""

# Step 3: Start the project
Write-Host "Step 3: Starting all services..." -ForegroundColor Cyan
Write-Host "This will take 30-60 seconds for frontend/admin to compile..." -ForegroundColor Yellow
Write-Host ""

# Start npm
npm start
