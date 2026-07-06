const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pagePath = path.join(root, 'index_name_date.html');
const assetDir = path.join(root, 'assets', 'name-date');

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
  'assets/name-date/bg.png',
  'assets/name-date/opening.mp4',
  'assets/name-date/climax.mp4',
].forEach((asset) => {
  assert(html.includes(asset), `HTML does not reference ${asset}`);
  assert(fs.existsSync(path.join(root, asset)), `${asset} is missing`);
});

[
  'const PROJECTS',
  'const SERVICE_OPTIONS',
  'const FOCUS_OPTIONS',
  'const DATE_WINDOWS',
  'const ELEMENT_RULES',
  'const NAME_BANK',
  'const DAY_RULES',
  'const RESULT_COPY',
  'function toIntro()',
  'function selectOption(',
  'function toBurst()',
  'function finishBurst()',
  'function buildResult()',
  'function renderReading()',
  'function copyReading()',
  'function backHome()',
].forEach((needle) => {
  assert(html.includes(needle), `Missing contract: ${needle}`);
});

[
  '新生取名',
  '成人改名',
  '品牌命名',
  '吉日择期',
  '名日合参',
  '补木',
  '补火',
  '补土',
  '补金',
  '补水',
  '音形义优先',
  '近七日',
  '本月',
  '三个月内',
  '不限',
  '姓名候选',
  '吉日推荐',
  '综合解读',
  '塔罗互动占卜',
].forEach((copy) => {
  assert(html.includes(copy), `Missing visible copy: ${copy}`);
});

[
  'home -> intro -> burst -> reading',
  'body[data-stage="intro"]',
  'body[data-stage="burst"]',
  'body[data-stage="reading"]',
  'data-act="copy"',
  'data-act="again"',
  'data-act="homeback"',
].forEach((behavior) => {
  assert(html.includes(behavior), `Missing behavior marker: ${behavior}`);
});

assert(!html.includes('data:image'), 'HTML should not embed base64 assets');
assert(fs.existsSync(assetDir), 'assets/name-date directory is missing');

console.log('index_name_date.html static contract checks passed');
