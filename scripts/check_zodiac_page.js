const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.resolve(__dirname, "..");
const pagePath = path.join(root, "index_zodiac.html");
const html = fs.readFileSync(pagePath, "utf8");

function includesAll(label, values) {
  for (const value of values) {
    assert(
      html.includes(value),
      `${label} is missing required content: ${value}`
    );
  }
}

includesAll("asset references", [
  "assets/zodiac/bg.png",
  "assets/zodiac/opening.mp4",
  "assets/zodiac/climax.mp4",
]);

includesAll("stage flow", [
  'data-stage="home"',
  'data-stage="intro"',
  'data-stage="burst"',
  'data-stage="reading"',
  "function toIntro",
  "function toBurst",
  "function showReading",
  "function backHome",
]);

includesAll("professional zodiac methods", [
  "立春交岁",
  "出生年月日",
  "流年太岁",
  "六合",
  "三合",
  "六冲",
  "六害",
  "相刑",
  "相破",
  "五行生克",
  "本命生肖",
]);

includesAll("twelve zodiac signs", [
  "子鼠",
  "丑牛",
  "寅虎",
  "卯兔",
  "辰龙",
  "巳蛇",
  "午马",
  "未羊",
  "申猴",
  "酉鸡",
  "戌狗",
  "亥猪",
]);

includesAll("rule helpers", [
  "function getZodiacByYear",
  "function getZodiacByBirthDate",
  "function setFromBirthDate",
  "function branchRelation",
  "function elementFlow",
  "function buildResult",
  "const ZODIACS",
  "const EARTHLY_BRANCH_RULES",
  "const FIVE_ELEMENT",
]);

includesAll("birth date inputs", [
  "birthYearInput",
  "birthMonthInput",
  "birthDayInput",
  "出生年",
  "出生月",
  "出生日",
]);

includesAll("result dimensions", [
  "总运",
  "事业",
  "财运",
  "感情",
  "健康",
  "贵人",
  "今日宜",
  "今日忌",
  "开运色",
  "开运方位",
]);

console.log("生肖运势页面规则与结构检查通过");
