import { NavLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { MysticIcon, type IconName } from "./MysticIcon";

const menuItems: Array<{
  icon: IconName;
  labelKey:
    | "side.home"
    | "side.services"
    | "side.knowledge"
    | "side.reports"
    | "side.shop"
    | "side.cart"
    | "side.afterSales"
    | "side.mine";
  to: string;
}> = [
  { icon: "home", labelKey: "side.home", to: "/" },
  { icon: "sparkles", labelKey: "side.services", to: "/services" },
  { icon: "book", labelKey: "side.knowledge", to: "/knowledge" },
  { icon: "file", labelKey: "side.reports", to: "/reports" },
  { icon: "shop", labelKey: "side.shop", to: "/shop" },
  { icon: "package", labelKey: "side.cart", to: "/shop/cart" },
  { icon: "shield", labelKey: "side.afterSales", to: "/account/after-sales" },
  { icon: "user", labelKey: "side.mine", to: "/account" }
];

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

export function SideMenu({ open, onClose }: SideMenuProps) {
  const { t } = useLanguage();

  return (
    <>
      <div
        aria-hidden="true"
        className={`side-menu-scrim ${open ? "is-open" : ""}`}
        onClick={onClose}
      />
      <aside
        aria-label={t("side.aria")}
        className={`side-menu ${open ? "is-open" : ""}`}
      >
        <div className="side-menu__header">
          <span className="side-menu__mark">MA</span>
          <div>
            <strong>Mystic Atlas</strong>
            <small>{t("side.tagline")}</small>
          </div>
        </div>
        <nav className="side-menu__nav">
          {menuItems.map((item) => (
            <NavLink key={item.to} onClick={onClose} to={item.to}>
              <MysticIcon name={item.icon} />
              <span>{t(item.labelKey)}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
