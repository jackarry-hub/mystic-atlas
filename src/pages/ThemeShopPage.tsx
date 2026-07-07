import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  PackageCheck,
  ShoppingBag,
  Sparkles,
  X
} from "lucide-react";
import { createPortal } from "react-dom";
import { CartDrawer, MysticButton } from "../components";
import { useCommerce } from "../context/CommerceContext";
import {
  getThemeShopBySlug,
  type ThemeShopProduct,
  type ThemeShopProductType
} from "../data/themeShops";
import type { CommerceItem, CommerceItemType } from "../lib/commerce";
import { mapImagePointToCoverContainer } from "../lib/themeHotspots";

const themeProductTypeLabels: Record<ThemeShopProductType, string> = {
  physical: "实物",
  service: "服务",
  virtual: "虚拟报告"
};

function formatThemePrice(product: Pick<ThemeShopProduct, "currency" | "price">) {
  return `${product.currency} ${product.price.toFixed(2)}`;
}

function commerceItemFromThemeProduct(
  product: ThemeShopProduct,
  shopRoute: string,
  background: string,
  quantity = 1
): CommerceItem {
  const type: CommerceItemType =
    product.type === "service"
      ? "service"
      : product.type === "virtual"
        ? "virtual"
        : "physical";

  return {
    id: `theme-shop:${product.id}`,
    sku: `THEME-${product.id.toUpperCase()}`,
    type,
    name: product.name,
    category: product.category,
    description: product.shortDescription,
    image: background,
    priceLabel: formatThemePrice(product),
    unitPriceCents: Math.round(product.price * 100),
    quantity,
    to: shopRoute,
    fulfillment: product.delivery
  };
}

export function ThemeShopPage() {
  const { slug } = useParams();
  const shop = getThemeShopBySlug(slug);
  const { addToCart, cartCount, startCheckout } = useCommerce();
  const sceneRef = useRef<HTMLElement | null>(null);
  const sceneImageRef = useRef<HTMLImageElement | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState<ThemeShopProduct | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [sceneMetrics, setSceneMetrics] = useState({
    containerWidth: 0,
    containerHeight: 0,
    imageWidth: 1672,
    imageHeight: 941
  });

  const products = shop?.products ?? [];
  const selectedProduct =
    selectedProductId === null
      ? null
      : products.find((product) => product.id === selectedProductId) ?? null;

  useEffect(() => {
    setSelectedProductId(null);
  }, [slug]);

  const refreshSceneMetrics = useCallback(() => {
    const scene = sceneRef.current;
    const image = sceneImageRef.current;

    if (!scene) {
      return;
    }

    const rect = scene.getBoundingClientRect();
    const nextMetrics = {
      containerWidth: rect.width,
      containerHeight: rect.height,
      imageWidth: image?.naturalWidth || 1672,
      imageHeight: image?.naturalHeight || 941
    };

    setSceneMetrics((currentMetrics) =>
      currentMetrics.containerWidth === nextMetrics.containerWidth &&
      currentMetrics.containerHeight === nextMetrics.containerHeight &&
      currentMetrics.imageWidth === nextMetrics.imageWidth &&
      currentMetrics.imageHeight === nextMetrics.imageHeight
        ? currentMetrics
        : nextMetrics
    );
  }, []);

  useEffect(() => {
    refreshSceneMetrics();

    const scene = sceneRef.current;
    if (!scene) {
      return undefined;
    }

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(refreshSceneMetrics);

    resizeObserver?.observe(scene);
    window.addEventListener("resize", refreshSceneMetrics);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", refreshSceneMetrics);
    };
  }, [refreshSceneMetrics, shop?.background]);

  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }

    const toastTimer = window.setTimeout(() => setToastMessage(null), 2200);

    return () => window.clearTimeout(toastTimer);
  }, [toastMessage]);

  if (!shop) {
    return <Navigate replace to="/shop" />;
  }

  const addThemeProductToCart = (product: ThemeShopProduct) => {
    addToCart(
      commerceItemFromThemeProduct(product, shop.route, shop.background),
      1
    );
    setToastMessage(`已加入购物车：${product.name}`);
  };

  const buyThemeProductNow = (product: ThemeShopProduct) => {
    startCheckout(
      [commerceItemFromThemeProduct(product, shop.route, shop.background)],
      "direct"
    );
    setCheckoutProduct(product);
  };

  return (
    <main
      className={`theme-shop-page theme-shop-page--${shop.theme}`}
      style={{ "--theme-shop-bg": `url(${shop.background})` } as CSSProperties}
    >
      <header className="theme-shop-hero">
        <div className="theme-shop-hero__copy" aria-hidden="true">
          <span className="small-label">Mystic Atlas Theme Shop</span>
          <h1>{shop.title}</h1>
          <p>{shop.subtitle}</p>
        </div>
        <div className="theme-shop-hero__actions">
          <MysticButton
            icon={<ArrowLeft size={18} strokeWidth={1.45} />}
            to={shop.serviceRoute}
            variant="ghost"
          >
            返回{shop.title.replace("商城", "体验")}
          </MysticButton>
          <button
            className="theme-shop-cart-button"
            onClick={() => setCartOpen(true)}
            type="button"
          >
            <ShoppingBag size={18} strokeWidth={1.45} />
            <span>购物车</span>
            <em>{cartCount}</em>
          </button>
        </div>
      </header>

      <section className="theme-shop-layout">
        <section
          className="theme-shop-scene"
          ref={sceneRef}
          aria-label={`${shop.title} 商品热点`}
        >
          <img
            alt={`${shop.title} 场景底图`}
            onLoad={refreshSceneMetrics}
            ref={sceneImageRef}
            src={shop.background}
          />
          <div className="theme-shop-scene__shade" />
          {products.map((product) => {
            const hotspotPosition =
              sceneMetrics.containerWidth > 0 && sceneMetrics.containerHeight > 0
                ? mapImagePointToCoverContainer({
                    ...sceneMetrics,
                    x: product.x,
                    y: product.y
                  })
                : null;
            const hotspotStyle =
              hotspotPosition === null
                ? ({ left: `${product.x}%`, top: `${product.y}%` } as CSSProperties)
                : ({
                    left: `${hotspotPosition.left}px`,
                    pointerEvents: hotspotPosition.visible ? undefined : "none",
                    top: `${hotspotPosition.top}px`,
                    visibility: hotspotPosition.visible ? undefined : "hidden"
                  } as CSSProperties);

            return (
              <button
                className={`scene-hotspot${
                  product.id === selectedProductId ? " is-active" : ""
                }`}
                key={product.id}
                onClick={() => setSelectedProductId(product.id)}
                style={hotspotStyle}
                tabIndex={hotspotPosition?.visible === false ? -1 : undefined}
                type="button"
              >
                <span className="scene-hotspot__dot" />
                <span className="scene-hotspot__label">
                  <strong>{product.name}</strong>
                  <em>{formatThemePrice(product)}</em>
                </span>
              </button>
            );
          })}
        </section>

        {selectedProduct ? (
          <ProductDetailPanel
            onAdd={() => addThemeProductToCart(selectedProduct)}
            onBuy={() => buyThemeProductNow(selectedProduct)}
            onClose={() => setSelectedProductId(null)}
            product={selectedProduct}
            serviceRoute={shop.serviceRoute}
          />
        ) : null}
      </section>

      <CartDrawer onClose={() => setCartOpen(false)} open={cartOpen} />

      {checkoutProduct ? (
        <ThemeCheckoutModal
          onClose={() => setCheckoutProduct(null)}
          product={checkoutProduct}
        />
      ) : null}

      {toastMessage ? (
        <div className="shop-toast" role="status">
          {toastMessage}
        </div>
      ) : null}
    </main>
  );
}

interface ProductDetailPanelProps {
  onAdd: () => void;
  onBuy: () => void;
  onClose: () => void;
  product: ThemeShopProduct;
  serviceRoute: string;
}

function ProductDetailPanel({
  onAdd,
  onBuy,
  onClose,
  product,
  serviceRoute
}: ProductDetailPanelProps) {
  return (
    <aside className="theme-product-panel">
      <button
        aria-label="关闭商品详情"
        className="theme-product-panel__close"
        onClick={onClose}
        type="button"
      >
        <X size={18} strokeWidth={1.45} />
      </button>
      <span className="small-label">{product.category}</span>
      <h2>{product.name}</h2>
      <strong>{formatThemePrice(product)}</strong>
      <p>{product.shortDescription}</p>
      <dl>
        <div>
          <dt>类型</dt>
          <dd>{themeProductTypeLabels[product.type]}</dd>
        </div>
        <div>
          <dt>交付方式</dt>
          <dd>{product.delivery}</dd>
        </div>
      </dl>
      <section>
        <h3>商品介绍</h3>
        <p>{product.description}</p>
      </section>
      <section>
        <h3>适合人群</h3>
        <ul>
          {product.suitableFor.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3>包含内容</h3>
        <ul>
          {product.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3>注意事项</h3>
        <p>{product.notice}</p>
      </section>
      <div className="theme-product-panel__actions">
        <MysticButton
          icon={<ShoppingBag size={18} strokeWidth={1.45} />}
          onClick={onAdd}
        >
          加入购物车
        </MysticButton>
        <MysticButton
          icon={<CreditCard size={18} strokeWidth={1.45} />}
          onClick={onBuy}
          variant="ghost"
        >
          立即购买
        </MysticButton>
        <MysticButton
          icon={<Sparkles size={18} strokeWidth={1.45} />}
          to={serviceRoute}
          variant="text"
        >
          返回沉浸式体验
        </MysticButton>
      </div>
    </aside>
  );
}

interface ThemeCheckoutModalProps {
  onClose: () => void;
  product: ThemeShopProduct;
}

function ThemeCheckoutModal({ onClose, product }: ThemeCheckoutModalProps) {
  const [confirmed, setConfirmed] = useState(false);

  return createPortal(
    <div className="checkout-modal" role="presentation">
      <button
        aria-label="关闭模拟结算"
        className="checkout-modal__scrim"
        onClick={onClose}
        type="button"
      />
      <section
        aria-labelledby="theme-checkout-title"
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
        <h2 id="theme-checkout-title">确认下单</h2>
        <p>当前为前端模拟确认，不会发起真实支付。</p>
        <dl className="checkout-modal__summary">
          <div>
            <dt>商品名称</dt>
            <dd>{product.name}</dd>
          </div>
          <div>
            <dt>商品价格</dt>
            <dd>{formatThemePrice(product)}</dd>
          </div>
          <div>
            <dt>商品类型</dt>
            <dd>{themeProductTypeLabels[product.type]}</dd>
          </div>
          <div>
            <dt>交付方式</dt>
            <dd>{product.delivery}</dd>
          </div>
          <div>
            <dt>注意事项</dt>
            <dd>{product.notice}</dd>
          </div>
        </dl>
        {confirmed ? (
          <div className="checkout-modal__success" role="status">
            <PackageCheck size={20} strokeWidth={1.45} />
            <span>模拟订单已确认。</span>
          </div>
        ) : null}
        <div className="checkout-modal__actions">
          <MysticButton
            disabled={confirmed}
            icon={<PackageCheck size={18} strokeWidth={1.45} />}
            onClick={() => setConfirmed(true)}
          >
            {confirmed ? "已确认" : "确认下单"}
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
