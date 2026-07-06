import { assets } from "../lib/assets";

export type ProductType = "physical" | "virtual" | "display";

export interface Product {
  category: string;
  description: string;
  id: string;
  image: string;
  name: string;
  price: string;
  sku: string;
  stockLabel?: string;
  to: string;
  type: ProductType;
}

export const featuredProducts: Product[] = [
  {
    id: "crystal-pendant",
    sku: "PHY-CRYSTAL-001",
    name: "星辉守护水晶吊坠",
    category: "限量护符",
    description: "白水晶、星象符号与守护意象结合的随身吊坠。",
    image: assets.products.crystalPendant,
    price: "USD 198.00",
    stockLabel: "全球限量 999 件",
    type: "physical",
    to: "/shop/product/crystal-pendant"
  },
  {
    id: "blue-moon-necklace",
    sku: "PHY-MOON-002",
    name: "蓝月辉石项链",
    category: "月相系列",
    description: "适合冥想、夜间记录和情绪稳定仪式。",
    image: assets.products.blueGemPendant,
    price: "USD 168.00",
    stockLabel: "现货 42 件",
    type: "physical",
    to: "/shop/product/blue-moon-necklace"
  },
  {
    id: "astrolabe-crystal-platform",
    sku: "PHY-ALTAR-003",
    name: "星盘水晶阵台",
    category: "仪式器物",
    description: "用于塔罗展开、月相冥想和个人仪式布置。",
    image: assets.products.crystalDisk,
    price: "USD 288.00",
    stockLabel: "预售中",
    type: "physical",
    to: "/shop/product/astrolabe-crystal-platform"
  },
  {
    id: "guardian-statue",
    sku: "PHY-STATUE-004",
    name: "守护神像",
    category: "空间守护",
    description: "沉静黑金造型，为书房与咨询空间建立仪式感。",
    image: assets.products.deityStatue,
    price: "USD 238.00",
    stockLabel: "现货 18 件",
    type: "physical",
    to: "/shop/product/guardian-statue"
  },
  {
    id: "aurum-guard-coin",
    sku: "PHY-COIN-005",
    name: "金曜护身徽章",
    category: "护身配饰",
    description: "适合放置于钱包、笔记本或旅行随身包。",
    image: assets.products.medallion,
    price: "USD 88.00",
    stockLabel: "现货 76 件",
    type: "physical",
    to: "/shop/product/aurum-guard-coin"
  },
  {
    id: "incense-compass-bottle",
    sku: "PHY-INCENSE-006",
    name: "香雾罗盘瓶",
    category: "能量香氛",
    description: "木质香气与冷雾扩香，适合睡前整理思绪。",
    image: assets.products.burner,
    price: "USD 96.00",
    stockLabel: "现货 31 件",
    type: "physical",
    to: "/shop/product/incense-compass-bottle"
  }
];

export const virtualProducts: Product[] = [
  {
    id: "natal-report-digital",
    sku: "DIG-REPORT-001",
    name: "星盘深度数字报告",
    category: "数字报告",
    description: "包含本命盘、年度主题、关系结构和行动建议。",
    image: assets.heroes.reportZodiacAstrolabe,
    price: "USD 39.00",
    type: "virtual",
    to: "/shop/product/natal-report-digital"
  },
  {
    id: "seven-day-talisman",
    sku: "DIG-TALISMAN-002",
    name: "七日电子护符",
    category: "电子护符",
    description: "每日一张符号图与短引导，用于专注和提醒。",
    image: assets.products.talisman,
    price: "USD 12.00",
    type: "virtual",
    to: "/shop/product/seven-day-talisman"
  },
  {
    id: "moon-meditation-audio",
    sku: "DIG-AUDIO-003",
    name: "月相冥想音频",
    category: "冥想音频",
    description: "新月设定、满月释放与夜间安定三组音频。",
    image: assets.heroes.moonPhaseHero,
    price: "USD 18.00",
    type: "virtual",
    to: "/shop/product/moon-meditation-audio"
  },
  {
    id: "black-gold-membership",
    sku: "DIG-MEMBER-004",
    name: "黑金会员服务",
    category: "会员服务",
    description: "报告折扣、优先解读和专属内容库权限。",
    image: assets.heroes.membershipBadge,
    price: "USD 68.00",
    type: "virtual",
    to: "/shop/product/black-gold-membership"
  },
  {
    id: "personal-ritual-course",
    sku: "DIG-COURSE-005",
    name: "个人仪式课程",
    category: "仪式课程",
    description: "从空间清理、牌阵记录到月相复盘的完整流程。",
    image: assets.heroes.shopCrystalPlatform,
    price: "USD 56.00",
    type: "virtual",
    to: "/shop/product/personal-ritual-course"
  }
];

export const hongKongFolkProducts: Product[] = [
  {
    id: "folk-lots",
    sku: "REF-FOLK-001",
    name: "黄大仙灵签签筒",
    category: "民俗器物",
    description: "签筒、签文与解签流程的仪式化呈现。",
    image: assets.products.lots,
    price: "馆藏展示",
    type: "display",
    to: "/knowledge/hongkong-folk"
  },
  {
    id: "folk-statue",
    sku: "REF-FOLK-002",
    name: "民俗守护神像",
    category: "庙宇意象",
    description: "象征守护、祈福和社区香火的民间信仰图像。",
    image: assets.products.folkStatue,
    price: "馆藏展示",
    type: "display",
    to: "/knowledge/hongkong-folk"
  },
  {
    id: "paper-doll",
    sku: "REF-FOLK-003",
    name: "替身纸偶",
    category: "仪式道具",
    description: "民间仪式中用于象征转移、化解和祈愿的物件。",
    image: assets.products.paperDoll,
    price: "馆藏展示",
    type: "display",
    to: "/knowledge/hongkong-folk"
  },
  {
    id: "guard-coin",
    sku: "REF-FOLK-004",
    name: "守护铜牌",
    category: "护身符号",
    description: "以神像和纹样承载守护、平安与镇宅意象。",
    image: assets.products.guardCoin,
    price: "馆藏展示",
    type: "display",
    to: "/knowledge/hongkong-folk"
  },
  {
    id: "incense-vessel",
    sku: "REF-FOLK-005",
    name: "香炉供器",
    category: "香火仪式",
    description: "香火、供奉和愿望表达的核心器物。",
    image: assets.products.incense,
    price: "馆藏展示",
    type: "display",
    to: "/knowledge/hongkong-folk"
  },
  {
    id: "temple-lantern",
    sku: "REF-FOLK-006",
    name: "祈福宫灯",
    category: "节庆风俗",
    description: "连接庙宇空间、夜间巡游和节庆祝愿。",
    image: assets.products.lantern,
    price: "馆藏展示",
    type: "display",
    to: "/knowledge/hongkong-folk"
  }
];

export const allShopProducts = [...featuredProducts, ...virtualProducts];

export function getProductById(productId?: string) {
  return allShopProducts.find((product) => product.id === productId);
}
