const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const pagePath = path.join(root, 'index_ziwei.html');

function read(file) {
  assert(fs.existsSync(file), `${path.relative(root, file)} is missing`);
  return fs.readFileSync(file, 'utf8');
}

const html = read(pagePath);

function includesAll(label, values) {
  for (const value of values) {
    assert(html.includes(value), `${label} is missing required content: ${value}`);
  }
}

includesAll('asset references', [
  'assets/ziwei/bg.png',
  'assets/ziwei/opening.mp4',
  'assets/ziwei/climax.mp4',
  'assets/ziwei/ui-reference.png',
]);

for (const asset of [
  'assets/ziwei/bg.png',
  'assets/ziwei/opening.mp4',
  'assets/ziwei/climax.mp4',
  'assets/ziwei/ui-reference.png',
]) {
  assert(fs.existsSync(path.join(root, asset)), `${asset} is missing`);
}

includesAll('stage flow', [
  'home -> opening -> form -> climax -> result',
  'data-stage="home"',
  'body[data-stage="opening"]',
  'body[data-stage="form"]',
  'body[data-stage="climax"]',
  'body[data-stage="result"]',
  'function setStage(',
  'function startOpening(',
  'function continueFromOpening(',
  'function startClimax(',
  'function renderResult(',
  'function backHome(',
]);

includesAll('ziwei domain model', [
  'const PALACES',
  'const MAIN_STARS',
  'const TRANSFORMATIONS',
  'const FOCUS_OPTIONS',
  'function buildChart(',
  'function deriveMingGong(',
  'function deriveBodyPalace(',
  'function buildInterpretation(',
  'function renderPalaceWheel(',
]);

includesAll('professional Ziwei content', [
  '紫微斗数',
  '命宫',
  '身宫',
  '十二宫',
  '十四主星',
  '三方四正',
  '四化飞星',
  '化禄',
  '化权',
  '化科',
  '化忌',
  '大限',
  '流年',
  '本命格局',
  '事业财帛',
  '情感婚姻',
  '综合命盘',
]);

includesAll('form controls and actions', [
  'birthYear',
  'birthMonth',
  'birthDay',
  'birthHour',
  'calendarType',
  'data-act="opening-next"',
  'data-act="start-climax"',
  'data-act="copy"',
  'data-act="again"',
  'data-act="homeback"',
]);

includesAll('result sections', [
  '命盘总览',
  '命宫主轴',
  '星曜格局',
  '四化飞星',
  '流年提示',
  '行动建议',
  '仅作传统文化体验',
]);

assert(!html.includes('data:image'), 'HTML should not embed base64 assets');

console.log('index_ziwei.html static contract checks passed');
