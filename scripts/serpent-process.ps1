#Requires -Version 5.1
<#
.SYNOPSIS
  Serpent 后端进程管理脚本（开发/安装版通用）。
.EXAMPLE
  .\scripts\serpent-process.ps1 status
  .\scripts\serpent-process.ps1 start
  .\scripts\serpent-process.ps1 stop
  .\scripts\serpent-process.ps1 restart
  .\scripts\serpent-process.ps1 health
#>
param(
    [Parameter(Position = 0)]
    [ValidateSet('start', 'stop', 'restart', 'status', 'health', 'kill-all')]
    [string]$Action = 'status',
    [int]$Port = 19880,
    [switch]$MultiInstance,
    [int]$TimeoutSec = 45
)

$ErrorActionPreference = 'SilentlyContinue'
$DevProjectRoot = 'D:\Serpent'
$UserDataDir = Join-Path $env:APPDATA 'Serpent'
$ApiPort = 19880

# ── 工具 ──────────────────────────────────────────────────────────────────

function Get-SerpentProcesses {
    <# 查找所有 Serpent 相关进程（安装版 Serpent.exe + 开发版 electron.exe）。 #>
    return Get-CimInstance Win32_Process |
        Where-Object {
            ($_.Name -eq 'Serpent.exe') -or
            ($_.Name -eq 'electron.exe' -and $_.CommandLine -match 'Serpent')
        } |
        Select-Object ProcessId, Name,
            @{n = 'Type'; e = {
                if ($_.CommandLine -match '--type=([\w.]+)') { $Matches[1] } else { 'main' }
            }},
            @{n = 'Path'; e = { $_.ExecutablePath }},
            @{n = 'IsDev'; e = { $_.CommandLine -match 'node_modules|dev-instances' }},
            @{n = 'CmdLine'; e = { $_.CommandLine }}
}

function Get-MainProcess {
    return Get-SerpentProcesses | Where-Object { $_.Type -eq 'main' }
}

function Get-ApiToken {
    $dir = Join-Path $UserDataDir 'dev-instances'
    if (-not (Test-Path $dir)) {
        $direct = Join-Path $UserDataDir 'api-token'
        if (Test-Path $direct) { return (Get-Content $direct -Raw).Trim() }
        return $null
    }
    $newest = Get-ChildItem $dir -Directory | Sort-Object LastWriteTime -Descending | Select-Object -First 1
    if (-not $newest) { return $null }
    $tokenFile = Join-Path $newest.FullName 'api-token'
    if (Test-Path $tokenFile) { return (Get-Content $tokenFile -Raw).Trim() }
    return $null
}

function Test-HttpApi {
    foreach ($p in @($Port, ($Port + 1), ($Port + 2))) {
        try {
            $r = Invoke-RestMethod -Uri "http://127.0.0.1:$p/ping" -TimeoutSec 3 -ErrorAction Stop
            if ($r.app -eq 'Serpent') { return @{ port = $p; alive = $true; response = $r } }
        } catch { continue }
    }
    return $null
}

function Write-Status { param([string]$Icon, [string]$Msg) Write-Host "  $Icon $Msg" }

# ── 动作 ──────────────────────────────────────────────────────────────────

function Invoke-Status {
    $procs = Get-SerpentProcesses
    Write-Host "`n=== Serpent 进程 ===" -ForegroundColor Cyan
    if (-not $procs) {
        Write-Status '⚪' '没有运行中的 Serpent 进程。'
    } else {
        foreach ($p in $procs) {
            $tag = if ($p.IsDev) { '[dev]' } else { '[installed]' }
            $short = if ($p.Path) { $p.Path } else { $p.Name }
            Write-Status '▸' "$tag PID=$($p.ProcessId) ($($p.Type)) $short"
        }
    }
    $api = Test-HttpApi
    if ($api) {
        Write-Status '🟢' "HTTP API: 127.0.0.1:$($api.port) v$($api.response.version) api:$($api.response.apiVersion)"
    } else {
        Write-Status '🔴' 'HTTP API: 不可达'
    }
    Write-Host ''
}

function Invoke-Start {
    $api = Test-HttpApi
    if ($api) {
        Write-Host "Serpent 已在运行 (HTTP API :$($api.port))。" -ForegroundColor Yellow
        return
    }
    Write-Host "启动 Serpent 后端..." -ForegroundColor Cyan
    $env:SERPENT_ALLOW_MULTI_INSTANCE = '1'
    $env:SERPENT_HTTP_PORT = "$Port"
    Push-Location $DevProjectRoot
    try {
        Start-Process -FilePath 'node' -ArgumentList 'scripts/dev-start.mjs' `
            -WorkingDirectory $DevProjectRoot -WindowStyle Hidden
        $elapsed = 0
        while ($elapsed -lt $TimeoutSec) {
            Start-Sleep 3; $elapsed += 3
            $api = Test-HttpApi
            if ($api) {
                Write-Status '🟢' "HTTP API :$($api.port) 就绪"
                $tok = Get-ApiToken
                if ($tok) {
                    Write-Status '🔑' "Token: $($tok.Substring(0,12))..."
                    Write-Status '📖' "Docs: http://127.0.0.1:$($api.port)/docs"
                }
                return
            }
            Write-Host "  等待... ($elapsed/${TimeoutSec}s)"
        }
        Write-Status '⚠️' "超时 (${TimeoutSec}s)。"
    } finally { Pop-Location }
}

function Invoke-Stop {
    $procs = Get-SerpentProcesses
    if (-not $procs) { Write-Host '没有运行中的进程。' -ForegroundColor Yellow; return }
    Write-Host "停止 $($procs.Count) 个进程..." -ForegroundColor Cyan
    foreach ($p in $procs) {
        Stop-Process -Id $p.ProcessId -Force -ErrorAction SilentlyContinue
        Write-Status '⏹' "PID $($p.ProcessId) 已终止"
    }
    Start-Sleep 2
    if (Get-SerpentProcesses) { Write-Status '⚠️' '仍有进程残留。' }
    else { Write-Status '✅' '全部停止。' }
}

function Invoke-Restart { Invoke-Stop; Start-Sleep 2; Invoke-Start }

function Invoke-Health {
    $api = Test-HttpApi
    if (-not $api) {
        Write-Host '{"status":"down"}' -ForegroundColor Red; exit 1
    }
    $token = Get-ApiToken
    $hdr = @{}
    if ($token) { $hdr['Authorization'] = "Bearer $token" }
    try {
        $r = Invoke-RestMethod -Uri "http://127.0.0.1:$($api.port)/commands/serpent_library_list_open" `
            -Method Post -Headers $hdr -ContentType 'application/json' -Body '{}' -TimeoutSec 5
        @{ status = 'ok'; port = $api.port; version = $api.response.version
           libraries = $r.result.libraries.Count } | ConvertTo-Json -Compress | Write-Host
    } catch {
        '{"status":"degraded"}' | Write-Host
    }
}

function Invoke-KillAll {
    $procs = Get-SerpentProcesses
    if (-not $procs) { Write-Host '没有进程。'; return }
    foreach ($p in $procs) {
        Stop-Process -Id $p.ProcessId -Force -ErrorAction SilentlyContinue
        Write-Status '💀' "PID $($p.ProcessId) 已强杀"
    }
}

switch ($Action) {
    'start'    { Invoke-Start }
    'stop'     { Invoke-Stop }
    'restart'  { Invoke-Restart }
    'status'   { Invoke-Status }
    'health'   { Invoke-Health }
    'kill-all' { Invoke-KillAll }
    default    { Invoke-Status }
}
