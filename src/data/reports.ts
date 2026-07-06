import type { IconName } from "../components";

export interface ReportEntry {
  description: string;
  icon: IconName;
  status: string;
  title: string;
  to: string;
}

export interface ReportMetric {
  label: string;
  value: number;
}

export const reportEntries: ReportEntry[] = [
  {
    title: "星盘深度报告",
    description: "本命盘、年度主题、关键相位与行动建议。",
    icon: "sun",
    status: "已生成样例",
    to: "/reports/detail"
  },
  {
    title: "塔罗关系洞察",
    description: "当前关系状态、隐性期待、沟通建议与时间窗口。",
    icon: "sparkles",
    status: "可立即开启",
    to: "/reports/detail"
  },
  {
    title: "八字流年摘要",
    description: "五行结构、年度节奏、事业与财务重点。",
    icon: "circle",
    status: "待补充生日",
    to: "/reports/detail"
  },
  {
    title: "空间能量建议",
    description: "面向居家与办公空间的方位、陈设和清理建议。",
    icon: "compass",
    status: "顾问可预约",
    to: "/reports/detail"
  }
];

export const reportMetrics: ReportMetric[] = [
  { label: "情绪稳定度", value: 78 },
  { label: "行动清晰度", value: 64 },
  { label: "关系协调度", value: 72 },
  { label: "财务节奏感", value: 58 }
];

export const archivedReports = [
  {
    title: "2026 上半年关系复盘",
    type: "已完成",
    date: "2026.06.18",
    description: "沟通模式、关系边界与下一阶段建议。"
  },
  {
    title: "夏至月相冥想记录",
    type: "收藏",
    date: "2026.06.21",
    description: "新月设定、满月释放与睡前情绪记录。"
  },
  {
    title: "年度事业方向报告",
    type: "已完成",
    date: "2026.05.09",
    description: "职业动机、机会窗口和资源整理策略。"
  },
  {
    title: "居家风水罗盘建议",
    type: "已完成",
    date: "2026.04.27",
    description: "书桌、睡眠区和玄关的动线微调建议。"
  }
];
