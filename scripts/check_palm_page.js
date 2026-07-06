const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pagePath = path.join(root, 'index_palm.html');
const requiredAssets = [
  'assets/palm/bg.png',
  'assets/palm/ui-reference.png',
  'assets/palm/opening.mp4',
  'assets/palm/climax.mp4',
];

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

assert(fs.existsSync(pagePath), 'index_palm.html should exist');
const html = fs.readFileSync(pagePath, 'utf8');

for (const asset of requiredAssets) {
  const assetPath = path.join(root, asset);
  assert(fs.existsSync(assetPath), `${asset} should exist`);
  assert(fs.statSync(assetPath).size > 0, `${asset} should be non-empty`);
  assert(html.includes(asset), `${asset} should be referenced by index_palm.html`);
}

const requiredSnippets = [
  '<body data-stage="home">',
  "const STAGES = ['home', 'intro', 'capture', 'select', 'climax', 'result'];",
  'id="openingVid"',
  'id="climaxVid"',
  'id="cameraVideo"',
  'id="uploadInput"',
  'data-act="capture"',
  'data-act="upload"',
  'data-act="skip-camera"',
  'data-act="reveal"',
  'data-act="copy"',
  'data-focus="career"',
  'data-focus="wealth"',
  'data-focus="relation"',
  '生命线',
  '智慧线',
  '感情线',
  '事业线',
  '掌丘',
  'PROJECTS',
  'index_6.html',
];

for (const snippet of requiredSnippets) {
  assert(html.includes(snippet), `missing required snippet: ${snippet}`);
}

const stageSections = ['home', 'introLayer', 'captureLayer', 'selectLayer', 'climaxLayer', 'resultLayer'];
for (const id of stageSections) {
  assert(html.includes(`id="${id}"`), `missing stage section #${id}`);
}

console.log('PASS: palm page static checks passed');
