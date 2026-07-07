import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Globe2, Menu, ShoppingBag, UserRound } from "lucide-react";
import { useCommerce } from "../context/CommerceContext";
import { useLanguage } from "../context/LanguageContext";
import { selectableLanguages, type LanguageCode } from "../lib/i18n";
import { BottomNav } from "./BottomNav";
import { CartDrawer } from "./CartDrawer";
import { SideMenu } from "./SideMenu";

export function AppShell() {
  const { cartCount } = useCommerce();
  const { currentLanguage, language, setLanguage, t } = useLanguage();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [languageSwitchRevision, setLanguageSwitchRevision] = useState(0);
  const location = useLocation();
  const showBottomNav = [
    "/",
    "/knowledge/eastern",
    "/knowledge/western",
    "/knowledge/hongkong-folk"
  ].includes(location.pathname);

  useEffect(() => {
    setMenuOpen(false);
    setLanguageOpen(false);
    setCartOpen(false);
  }, [location.pathname]);

  const forceLanguageChange = (nextLanguage: LanguageCode) => {
    const nextLanguageMeta = selectableLanguages.find(
      (item) => item.code === nextLanguage
    );

    window.localStorage.setItem("mystic-atlas-language", nextLanguage);

    if (nextLanguageMeta) {
      document.documentElement.lang = nextLanguageMeta.htmlLang;
    }

    document.documentElement.dataset.lang = nextLanguage;
    setLanguage(nextLanguage);
    setLanguageOpen(false);
    setLanguageSwitchRevision((current) => current + 1);

    window.dispatchEvent(
      new CustomEvent("mystic-atlas-language-change", {
        detail: { language: nextLanguage }
      })
    );

    window.setTimeout(() => {
      document.querySelectorAll<HTMLIFrameElement>("iframe").forEach((iframe) => {
        try {
          const frameDocument = iframe.contentDocument;
          const frameWindow = iframe.contentWindow;

          if (!frameDocument || !frameWindow) {
            return;
          }

          frameDocument.documentElement.dataset.lang = nextLanguage;

          if (nextLanguageMeta) {
            frameDocument.documentElement.lang = nextLanguageMeta.htmlLang;
          }

          const FrameCustomEvent =
            (frameWindow as unknown as { CustomEvent?: typeof CustomEvent }).CustomEvent ??
            CustomEvent;

          frameWindow.localStorage.setItem("mystic-atlas-language", nextLanguage);
          frameWindow.dispatchEvent(
            new FrameCustomEvent("mystic-atlas-language-change", {
              detail: { language: nextLanguage }
            })
          );
        } catch {
          // Cross-document language sync is best-effort.
        }
      });
    }, 0);
  };

  return (
    <div className="app-shell">
      <header
        className="top-nav"
        data-language-managed="react"
        key={`${language}-${languageSwitchRevision}`}
      >
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
          <button
            className="top-nav__cart top-nav__cart-button"
            onClick={() => setCartOpen(true)}
            type="button"
          >
            <ShoppingBag size={18} strokeWidth={1.35} />
            <span>{t("nav.cart")}</span>
            {cartCount > 0 ? <em>{cartCount}</em> : null}
          </button>
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
                    onClick={() => forceLanguageChange(item.code)}
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
      <CartDrawer onClose={() => setCartOpen(false)} open={cartOpen} />
      {showBottomNav ? <BottomNav /> : null}
    </div>
  );
}
