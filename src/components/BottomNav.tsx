import { NavLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { MysticIcon, type IconName } from "./MysticIcon";

const bottomItems: Array<{
  icon: IconName;
  labelKey: "bottom.online" | "bottom.reports" | "bottom.shop" | "bottom.knowledge";
  to: string;
}> = [
  { icon: "compass", labelKey: "bottom.online", to: "/services" },
  { icon: "file", labelKey: "bottom.reports", to: "/reports" },
  { icon: "shop", labelKey: "bottom.shop", to: "/shop" },
  { icon: "globe", labelKey: "bottom.knowledge", to: "/knowledge" }
];

export function BottomNav() {
  const { t } = useLanguage();

  return (
    <nav aria-label="底部主导航" className="bottom-nav">
      {bottomItems.map((item) => (
        <NavLink key={item.to} to={item.to}>
          <MysticIcon name={item.icon} />
          <span>{t(item.labelKey)}</span>
        </NavLink>
      ))}
    </nav>
  );
}
