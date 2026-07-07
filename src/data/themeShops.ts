export const themeShopSlugs = [
  "bazi",
  "liuyao",
  "astrology",
  "naming-date",
  "dream",
  "tarot",
  "palmistry",
  "lingqian",
  "zodiac",
  "ziwei",
  "face-reading",
  "fengshui"
] as const;

export type ThemeShopSlug = (typeof themeShopSlugs)[number];
export type ThemeShopTheme = "eastern" | "western";
export type ThemeShopProductType = "virtual" | "physical" | "service";

export interface ThemeShopProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  type: ThemeShopProductType;
  category: string;
  shortDescription: string;
  description: string;
  suitableFor: readonly string[];
  includes: readonly string[];
  delivery: string;
  notice: string;
  x: number;
  y: number;
}

export interface ThemeShop {
  slug: ThemeShopSlug;
  title: string;
  subtitle: string;
  route: string;
  serviceRoute: string;
  background: string;
  theme: ThemeShopTheme;
  currency: string;
  categories: readonly string[];
  products: readonly ThemeShopProduct[];
}

type ThemeShopProductDraft = Omit<
  ThemeShopProduct,
  "currency" | "delivery" | "includes" | "notice" | "suitableFor"
> & {
  delivery?: string;
  includes?: readonly string[];
  notice?: string;
  suitableFor?: readonly string[];
};

const defaultCategories = [
  "虚拟报告",
  "进阶解读",
  "实体道具",
  "仪式用品",
  "收藏周边",
  "服务套餐"
] as const;

const calibratedHotspots: Record<string, Pick<ThemeShopProduct, "x" | "y">> = {
  "bazi-basic-report": { x: 49, y: 55 },
  "bazi-deep-reading": { x: 61, y: 34 },
  "bazi-luck-cycle": { x: 57, y: 22 },
  "bazi-relationship-match": { x: 75, y: 52 },
  "bazi-career-money": { x: 82, y: 55 },
  "bazi-five-element-scroll": { x: 49, y: 70 },
  "bazi-handbook": { x: 36, y: 37 },
  "liuyao-one-question": { x: 46, y: 73 },
  "liuyao-love-reading": { x: 76, y: 56 },
  "liuyao-career-decision": { x: 50, y: 52 },
  "liuyao-investment": { x: 30, y: 82 },
  "liuyao-coin-set": { x: 29, y: 83 },
  "liuyao-hexagram-plate": { x: 62, y: 42 },
  "liuyao-handbook": { x: 69, y: 75 },
  "astrology-natal-chart": { x: 45, y: 65 },
  "astrology-synastry": { x: 62, y: 28 },
  "astrology-transit-year": { x: 14, y: 38 },
  "astrology-career": { x: 31, y: 51 },
  "astrology-moon-journal": { x: 50, y: 76 },
  "astrology-zodiac-poster": { x: 67, y: 28 },
  "astrology-deck": { x: 74, y: 62 },
  "naming-baby": { x: 51, y: 60 },
  "naming-adult": { x: 69, y: 33 },
  "naming-brand": { x: 61, y: 74 },
  "date-wedding": { x: 31, y: 78 },
  "date-opening": { x: 86, y: 68 },
  "date-moving": { x: 72, y: 66 },
  "almanac-book": { x: 59, y: 55 },
  "dream-single": { x: 49, y: 59 },
  "dream-series": { x: 51, y: 70 },
  "dream-love": { x: 60, y: 42 },
  "dream-subconscious": { x: 82, y: 34 },
  "dream-journal": { x: 23, y: 49 },
  "dream-book": { x: 77, y: 62 },
  "dream-moon-lamp": { x: 84, y: 38 },
  "tarot-love-reading": { x: 35, y: 50 },
  "tarot-three-card": { x: 51, y: 75 },
  "tarot-yearly": { x: 65, y: 27 },
  "tarot-reconciliation": { x: 68, y: 58 },
  "tarot-deck": { x: 66, y: 64 },
  "tarot-candle": { x: 11, y: 30 },
  "tarot-guidebook": { x: 74, y: 58 },
  "palm-basic": { x: 61, y: 66 },
  "palm-love-line": { x: 78, y: 42 },
  "palm-career-money": { x: 70, y: 75 },
  "palm-full-report": { x: 47, y: 77 },
  "palm-atlas": { x: 26, y: 50 },
  "palm-record-book": { x: 35, y: 76 },
  "palm-magnifier": { x: 72, y: 74 },
  "lingqian-single": { x: 17, y: 51 },
  "lingqian-love": { x: 82, y: 47 },
  "lingqian-career": { x: 52, y: 47 },
  "lingqian-money": { x: 75, y: 28 },
  "lingqian-card": { x: 72, y: 76 },
  "lingqian-cup": { x: 35, y: 54 },
  "lingqian-sachet": { x: 53, y: 82 },
  "zodiac-year": { x: 53, y: 55 },
  "zodiac-month": { x: 52, y: 75 },
  "zodiac-money": { x: 91, y: 77 },
  "zodiac-match": { x: 50, y: 38 },
  "zodiac-guardian": { x: 61, y: 75 },
  "zodiac-ornament": { x: 83, y: 41 },
  "zodiac-scroll": { x: 20, y: 71 },
  "ziwei-chart-report": { x: 43, y: 38 },
  "ziwei-year": { x: 63, y: 53 },
  "ziwei-marriage-career": { x: 48, y: 78 },
  "ziwei-match": { x: 71, y: 36 },
  "ziwei-chart-book": { x: 30, y: 56 },
  "ziwei-star-cards": { x: 75, y: 67 },
  "ziwei-book": { x: 86, y: 76 },
  "face-basic": { x: 62, y: 40 },
  "face-love": { x: 47, y: 55 },
  "face-money": { x: 64, y: 58 },
  "face-full-report": { x: 41, y: 72 },
  "face-atlas": { x: 15, y: 50 },
  "face-mirror": { x: 45, y: 52 },
  "face-handbook": { x: 24, y: 78 },
  "fengshui-home": { x: 39, y: 75 },
  "fengshui-office": { x: 80, y: 74 },
  "fengshui-wealth": { x: 74, y: 55 },
  "fengshui-year-adjustment": { x: 44, y: 54 },
  "fengshui-compass": { x: 55, y: 43 },
  "fengshui-ornament": { x: 30, y: 51 },
  "fengshui-book": { x: 82, y: 72 }
};

const publicBase = import.meta.env.BASE_URL.replace(/\/$/, "");

function shopRoute(slug: ThemeShopSlug) {
  return `/shop/${slug}`;
}

function sceneBackground(slug: ThemeShopSlug) {
  return `${publicBase}/immersive-shop/${slug}.jpg`;
}

function product(draft: ThemeShopProductDraft): ThemeShopProduct {
  const hotspot = calibratedHotspots[draft.id] ?? draft;
  const typeDelivery = {
    physical: "实体发货，支持物流追踪。",
    service: "付款后进入资料提交或预约流程。",
    virtual: "付款后即时开通，可在账户中心查看。"
  } satisfies Record<ThemeShopProductType, string>;

  const themeProduct = {
    ...draft,
    currency: "USD",
    delivery: draft.delivery ?? typeDelivery[draft.type],
    suitableFor:
      draft.suitableFor ??
      ["希望围绕当前主题获得个性化建议的用户", "需要把沉浸式体验延伸到报告或器物的人"],
    includes:
      draft.includes ??
      [draft.name, "主题说明", "交付指引"],
    notice:
      draft.notice ??
      "玄学内容用于自我探索、文化体验和娱乐参考，不替代法律、医疗、财务等专业意见。"
  };

  return {
    ...themeProduct,
    x: hotspot.x,
    y: hotspot.y
  };
}

export const themeShops = [
  {
    slug: "bazi",
    title: "八字商城",
    subtitle: "围绕四柱、五行、十神与流年节奏配置报告、服务和命理器物。",
    route: shopRoute("bazi"),
    serviceRoute: "/services/bazi/live",
    background: sceneBackground("bazi"),
    theme: "eastern",
    currency: "USD",
    categories: defaultCategories,
    products: [
      product({ id: "bazi-basic-report", name: "八字基础报告", price: 39, type: "virtual", category: "虚拟报告", shortDescription: "快速理解四柱结构与五行分布。", description: "整理日主、四柱、五行强弱和基础十神关系，适合从八字体验继续阅读。", x: 42, y: 52 }),
      product({ id: "bazi-deep-reading", name: "八字深度精批", price: 88, type: "service", category: "进阶解读", shortDescription: "顾问深度解读命局结构与阶段主题。", description: "结合命局、大运与当前阶段，整理性格优势、关系模式和行动提醒。", x: 58, y: 43 }),
      product({ id: "bazi-luck-cycle", name: "大运流年分析", price: 59, type: "virtual", category: "虚拟报告", shortDescription: "查看未来阶段的机会窗口与避坑提醒。", description: "按大运、流年、月份拆解节奏，给出重点日期和可执行建议。", x: 30, y: 37 }),
      product({ id: "bazi-relationship-match", name: "婚恋合盘分析", price: 68, type: "service", category: "服务套餐", shortDescription: "围绕两人五行互动与关系节奏进行分析。", description: "适合关系复盘、婚恋选择和长期相处模式观察。", x: 70, y: 62 }),
      product({ id: "bazi-career-money", name: "事业财运分析", price: 52, type: "virtual", category: "虚拟报告", shortDescription: "聚焦事业方向、财星结构与行动节奏。", description: "把命理结构转成职业选择、财务习惯和年度行动建议。", x: 46, y: 72 }),
      product({ id: "bazi-five-element-scroll", name: "五行图卷", price: 76, type: "physical", category: "实体道具", shortDescription: "适合书桌陈列的五行结构图卷。", description: "以木火土金水为视觉核心，配合八字阅读空间使用。", x: 20, y: 58 }),
      product({ id: "bazi-handbook", name: "命理手册", price: 32, type: "physical", category: "收藏周边", shortDescription: "记录十神、五行和流年观察的手册。", description: "用于沉浸式体验后的复盘、笔记和长期观察。", x: 64, y: 70 })
    ]
  },
  {
    slug: "liuyao",
    title: "六爻商城",
    subtitle: "为一事一问准备起卦服务、铜钱器物和短周期决策报告。",
    route: shopRoute("liuyao"),
    serviceRoute: "/services/liuyao/live",
    background: sceneBackground("liuyao"),
    theme: "eastern",
    currency: "USD",
    categories: defaultCategories,
    products: [
      product({ id: "liuyao-one-question", name: "六爻单次问事", price: 36, type: "service", category: "进阶解读", shortDescription: "针对一个具体问题进行本卦、变卦分析。", description: "适合决策前确认趋势、阻力和推进方式。", x: 46, y: 47 }),
      product({ id: "liuyao-love-reading", name: "感情问卦", price: 39, type: "service", category: "服务套餐", shortDescription: "围绕关系状态、复合可能和沟通时机问卦。", description: "结合世应、动爻和变卦，整理关系里的可行动提醒。", x: 62, y: 50 }),
      product({ id: "liuyao-career-decision", name: "事业决策占断", price: 45, type: "service", category: "进阶解读", shortDescription: "用于岗位、合作、转型等事业问题。", description: "围绕当前选择给出趋势、风险与时机建议。", x: 34, y: 64 }),
      product({ id: "liuyao-investment", name: "投资理财问卦", price: 49, type: "service", category: "进阶解读", shortDescription: "帮助识别短周期财务决策风险。", description: "仅作民俗参考，侧重风险提醒和行动节奏，不构成投资建议。", x: 52, y: 72 }),
      product({ id: "liuyao-coin-set", name: "六爻铜钱套装", price: 58, type: "physical", category: "实体道具", shortDescription: "三枚起卦铜钱与收纳袋。", description: "用于线下起卦仪式，附基础起卦说明。", x: 74, y: 38 }),
      product({ id: "liuyao-hexagram-plate", name: "六爻卦盘摆件", price: 86, type: "physical", category: "仪式用品", shortDescription: "桌面卦象陈列和问事仪式摆件。", description: "适合书房、咨询室或个人问卦空间。", x: 22, y: 42 }),
      product({ id: "liuyao-handbook", name: "卦象解析手册", price: 26, type: "physical", category: "收藏周边", shortDescription: "六亲六神和动爻关系速查。", description: "帮助记录问题、卦象、结论和后续验证。", x: 66, y: 67 })
    ]
  },
  {
    slug: "astrology",
    title: "占星商城",
    subtitle: "围绕本命盘、合盘、行运与星象工具组织数字内容和器物。",
    route: shopRoute("astrology"),
    serviceRoute: "/services/astrology/live",
    background: sceneBackground("astrology"),
    theme: "western",
    currency: "USD",
    categories: defaultCategories,
    products: [
      product({ id: "astrology-natal-chart", name: "Natal Chart Report", price: 39, type: "virtual", category: "虚拟报告", shortDescription: "Decode sun, moon, rising, houses and aspects.", description: "A structured natal chart report for identity, emotion, relationships and timing.", x: 44, y: 54 }),
      product({ id: "astrology-synastry", name: "Synastry Reading", price: 68, type: "service", category: "服务套餐", shortDescription: "Relationship compatibility through two charts.", description: "A focused reading on chemistry, friction points and long-term relational patterns.", x: 61, y: 42 }),
      product({ id: "astrology-transit-year", name: "Yearly Transit Forecast", price: 49, type: "virtual", category: "虚拟报告", shortDescription: "Key dates, growth themes and transit windows.", description: "Maps the next twelve months by planetary transits and practical reflection prompts.", x: 26, y: 44 }),
      product({ id: "astrology-career", name: "Career Astrology Reading", price: 78, type: "service", category: "进阶解读", shortDescription: "Career direction through houses and planetary focus.", description: "Looks at vocation, visibility, discipline and timing for work decisions.", x: 72, y: 58 }),
      product({ id: "astrology-moon-journal", name: "Moon Journal", price: 28, type: "physical", category: "仪式用品", shortDescription: "A lunar journal for tracking moods and intentions.", description: "Includes moon phase prompts, monthly reflection pages and ritual checklists.", x: 36, y: 72 }),
      product({ id: "astrology-zodiac-poster", name: "Zodiac Poster", price: 34, type: "physical", category: "收藏周边", shortDescription: "A black-gold zodiac wall print.", description: "Designed for study corners, reading rooms and astrology spaces.", x: 84, y: 36 }),
      product({ id: "astrology-deck", name: "Astrology Deck", price: 56, type: "physical", category: "实体道具", shortDescription: "A card deck for signs, planets and houses.", description: "Useful for learning, daily prompts and astrology readings.", x: 54, y: 64 })
    ]
  },
  {
    slug: "naming-date",
    title: "取名择日商城",
    subtitle: "聚合姓名方案、择日建议、文书模板与纪念礼盒。",
    route: shopRoute("naming-date"),
    serviceRoute: "/services/naming-date/live",
    background: sceneBackground("naming-date"),
    theme: "eastern",
    currency: "USD",
    categories: defaultCategories,
    products: [
      product({ id: "naming-baby", name: "宝宝取名", price: 68, type: "service", category: "服务套餐", shortDescription: "结合五行、音义和家庭偏好提供姓名方案。", description: "提供多组姓名建议、字义说明和使用提醒。", x: 48, y: 52 }),
      product({ id: "naming-adult", name: "成人改名建议", price: 76, type: "service", category: "进阶解读", shortDescription: "为成人改名或艺名提供方向建议。", description: "综合五行、读音、识别度和个人阶段需求。", x: 64, y: 45 }),
      product({ id: "naming-brand", name: "品牌命名", price: 98, type: "service", category: "服务套餐", shortDescription: "适合工作室、产品和个人品牌命名。", description: "提供命名方向、候选名称和使用场景说明。", x: 36, y: 44 }),
      product({ id: "date-wedding", name: "婚嫁择日", price: 56, type: "virtual", category: "虚拟报告", shortDescription: "筛选适合婚嫁仪式的日期窗口。", description: "结合事项性质、节气和基础宜忌生成择日报告。", x: 54, y: 72 }),
      product({ id: "date-opening", name: "开业择日", price: 56, type: "virtual", category: "虚拟报告", shortDescription: "为开业、发布和签约选择时间窗口。", description: "提供日期列表、适合事项和注意事项。", x: 75, y: 62 }),
      product({ id: "date-moving", name: "搬家择日", price: 45, type: "virtual", category: "虚拟报告", shortDescription: "为搬家入宅整理日期建议。", description: "包含日期、时段和入宅准备提醒。", x: 28, y: 60 }),
      product({ id: "almanac-book", name: "黄历册", price: 32, type: "physical", category: "收藏周边", shortDescription: "用于日常择时参考的黑金黄历册。", description: "适合记录关键日、仪式安排和节气提醒。", x: 70, y: 36 })
    ]
  },
  {
    slug: "dream",
    title: "解梦商城",
    subtitle: "围绕梦境记录、象征拆解和睡前安定建立个人梦境档案。",
    route: shopRoute("dream"),
    serviceRoute: "/services/dream-interpretation/live",
    background: sceneBackground("dream"),
    theme: "eastern",
    currency: "USD",
    categories: defaultCategories,
    products: [
      product({ id: "dream-single", name: "单次梦境解析", price: 29, type: "virtual", category: "虚拟报告", shortDescription: "拆解一个梦境中的场景、人物与情绪。", description: "适合从沉浸式解梦体验继续生成完整报告。", x: 46, y: 56 }),
      product({ id: "dream-series", name: "连续梦境报告", price: 56, type: "service", category: "进阶解读", shortDescription: "整理重复梦与连续梦的线索。", description: "围绕近期梦境记录，分析潜意识主题和现实提醒。", x: 62, y: 44 }),
      product({ id: "dream-love", name: "感情梦解读", price: 36, type: "service", category: "服务套餐", shortDescription: "聚焦亲密关系、复合和情绪投射的梦。", description: "将梦境意象与现实关系状态拆分观察。", x: 38, y: 70 }),
      product({ id: "dream-subconscious", name: "潜意识提示报告", price: 34, type: "virtual", category: "虚拟报告", shortDescription: "将梦境情绪转成自我观察提示。", description: "提供象征拆解、情绪关键词和行动提醒。", x: 76, y: 58 }),
      product({ id: "dream-journal", name: "梦境记录本", price: 32, type: "physical", category: "仪式用品", shortDescription: "晨间记录梦境关键词与感受。", description: "包含梦境时间、情绪、现实事件和复盘页。", x: 24, y: 48 }),
      product({ id: "dream-book", name: "解梦书册", price: 38, type: "physical", category: "收藏周边", shortDescription: "常见梦象和民俗释义收藏册。", description: "用于长期记录和对照梦境象征。", x: 58, y: 73 }),
      product({ id: "dream-moon-lamp", name: "月相夜灯", price: 66, type: "physical", category: "实体道具", shortDescription: "睡前安定和梦境记录的氛围灯。", description: "柔和月相光感，适合床头和冥想角。", x: 70, y: 36 })
    ]
  },
  {
    slug: "tarot",
    title: "塔罗商城",
    subtitle: "从牌阵解读、数字报告到牌卡器物，构建沉浸式占牌空间。",
    route: shopRoute("tarot"),
    serviceRoute: "/services/tarot/live",
    background: sceneBackground("tarot"),
    theme: "western",
    currency: "USD",
    categories: defaultCategories,
    products: [
      product({ id: "tarot-love-reading", name: "Love Tarot Reading", price: 39, type: "service", category: "进阶解读", shortDescription: "A relationship-focused tarot reading.", description: "Explores feelings, blocks, communication and likely next steps for a relationship question.", x: 43, y: 57 }),
      product({ id: "tarot-three-card", name: "Three Card Guidance", price: 26, type: "service", category: "服务套餐", shortDescription: "Past, present and next action in three cards.", description: "A focused reading for one question when you need quick clarity.", x: 58, y: 47 }),
      product({ id: "tarot-yearly", name: "Yearly Tarot Guidance", price: 66, type: "virtual", category: "虚拟报告", shortDescription: "A twelve-month tarot rhythm report.", description: "Maps the year by monthly themes, reminders and reflection prompts.", x: 28, y: 44 }),
      product({ id: "tarot-reconciliation", name: "Reconciliation Tarot Reading", price: 48, type: "service", category: "进阶解读", shortDescription: "A spread for reconnection and emotional timing.", description: "Looks at current distance, potential bridge points and grounded communication advice.", x: 70, y: 61 }),
      product({ id: "tarot-deck", name: "Tarot Deck", price: 72, type: "physical", category: "实体道具", shortDescription: "A black-gold tarot deck for daily spreads.", description: "Includes deck box, guide booklet and cloth wrap.", x: 48, y: 75 }),
      product({ id: "tarot-candle", name: "Ritual Candle", price: 24, type: "physical", category: "仪式用品", shortDescription: "A quiet candle for card reading rituals.", description: "Designed for pre-reading focus, journaling and closing rituals.", x: 82, y: 38 }),
      product({ id: "tarot-guidebook", name: "Tarot Guidebook", price: 32, type: "physical", category: "收藏周边", shortDescription: "A compact guidebook for meanings and spreads.", description: "Covers major arcana, minor arcana and common spread templates.", x: 36, y: 66 })
    ]
  },
  {
    slug: "palmistry",
    title: "手相商城",
    subtitle: "以掌纹采集、图文报告和顾问解读呈现手相观察路径。",
    route: shopRoute("palmistry"),
    serviceRoute: "/services/palmistry/live",
    background: sceneBackground("palmistry"),
    theme: "eastern",
    currency: "USD",
    categories: defaultCategories,
    products: [
      product({ id: "palm-basic", name: "手相基础解读", price: 39, type: "virtual", category: "虚拟报告", shortDescription: "快速理解主要掌线与手型。", description: "根据上传信息生成生命线、智慧线、感情线基础分析。", x: 56, y: 46 }),
      product({ id: "palm-love-line", name: "感情线分析", price: 36, type: "service", category: "进阶解读", shortDescription: "聚焦情感表达和关系习惯。", description: "通过感情线状态观察亲密关系模式和提醒。", x: 40, y: 60 }),
      product({ id: "palm-career-money", name: "事业财运手相分析", price: 49, type: "service", category: "服务套餐", shortDescription: "观察事业线、太阳线和财运线。", description: "适合职业选择、阶段状态和财富习惯复盘。", x: 70, y: 55 }),
      product({ id: "palm-full-report", name: "综合掌纹报告", price: 59, type: "virtual", category: "虚拟报告", shortDescription: "生成完整掌纹图文报告。", description: "包含掌型、主线、丘位和阶段提醒。", x: 34, y: 72 }),
      product({ id: "palm-atlas", name: "掌纹图册", price: 34, type: "physical", category: "收藏周边", shortDescription: "常见掌线和丘位图谱册。", description: "适合手相学习和线下记录对照。", x: 78, y: 40 }),
      product({ id: "palm-record-book", name: "手相记录手册", price: 28, type: "physical", category: "仪式用品", shortDescription: "记录掌纹变化和生活事件。", description: "用于长期观察、拍照记录和阶段复盘。", x: 48, y: 76 }),
      product({ id: "palm-magnifier", name: "掌纹放大镜", price: 42, type: "physical", category: "实体道具", shortDescription: "观察细纹和丘位状态的小工具。", description: "适合拍摄前观察和线下手相学习。", x: 64, y: 34 })
    ]
  },
  {
    slug: "lingqian",
    title: "灵签商城",
    subtitle: "围绕静心求签、签文解读和民俗收藏构建问事仪式。",
    route: shopRoute("lingqian"),
    serviceRoute: "/services/lingqian/live",
    background: sceneBackground("lingqian"),
    theme: "eastern",
    currency: "USD",
    categories: defaultCategories,
    products: [
      product({ id: "lingqian-single", name: "单次抽签解读", price: 36, type: "service", category: "进阶解读", shortDescription: "围绕一个问题进行签文释义。", description: "结合签诗、问题背景和行动提醒整理答复。", x: 46, y: 48 }),
      product({ id: "lingqian-love", name: "感情签", price: 32, type: "service", category: "服务套餐", shortDescription: "围绕感情状态和沟通时机求签。", description: "适合关系复盘、复合观察和情绪整理。", x: 62, y: 58 }),
      product({ id: "lingqian-career", name: "事业签", price: 32, type: "service", category: "服务套餐", shortDescription: "用于事业选择、合作和转向提醒。", description: "从签文角度整理趋势、阻力和推进方式。", x: 28, y: 53 }),
      product({ id: "lingqian-money", name: "财运签", price: 32, type: "service", category: "服务套餐", shortDescription: "聚焦财务节奏与风险提醒。", description: "仅作民俗参考，帮助记录财务行动节奏。", x: 72, y: 40 }),
      product({ id: "lingqian-card", name: "祈福电子卡", price: 12, type: "virtual", category: "虚拟报告", shortDescription: "生成可保存的祈福电子卡。", description: "适合节日、愿望设定和求签后的祝愿记录。", x: 52, y: 72 }),
      product({ id: "lingqian-cup", name: "签筒摆件", price: 76, type: "physical", category: "实体道具", shortDescription: "桌面签筒与签枝收藏套组。", description: "用于空间陈列和线下求签仪式。", x: 38, y: 66 }),
      product({ id: "lingqian-sachet", name: "祈福香囊", price: 26, type: "physical", category: "仪式用品", shortDescription: "随身携带的轻量祝愿香囊。", description: "适合求签后作为祝愿和提醒物。", x: 78, y: 62 })
    ]
  },
  {
    slug: "zodiac",
    title: "生肖商城",
    subtitle: "为生肖流年、每日节奏和开运器物建立轻量化购买入口。",
    route: shopRoute("zodiac"),
    serviceRoute: "/services/zodiac/live",
    background: sceneBackground("zodiac"),
    theme: "eastern",
    currency: "USD",
    categories: defaultCategories,
    products: [
      product({ id: "zodiac-year", name: "生肖年度运势", price: 29, type: "virtual", category: "虚拟报告", shortDescription: "年度主题、月份节奏和关键提醒。", description: "根据生肖关系整理一年的机会、避忌和行动建议。", x: 43, y: 55 }),
      product({ id: "zodiac-month", name: "生肖月度运程", price: 18, type: "virtual", category: "虚拟报告", shortDescription: "当月节奏和重点日期提醒。", description: "适合每月计划、复盘和每日运势延伸阅读。", x: 58, y: 42 }),
      product({ id: "zodiac-money", name: "财运分析报告", price: 32, type: "virtual", category: "虚拟报告", shortDescription: "聚焦财务习惯、风险和机会窗口。", description: "把生肖流年转成财务行动提醒。", x: 26, y: 48 }),
      product({ id: "zodiac-match", name: "生肖配对报告", price: 36, type: "service", category: "服务套餐", shortDescription: "关系互动和相处节奏分析。", description: "适合亲密关系、合作关系和家庭互动观察。", x: 71, y: 60 }),
      product({ id: "zodiac-guardian", name: "生肖守护牌", price: 58, type: "physical", category: "实体道具", shortDescription: "对应生肖的黑金守护牌。", description: "适合随身携带、书桌陈列和节庆赠礼。", x: 48, y: 74 }),
      product({ id: "zodiac-ornament", name: "吉祥摆件", price: 76, type: "physical", category: "仪式用品", shortDescription: "用于玄关或书房的生肖吉祥摆件。", description: "以年度祝愿和生肖意象为核心。", x: 76, y: 38 }),
      product({ id: "zodiac-scroll", name: "流年总览卷轴", price: 42, type: "physical", category: "收藏周边", shortDescription: "年度流年主题收藏卷轴。", description: "适合挂墙、收藏和年度计划提醒。", x: 34, y: 68 })
    ]
  },
  {
    slug: "ziwei",
    title: "紫微商城",
    subtitle: "聚焦命宫、十二宫、大限流年与阶段选择的深度内容。",
    route: shopRoute("ziwei"),
    serviceRoute: "/services/ziwei-doushu/live",
    background: sceneBackground("ziwei"),
    theme: "eastern",
    currency: "USD",
    categories: defaultCategories,
    products: [
      product({ id: "ziwei-chart-report", name: "紫微命盘报告", price: 49, type: "virtual", category: "虚拟报告", shortDescription: "整理命宫主星和十二宫结构。", description: "适合从紫微体验继续阅读完整命盘报告。", x: 48, y: 52 }),
      product({ id: "ziwei-year", name: "流年运势分析", price: 59, type: "virtual", category: "虚拟报告", shortDescription: "拆解当前流年和阶段重点。", description: "围绕事业、关系、迁移和财务整理年度提醒。", x: 64, y: 44 }),
      product({ id: "ziwei-marriage-career", name: "婚姻事业详批", price: 96, type: "service", category: "进阶解读", shortDescription: "顾问详批婚姻与事业宫位。", description: "适合复杂人生阶段和长期方向复盘。", x: 32, y: 43 }),
      product({ id: "ziwei-match", name: "合盘配对报告", price: 68, type: "service", category: "服务套餐", shortDescription: "双人命盘互动和关系节奏分析。", description: "观察两人宫位、主星和相处模式。", x: 76, y: 59 }),
      product({ id: "ziwei-chart-book", name: "紫微命盘册", price: 36, type: "physical", category: "仪式用品", shortDescription: "记录命盘、流年和事件验证。", description: "适合长期学习和个人档案整理。", x: 46, y: 72 }),
      product({ id: "ziwei-star-cards", name: "星曜图卡套装", price: 52, type: "physical", category: "实体道具", shortDescription: "主星与辅星关键词卡组。", description: "用于学习、抽取提示和命盘复盘。", x: 82, y: 38 }),
      product({ id: "ziwei-book", name: "紫微斗数全书", price: 88, type: "physical", category: "收藏周边", shortDescription: "适合系统学习的斗数收藏书。", description: "包含宫位、星曜和基础判断路径。", x: 28, y: 64 })
    ]
  },
  {
    slug: "face-reading",
    title: "面相商城",
    subtitle: "通过五官结构、气色状态和阶段提醒建立图文解读服务。",
    route: shopRoute("face-reading"),
    serviceRoute: "/services/face-reading/live",
    background: sceneBackground("face-reading"),
    theme: "eastern",
    currency: "USD",
    categories: defaultCategories,
    products: [
      product({ id: "face-basic", name: "面相基础分析", price: 39, type: "virtual", category: "虚拟报告", shortDescription: "基础五官结构和气色状态分析。", description: "适合从面相体验继续生成个人图文报告。", x: 50, y: 50 }),
      product({ id: "face-love", name: "感情面相解读", price: 45, type: "service", category: "进阶解读", shortDescription: "观察亲密关系表达和情绪习惯。", description: "围绕眼神、唇形、气色等维度整理提醒。", x: 64, y: 43 }),
      product({ id: "face-money", name: "财运面相分析", price: 45, type: "service", category: "服务套餐", shortDescription: "聚焦财帛宫、鼻相和阶段状态。", description: "用于财务习惯和阶段状态观察。", x: 34, y: 60 }),
      product({ id: "face-full-report", name: "综合面相报告", price: 59, type: "virtual", category: "虚拟报告", shortDescription: "完整面相图文报告。", description: "包含三庭五眼、五官结构、气色和行动建议。", x: 48, y: 73 }),
      product({ id: "face-atlas", name: "面相图谱册", price: 34, type: "physical", category: "收藏周边", shortDescription: "常见五官结构和观察边界。", description: "适合学习、记录和线下对照。", x: 78, y: 58 }),
      product({ id: "face-mirror", name: "古铜照面镜", price: 66, type: "physical", category: "实体道具", shortDescription: "用于仪式空间的古铜镜摆件。", description: "适合书桌、玄关或面相观察角。", x: 40, y: 36 }),
      product({ id: "face-handbook", name: "面相观察手册", price: 28, type: "physical", category: "仪式用品", shortDescription: "记录气色、状态和生活事件。", description: "帮助把观察转成长期复盘。", x: 70, y: 70 })
    ]
  },
  {
    slug: "fengshui",
    title: "风水商城",
    subtitle: "围绕空间诊断、罗盘工具、家居器物和调整清单组织商品。",
    route: shopRoute("fengshui"),
    serviceRoute: "/services/fengshui-luopan/live",
    background: sceneBackground("fengshui"),
    theme: "eastern",
    currency: "USD",
    categories: defaultCategories,
    products: [
      product({ id: "fengshui-home", name: "家宅风水报告", price: 68, type: "virtual", category: "虚拟报告", shortDescription: "全屋空间格局与调整建议。", description: "根据户型、方位和照片整理家宅风水报告。", x: 46, y: 54 }),
      product({ id: "fengshui-office", name: "办公风水建议", price: 58, type: "service", category: "进阶解读", shortDescription: "办公桌、会议区和动线建议。", description: "适合个人办公室、工作室和小型团队空间。", x: 62, y: 44 }),
      product({ id: "fengshui-wealth", name: "财位布局建议", price: 42, type: "virtual", category: "虚拟报告", shortDescription: "识别财位与可执行布置提醒。", description: "提供光线、动线、摆件和收纳建议。", x: 35, y: 61 }),
      product({ id: "fengshui-year-adjustment", name: "流年风水调整", price: 72, type: "service", category: "服务套餐", shortDescription: "结合流年方位进行年度调整。", description: "适合年度居家、办公空间复盘和调整。", x: 52, y: 74 }),
      product({ id: "fengshui-compass", name: "专业风水罗盘", price: 128, type: "physical", category: "实体道具", shortDescription: "用于方位观察和空间仪式的罗盘。", description: "实体发货，附基础使用说明和收藏盒。", x: 75, y: 58 }),
      product({ id: "fengshui-ornament", name: "风水摆件", price: 76, type: "physical", category: "仪式用品", shortDescription: "适合玄关、书房或办公位的摆件。", description: "以稳定空间视觉重心和祝愿意象为主。", x: 24, y: 44 }),
      product({ id: "fengshui-book", name: "风水秘法手册", price: 38, type: "physical", category: "收藏周边", shortDescription: "记录方位、布局和年度调整的手册。", description: "用于长期学习和空间调整复盘。", x: 66, y: 66 })
    ]
  }
] as const satisfies readonly ThemeShop[];

export const themeShopsByTheme = {
  eastern: themeShops.filter((shop) => shop.theme === "eastern"),
  western: themeShops.filter((shop) => shop.theme === "western")
} as const;

export function getThemeShopBySlug(slug?: string) {
  return themeShops.find((shop) => shop.slug === slug);
}
