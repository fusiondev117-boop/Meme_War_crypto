# PowerShell script to cleanup ports and start services
Write-Host "Cleaning up ports..." -ForegroundColor Cyan

$ports = @(5001, 5100, 5200, 5300, 5400, 5500, 5600, 5700, 4000, 4900, 6100, 8800, 9000)

foreach ($port in $ports) {
    $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($connections) {
        foreach ($conn in $connections) {
            $process = Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue
            if ($process) {
                Write-Host "Killing process $($process.Name) (PID: $($process.Id)) on port $port" -ForegroundColor Yellow
                Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
            }
        }
    }
}

Write-Host "Cleanup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Starting services..." -ForegroundColor Cyan
npm start
