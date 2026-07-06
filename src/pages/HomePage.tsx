import { ArrowRight, Compass } from "lucide-react";
import { MysticButton, PageBackground } from "../components";
import { useLanguage } from "../context/LanguageContext";
import { assets } from "../lib/assets";

export function HomePage() {
  const { t } = useLanguage();

  return (
    <PageBackground background={assets.backgrounds.home} className="home-page">
      <section className="hero-layout">
        <div className="hero-copy">
          <h1>{t("home.title")}</h1>
          <p>{t("home.subtitle")}</p>
          <div className="hero-actions">
            <MysticButton icon={<Compass size={18} />} to="/services">
              {t("home.start")}
            </MysticButton>
            <MysticButton icon={<ArrowRight size={18} />} to="/services" variant="text">
              {t("home.browse")}
            </MysticButton>
          </div>
        </div>
        <div className="hero-visual hero-visual--large">
          <img alt={t("home.alt")} src={assets.heroes.homeAstrolabe} />
        </div>
      </section>
    </PageBackground>
  );
}
