$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$excluded = @(".git", "node_modules", "coverage", "dist", "build")
$files = Get-ChildItem -LiteralPath $root -File -Recurse | Where-Object {
  $relative = $_.FullName.Substring($root.Path.Length + 1)
  $parts = $relative -split "[\\/]"
  ($parts | Where-Object { $excluded -contains $_ }).Count -eq 0 -and
  ($relative -replace "\\", "/") -ne "scripts/validate-public.ps1"
}

$patterns = @(
  '-----BEGIN (RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----',
  '(?i)(api[_-]?key|secret|token|password)\s*[:=]\s*["''][^"'']{12,}["'']',
  '\bsk-[A-Za-z0-9_-]{16,}\b',
  '\bgh[pousr]_[A-Za-z0-9_]{20,}\b',
  '\bgithub_pat_[A-Za-z0-9_]{20,}\b',
  '\bAKIA[0-9A-Z]{16}\b',
  '(?i)authorization\s*:\s*bearer\s+[A-Za-z0-9._-]{16,}',
  '(?i)\b[A-Z]:[\\/](Users|Codes|Projects|Repos)[\\/]'
)

$findings = @()
foreach ($file in $files) {
  $content = Get-Content -LiteralPath $file.FullName -Raw
  foreach ($pattern in $patterns) {
    $matches = [regex]::Matches($content, $pattern)
    foreach ($match in $matches) {
      $relative = $file.FullName.Substring($root.Path.Length + 1)
      $findings += "${relative}: $($match.Value)"
    }
  }
}

if ($findings.Count -gt 0) {
  Write-Error ("Potential public-repository secrets or private identifiers found:`n" + ($findings -join "`n"))
}

Write-Output "Public repository scan passed: $($files.Count) files inspected."
