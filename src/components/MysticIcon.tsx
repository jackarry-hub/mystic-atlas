import {
  Archive,
  BookOpen,
  Boxes,
  BriefcaseBusiness,
  CircleDot,
  Compass,
  Crown,
  FileText,
  Gem,
  Globe2,
  Heart,
  Hexagon,
  Home,
  Landmark,
  Layers3,
  ListOrdered,
  Map,
  Menu,
  Moon,
  Package,
  ScrollText,
  Shield,
  ShoppingBag,
  Sparkles,
  Star,
  Sun,
  UserRound,
  WalletCards
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type IconName =
  | "archive"
  | "book"
  | "boxes"
  | "briefcase"
  | "circle"
  | "compass"
  | "crown"
  | "file"
  | "gem"
  | "globe"
  | "heart"
  | "hexagon"
  | "home"
  | "landmark"
  | "layers"
  | "list"
  | "map"
  | "menu"
  | "moon"
  | "package"
  | "scroll"
  | "shield"
  | "shop"
  | "sparkles"
  | "star"
  | "sun"
  | "user"
  | "wallet";

const iconMap: Record<IconName, LucideIcon> = {
  archive: Archive,
  book: BookOpen,
  boxes: Boxes,
  briefcase: BriefcaseBusiness,
  circle: CircleDot,
  compass: Compass,
  crown: Crown,
  file: FileText,
  gem: Gem,
  globe: Globe2,
  heart: Heart,
  hexagon: Hexagon,
  home: Home,
  landmark: Landmark,
  layers: Layers3,
  list: ListOrdered,
  map: Map,
  menu: Menu,
  moon: Moon,
  package: Package,
  scroll: ScrollText,
  shield: Shield,
  shop: ShoppingBag,
  sparkles: Sparkles,
  star: Star,
  sun: Sun,
  user: UserRound,
  wallet: WalletCards
};

interface MysticIconProps {
  name: IconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export function MysticIcon({
  name,
  className,
  size = 22,
  strokeWidth = 1.35
}: MysticIconProps) {
  const Icon = iconMap[name];
  return (
    <Icon
      aria-hidden="true"
      className={className}
      size={size}
      strokeWidth={strokeWidth}
    />
  );
}
