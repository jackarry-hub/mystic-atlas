const assert = require("assert");
const LiuyaoEngine = require("../assets/liuyao/liuyao-engine.js");

function test(name, fn) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

test("resolves the four traditional coin line totals", () => {
  assert.deepStrictEqual(
    pickLineFields(LiuyaoEngine.resolveLine([2, 2, 2])),
    { total: 6, name: "老阴", yang: false, moving: true, changedYang: true }
  );
  assert.deepStrictEqual(
    pickLineFields(LiuyaoEngine.resolveLine([3, 2, 2])),
    { total: 7, name: "少阳", yang: true, moving: false, changedYang: true }
  );
  assert.deepStrictEqual(
    pickLineFields(LiuyaoEngine.resolveLine([3, 3, 2])),
    { total: 8, name: "少阴", yang: false, moving: false, changedYang: false }
  );
  assert.deepStrictEqual(
    pickLineFields(LiuyaoEngine.resolveLine([3, 3, 3])),
    { total: 9, name: "老阳", yang: true, moving: true, changedYang: false }
  );
});

test("builds the primary hexagram from bottom-to-top casts", () => {
  const chart = LiuyaoEngine.buildHexagram({
    casts: [
      [3, 2, 2],
      [3, 3, 2],
      [3, 2, 2],
      [3, 3, 2],
      [3, 2, 2],
      [3, 3, 2]
    ],
    purpose: "career",
    question: "这次岗位调整是否适合主动争取？",
    seed: 42
  });

  assert.strictEqual(chart.primary.name, "水火既济");
  assert.strictEqual(chart.changed.name, "水火既济");
  assert.strictEqual(chart.lines[0].positionName, "初爻");
  assert.strictEqual(chart.lines[5].positionName, "上爻");
  assert.strictEqual(chart.movingLines.length, 0);
});

test("creates a changed hexagram when old yin or old yang appears", () => {
  const chart = LiuyaoEngine.buildHexagram({
    casts: [
      [2, 2, 2],
      [3, 3, 2],
      [3, 2, 2],
      [3, 3, 2],
      [3, 2, 2],
      [3, 3, 3]
    ],
    purpose: "wealth",
    question: "这笔投入是否值得继续加码？",
    seed: 7
  });

  assert.strictEqual(chart.movingLines.length, 2);
  assert.notStrictEqual(chart.primary.name, chart.changed.name);
  assert.strictEqual(chart.lines[0].moving, true);
  assert.strictEqual(chart.lines[5].moving, true);
});

test("selects a useful god and produces structured reading blocks", () => {
  const chart = LiuyaoEngine.buildHexagram({
    casts: [
      [2, 2, 2],
      [3, 3, 2],
      [3, 2, 2],
      [3, 3, 2],
      [3, 2, 2],
      [3, 3, 3]
    ],
    purpose: "wealth",
    question: "这笔投入是否值得继续加码？",
    seed: 7
  });
  const reading = LiuyaoEngine.buildReading(chart);

  assert.strictEqual(reading.usefulGod.key, "妻财");
  assert.ok(reading.summary.includes(chart.primary.name));
  assert.ok(reading.blocks.some((block) => block.title === "用神与旺衰"));
  assert.ok(reading.actionItems.length >= 3);
});

function pickLineFields(line) {
  return {
    total: line.total,
    name: line.name,
    yang: line.yang,
    moving: line.moving,
    changedYang: line.changedYang
  };
}
