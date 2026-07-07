import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Gem,
  Landmark,
  PackageCheck,
  ScrollText,
  ShoppingBag,
  Sparkles,
  X
} from "lucide-react";
import {
  CartDrawer,
  MysticButton,
  MysticIcon,
  PageBackground,
  SectionTitle
} from "../components";
import { useCommerce } from "../context/CommerceContext";
import {
  shopCategories,
  shopProducts,
  type ShopCategory,
  type ShopProduct,
  type ShopProductType
} from "../data/shopProducts";
import { themeShops } from "../data/themeShops";
import type { CommerceItem, CommerceItemType } from "../lib/commerce";
import { assets } from "../lib/assets";

const categoryIcons: Record<ShopCategory, JSX.Element> = {
  护符: <Gem size={22} strokeWidth={1.35} />,
  水晶: <MysticIcon name="hexagon" />,
  香薰: <Sparkles size={22} strokeWidth={1.35} />,
  佛牌: <Landmark size={22} strokeWidth={1.35} />,
  塔罗神谕卡: <ScrollText size={22} strokeWidth={1.35} />,
  数字报告: <MysticIcon name="compass" />,
  宗教收藏: <BookOpen size={22} strokeWidth={1.35} />
};

function formatPrice(product: Pick<ShopProduct, "currency" | "price">) {
  return `${product.currency} ${product.price.toFixed(2)}`;
}

function formatShortPrice(product: Pick<ShopProduct, "price">) {
  return `$${product.price.toFixed(2)}`;
}

function getProductImageClassName(product: Pick<ShopProduct, "image">) {
  return product.image === assets.products.aromaDiffuser
    ? "shop-product-image shop-product-image--scene"
    : "shop-product-image";
}

const productTypeLabels: Record<ShopProductType, string> = {
  physical: "实物",
  virtual: "虚拟报告",
  service: "服务"
};

function commerceItemFromShopProduct(
  product: ShopProduct,
  quantity = 1
): CommerceItem {
  const type: CommerceItemType =
    product.type === "service"
      ? "service"
      : product.type === "virtual"
        ? "virtual"
        : "physical";

  return {
    id: `shop:${product.id}`,
    sku: product.sku,
    type,
    name: product.name,
    category: product.category,
    description: product.shortDescription,
    image: product.image,
    priceLabel: formatPrice(product),
    unitPriceCents: Math.round(product.price * 100),
    quantity,
    to: product.route,
    fulfillment: product.delivery
  };
}

export function ShopPage() {
  const { addToCart, cartCount, startCheckout } = useCommerce();
  const [activeCategory, setActiveCategory] = useState<ShopCategory>("护符");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutConfirmed, setCheckoutConfirmed] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState<ShopProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const highlightedProducts = shopProducts.slice(0, 3);
  const hotProducts = shopProducts.slice(3, 7);
  const virtualReports = shopProducts.filter(
    (product) => product.category === "数字报告"
  );
  const physicalProducts = shopProducts.filter(
    (product) => product.type === "physical"
  );
  const filteredProducts = useMemo(
    () => shopProducts.filter((product) => product.category === activeCategory),
    [activeCategory]
  );
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return shopProducts.filter((product) =>
      [product.name, product.category, product.shortDescription, product.description]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [searchQuery]);

  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }

    const toastTimer = window.setTimeout(() => setToastMessage(null), 2200);

    return () => window.clearTimeout(toastTimer);
  }, [toastMessage]);

  const addProductToCart = (product: ShopProduct, quantity = 1) => {
    addToCart(commerceItemFromShopProduct(product, quantity), quantity);
    setToastMessage(`已加入购物车：${product.name}`);
  };

  const buyProductNow = (product: ShopProduct, quantity = 1) => {
    startCheckout([commerceItemFromShopProduct(product, quantity)], "direct");
    setCheckoutProduct(product);
    setCheckoutConfirmed(false);
    setSelectedProduct(null);
  };

  const confirmCheckout = () => {
    if (!checkoutProduct) {
      return;
    }

    setCheckoutConfirmed(true);
    setToastMessage(`已完成模拟确认：${checkoutProduct.name}`);
  };

  return (
    <PageBackground background={assets.backgrounds.shop}>
      <section className="shop-showcase shop-showcase--market">
        <aside className="shop-showcase__rail shop-market-rail">
          <div className="shop-showcase__intro">
            <span className="small-label">Mystic Atlas Shop</span>
            <h1>
              黑金秘仪
              <br />
              精选商城
            </h1>
            <p>护符、水晶、香薰、佛牌、塔罗神谕卡与数字报告集中陈列。</p>
          </div>

          <nav aria-label="商品分类" className="shop-menu-list shop-menu-list--buttons">
            {shopCategories.map((category) => (
              <button
                className={`shop-menu-list__item ${
                  category === activeCategory ? "is-active" : ""
                }`}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                <span className="shop-menu-list__icon">{categoryIcons[category]}</span>
                <span>{category}</span>
                <ArrowRight size={20} strokeWidth={1.2} />
              </button>
            ))}
          </nav>

          <button
            className="shop-cart-status shop-cart-status--button"
            onClick={() => setCartOpen(true)}
            type="button"
          >
            <span>
              <ShoppingBag size={17} strokeWidth={1.45} />
              购物车
            </span>
            <strong>{cartCount}</strong>
          </button>
        </aside>

        <main className="shop-showcase__main shop-market-main">
          <SectionTitle
            className="shop-showcase__title"
            subtitle="精选器物、数字报告与服务权益，保持 Mystic Atlas 的黑金仪式感。"
            title="总商城精选"
          />

          <div className="shop-market-toolbar">
            <span>{activeCategory}</span>
            <p>{filteredProducts.length} 件商品可浏览</p>
            <label className="shop-search">
              <span>搜索商品</span>
              <input
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="输入商品名或分类"
                type="search"
                value={searchQuery}
              />
            </label>
          </div>

          {searchQuery.trim() ? (
            <ShopShelf
              onAdd={addProductToCart}
              onBuy={buyProductNow}
              onOpen={setSelectedProduct}
              products={searchResults}
              subtitle={
                searchResults.length > 0
                  ? "按商品名、分类和介绍匹配到的结果。"
                  : "暂未找到匹配商品，可以换一个关键词。"
              }
              title="搜索结果"
            />
          ) : null}

          <div className="shop-hero-products shop-hero-products--market">
            {highlightedProducts.map((product) => (
              <ShopHeroProduct
                key={product.id}
                onAdd={() => addProductToCart(product)}
                onBuy={() => buyProductNow(product)}
                onOpen={() => setSelectedProduct(product)}
                product={product}
              />
            ))}
          </div>

          <ShopShelf
            compact
            onAdd={addProductToCart}
            onBuy={buyProductNow}
            onOpen={setSelectedProduct}
            products={hotProducts}
            subtitle="更适合直接下单或加入购物车的高频商品。"
            title="热门商品"
          />

          <ShopShelf
            onAdd={addProductToCart}
            onBuy={buyProductNow}
            onOpen={setSelectedProduct}
            products={virtualReports}
            subtitle="付款后进入账户中心查看或下载。"
            title="虚拟报告"
          />

          <ShopShelf
            onAdd={addProductToCart}
            onBuy={buyProductNow}
            onOpen={setSelectedProduct}
            products={physicalProducts.slice(0, 6)}
            subtitle="实物发货，适合仪式空间、随身佩戴和收藏。"
            title="实物商品"
          />

          <section className="theme-shop-entry" aria-labelledby="theme-shop-entry-title">
            <div>
              <span className="small-label">Explore</span>
              <h2 id="theme-shop-entry-title">探索主题商城</h2>
              <p>小入口跳转到对应主题商城，首页只保留轻量导航。</p>
            </div>
            <div className="theme-shop-entry__grid">
              {themeShops.map((shop) => (
                <Link className="theme-shop-chip" key={shop.slug} to={shop.route}>
                  <span>{shop.title.replace("主题商城", "")}</span>
                  <ArrowRight size={15} strokeWidth={1.3} />
                </Link>
              ))}
            </div>
          </section>

          {selectedProduct ? (
            <ProductDetailModal
              onAdd={() => addProductToCart(selectedProduct)}
              onBuy={() => buyProductNow(selectedProduct)}
              onClose={() => setSelectedProduct(null)}
              product={selectedProduct}
            />
          ) : null}

          {checkoutProduct ? (
            <CheckoutModal
              confirmed={checkoutConfirmed}
              onClose={() => setCheckoutProduct(null)}
              onConfirm={confirmCheckout}
              product={checkoutProduct}
            />
          ) : null}

          {toastMessage ? (
            <div className="shop-toast" role="status">
              {toastMessage}
            </div>
          ) : null}

          <CartDrawer onClose={() => setCartOpen(false)} open={cartOpen} />
        </main>
      </section>
    </PageBackground>
  );
}

interface ShopProductCardProps {
  onAdd: () => void;
  onBuy: () => void;
  onOpen: () => void;
  product: ShopProduct;
}

function ShopHeroProduct({
  onAdd,
  onBuy,
  onOpen,
  product
}: ShopProductCardProps) {
  return (
    <article className="shop-hero-product shop-hero-product--button">
      <button className="shop-product-link" onClick={onOpen} type="button">
        {product.image ? (
          <span className="shop-hero-product__image">
            <img
              alt={product.name}
              className={getProductImageClassName(product)}
              src={product.image}
            />
          </span>
        ) : null}
        <span className="shop-hero-product__name">{product.name}</span>
        <span className="shop-hero-product__meta">{product.category}</span>
        <strong>{formatShortPrice(product)}</strong>
      </button>
      <div className="shop-card-actions shop-card-actions--floating">
        <button
          aria-label={`加入购物车 ${product.name}`}
          className="quick-cart-button"
          onClick={onAdd}
          type="button"
        >
          <ShoppingBag size={16} strokeWidth={1.5} />
          <span>加入购物车</span>
        </button>
        <button className="quick-buy-button" onClick={onBuy} type="button">
          立即购买
        </button>
      </div>
    </article>
  );
}

interface ShopShelfProps {
  compact?: boolean;
  onAdd: (product: ShopProduct) => void;
  onBuy: (product: ShopProduct) => void;
  onOpen: (product: ShopProduct) => void;
  products: readonly ShopProduct[];
  subtitle: string;
  title: string;
}

function ShopShelf({
  compact = false,
  onAdd,
  onBuy,
  onOpen,
  products,
  subtitle,
  title
}: ShopShelfProps) {
  return (
    <section className="shop-shelf">
      <header className="shop-shelf__head">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </header>
      <div className={compact ? "shop-lower-products" : "shop-product-grid"}>
        {products.map((product) => (
          <article
            className={`${compact ? "shop-lower-product" : "shop-market-card"}${
              product.image ? "" : " shop-product-card--text-only"
            }`}
            key={product.id}
          >
            <button
              className={
                compact
                  ? "shop-product-link shop-product-link--lower"
                  : "shop-market-card__open"
              }
              onClick={() => onOpen(product)}
              type="button"
            >
              <span
                className={
                  compact
                    ? "shop-lower-product__copy"
                    : "shop-market-card__copy"
                }
              >
                <span>{product.category}</span>
                <strong>{product.name}</strong>
                <small>{product.shortDescription}</small>
                <em>{formatShortPrice(product)}</em>
              </span>
              {product.image ? (
                <img
                  alt={product.name}
                  className={getProductImageClassName(product)}
                  src={product.image}
                />
              ) : null}
            </button>
            <div className="shop-card-actions">
              <button
                aria-label={`加入购物车 ${product.name}`}
                className="quick-cart-button"
                onClick={() => onAdd(product)}
                type="button"
              >
                <ShoppingBag size={16} strokeWidth={1.5} />
                <span>加入购物车</span>
              </button>
              <button
                className="quick-buy-button"
                onClick={() => onBuy(product)}
                type="button"
              >
                立即购买
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

interface ProductDetailModalProps {
  onAdd: () => void;
  onBuy: () => void;
  onClose: () => void;
  product: ShopProduct;
}

function ProductDetailModal({
  onAdd,
  onBuy,
  onClose,
  product
}: ProductDetailModalProps) {
  const typeLabel = productTypeLabels[product.type];

  return createPortal(
    <div className="product-detail-modal" role="presentation">
      <button
        aria-label="关闭商品详情"
        className="product-detail-modal__scrim"
        onClick={onClose}
        type="button"
      />
      <section
        aria-labelledby="product-detail-modal-title"
        aria-modal="true"
        className={`product-detail-modal__panel${
          product.image ? "" : " product-detail-modal__panel--text-only"
        }`}
        role="dialog"
      >
        <button
          aria-label="关闭商品详情"
          className="product-detail-modal__close"
          onClick={onClose}
          type="button"
        >
          <X size={20} strokeWidth={1.4} />
        </button>
        {product.image ? (
          <div className="product-detail-modal__media">
            <img
              alt={product.name}
              className={getProductImageClassName(product)}
              src={product.image}
            />
          </div>
        ) : null}
        <div className="product-detail-modal__copy">
          <span className="small-label">{product.category}</span>
          <h2 id="product-detail-modal-title">{product.name}</h2>
          <p className="product-detail-modal__lead">{product.shortDescription}</p>
          <strong>{formatPrice(product)}</strong>
          <dl>
            <div>
              <dt>分类</dt>
              <dd>{product.category}</dd>
            </div>
            <div>
              <dt>类型</dt>
              <dd>{typeLabel}</dd>
            </div>
            <div>
              <dt>交付方式</dt>
              <dd>{product.delivery}</dd>
            </div>
            <div>
              <dt>编号</dt>
              <dd>{product.sku}</dd>
            </div>
          </dl>
          <div className="product-detail-modal__section">
            <h3>商品详细介绍</h3>
            <p>{product.description}</p>
          </div>
          <div className="product-detail-modal__section">
            <h3>适合人群</h3>
            <ul className="product-detail-modal__list">
              {product.suitableFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="product-detail-modal__section">
            <h3>包含内容</h3>
            <ul className="product-detail-modal__list">
              {product.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="product-detail-modal__section">
            <h3>注意事项</h3>
            <p>{product.notice}</p>
          </div>
          <div className="product-detail-modal__actions">
            <MysticButton
              icon={<ShoppingBag size={18} strokeWidth={1.45} />}
              onClick={onAdd}
            >
              加入购物车
            </MysticButton>
            <MysticButton onClick={onBuy} variant="ghost">
              立即购买
            </MysticButton>
          </div>
          {product.linkedThemeShop || product.serviceRoute ? (
            <div className="product-detail-modal__links">
              {product.linkedThemeShop ? (
                <MysticButton
                  icon={<ArrowRight size={16} strokeWidth={1.45} />}
                  to={product.linkedThemeShop}
                  variant="text"
                >
                  查看主题商城
                </MysticButton>
              ) : null}
              {product.serviceRoute ? (
                <MysticButton
                  icon={<ArrowRight size={16} strokeWidth={1.45} />}
                  to={product.serviceRoute}
                  variant="text"
                >
                  进入沉浸式体验
                </MysticButton>
              ) : null}
            </div>
          ) : null}
          <PackageCheck className="product-detail-modal__mark" size={54} strokeWidth={1} />
        </div>
      </section>
    </div>,
    document.body
  );
}

interface CheckoutModalProps {
  confirmed: boolean;
  onClose: () => void;
  onConfirm: () => void;
  product: ShopProduct;
}

function CheckoutModal({
  confirmed,
  onClose,
  onConfirm,
  product
}: CheckoutModalProps) {
  return createPortal(
    <div className="checkout-modal" role="presentation">
      <button
        aria-label="关闭模拟结算"
        className="checkout-modal__scrim"
        onClick={onClose}
        type="button"
      />
      <section
        aria-labelledby="checkout-modal-title"
        aria-modal="true"
        className="checkout-modal__panel"
        role="dialog"
      >
        <button
          aria-label="关闭模拟结算"
          className="checkout-modal__close"
          onClick={onClose}
          type="button"
        >
          <X size={20} strokeWidth={1.4} />
        </button>
        <span className="small-label">Checkout Simulation</span>
        <h2 id="checkout-modal-title">确认购买</h2>
        <p>当前为前端模拟确认，不会发起真实支付。</p>
        <dl className="checkout-modal__summary">
          <div>
            <dt>商品名称</dt>
            <dd>{product.name}</dd>
          </div>
          <div>
            <dt>价格</dt>
            <dd>{formatPrice(product)}</dd>
          </div>
          <div>
            <dt>类型</dt>
            <dd>{productTypeLabels[product.type]}</dd>
          </div>
          <div>
            <dt>交付方式</dt>
            <dd>{product.delivery}</dd>
          </div>
        </dl>
        {confirmed ? (
          <div className="checkout-modal__success" role="status">
            <PackageCheck size={20} strokeWidth={1.45} />
            <span>模拟确认已完成，可继续浏览商城。</span>
          </div>
        ) : null}
        <div className="checkout-modal__actions">
          <MysticButton
            disabled={confirmed}
            icon={<PackageCheck size={18} strokeWidth={1.45} />}
            onClick={onConfirm}
          >
            {confirmed ? "已确认" : "确认购买"}
          </MysticButton>
          <MysticButton onClick={onClose} variant="ghost">
            继续浏览
          </MysticButton>
        </div>
      </section>
    </div>,
    document.body
  );
}
