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
  '(?i)(api[_-]?key|secret|token|password)\s*=\s*[^\s#"'']{12,}',
  '\b[0-9]{8,12}:[A-Za-z0-9_-]{30,}\b',
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
      $line = ($content.Substring(0, $match.Index) -split "`n").Count
      $findings += "${relative}:${line}: potential secret ($pattern)"
    }
  }
}

if ($findings.Count -gt 0) {
  Write-Error ("Potential public-repository secrets or private identifiers found:`n" + ($findings -join "`n"))
}

# Scan every reachable commit without printing the matched credential. This
# requires a full checkout in CI (fetch-depth: 0).
if (Get-Command git -ErrorAction SilentlyContinue) {
  $historyPattern = '([0-9]{8,12}:[A-Za-z0-9_-]{30,}|gh[pousr]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,}|AIza[A-Za-z0-9_-]{30,}|gsk_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9]{20,}|hf_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN (RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----)'
  $historyFindings = @()
  foreach ($commit in (git -C $root rev-list --all)) {
    $matchedFiles = git -C $root grep -I -l -E $historyPattern $commit 2>$null
    foreach ($matchedFile in $matchedFiles) {
      $historyFindings += "${commit}:$matchedFile"
    }
  }
  if ($historyFindings.Count -gt 0) {
    Write-Error ("Potential secrets found in Git history (values suppressed):`n" + (($historyFindings | Sort-Object -Unique) -join "`n"))
  }
}

Write-Output "Public repository scan passed: $($files.Count) files inspected."
