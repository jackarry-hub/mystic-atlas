import type { IconName } from "../components";

export interface AccountShortcut {
  description: string;
  icon: IconName;
  label: string;
  to: string;
}

export interface Order {
  amount: string;
  category: "商品订单" | "报告订单" | "服务预约";
  description: string;
  detailTo?: string;
  id: string;
  status: string;
  title: string;
  tone: "done" | "pending" | "warn";
}

export interface MembershipLevel {
  benefits: string[];
  description: string;
  icon: IconName;
  label: string;
  name: string;
}

export const accountShortcuts: AccountShortcut[] = [
  {
    label: "我的预约",
    description: "查看顾问咨询、仪式课程和待确认时间。",
    icon: "briefcase",
    to: "/account/dashboard"
  },
  {
    label: "我的订单",
    description: "商品订单、报告订单与支付记录集中管理。",
    icon: "shop",
    to: "/account/orders"
  },
  {
    label: "售后服务",
    description: "发起退款、换货、服务改期与进度追踪。",
    icon: "shield",
    to: "/account/after-sales"
  },
  {
    label: "我的报告",
    description: "近期生成、已收藏和历史归档报告。",
    icon: "file",
    to: "/reports"
  },
  {
    label: "收藏内容",
    description: "保存商品、文章、卡片和仪式清单。",
    icon: "heart",
    to: "/reports/archive"
  },
  {
    label: "支付方式",
    description: "管理银行卡、钱包与默认结算方式。",
    icon: "wallet",
    to: "/account"
  },
  {
    label: "账户设置",
    description: "语言、通知、安全和隐私偏好。",
    icon: "user",
    to: "/login"
  }
];

export const orders: Order[] = [
  {
    id: "MA-260704-018",
    title: "星辉守护水晶吊坠",
    description: "限量护符商品订单，预计 48 小时内发出。",
    category: "商品订单",
    amount: "USD 198.00",
    status: "待发货",
    tone: "pending",
    detailTo: "/shop/order/MA-260704-018"
  },
  {
    id: "MA-260702-093",
    title: "星盘深度数字报告",
    description: "报告已生成，可在报告中心查看与分享。",
    category: "报告订单",
    amount: "USD 39.00",
    status: "已完成",
    tone: "done",
    detailTo: "/reports/detail"
  },
  {
    id: "MA-260628-041",
    title: "月相冥想音频",
    description: "虚拟商品已开通，支持重复播放。",
    category: "商品订单",
    amount: "USD 18.00",
    status: "已完成",
    tone: "done",
    detailTo: "/shop/order/MA-260628-041"
  },
  {
    id: "MA-260619-206",
    title: "关系塔罗深度解读",
    description: "顾问确认中，预计今晚前更新排期。",
    category: "服务预约",
    amount: "USD 66.00",
    status: "待确认",
    tone: "warn",
    detailTo: "/services/tarot-reading"
  }
];

export const membershipLevels: MembershipLevel[] = [
  {
    name: "Moon",
    label: "入门会员",
    description: "适合偶尔使用报告和知识库的用户。",
    icon: "moon",
    benefits: ["基础报告折扣", "每月一张神谕卡", "知识库收藏"]
  },
  {
    name: "Starlight",
    label: "当前等级",
    description: "报告、商城与顾问服务的平衡权益。",
    icon: "star",
    benefits: ["深度报告 85 折", "优先生成队列", "会员专属冥想音频"]
  },
  {
    name: "Aurum",
    label: "高阶会员",
    description: "面向长期记录与高频咨询用户。",
    icon: "crown",
    benefits: ["顾问预约优先", "商城限量预售", "季度复盘报告"]
  }
];

export const dashboardStats = [
  { label: "已生成报告", value: "18" },
  { label: "收藏内容", value: "42" },
  { label: "会员成长值", value: "6,420" },
  { label: "预约进行中", value: "2" }
];
