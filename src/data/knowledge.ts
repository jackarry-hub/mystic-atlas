import type { IconName } from "../components";
import { assets } from "../lib/assets";

export interface KnowledgeCard {
  description: string;
  icon: IconName;
  title: string;
  to: string;
}

export interface TopicItem {
  description: string;
  icon: IconName;
  title: string;
  to?: string;
}

export interface TopicPageData {
  background: string;
  description: string;
  hero?: string;
  items: TopicItem[];
  subtitle: string;
  title: string;
}

export const knowledgeCards: KnowledgeCard[] = [
  {
    title: "世界七大宗教",
    description: "以历史、仪式、象征与信仰结构建立跨文化视角。",
    icon: "landmark",
    to: "/knowledge/religions"
  },
  {
    title: "东方玄学",
    description: "八字、六爻、紫微、风水与相术的系统化入口。",
    icon: "circle",
    to: "/knowledge/eastern"
  },
  {
    title: "西方神秘学",
    description: "塔罗、占星、炼金术、月相与神圣几何的谱系。",
    icon: "compass",
    to: "/knowledge/western"
  },
  {
    title: "香港非遗民俗",
    description: "黄大仙灵签、车公转运、打小人与节庆仪式。",
    icon: "scroll",
    to: "/knowledge/hongkong-folk"
  },
  {
    title: "地域玄学地图",
    description: "以地域、信仰源流和实践场景组织世界民俗知识。",
    icon: "map",
    to: "/knowledge/geo-map"
  },
  {
    title: "玄学百科",
    description: "术语、仪式、符号和工具的可检索知识索引。",
    icon: "book",
    to: "/knowledge"
  }
];

export const topicPages: Record<string, TopicPageData> = {
  religions: {
    title: "世界七大宗教",
    subtitle: "信仰、仪式与文明记忆",
    description: "从核心观念、经典传统、仪式空间与生活伦理理解宗教系统。",
    background: assets.backgrounds.religions,
    items: [
      {
        title: "佛教",
        description: "以觉悟、缘起与修行为核心，重视慈悲与智慧的实践。",
        icon: "landmark"
      },
      {
        title: "基督教",
        description: "围绕救赎、爱与共同体展开，形成丰富的礼仪传统。",
        icon: "shield"
      },
      {
        title: "伊斯兰教",
        description: "以信仰、功修与共同体秩序构成完整的生活方式。",
        icon: "moon"
      },
      {
        title: "印度教",
        description: "融合神话、仪式、哲学与瑜伽传统的多层体系。",
        icon: "sparkles"
      },
      {
        title: "犹太教",
        description: "以经典、律法、节期与族群记忆维系信仰传承。",
        icon: "star"
      },
      {
        title: "道教",
        description: "关注道、气、修真、符箓与人与自然的协调。",
        icon: "circle"
      },
      {
        title: "民间信仰",
        description: "来自地方生活、祖先崇拜、守护神与节庆仪式。",
        icon: "home"
      }
    ]
  },
  eastern: {
    title: "东方玄学",
    subtitle: "天时、地利与人的秩序",
    description: "用传统术数语言观察时间、空间、姓名、相貌与人生选择。",
    background: assets.backgrounds.eastern,
    hero: assets.heroes.easternYinyang,
    items: [
      {
        title: "八字",
        description: "用出生年月日时推演五行结构、格局与流年节奏。",
        icon: "circle",
        to: "/services/bazi-chart/live"
      },
      {
        title: "六爻",
        description: "以起卦、爻象、动变回应具体问题与短期判断。",
        icon: "list",
        to: "/services/liuyao/live"
      },
      {
        title: "紫微斗数",
        description: "通过命盘宫位与星曜组合观察人生主线。",
        icon: "star",
        to: "/services/ziwei-doushu/live"
      },
      {
        title: "风水罗盘",
        description: "以方位、形势和气场组织空间建议。",
        icon: "compass",
        to: "/services/fengshui-compass/live"
      },
      {
        title: "取名择日",
        description: "结合五行、音义与时机安排关键命名和仪式节点。",
        icon: "file",
        to: "/services/naming-date/live"
      },
      {
        title: "手相解读",
        description: "从掌纹、丘位与手型观察状态、优势与提醒。",
        icon: "user",
        to: "/services/palm-reading/live"
      },
      {
        title: "面相解读",
        description: "从形貌、纹理与气色观察个性与状态。",
        icon: "user",
        to: "/services/face-reading/live"
      },
      {
        title: "周公解梦",
        description: "记录梦境关键词，拆解梦象、情绪线索与现实提醒。",
        icon: "moon",
        to: "/services/dream-interpretation/live"
      },
      {
        title: "生肖运势",
        description: "结合流年、月份与人际场域提供节奏参考。",
        icon: "layers",
        to: "/services/zodiac-forecast/live"
      }
    ]
  },
  western: {
    title: "西方神秘学",
    subtitle: "星体、符号与内在炼金",
    description: "以象征语言理解人格原型、周期、仪式和精神传统。",
    background: assets.backgrounds.western,
    hero: assets.heroes.westernCompass,
    items: [
      {
        title: "塔罗",
        description: "用大阿尔卡那与小阿尔卡那组织叙事、选择和洞察。",
        icon: "sparkles",
        to: "/services/tarot-reading/live"
      },
      {
        title: "炼金术",
        description: "将物质转化隐喻为心灵整合和自我完善。",
        icon: "gem"
      },
      {
        title: "月相",
        description: "以新月、满月与盈亏节奏安排复盘和行动。",
        icon: "moon"
      },
      {
        title: "占星术",
        description: "从行星、宫位、相位理解人格和阶段主题。",
        icon: "sun",
        to: "/services/natal-astrology/live"
      },
      {
        title: "神圣几何",
        description: "以比例、形体和图案象征宇宙秩序。",
        icon: "hexagon"
      },
      {
        title: "神谕传统",
        description: "从神谕卡、梦境与象征讯息建立个人指引。",
        icon: "scroll"
      }
    ]
  },
  hongkong: {
    title: "香港非遗民俗",
    subtitle: "城市里的香火、签文与转运仪式",
    description: "把香港民俗仪式放回庙宇、街区和日常生活的真实语境。",
    background: assets.backgrounds.hongKongFolk,
    hero: assets.heroes.hongKongIncense,
    items: [
      {
        title: "黄大仙灵签",
        description: "以签诗、典故与解签传统回应现实疑问。",
        icon: "scroll",
        to: "/services/spiritual-lots/live"
      },
      {
        title: "车公转运",
        description: "围绕风车、祈福与新年转运形成的地方仪式。",
        icon: "compass"
      },
      {
        title: "打小人",
        description: "以民俗方式表达驱厄、化解口舌与心理释放。",
        icon: "shield"
      },
      {
        title: "太岁守护",
        description: "在流年系统中理解犯太岁、摄太岁与守护仪轨。",
        icon: "crown"
      },
      {
        title: "民间仪式",
        description: "香火、供奉、祈愿与还愿构成社区信仰网络。",
        icon: "landmark"
      },
      {
        title: "节庆风俗",
        description: "从农历节日、庙会与巡游观察城市民俗记忆。",
        icon: "sparkles"
      }
    ]
  }
};

export const geoMapRegions = [
  {
    region: "东亚",
    signal: "术数、祖先信仰、庙宇仪式",
    density: "高",
    highlight: "八字、风水、灵签"
  },
  {
    region: "南亚",
    signal: "吠陀、瑜伽、占星传统",
    density: "高",
    highlight: "印度教仪式、吠陀占星"
  },
  {
    region: "中东",
    signal: "一神信仰、经典传统、历法",
    density: "中",
    highlight: "犹太、伊斯兰文化符号"
  },
  {
    region: "欧洲",
    signal: "炼金术、塔罗、占星复兴",
    density: "中高",
    highlight: "神秘学社群、仪式魔法"
  },
  {
    region: "美洲",
    signal: "新灵性、原住民传统融合",
    density: "中",
    highlight: "能量疗愈、神谕卡"
  }
];
