import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { MysticIcon, PageBackground, SectionTitle } from "../components";
import { useCommerce } from "../context/CommerceContext";
import { useLanguage } from "../context/LanguageContext";
import { featuredProducts } from "../data/products";
import { commerceItemFromProduct } from "../lib/commerce";
import { assets } from "../lib/assets";

const shopMenu = [
  { icon: "gem" as const, labelKey: "shop.menu.amulets" as const },
  { icon: "hexagon" as const, labelKey: "shop.menu.crystals" as const },
  { icon: "sparkles" as const, labelKey: "shop.menu.incense" as const },
  { icon: "landmark" as const, labelKey: "shop.menu.buddha" as const },
  { icon: "scroll" as const, labelKey: "shop.menu.cards" as const },
  { icon: "compass" as const, labelKey: "shop.menu.reports" as const },
  { icon: "book" as const, labelKey: "shop.menu.collectibles" as const }
];

export function ShopPage() {
  const { addToCart } = useCommerce();
  const { localizeProduct, t } = useLanguage();
  const localizedProducts = featuredProducts.map(localizeProduct);
  const heroProducts = localizedProducts.slice(0, 3);
  const lowerProducts = localizedProducts.slice(3, 6);

  return (
    <PageBackground background={assets.backgrounds.shop}>
      <section className="shop-showcase">
        <aside className="shop-showcase__rail">
          <div className="shop-showcase__intro">
            <h1>
              {t("shop.title.top")}
              <br />
              {t("shop.title.bottom")}
            </h1>
            <p>{t("shop.description")}</p>
          </div>
          <nav aria-label={t("shop.aria.categories")} className="shop-menu-list">
            {shopMenu.map((item) => (
              <Link className="shop-menu-list__item" key={item.labelKey} to="/shop/virtual">
                <span className="shop-menu-list__icon">
                  <MysticIcon name={item.icon} />
                </span>
                <span>{t(item.labelKey)}</span>
                <ArrowRight size={20} strokeWidth={1.2} />
              </Link>
            ))}
          </nav>
        </aside>

        <main className="shop-showcase__main">
          <SectionTitle
            className="shop-showcase__title"
            subtitle={t("shop.featuredSubtitle")}
            title={t("shop.featuredTitle")}
          />

          <div className="shop-hero-products">
            {heroProducts.map((product) => (
              <article className="shop-hero-product" key={product.name}>
                <Link className="shop-product-link" to={product.to}>
                  <span className="shop-hero-product__image">
                    <img alt={product.name} src={product.image} />
                  </span>
                  <span className="shop-hero-product__name">{product.name}</span>
                  <span className="shop-hero-product__meta">{product.category}</span>
                  <strong>{product.price.replace("USD ", "$")}</strong>
                </Link>
                <button
                  aria-label={`${t("shop.add")} ${product.name}`}
                  className="quick-cart-button quick-cart-button--floating"
                  onClick={() => addToCart(commerceItemFromProduct(product), 1)}
                  type="button"
                >
                  <ShoppingBag size={16} strokeWidth={1.5} />
                  <span>{t("shop.add")}</span>
                </button>
              </article>
            ))}
          </div>

          <div className="shop-lower-products">
            {lowerProducts.map((product) => (
              <article className="shop-lower-product" key={product.name}>
                <Link className="shop-product-link shop-product-link--lower" to={product.to}>
                  <span className="shop-lower-product__copy">
                    <span>{product.category}</span>
                    <strong>{product.name}</strong>
                    <small>{product.description}</small>
                    <em>{product.price.replace("USD ", "$")}</em>
                  </span>
                  <img alt={product.name} src={product.image} />
                </Link>
                <button
                  aria-label={`${t("shop.add")} ${product.name}`}
                  className="quick-cart-button quick-cart-button--corner"
                  onClick={() => addToCart(commerceItemFromProduct(product), 1)}
                  type="button"
                >
                  <ShoppingBag size={16} strokeWidth={1.5} />
                  <span>{t("shop.add")}</span>
                </button>
              </article>
            ))}
          </div>
        </main>
      </section>
    </PageBackground>
  );
}
