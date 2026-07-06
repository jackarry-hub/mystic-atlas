import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Globe2, Menu, ShoppingBag, UserRound } from "lucide-react";
import { useCommerce } from "../context/CommerceContext";
import { useLanguage } from "../context/LanguageContext";
import { selectableLanguages } from "../lib/i18n";
import { BottomNav } from "./BottomNav";
import { SideMenu } from "./SideMenu";

export function AppShell() {
  const { cartCount } = useCommerce();
  const { currentLanguage, language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const location = useLocation();
  const showBottomNav = [
    "/",
    "/knowledge/eastern",
    "/knowledge/western",
    "/knowledge/hongkong-folk",
    "/knowledge/geo-map"
  ].includes(location.pathname);

  useEffect(() => {
    setMenuOpen(false);
    setLanguageOpen(false);
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <header className="top-nav">
        <div className="top-nav__brand">
          <button
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            className="top-nav__menu"
            onClick={() => setMenuOpen((current) => !current)}
            type="button"
          >
            <Menu size={28} strokeWidth={1.25} />
          </button>
          <span className="top-nav__divider" />
          <NavLink className="top-nav__logo" to="/">
            Mystic Atlas
          </NavLink>
        </div>
        <nav aria-label="Mystic Atlas" className="top-nav__links">
          <NavLink to="/">{t("nav.home")}</NavLink>
          <NavLink to="/shop">{t("nav.shop")}</NavLink>
          <NavLink className="top-nav__cart" to="/shop/cart">
            <ShoppingBag size={18} strokeWidth={1.35} />
            <span>{t("nav.cart")}</span>
            {cartCount > 0 ? <em>{cartCount}</em> : null}
          </NavLink>
          <div className="language-menu">
            <button
              aria-expanded={languageOpen}
              aria-haspopup="menu"
              className="top-nav__link-button"
              onClick={() => setLanguageOpen((current) => !current)}
              type="button"
            >
              <Globe2 size={18} strokeWidth={1.35} />
              <span>{t("nav.language")} {currentLanguage.short}</span>
            </button>
            {languageOpen ? (
              <div
                aria-label={t("nav.languageSelect")}
                className="language-menu__panel"
                role="menu"
              >
                {selectableLanguages.map((item) => (
                  <button
                    className={`language-menu__option${
                      item.code === language ? " is-active" : ""
                    }`}
                    key={item.code}
                    onClick={() => {
                      setLanguage(item.code);
                      setLanguageOpen(false);
                    }}
                    role="menuitem"
                    type="button"
                  >
                    <span>{item.label}</span>
                    <em>{item.short}</em>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <NavLink to="/account">
            <UserRound size={18} strokeWidth={1.35} />
            <span>{t("nav.mine")}</span>
          </NavLink>
        </nav>
      </header>
      <SideMenu onClose={() => setMenuOpen(false)} open={menuOpen} />
      <Outlet />
      {showBottomNav ? <BottomNav /> : null}
    </div>
  );
}
