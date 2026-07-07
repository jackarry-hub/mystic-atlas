import type { IconName } from "../components";

export interface MysticProject {
  aliases?: readonly string[];
  category: "东方玄学" | "西方神秘学" | "香港民俗";
  description: string;
  file: string;
  icon: IconName;
  knowledgeRoute: string;
  publicServiceId: string;
  serviceId: string;
  shopLabel: string;
  shopRoute: string;
  slug: string;
  title: string;
}

export const mysticProjects: MysticProject[] = [
  {
    slug: "tarot",
    serviceId: "tarot-reading",
    publicServiceId: "tarot",
    aliases: ["tarot"],
    shopLabel: "塔罗商城",
    shopRoute: "/shop/tarot",
    title: "塔罗互动占卜",
    file: "index_6.html",
    category: "西方神秘学",
    knowledgeRoute: "/knowledge/western",
    icon: "sparkles",
    description: "沉浸式抽牌、牌阵选择、每日塔罗与解读档案。"
  },
  {
    slug: "astrology",
    serviceId: "natal-astrology",
    publicServiceId: "astrology",
    aliases: ["astrology"],
    shopLabel: "占星商城",
    shopRoute: "/shop/astrology",
    title: "星盘占星",
    file: "index_astrology.html",
    category: "西方神秘学",
    knowledgeRoute: "/knowledge/western",
    icon: "sun",
    description: "输入出生信息，生成本命、行运、宫位与相位解读。"
  },
  {
    slug: "bazi",
    serviceId: "bazi-chart",
    publicServiceId: "bazi",
    aliases: ["bazi"],
    shopLabel: "八字商城",
    shopRoute: "/shop/bazi",
    title: "八字命盘",
    file: "index_bazi.html",
    category: "东方玄学",
    knowledgeRoute: "/knowledge/eastern",
    icon: "circle",
    description: "四柱归位，观察五行结构、十神关系与流年节奏。"
  },
  {
    slug: "liuyao",
    serviceId: "liuyao",
    publicServiceId: "liuyao",
    shopLabel: "六爻商城",
    shopRoute: "/shop/liuyao",
    title: "六爻问卦",
    file: "index_liuyao.html",
    category: "东方玄学",
    knowledgeRoute: "/knowledge/eastern",
    icon: "list",
    description: "三枚铜钱起六爻，生成本卦、变卦、动爻与世应解读。"
  },
  {
    slug: "ziwei",
    serviceId: "ziwei-doushu",
    publicServiceId: "ziwei-doushu",
    shopLabel: "紫微商城",
    shopRoute: "/shop/ziwei",
    title: "紫微斗数",
    file: "index_ziwei.html",
    category: "东方玄学",
    knowledgeRoute: "/knowledge/eastern",
    icon: "star",
    description: "以命宫、十二宫与星曜组合呈现人生主线。"
  },
  {
    slug: "lingqian",
    serviceId: "spiritual-lots",
    publicServiceId: "lingqian",
    aliases: ["lingqian"],
    shopLabel: "灵签商城",
    shopRoute: "/shop/lingqian",
    title: "灵签求问",
    file: "index_lingqian.html",
    category: "香港民俗",
    knowledgeRoute: "/knowledge/hongkong-folk",
    icon: "scroll",
    description: "一事一问，静心摇签，得签后观诗、释义与行事建议。"
  },
  {
    slug: "zhougong",
    serviceId: "dream-interpretation",
    publicServiceId: "dream-interpretation",
    shopLabel: "解梦商城",
    shopRoute: "/shop/dream",
    title: "周公解梦",
    file: "index_zhougong.html",
    category: "东方玄学",
    knowledgeRoute: "/knowledge/eastern",
    icon: "moon",
    description: "记录梦境关键词，拆解梦象、情绪线索与现实提醒。"
  },
  {
    slug: "zodiac",
    serviceId: "zodiac-forecast",
    publicServiceId: "zodiac",
    aliases: ["zodiac"],
    shopLabel: "生肖商城",
    shopRoute: "/shop/zodiac",
    title: "生肖运势",
    file: "index_zodiac.html",
    category: "东方玄学",
    knowledgeRoute: "/knowledge/eastern",
    icon: "layers",
    description: "生肖流年、每日运程与阶段提醒的沉浸式解读。"
  },
  {
    slug: "fengshui",
    serviceId: "fengshui-compass",
    publicServiceId: "fengshui-luopan",
    aliases: ["fengshui-luopan"],
    shopLabel: "风水商城",
    shopRoute: "/shop/fengshui",
    title: "风水堪舆",
    file: "index_fengshui.html",
    category: "东方玄学",
    knowledgeRoute: "/knowledge/eastern",
    icon: "compass",
    description: "宅运布局、方位罗盘与空间气场建议。"
  },
  {
    slug: "palm",
    serviceId: "palm-reading",
    publicServiceId: "palmistry",
    aliases: ["palmistry"],
    shopLabel: "手相商城",
    shopRoute: "/shop/palmistry",
    title: "手相解读",
    file: "index_palm.html",
    category: "东方玄学",
    knowledgeRoute: "/knowledge/eastern",
    icon: "user",
    description: "通过掌纹、丘位与手型观察状态、优势与提醒。"
  },
  {
    slug: "face",
    serviceId: "face-reading",
    publicServiceId: "face-reading",
    shopLabel: "面相商城",
    shopRoute: "/shop/face-reading",
    title: "面相解读",
    file: "index_mianxiang.html",
    category: "东方玄学",
    knowledgeRoute: "/knowledge/eastern",
    icon: "user",
    description: "从五官、气色与面部结构观察性格与阶段状态。"
  },
  {
    slug: "naming-date",
    serviceId: "naming-date",
    publicServiceId: "naming-date",
    shopLabel: "取名择日商城",
    shopRoute: "/shop/naming-date",
    title: "取名择日",
    file: "index_name_date.html",
    category: "东方玄学",
    knowledgeRoute: "/knowledge/eastern",
    icon: "file",
    description: "结合五行、音义与时机安排姓名和关键日期。"
  }
];

export function getProjectByServiceId(serviceId?: string) {
  return mysticProjects.find(
    (project) =>
      project.serviceId === serviceId ||
      project.publicServiceId === serviceId ||
      project.aliases?.includes(serviceId ?? "")
  );
}

export function isProjectServiceId(project: MysticProject, serviceId?: string) {
  return (
    project.serviceId === serviceId ||
    project.publicServiceId === serviceId ||
    project.aliases?.includes(serviceId ?? "") === true
  );
}

export function getProjectByFile(file?: string) {
  return mysticProjects.find((project) => project.file === file);
}

export function getLiveProjectPath(serviceId: string) {
  const project = getProjectByServiceId(serviceId);

  return `/services/${project?.publicServiceId ?? serviceId}/live`;
}

export function getProjectSource(file: string) {
  const publicBase = import.meta.env.BASE_URL.replace(/\/$/, "");

  return `${publicBase}/mystic-projects/${file}`;
}
