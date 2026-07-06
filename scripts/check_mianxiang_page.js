const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pagePath = path.join(root, 'index_mianxiang.html');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function read(file) {
  assert(fs.existsSync(file), `${path.relative(root, file)} is missing`);
  return fs.readFileSync(file, 'utf8');
}

const html = read(pagePath);

[
  'assets/mianxiang/bg.png',
  'assets/mianxiang/opening.mp4',
  'assets/mianxiang/climax.mp4',
  'assets/mianxiang/ui-reference.png',
].forEach((asset) => {
  assert(html.includes(asset), `HTML does not reference ${asset}`);
  assert(fs.existsSync(path.join(root, asset)), `${asset} is missing`);
});

[
  'const STAGES',
  'const state',
  'function setStage(',
  'function startCamera(',
  'function captureFace(',
  'function analyzeFaceImage(',
  'function buildReading(',
  'function renderResult(',
  'function playVideo(',
  'function stopCamera(',
  'navigator.mediaDevices.getUserMedia',
].forEach((needle) => {
  assert(html.includes(needle), `Missing behavior marker: ${needle}`);
});

[
  '面相解读',
  '玄学项目',
  '三庭五眼',
  '十二宫',
  '照面采相',
  '定格面相',
  '重新采相',
  '五官总论',
  '财帛宫',
  '官禄宫',
  '夫妻宫',
  '迁移宫',
  '仅作传统文化体验',
].forEach((copy) => {
  assert(html.includes(copy), `Missing visible copy: ${copy}`);
});

[
  'home -> intro -> capture -> select -> climax -> result',
  'body[data-stage="home"]',
  'body[data-stage="intro"]',
  'body[data-stage="capture"]',
  'body[data-stage="select"]',
  'body[data-stage="climax"]',
  'body[data-stage="result"]',
  'data-act="capture"',
  'data-act="retake"',
  'data-act="reveal"',
  'data-act="copy"',
  'data-act="again"',
  'data-act="homeback"',
].forEach((behavior) => {
  assert(html.includes(behavior), `Missing behavior marker: ${behavior}`);
});

assert(!html.includes('data:image'), 'HTML should not embed base64 assets');

console.log('index_mianxiang.html static contract checks passed');
