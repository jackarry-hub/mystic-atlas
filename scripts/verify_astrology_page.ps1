$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$page = Join-Path $root 'index_astrology.html'
$assetDir = Join-Path $root 'assets\astro'

if (!(Test-Path -LiteralPath $page)) {
  throw "Missing page: index_astrology.html"
}

$html = Get-Content -Raw -LiteralPath $page

$requiredAssets = @(
  'assets/astro/astro-bg.png',
  'assets/astro/astro-opening.mp4',
  'assets/astro/astro-climax.mp4'
)

foreach ($asset in $requiredAssets) {
  if ($html -notlike "*$asset*") {
    throw "Page does not reference required asset: $asset"
  }
  $diskPath = Join-Path $root ($asset -replace '/', '\')
  if (!(Test-Path -LiteralPath $diskPath)) {
    throw "Missing asset on disk: $asset"
  }
}

$requiredSnippets = @(
  '<body data-stage="home">',
  'id="topnav"',
  'id="projMenu"',
  'id="openingVid"',
  'id="climaxVid"',
  'id="introLayer"',
  'id="burstLayer"',
  'id="readingLayer"',
  'const ASTRO_TOPICS',
  'const HOUSE_SYSTEMS',
  'const SIGN_RULERS',
  'function toIntro()',
  'function toBurst()',
  'function renderReading()',
  'id="topicChoices"',
  'id="birthInputs"',
  'id="placeInputs"',
  'id="birthDate"',
  'id="birthTime"',
  'id="birthPlace"',
  'id="houseSystem"',
  'id="summaryGrid"',
  'id="planetCards"',
  'id="aspectCards"'
)

foreach ($snippet in $requiredSnippets) {
  if ($html -notlike "*$snippet*") {
    throw "Missing expected page snippet: $snippet"
  }
}

$layoutSnippets = @(
  'data-ref-ui="star-map-observation"',
  'class="pnl side-menu ref-ornate"',
  'class="pnl today-tip ref-bottom-left"',
  'class="pnl quote ref-bottom-right"'
)

foreach ($snippet in $layoutSnippets) {
  if ($html -notlike "*$snippet*") {
    throw "Missing expected reference-layout marker: $snippet"
  }
}

Write-Host 'Astrology page static verification passed.'
