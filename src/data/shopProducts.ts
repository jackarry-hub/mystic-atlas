import { assets } from "../lib/assets";

export const shopCategories = [
  "护符",
  "水晶",
  "香薰",
  "佛牌",
  "塔罗神谕卡",
  "数字报告",
  "宗教收藏"
] as const;

export type ShopCategory = (typeof shopCategories)[number];
export type ShopProductType = "physical" | "virtual" | "service";
export type ShopCurrency = "USD";

export interface ShopProduct {
  id: string;
  name: string;
  price: number;
  currency: ShopCurrency;
  type: ShopProductType;
  category: ShopCategory;
  shortDescription: string;
  description: string;
  suitableFor: readonly string[];
  includes: readonly string[];
  delivery: string;
  notice: string;
  linkedThemeShop?: string;
  serviceRoute?: string;
  image?: string;
  route: string;
  sku: string;
}

export const shopProducts = [
  {
    id: "star-guardian-crystal-pendant",
    name: "星辉守护水晶吊坠",
    price: 198,
    currency: "USD",
    type: "physical",
    category: "护符",
    shortDescription: "白水晶与星象符号结合的随身守护护符。",
    description:
      "以白水晶、金色星象纹样和守护意象组合成一枚适合日常佩戴的吊坠。它更偏向安定、专注与个人边界感的仪式表达，也适合与塔罗、星盘等主题空间搭配。",
    suitableFor: ["希望随身携带守护意象的人", "正在建立个人仪式感的用户", "偏好低调黑金配饰的人"],
    includes: ["水晶吊坠 1 枚", "净化说明卡", "黑金收藏盒", "基础保养指南"],
    delivery: "实体发货，含净化卡与收藏盒。",
    notice: "天然晶石存在纹理差异；本商品为仪式与收藏用品，不替代医疗或专业建议。",
    linkedThemeShop: "/shop/bazi",
    serviceRoute: "/services/bazi-chart/live",
    image: assets.products.crystalPendant,
    route: "/shop/product/crystal-pendant",
    sku: "PHY-CHARM-001"
  },
  {
    id: "aurum-protection-coin",
    name: "金曜护身徽章",
    price: 88,
    currency: "USD",
    type: "physical",
    category: "护符",
    shortDescription: "适合钱包、手账和旅行随身包的金色守护徽章。",
    description:
      "一枚小尺寸金曜徽章，适合放在钱包、手账夹层或旅行随身包中。设计语言偏向太阳、金属与边界守护，适合作为通勤、出行或重要事项前的轻量护符。",
    suitableFor: ["经常出行或通勤的人", "喜欢小型随身护符的人", "需要给重要物品加入仪式标记的人"],
    includes: ["金色徽章 1 枚", "能量说明卡", "便携收纳袋"],
    delivery: "实体发货，附能量说明卡。",
    notice: "徽章表面请避免长时间接触水汽与化学清洁剂。",
    linkedThemeShop: "/shop/fengshui",
    serviceRoute: "/services/fengshui-compass/live",
    image: assets.products.medallion,
    route: "/shop/product/aurum-guard-coin",
    sku: "PHY-CHARM-002"
  },
  {
    id: "blue-moon-necklace",
    name: "蓝月辉石项链",
    price: 168,
    currency: "USD",
    type: "physical",
    category: "水晶",
    shortDescription: "为夜间记录、冥想和情绪整理准备的蓝色晶石项链。",
    description:
      "蓝色晶石与月相灵感构成柔和、安静的佩戴物。它适合睡前书写、冥想、情绪整理或需要稳定表达节奏的场景，视觉上保留 Mystic Atlas 的冷金与深蓝气质。",
    suitableFor: ["夜间记录和冥想用户", "偏好冷色晶石饰品的人", "希望建立情绪整理仪式的人"],
    includes: ["蓝色晶石项链 1 条", "绒布袋", "保养说明", "月相记录卡"],
    delivery: "实体发货，含绒布袋与保养说明。",
    notice: "晶石颜色与纹理会有自然差异；请避免磕碰和长时间暴晒。",
    linkedThemeShop: "/shop/astrology",
    serviceRoute: "/services/natal-astrology/live",
    image: assets.products.blueGemPendant,
    route: "/shop/product/blue-moon-necklace",
    sku: "PHY-CRYSTAL-001"
  },
  {
    id: "astrolabe-crystal-platform",
    name: "星盘水晶阵台",
    price: 288,
    currency: "USD",
    type: "physical",
    category: "水晶",
    shortDescription: "用于塔罗展开、月相冥想和个人仪式布置的阵台。",
    description:
      "以星盘刻度和水晶阵位为核心的桌面阵台，适合承载塔罗牌阵、月相冥想、能量石摆放和咨询空间布置。它更像一个稳定的仪式底座，让物件与行动有清晰的位置关系。",
    suitableFor: ["塔罗师与咨询空间主理人", "喜欢桌面仪式布置的人", "需要固定冥想角落的用户"],
    includes: ["星盘阵台 1 件", "阵位说明卡", "防尘收纳布", "预售批次证书"],
    delivery: "实体发货，预售批次按订单顺序寄出。",
    notice: "阵台为装饰与仪式陈列用途，请勿作为承重器具使用。",
    linkedThemeShop: "/shop/tarot",
    serviceRoute: "/services/tarot-reading/live",
    image: assets.products.crystalDisk,
    route: "/shop/product/astrolabe-crystal-platform",
    sku: "PHY-CRYSTAL-002"
  },
  {
    id: "incense-compass-bottle",
    name: "香雾罗盘瓶",
    price: 96,
    currency: "USD",
    type: "physical",
    category: "香薰",
    shortDescription: "木质冷雾扩香，适合睡前整理思绪。",
    description:
      "以罗盘造型与木质香调构建一件低调的扩香物。冷雾香气适合睡前、占卜前、整理空间前使用，让环境从日常状态缓慢过渡到安静、专注的节奏。",
    suitableFor: ["需要睡前放松的人", "重视空间气味层次的用户", "咨询室或书房布置者"],
    includes: ["香雾罗盘瓶 1 件", "替换香片 1 组", "使用说明", "香调说明卡"],
    delivery: "实体发货，含替换香片一组。",
    notice: "请按说明控制使用时长，并远离儿童、宠物与明火。",
    linkedThemeShop: "/shop/fengshui",
    serviceRoute: "/services/fengshui-compass/live",
    image: assets.products.aromaDiffuser,
    route: "/shop/product/incense-compass-bottle",
    sku: "PHY-AROMA-001"
  },
  {
    id: "temple-night-incense",
    name: "夜庙安神线香",
    price: 42,
    currency: "USD",
    type: "physical",
    category: "香薰",
    shortDescription: "沉香、雪松与树脂调，适合静心与占前准备。",
    description:
      "一款偏沉静的夜间线香，带有沉香、雪松和微甜树脂气息。适合在抽牌、写梦境笔记、睡前整理或空间清扫后点燃，给仪式建立明确开场。",
    suitableFor: ["喜欢木质香调的人", "塔罗和梦境记录用户", "需要安静睡前流程的人"],
    includes: ["夜庙线香 1 盒", "香插", "燃香安全卡", "香调说明"],
    delivery: "实体发货，约 3-5 个工作日处理。",
    notice: "燃香时请保持通风并看护火源；孕婴、呼吸道敏感者请谨慎使用。",
    linkedThemeShop: "/shop/dream",
    serviceRoute: "/services/dream-interpretation/live",
    image: assets.products.incense,
    route: "/shop/product/temple-night-incense",
    sku: "PHY-AROMA-002"
  },
  {
    id: "guardian-statue",
    name: "守护神像",
    price: 238,
    currency: "USD",
    type: "physical",
    category: "佛牌",
    shortDescription: "为书房、玄关和咨询空间建立沉静仪式感。",
    description:
      "黑金配色的守护神像摆件，适合书房、玄关、咨询空间或个人祭坛陈列。它并不强调繁复装饰，而是通过稳定的轮廓和沉静表情营造空间重心。",
    suitableFor: ["书房和咨询空间布置者", "偏好黑金收藏摆件的人", "希望建立空间守护感的用户"],
    includes: ["守护神像 1 件", "防震包装", "收藏证书", "摆放建议卡"],
    delivery: "实体发货，含防震包装与收藏证书。",
    notice: "摆件请放置在稳定平面，避免潮湿、高温和强烈撞击。",
    linkedThemeShop: "/shop/lingqian",
    serviceRoute: "/services/spiritual-lots/live",
    image: assets.products.deityStatue,
    route: "/shop/product/guardian-statue",
    sku: "PHY-BUDDHA-001"
  },
  {
    id: "deity-medallion",
    name: "护佑神像牌",
    price: 118,
    currency: "USD",
    type: "physical",
    category: "佛牌",
    shortDescription: "以神像浮雕承载平安、守护与祝祷意象。",
    description:
      "小尺寸护佑神像牌，适合随身佩戴、放置在书桌或与其他收藏器物一起陈列。浮雕与金色纹样让它具备仪式感，同时保留日常使用的克制尺度。",
    suitableFor: ["需要随身祝祷物的人", "佛牌与徽章收藏者", "喜欢小型金属器物的人"],
    includes: ["神像牌 1 枚", "佩戴说明", "供养说明", "收纳袋"],
    delivery: "实体发货，附佩戴与供养说明。",
    notice: "请避免与尖锐金属混放，表面轻微氧化属于正常使用痕迹。",
    linkedThemeShop: "/shop/lingqian",
    serviceRoute: "/services/spiritual-lots/live",
    image: assets.products.guardCoin,
    route: "/shop/product/deity-medallion",
    sku: "PHY-BUDDHA-002"
  },
  {
    id: "midnight-tarot-oracle",
    name: "午夜塔罗神谕套牌",
    price: 72,
    currency: "USD",
    type: "physical",
    category: "塔罗神谕卡",
    shortDescription: "黑金视觉的塔罗与神谕卡组合，适合日常抽牌。",
    description:
      "一套面向日常抽牌与主题仪式的塔罗神谕组合。牌面采用深色底与金色符号系统，适合单张提示、三张牌展开，也适合进入沉浸式塔罗体验前做预热。",
    suitableFor: ["塔罗初学者与进阶使用者", "喜欢黑金牌面的人", "希望连接线上沉浸式体验的用户"],
    includes: ["塔罗神谕套牌 1 套", "牌盒", "说明册", "绒布"],
    delivery: "实体发货，含牌盒、说明册与绒布。",
    notice: "牌卡用于自我探索与娱乐参考，不构成法律、医疗或财务建议。",
    linkedThemeShop: "/shop/tarot",
    serviceRoute: "/services/tarot-reading/live",
    image: assets.products.oracleWheel,
    route: "/shop/product/midnight-tarot-oracle",
    sku: "PHY-CARD-001"
  },
  {
    id: "zodiac-oracle-wheel",
    name: "十二星座神谕轮",
    price: 86,
    currency: "USD",
    type: "physical",
    category: "塔罗神谕卡",
    shortDescription: "结合星座、宫位与每日提示的桌面神谕工具。",
    description:
      "把十二星座、宫位关键词与每日提示组合成桌面神谕轮。适合晨间抽取、周计划设定或与星盘报告一起使用，帮助用户快速建立一天的观察主题。",
    suitableFor: ["星座爱好者", "喜欢桌面提示工具的人", "需要晨间仪式的人"],
    includes: ["星座神谕轮 1 件", "桌面支架", "使用卡", "关键词索引"],
    delivery: "实体发货，含桌面支架。",
    notice: "神谕提示用于灵感启发，请结合现实信息做判断。",
    linkedThemeShop: "/shop/zodiac",
    serviceRoute: "/services/zodiac-forecast/live",
    image: assets.products.oracleWheel,
    route: "/shop/product/zodiac-oracle-wheel",
    sku: "PHY-CARD-002"
  },
  {
    id: "natal-report-digital",
    name: "星盘深度数字报告",
    price: 39,
    currency: "USD",
    type: "virtual",
    category: "数字报告",
    shortDescription: "本命盘、年度主题、关系结构和行动建议整合报告。",
    description:
      "面向想系统理解个人星盘的用户，报告会整理本命结构、年度主题、关系互动和可执行建议。适合先阅读报告，再进入沉浸式星盘体验做重点追问。",
    suitableFor: ["想系统了解本命盘的人", "准备做年度规划的人", "希望把星盘结论变成行动的人"],
    includes: ["数字报告阅读入口", "本命盘重点解读", "年度主题摘要", "行动建议清单"],
    delivery: "付款后即时开通，可在账户中心查看。",
    notice: "报告依据用户提交信息生成；出生时间越准确，解读参考价值越高。",
    linkedThemeShop: "/shop/astrology",
    serviceRoute: "/services/natal-astrology/live",
    image: assets.heroes.reportZodiacAstrolabe,
    route: "/shop/product/natal-report-digital",
    sku: "DIG-REPORT-001"
  },
  {
    id: "ninety-day-fortune-report",
    name: "九十日运势数字报告",
    price: 29,
    currency: "USD",
    type: "virtual",
    category: "数字报告",
    shortDescription: "按未来三个月整理关键日期、行动提醒与节奏。",
    description:
      "以九十天为周期整理整体运势、关键提醒、适合推进的事项和需要缓冲的阶段。适合把抽象运势转成日历式观察，并与八字或紫微主题体验联动。",
    suitableFor: ["需要季度规划的人", "希望提前看到关键日期的人", "喜欢把提醒落到行动清单的人"],
    includes: ["90 日数字报告", "关键日期列表", "行动提醒", "账户中心下载入口"],
    delivery: "付款后即时生成下载入口。",
    notice: "运势内容仅作规划参考，重要决定仍需结合现实条件与专业意见。",
    linkedThemeShop: "/shop/ziwei",
    serviceRoute: "/services/ziwei-doushu/live",
    image: assets.heroes.reportBook,
    route: "/shop/product/ninety-day-fortune-report",
    sku: "DIG-REPORT-002"
  },
  {
    id: "folk-lots-collection",
    name: "灵签收藏套组",
    price: 128,
    currency: "USD",
    type: "physical",
    category: "宗教收藏",
    shortDescription: "签筒、签文与解签流程的仪式化收藏套组。",
    description:
      "灵签收藏套组包含签筒、签文卡册与基础解签流程说明，适合陈列，也适合在进入线上灵签体验前作为线下仪式道具使用。",
    suitableFor: ["灵签文化爱好者", "宗教民俗收藏者", "想布置安静问询角的人"],
    includes: ["签筒 1 件", "签文卡册", "解签流程卡", "收藏外盒"],
    delivery: "实体发货，含收藏卡册。",
    notice: "民俗内容用于文化体验与个人反思，不应作为重大事务的唯一依据。",
    linkedThemeShop: "/shop/lingqian",
    serviceRoute: "/services/spiritual-lots/live",
    image: assets.products.lots,
    route: "/shop/product/folk-lots-collection",
    sku: "PHY-COLLECT-001"
  },
  {
    id: "temple-lantern-collection",
    name: "祈福宫灯收藏摆件",
    price: 156,
    currency: "USD",
    type: "physical",
    category: "宗教收藏",
    shortDescription: "连接庙宇空间、夜间巡游和节庆祝愿的收藏摆件。",
    description:
      "以宫灯、庙宇夜色与祝愿意象为核心的小型收藏摆件。适合摆在玄关、书架或节庆布置中，作为轻量的祈福视觉中心。",
    suitableFor: ["节庆陈列爱好者", "民俗器物收藏者", "希望为空间加入祝愿意象的人"],
    includes: ["宫灯摆件 1 件", "定制外盒", "摆放建议卡", "收藏编号卡"],
    delivery: "实体发货，含定制外盒。",
    notice: "摆件不含真实照明功能；请避免潮湿环境与儿童误触。",
    linkedThemeShop: "/shop/fengshui",
    serviceRoute: "/services/fengshui-compass/live",
    image: assets.products.lantern,
    route: "/shop/product/temple-lantern-collection",
    sku: "PHY-COLLECT-002"
  }
] as const satisfies readonly ShopProduct[];

export const shopProductsByCategory = shopCategories.map((category) => ({
  category,
  products: shopProducts.filter((product) => product.category === category)
}));

export function getShopProductById(productId?: string) {
  return shopProducts.find((product) => product.id === productId);
}
