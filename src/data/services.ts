import type { IconName } from "../components";
import { assets } from "../lib/assets";
import { getLiveProjectPath, mysticProjects } from "./mysticProjects";

export interface ServiceItem {
  category: string;
  description: string;
  deliverable: string;
  duration: string;
  highlights: string[];
  icon: IconName;
  id: string;
  image: string;
  knowledgeTo: string;
  liveTo: string;
  mode: string;
  price: string;
  reportTo: string;
  sku: string;
  title: string;
  to: string;
}

const projectMeta = new Map(
  mysticProjects.map((project) => [project.serviceId, project])
);

const baseServices: ServiceItem[] = [
  {
    id: "tarot-reading",
    sku: "SVC-TAROT-001",
    title: "塔罗互动占卜",
    category: "牌阵咨询",
    description: "沉浸式抽牌、牌阵选择、每日塔罗与解读档案。",
    icon: "sparkles",
    image: assets.heroes.reportZodiacAstrolabe,
    price: "USD 66.00",
    duration: "45 分钟线上咨询",
    mode: "互动测算 / 顾问复盘",
    deliverable: "一份牌阵结论与行动建议",
    knowledgeTo: "/knowledge/western",
    reportTo: "/reports/detail",
    to: "/services/tarot-reading",
    liveTo: getLiveProjectPath("tarot-reading"),
    highlights: ["沉浸式抽牌", "牌阵选择", "每日塔罗档案"]
  },
  {
    id: "natal-astrology",
    sku: "SVC-ASTRO-004",
    title: "星盘占星",
    category: "西方占星",
    description: "输入出生信息，生成本命、行运、宫位与相位解读。",
    icon: "sun",
    image: assets.heroes.westernCompass,
    price: "USD 78.00",
    duration: "50 分钟线上咨询",
    mode: "互动排盘 / 星图解读",
    deliverable: "一份星盘重点与成长主题",
    knowledgeTo: "/knowledge/western",
    reportTo: "/reports/detail",
    to: "/services/natal-astrology",
    liveTo: getLiveProjectPath("natal-astrology"),
    highlights: ["出生信息校准", "本命盘生成", "行运与宫位说明"]
  },
  {
    id: "bazi-chart",
    sku: "SVC-BAZI-002",
    title: "八字命盘",
    category: "东方命理",
    description: "四柱归位，观察五行结构、十神关系与流年节奏。",
    icon: "circle",
    image: assets.heroes.easternYinyang,
    price: "USD 88.00",
    duration: "60 分钟线上咨询",
    mode: "互动排盘 / 结构分析",
    deliverable: "一份命盘摘要与年度节奏表",
    knowledgeTo: "/knowledge/eastern",
    reportTo: "/reports/detail",
    to: "/services/bazi-chart",
    liveTo: getLiveProjectPath("bazi-chart"),
    highlights: ["四柱五行结构", "十神关系解读", "年度关键月份提醒"]
  },
  {
    id: "liuyao",
    sku: "SVC-LIUYAO-003",
    title: "六爻问卦",
    category: "具体问题判断",
    description: "三枚铜钱起六爻，生成本卦、变卦、动爻与世应解读。",
    icon: "list",
    image: assets.heroes.serviceCrystal,
    price: "USD 58.00",
    duration: "30 分钟线上咨询",
    mode: "互动起卦 / 解卦",
    deliverable: "一份卦象结论与风险提示",
    knowledgeTo: "/knowledge/eastern",
    reportTo: "/reports/detail",
    to: "/services/liuyao",
    liveTo: getLiveProjectPath("liuyao"),
    highlights: ["铜钱起卦", "本卦变卦", "短周期行动建议"]
  },
  {
    id: "ziwei-doushu",
    sku: "SVC-ZIWEI-005",
    title: "紫微斗数",
    category: "东方命盘",
    description: "以命宫、十二宫与星曜组合呈现人生主线。",
    icon: "star",
    image: assets.heroes.easternYinyang,
    price: "USD 96.00",
    duration: "70 分钟线上咨询",
    mode: "互动排盘 / 大限流年",
    deliverable: "一份命盘重点与阶段路线",
    knowledgeTo: "/knowledge/eastern",
    reportTo: "/reports/detail",
    to: "/services/ziwei-doushu",
    liveTo: getLiveProjectPath("ziwei-doushu"),
    highlights: ["命宫主星画像", "十二宫结构", "未来三年阶段提示"]
  },
  {
    id: "spiritual-lots",
    sku: "SVC-LOTS-006",
    title: "灵签求问",
    category: "民俗签文",
    description: "一事一问，静心摇签，得签后观诗、释义与行事建议。",
    icon: "scroll",
    image: assets.products.lots,
    price: "USD 36.00",
    duration: "20 分钟线上解签",
    mode: "互动摇签 / 签文解释",
    deliverable: "一份签文释义与行动提醒",
    knowledgeTo: "/knowledge/hongkong-folk",
    reportTo: "/reports/detail",
    to: "/services/spiritual-lots",
    liveTo: getLiveProjectPath("spiritual-lots"),
    highlights: ["静心摇签", "签诗释义", "当周行动提醒"]
  },
  {
    id: "dream-interpretation",
    sku: "SVC-DREAM-007",
    title: "周公解梦",
    category: "梦境解析",
    description: "记录梦境关键词，拆解梦象、情绪线索与现实提醒。",
    icon: "moon",
    image: assets.heroes.moonPhaseHero,
    price: "USD 39.00",
    duration: "30 分钟文字解读",
    mode: "梦境记录 / 意象分析",
    deliverable: "一份梦境关键词与提醒",
    knowledgeTo: "/knowledge/eastern",
    reportTo: "/reports/detail",
    to: "/services/dream-interpretation",
    liveTo: getLiveProjectPath("dream-interpretation"),
    highlights: ["梦境意象拆解", "情绪来源定位", "现实提醒归纳"]
  },
  {
    id: "zodiac-forecast",
    sku: "SVC-ZODIAC-009",
    title: "生肖运势",
    category: "流年运势",
    description: "生肖流年、每日运程与阶段提醒的沉浸式解读。",
    icon: "layers",
    image: assets.heroes.reportZodiacAstrolabe,
    price: "USD 42.00",
    duration: "25 分钟线上解析",
    mode: "生肖流年 / 每日运势",
    deliverable: "一份 90 天运势提醒",
    knowledgeTo: "/knowledge/eastern",
    reportTo: "/reports/detail",
    to: "/services/zodiac-forecast",
    liveTo: getLiveProjectPath("zodiac-forecast"),
    highlights: ["流年关系判断", "每日运程", "关键日期提醒"]
  },
  {
    id: "fengshui-compass",
    sku: "SVC-FENGSHUI-010",
    title: "风水堪舆",
    category: "空间建议",
    description: "宅运布局、方位罗盘与空间气场建议。",
    icon: "compass",
    image: assets.heroes.geoWorldMap,
    price: "USD 108.00",
    duration: "75 分钟图文咨询",
    mode: "互动罗盘 / 户型建议",
    deliverable: "一份空间调整清单",
    knowledgeTo: "/knowledge/eastern",
    reportTo: "/reports/detail",
    to: "/services/fengshui-compass",
    liveTo: getLiveProjectPath("fengshui-compass"),
    highlights: ["宅运布局", "方位罗盘", "空间气场建议"]
  },
  {
    id: "palm-reading",
    sku: "SVC-PALM-011",
    title: "手相解读",
    category: "相术解读",
    description: "通过掌纹、丘位与手型观察状态、优势与提醒。",
    icon: "user",
    image: assets.heroes.accountAvatarCrystal,
    price: "USD 49.00",
    duration: "30 分钟图文解读",
    mode: "互动上传 / 掌纹分析",
    deliverable: "一份掌纹重点与行动提醒",
    knowledgeTo: "/knowledge/eastern",
    reportTo: "/reports/detail",
    to: "/services/palm-reading",
    liveTo: getLiveProjectPath("palm-reading"),
    highlights: ["掌纹观察", "丘位分析", "状态提醒"]
  },
  {
    id: "face-reading",
    sku: "SVC-FACE-012",
    title: "面相解读",
    category: "相术解读",
    description: "从五官、气色与面部结构观察性格与阶段状态。",
    icon: "user",
    image: assets.heroes.accountAvatarCrystal,
    price: "USD 49.00",
    duration: "30 分钟图文解读",
    mode: "互动上传 / 面相分析",
    deliverable: "一份面相重点与状态提醒",
    knowledgeTo: "/knowledge/eastern",
    reportTo: "/reports/detail",
    to: "/services/face-reading",
    liveTo: getLiveProjectPath("face-reading"),
    highlights: ["五官结构", "气色观察", "阶段状态"]
  },
  {
    id: "naming-date",
    sku: "SVC-NAME-013",
    title: "取名择日",
    category: "姓名择日",
    description: "结合五行、音义与时机安排姓名和关键日期。",
    icon: "file",
    image: assets.heroes.knowledgeBookCrystal,
    price: "USD 68.00",
    duration: "40 分钟线上解析",
    mode: "互动测算 / 名日建议",
    deliverable: "一份姓名与择日建议",
    knowledgeTo: "/knowledge/eastern",
    reportTo: "/reports/detail",
    to: "/services/naming-date",
    liveTo: getLiveProjectPath("naming-date"),
    highlights: ["姓名五行", "音义结构", "择日建议"]
  }
];

export const services: ServiceItem[] = baseServices.map((service) => {
  const project = projectMeta.get(service.id);

  return project
    ? {
        ...service,
        icon: project.icon,
        knowledgeTo: project.knowledgeRoute
      }
    : service;
});

export function getServiceById(serviceId?: string) {
  return services.find((service) => service.id === serviceId);
}
