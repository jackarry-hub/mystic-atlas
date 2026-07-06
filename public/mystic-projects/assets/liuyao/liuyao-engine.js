(function(root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.LiuyaoEngine = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function() {
  const POSITIONS = ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"];
  const SIX_SPIRITS = ["青龙", "朱雀", "勾陈", "腾蛇", "白虎", "玄武"];
  const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  const BRANCH_ELEMENTS = {
    子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火",
    午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水"
  };
  const GENERATES = { 木: "火", 火: "土", 土: "金", 金: "水", 水: "木" };
  const CONTROLS = { 木: "土", 土: "水", 水: "火", 火: "金", 金: "木" };

  const TRIGRAMS = {
    7: { key: "qian", name: "乾", symbol: "☰", element: "金", nature: "健", image: "天" },
    3: { key: "dui", name: "兑", symbol: "☱", element: "金", nature: "悦", image: "泽" },
    5: { key: "li", name: "离", symbol: "☲", element: "火", nature: "明", image: "火" },
    1: { key: "zhen", name: "震", symbol: "☳", element: "木", nature: "动", image: "雷" },
    6: { key: "xun", name: "巽", symbol: "☴", element: "木", nature: "入", image: "风" },
    2: { key: "kan", name: "坎", symbol: "☵", element: "水", nature: "险", image: "水" },
    4: { key: "gen", name: "艮", symbol: "☶", element: "土", nature: "止", image: "山" },
    0: { key: "kun", name: "坤", symbol: "☷", element: "土", nature: "顺", image: "地" }
  };

  const HEXAGRAMS = makeHexagrams();
  const NAJIA = {
    qian: { inner: ["子", "寅", "辰"], outer: ["午", "申", "戌"] },
    kun: { inner: ["未", "巳", "卯"], outer: ["丑", "亥", "酉"] },
    zhen: { inner: ["子", "寅", "辰"], outer: ["午", "申", "戌"] },
    xun: { inner: ["丑", "亥", "酉"], outer: ["未", "巳", "卯"] },
    kan: { inner: ["寅", "辰", "午"], outer: ["申", "戌", "子"] },
    li: { inner: ["卯", "丑", "亥"], outer: ["酉", "未", "巳"] },
    gen: { inner: ["辰", "午", "申"], outer: ["戌", "子", "寅"] },
    dui: { inner: ["巳", "卯", "丑"], outer: ["亥", "酉", "未"] }
  };

  const PURPOSES = {
    general: { label: "综合问事", useful: "世应", cue: "先看世爻承受，再看应爻来意。" },
    career: { label: "事业职位", useful: "官鬼", cue: "官鬼主职位、压力、规则与责任。" },
    wealth: { label: "财运投入", useful: "妻财", cue: "妻财主钱财、资源、交易与可得之物。" },
    love: { label: "感情关系", useful: "官鬼/妻财", cue: "感情以世应为先，再参看官鬼与妻财的生克。" },
    cooperation: { label: "合作契约", useful: "应爻", cue: "合作重看应爻、父母文书与世应生克。" },
    exam: { label: "考试文书", useful: "父母", cue: "父母主文书、证件、考试材料与资质。" },
    health: { label: "身心健康", useful: "子孙", cue: "子孙主解忧、恢复力与医药缓和之象。" },
    lost: { label: "失物寻找", useful: "妻财", cue: "失物多以财为物，再看伏藏与冲动。" },
    travel: { label: "出行迁动", useful: "父母", cue: "出行看父母路书、官鬼阻隔与动爻方向。" }
  };

  function resolveLine(coins) {
    if (!Array.isArray(coins) || coins.length !== 3) {
      throw new Error("A Liuyao line needs exactly three coins.");
    }
    const total = coins.reduce((sum, coin) => {
      if (coin !== 2 && coin !== 3) throw new Error("Coin values must be 2 or 3.");
      return sum + coin;
    }, 0);
    const table = {
      6: { name: "老阴", mark: "x", yang: false, moving: true, changedYang: true, text: "阴极而动，转为阳" },
      7: { name: "少阳", mark: "—", yang: true, moving: false, changedYang: true, text: "阳爻安静，主主动与显象" },
      8: { name: "少阴", mark: "--", yang: false, moving: false, changedYang: false, text: "阴爻安静，主承接与蓄势" },
      9: { name: "老阳", mark: "o", yang: true, moving: true, changedYang: false, text: "阳极而动，转为阴" }
    };
    return { total, coins: coins.slice(), ...table[total] };
  }

  function buildHexagram(input) {
    const casts = input && Array.isArray(input.casts) ? input.casts : [];
    if (casts.length !== 6) throw new Error("A complete Liuyao chart needs six casts.");

    const seed = Number.isFinite(input.seed) ? input.seed : Date.now();
    const purposeKey = PURPOSES[input.purpose] ? input.purpose : "general";
    const purpose = PURPOSES[purposeKey];
    const question = String(input.question || "").trim();
    const lineBasics = casts.map(resolveLine);
    const primaryBits = lineBasics.map((line) => line.yang);
    const changedBits = lineBasics.map((line) => line.changedYang);
    const primary = makeHexagram(primaryBits);
    const changed = makeHexagram(changedBits);
    const worldIndex = worldLineIndex(primary);
    const responseIndex = (worldIndex + 3) % 6;
    const spiritOffset = Math.abs(seed) % SIX_SPIRITS.length;
    const branches = branchesFor(primary);
    const palaceElement = primary.palaceElement;
    const lines = lineBasics.map((line, index) => {
      const branch = branches[index];
      const element = BRANCH_ELEMENTS[branch] || palaceElement;
      return {
        ...line,
        index,
        number: index + 1,
        positionName: POSITIONS[index],
        branch,
        element,
        relative: relationOf(palaceElement, element),
        spirit: SIX_SPIRITS[(spiritOffset + index) % SIX_SPIRITS.length],
        role: index === worldIndex ? "世" : index === responseIndex ? "应" : "",
        changedMark: line.moving ? (line.changedYang ? "化阳" : "化阴") : "静"
      };
    });

    return {
      seed,
      question,
      purposeKey,
      purpose,
      primary,
      changed,
      lines,
      movingLines: lines.filter((line) => line.moving),
      worldIndex,
      responseIndex,
      dateStem: STEMS[Math.abs(seed) % STEMS.length],
      generatedAt: new Date().toISOString()
    };
  }

  function buildReading(chart) {
    if (!chart || !chart.primary || !Array.isArray(chart.lines)) {
      throw new Error("buildReading needs a chart from buildHexagram.");
    }
    const usefulGod = usefulGodFor(chart);
    const usefulLines = linesForUsefulGod(chart, usefulGod);
    const world = chart.lines[chart.worldIndex];
    const response = chart.lines[chart.responseIndex];
    const movingText = chart.movingLines.length
      ? chart.movingLines.map((line) => `${line.positionName}${line.relative}${line.branch}${line.element}${line.name}`).join("、")
      : "本卦无动爻，宜以本卦与世应静态关系为主。";
    const usefulStrength = describeStrength(chart, usefulLines, world);
    const trend = chart.primary.name === chart.changed.name
      ? "卦不化变，事情短期更重在守成、复盘与等待时机。"
      : `本卦化为${chart.changed.name}，局势会从当前的${chart.primary.tone}转向${chart.changed.tone}。`;

    const summary = `${chart.primary.name}之象，${chart.primary.judgement}${trend}`;
    const blocks = [
      {
        title: "卦象总断",
        body: `${summary}${chart.question ? ` 所问「${chart.question}」，宜先看当下真实条件，再定进退。` : ""}`
      },
      {
        title: "用神与旺衰",
        body: `${chart.purpose.label}取${usefulGod.label}为用。${chart.purpose.cue}${usefulStrength}`
      },
      {
        title: "世应关系",
        body: `世爻在${world.positionName}，为${world.spirit}${world.relative}${world.branch}${world.element}；应爻在${response.positionName}，为${response.spirit}${response.relative}${response.branch}${response.element}。${describeWorldResponse(world, response)}`
      },
      {
        title: "动爻提示",
        body: `${movingText}${chart.movingLines.length ? "。动爻是本次卦中最先要处理的变数，宜把它视为近期的触发点。" : ""}`
      },
      {
        title: "时间与行动",
        body: `${timingCue(chart)}${actionTone(chart, usefulGod)}`
      }
    ];

    return {
      usefulGod,
      usefulLines,
      summary,
      blocks,
      actionItems: actionItems(chart, usefulGod, world, response)
    };
  }

  function randomCoin(entropy) {
    const mixed = Math.abs(Math.sin((Date.now() + (entropy || 0)) * 12.9898) * 43758.5453);
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      const value = new Uint32Array(1);
      crypto.getRandomValues(value);
      return ((value[0] + Math.floor(mixed)) % 2) ? 3 : 2;
    }
    return ((Math.floor(mixed) + Math.floor(Math.random() * 1000)) % 2) ? 3 : 2;
  }

  function castCoins(entropy) {
    return [randomCoin(entropy), randomCoin((entropy || 0) + 17), randomCoin((entropy || 0) + 31)];
  }

  function makeHexagram(bits) {
    const lowerCode = codeOf(bits.slice(0, 3));
    const upperCode = codeOf(bits.slice(3, 6));
    const lower = TRIGRAMS[lowerCode];
    const upper = TRIGRAMS[upperCode];
    const key = `${upper.key}/${lower.key}`;
    const meta = HEXAGRAMS[key] || {
      number: 0,
      name: `${upper.image}${lower.image}未名`,
      tone: `${upper.nature}${lower.nature}`,
      judgement: "此象未列入基础表，宜按上下卦生克细断。"
    };
    return {
      ...meta,
      key,
      bits: bits.slice(),
      upper,
      lower,
      symbol: `${upper.symbol}${lower.symbol}`,
      palaceElement: lower.element
    };
  }

  function codeOf(bits) {
    return bits.reduce((code, bit, index) => code + (bit ? Math.pow(2, index) : 0), 0);
  }

  function branchesFor(hexagram) {
    const lower = NAJIA[hexagram.lower.key].inner;
    const upper = NAJIA[hexagram.upper.key].outer;
    return lower.concat(upper);
  }

  function relationOf(selfElement, lineElement) {
    if (selfElement === lineElement) return "兄弟";
    if (GENERATES[selfElement] === lineElement) return "子孙";
    if (GENERATES[lineElement] === selfElement) return "父母";
    if (CONTROLS[lineElement] === selfElement) return "官鬼";
    if (CONTROLS[selfElement] === lineElement) return "妻财";
    return "六亲";
  }

  function worldLineIndex(hexagram) {
    return (hexagram.number + codeOf(hexagram.bits.slice(0, 3)) + codeOf(hexagram.bits.slice(3, 6))) % 6;
  }

  function usefulGodFor(chart) {
    const useful = chart.purpose.useful;
    if (useful === "世应") return { key: "世应", label: "世应", text: "以世爻为自身、应爻为对象或环境。" };
    if (useful === "应爻") return { key: "应爻", label: "应爻", text: "合作问事以应爻为对方与外部条件。" };
    if (useful === "官鬼/妻财") return { key: "官鬼/妻财", label: "官鬼与妻财", text: "感情问事需兼看关系角色与世应。" };
    return { key: useful, label: useful, text: `本次以${useful}为核心用神。` };
  }

  function linesForUsefulGod(chart, usefulGod) {
    if (usefulGod.key === "世应") return [chart.lines[chart.worldIndex], chart.lines[chart.responseIndex]];
    if (usefulGod.key === "应爻") return [chart.lines[chart.responseIndex]];
    if (usefulGod.key === "官鬼/妻财") return chart.lines.filter((line) => line.relative === "官鬼" || line.relative === "妻财");
    return chart.lines.filter((line) => line.relative === usefulGod.key);
  }

  function describeStrength(chart, usefulLines, world) {
    if (!usefulLines.length) {
      return ` 卦中${chart.purpose.useful}不显，表示事情还未成形或信息不足，先补证据、问清条件，再行动。`;
    }
    const movingCount = usefulLines.filter((line) => line.moving).length;
    const sameElement = usefulLines.filter((line) => line.element === world.element).length;
    const parts = [` 卦中见${usefulLines.length}处相关爻`];
    if (movingCount) parts.push(`其中${movingCount}处发动，说明关键因素已在变化`);
    if (sameElement) parts.push(`且有${sameElement}处与世爻同气，自己有参与和把握空间`);
    if (!movingCount && !sameElement) parts.push("但多为静象，宜耐心等待外部条件明朗");
    return `${parts.join("，")}。`;
  }

  function describeWorldResponse(world, response) {
    if (world.element === response.element) return "世应同气，双方立场有相通处，但也容易各执己见。";
    if (GENERATES[world.element] === response.element) return "世生应，自己付出较多，宜设边界与条件。";
    if (GENERATES[response.element] === world.element) return "应生世，外部有助力，可主动承接机会。";
    if (CONTROLS[world.element] === response.element) return "世克应，自己能推动局面，但不可过急。";
    if (CONTROLS[response.element] === world.element) return "应克世，外部压力较强，先避锋芒再求转机。";
    return "世应关系平平，宜以动爻和用神为主。";
  }

  function timingCue(chart) {
    const moving = chart.movingLines[0];
    if (!moving) return "无动爻时，时间多不在眼前，宜以一旬到一月为观察期。";
    const branch = moving.branch;
    return `首动在${moving.positionName}${branch}，可留意${branch}日、${branch}月，或与${BRANCH_ELEMENTS[branch]}象相关的人事触发。`;
  }

  function actionTone(chart, usefulGod) {
    const hasMovingUseful = linesForUsefulGod(chart, usefulGod).some((line) => line.moving);
    if (hasMovingUseful) return " 用神发动，事情有可操作处，先抓最近一个明确节点。";
    if (chart.movingLines.length >= 3) return " 动爻偏多，局面杂乱，先减变量，不宜同时推进多线。";
    if (!chart.movingLines.length) return " 卦静宜守，先确认事实与边界。";
    return " 动静相半，可小步试探，边走边校验。";
  }

  function actionItems(chart, usefulGod, world, response) {
    const items = [
      `先围绕「${chart.purpose.label}」补齐事实，不凭情绪下判断。`,
      `以${usefulGod.label}为核心观察对象，重点看它是否发动、受生或受克。`,
      `世爻代表自身状态：${world.spirit}${world.relative}${world.branch}${world.element}，先处理自己可控的一步。`
    ];
    if (CONTROLS[response.element] === world.element) {
      items.push("外部压力较强时，不宜硬碰硬，先争取时间和信息差。");
    } else {
      items.push("外部并非完全闭塞，可选择低成本试探，不必一次押重。");
    }
    if (chart.movingLines.length) {
      items.push(`近期重点盯住${chart.movingLines.map((line) => line.positionName).join("、")}对应的人事变化。`);
    }
    return items;
  }

  function makeHexagrams() {
    const rows = [
      ["qian/qian", 1, "乾为天", "刚健主动", "乾象重天，利于开创、决断与自强，但过刚则折。"],
      ["kun/kun", 2, "坤为地", "顺势承载", "坤象厚土，利于蓄势、承接与长期经营。"],
      ["kan/zhen", 3, "水雷屯", "初生多阻", "屯为始难，事情已动但阻力未散，宜稳住根基。"],
      ["gen/kan", 4, "山水蒙", "蒙昧待启", "蒙主信息不明，先求明师明法，不宜贸然定局。"],
      ["kan/qian", 5, "水天需", "守正待时", "需为等待，条件未齐，耐心比强攻更有利。"],
      ["qian/kan", 6, "天水讼", "争端辨明", "讼主分歧与争执，宜留证据、讲边界。"],
      ["kun/kan", 7, "地水师", "整众成事", "师主组织与纪律，成败在统筹与执行。"],
      ["kan/kun", 8, "水地比", "亲比结盟", "比主靠近与选择同盟，贵在择人。"],
      ["xun/qian", 9, "风天小畜", "小有积蓄", "小畜为小阻小成，先积累，不急于大动。"],
      ["qian/dui", 10, "天泽履", "谨慎行险", "履主礼法与分寸，走在风险边上需守规则。"],
      ["kun/qian", 11, "地天泰", "天地交泰", "泰为通达，内外相应，利于推进。"],
      ["qian/kun", 12, "天地否", "闭塞不通", "否为隔绝，沟通不畅，宜先破结。"],
      ["qian/li", 13, "天火同人", "同道相求", "同人主协作与公开，利于结伴成事。"],
      ["li/qian", 14, "火天大有", "光明显达", "大有为资源充足，但需守中不骄。"],
      ["kun/gen", 15, "地山谦", "谦退得益", "谦主低姿态与真实能力，退一步反有所得。"],
      ["zhen/kun", 16, "雷地豫", "顺势而动", "豫主预备与士气，乐中需防松散。"],
      ["dui/zhen", 17, "泽雷随", "随时顺变", "随主跟随时势，选择比蛮干重要。"],
      ["gen/xun", 18, "山风蛊", "整旧除弊", "蛊主旧问题发酵，宜先清理积弊。"],
      ["kun/dui", 19, "地泽临", "临近有机", "临主机会逼近，宜主动照看。"],
      ["xun/kun", 20, "风地观", "观望审势", "观主观察与示范，先看全局再落子。"],
      ["li/zhen", 21, "火雷噬嗑", "咬合除障", "噬嗑主有阻需断，宜明罚明约。"],
      ["gen/li", 22, "山火贲", "文饰外显", "贲主外观与包装，表面好看但需看实质。"],
      ["gen/kun", 23, "山地剥", "剥落减损", "剥主消退，宜止损、收缩、保核心。"],
      ["kun/zhen", 24, "地雷复", "一阳来复", "复主回转与重启，小机已生。"],
      ["qian/zhen", 25, "天雷无妄", "守真避妄", "无妄主不可妄动，顺其真实则吉。"],
      ["gen/qian", 26, "山天大畜", "大蓄待发", "大畜主蓄力与约束，能忍则成。"],
      ["gen/zhen", 27, "山雷颐", "养正蓄身", "颐主供养与口舌，先养其本。"],
      ["dui/xun", 28, "泽风大过", "重压过载", "大过主负荷过重，需有支撑再过河。"],
      ["kan/kan", 29, "坎为水", "险中求通", "坎重险陷，宜谨慎试探，不可冒进。"],
      ["li/li", 30, "离为火", "明丽附着", "离主清晰与依附，贵在看明所依。"],
      ["dui/gen", 31, "泽山咸", "感应相交", "咸主感应与吸引，情势已互相牵动。"],
      ["zhen/xun", 32, "雷风恒", "持久守常", "恒主稳定与持续，不宜朝令夕改。"],
      ["qian/gen", 33, "天山遁", "退避藏锋", "遁主退让避险，保存实力为上。"],
      ["zhen/qian", 34, "雷天大壮", "势盛须节", "大壮主力量增长，宜壮而有礼。"],
      ["li/kun", 35, "火地晋", "渐进上升", "晋主进展与被看见，可循序推进。"],
      ["kun/li", 36, "地火明夷", "光明受伤", "明夷主受压与隐藏，宜韬光养晦。"],
      ["xun/li", 37, "风火家人", "内外有序", "家人主秩序与分工，先正内部。"],
      ["li/dui", 38, "火泽睽", "分歧相背", "睽主不同心，求同之前先承认差异。"],
      ["kan/gen", 39, "水山蹇", "遇阻缓行", "蹇主险阻在前，宜求助或绕行。"],
      ["zhen/kan", 40, "雷水解", "解结松绑", "解主释放压力，宜把复杂事拆开。"],
      ["gen/dui", 41, "山泽损", "损益取舍", "损主舍弃局部以成全大局。"],
      ["xun/zhen", 42, "风雷益", "增益可为", "益主增助，利于行动与互惠。"],
      ["dui/qian", 43, "泽天夬", "决断去弊", "夬主决裂与宣布，宜果断但防过激。"],
      ["qian/xun", 44, "天风姤", "偶遇有警", "姤主突遇与诱因，宜辨别来者之意。"],
      ["dui/kun", 45, "泽地萃", "聚合成势", "萃主聚众与资源汇集，需有中心。"],
      ["kun/xun", 46, "地风升", "循序上升", "升主渐进成长，贵在持续。"],
      ["dui/kan", 47, "泽水困", "受困求通", "困主资源受限，宜守志找出口。"],
      ["kan/xun", 48, "水风井", "取源养人", "井主基础资源，宜修井而非换井。"],
      ["dui/li", 49, "泽火革", "革故鼎新", "革主变革，时机对则可改旧制。"],
      ["li/xun", 50, "火风鼎", "立器成新", "鼎主建立新秩序，利于成形。"],
      ["zhen/zhen", 51, "震为雷", "震动惊醒", "震主突发与警醒，动中见机。"],
      ["gen/gen", 52, "艮为山", "止定守界", "艮主停止与边界，宜静观。"],
      ["xun/gen", 53, "风山渐", "渐进有序", "渐主循序，不可越级。"],
      ["zhen/dui", 54, "雷泽归妹", "名分未正", "归妹主关系位置未稳，宜慎承诺。"],
      ["zhen/li", 55, "雷火丰", "盛大亦忧", "丰主盛极，宜把握窗口并防过满。"],
      ["li/gen", 56, "火山旅", "行旅不安", "旅主漂泊与暂居，宜轻装守礼。"],
      ["xun/xun", 57, "巽为风", "柔入渗透", "巽主慢入与沟通，柔可胜刚。"],
      ["dui/dui", 58, "兑为泽", "悦言互通", "兑主言说与喜悦，防口舌虚浮。"],
      ["xun/kan", 59, "风水涣", "涣散重聚", "涣主分散，宜先聚心聚力。"],
      ["kan/dui", 60, "水泽节", "节制有度", "节主规则与限度，节而不过则吉。"],
      ["xun/dui", 61, "风泽中孚", "诚信感通", "中孚主信任，诚意能通关。"],
      ["zhen/gen", 62, "雷山小过", "小事宜谨", "小过主小处过度，大事不宜冒进。"],
      ["kan/li", 63, "水火既济", "事成防乱", "既济主阶段完成，成后更要防松懈。"],
      ["li/kan", 64, "火水未济", "未成待续", "未济主未完成，仍有一段整理与校准。"]
    ];
    return rows.reduce((map, row) => {
      map[row[0]] = { number: row[1], name: row[2], tone: row[3], judgement: row[4] };
      return map;
    }, {});
  }

  return {
    POSITIONS,
    SIX_SPIRITS,
    PURPOSES,
    TRIGRAMS,
    resolveLine,
    castCoins,
    buildHexagram,
    buildReading
  };
});
