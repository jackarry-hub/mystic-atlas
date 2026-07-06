import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { MysticButton, PageBackground } from "../components";
import { useCommerce } from "../context/CommerceContext";
import { useLanguage } from "../context/LanguageContext";
import { getProductById } from "../data/products";
import { commerceItemFromProduct } from "../lib/commerce";
import { assets } from "../lib/assets";

export function ProductDetailPage() {
  const { productId } = useParams();
  const product = getProductById(productId ?? "crystal-pendant");
  const { addToCart, startCheckout } = useCommerce();
  const { localizeProduct, t } = useLanguage();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) {
    return <Navigate replace to="/shop" />;
  }

  const productCopy = localizeProduct(product);
  const productItem = commerceItemFromProduct(productCopy, quantity);
  const isVirtual = productCopy.type === "virtual";

  const handleAddToCart = () => {
    addToCart(productItem, quantity);
    setAdded(true);
  };

  const handleBuyNow = () => {
    startCheckout([productItem], "direct");
    navigate("/shop/checkout");
  };

  return (
    <PageBackground background={assets.backgrounds.productDetail}>
      <section className="product-detail">
        <div className="product-detail__copy">
          <MysticButton to="/shop" variant="text">
            {t("product.backToShop")}
          </MysticButton>
          <h1>{productCopy.name}</h1>
          <p>{productCopy.description}</p>
          <strong className="product-detail__price">{productCopy.price}</strong>
          <div className="product-detail__sku">
            <span>{productCopy.category}</span>
            <span>{productCopy.sku}</span>
            <span>{productCopy.stockLabel ?? (isVirtual ? t("product.stockVirtual") : t("product.stockPhysical"))}</span>
          </div>
          <div className="quantity-control">
            <span>{t("product.quantity")}</span>
            <div>
              <button
                aria-label={t("product.decrease")}
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                type="button"
              >
                <Minus size={18} />
              </button>
              <output>{quantity}</output>
              <button
                aria-label={t("product.increase")}
                onClick={() => setQuantity((value) => value + 1)}
                type="button"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
          <div className="product-detail__actions">
            <MysticButton icon={<ShoppingBag size={18} />} onClick={handleAddToCart}>
              {added ? t("product.addedToCart") : t("product.addToCart")}
            </MysticButton>
            <MysticButton onClick={handleBuyNow} variant="ghost">
              {t("product.buyNow")}
            </MysticButton>
          </div>
          <button
            className={`favorite-button ${favorite ? "is-active" : ""}`}
            onClick={() => setFavorite((value) => !value)}
            type="button"
          >
            <Heart fill={favorite ? "currentColor" : "none"} size={19} />
            <span>{favorite ? t("product.favorited") : t("product.favorite")}</span>
          </button>
          <div className="product-detail__description">
            <h2>{t("product.intro")}</h2>
            <p>
              {isVirtual
                ? t("product.virtualIntro")
                : t("product.physicalIntro")}
            </p>
            <ul>
              <li>{isVirtual ? t("product.virtualBullet1") : t("product.physicalBullet1")}</li>
              <li>{isVirtual ? t("product.virtualBullet2") : t("product.physicalBullet2")}</li>
              <li>{isVirtual ? t("product.virtualBullet3") : t("product.physicalBullet3")}</li>
              <li>{productCopy.stockLabel ?? t("product.support")}</li>
            </ul>
          </div>
        </div>
        <div className="product-detail__visual">
          <img alt={`${productCopy.name} product`} src={productCopy.image} />
        </div>
      </section>
    </PageBackground>
  );
}
