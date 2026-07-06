import { useMemo, useState } from "react";
import { PageBackground, ProductCard, SectionTitle } from "../components";
import { useLanguage } from "../context/LanguageContext";
import { virtualProducts } from "../data/products";
import { assets } from "../lib/assets";

const categories = [
  { id: "all", labelKey: "virtual.category.all", category: null },
  { id: "reports", labelKey: "virtual.category.reports", category: virtualProducts[0]?.category },
  { id: "talismans", labelKey: "virtual.category.talismans", category: virtualProducts[1]?.category },
  { id: "audio", labelKey: "virtual.category.audio", category: virtualProducts[2]?.category },
  { id: "membership", labelKey: "virtual.category.membership", category: virtualProducts[3]?.category },
  { id: "courses", labelKey: "virtual.category.courses", category: virtualProducts[4]?.category }
] as const;

type CategoryId = (typeof categories)[number]["id"];

export function VirtualShopPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const selectedCategory = categories.find((category) => category.id === activeCategory) ?? categories[0];
  const visibleProducts = useMemo(
    () =>
      selectedCategory.category == null
        ? virtualProducts
        : virtualProducts.filter((product) => product.category === selectedCategory.category),
    [selectedCategory]
  );

  return (
    <PageBackground background={assets.backgrounds.virtualShop}>
      <section className="virtual-shop-page">
        <div className="virtual-shop-page__head">
          <SectionTitle subtitle={t("virtual.subtitle")} title={t("virtual.title")} />
          <img alt={t("virtual.alt")} src={assets.heroes.shopCrystalPlatform} />
        </div>
        <div className="virtual-shop-toolbar">
          {categories.map((item) => (
            <button
              className={activeCategory === item.id ? "is-active" : ""}
              key={item.id}
              onClick={() => setActiveCategory(item.id)}
              type="button"
            >
              {t(item.labelKey)}
            </button>
          ))}
        </div>
        <div className="product-grid product-grid--virtual">
          {visibleProducts.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </section>
    </PageBackground>
  );
}
