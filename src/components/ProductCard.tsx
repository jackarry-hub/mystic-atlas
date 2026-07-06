import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { MysticCard } from "./MysticCard";
import type { Product } from "../data/products";
import { useCommerce } from "../context/CommerceContext";
import { useLanguage } from "../context/LanguageContext";
import { commerceItemFromProduct, isPurchasablePrice } from "../lib/commerce";

interface ProductCardProps {
  enableCart?: boolean;
  product: Product;
}

export function ProductCard({ enableCart = true, product }: ProductCardProps) {
  const { addToCart } = useCommerce();
  const { localizeProduct, t } = useLanguage();
  const productCopy = localizeProduct(product);
  const canPurchase =
    enableCart && productCopy.type !== "display" && isPurchasablePrice(productCopy.price);

  return (
    <MysticCard className="product-card">
      <Link className="product-card__link" to={productCopy.to}>
        <div className="product-card__media">
          <img alt={productCopy.name} src={productCopy.image} />
        </div>
        <div className="product-card__body">
          <span>{productCopy.category}</span>
          <h3>{productCopy.name}</h3>
          <p>{productCopy.description}</p>
        </div>
      </Link>
      <div className="product-card__footer">
        <strong>{productCopy.price}</strong>
        {canPurchase ? (
          <button
            aria-label={`${t("shop.add")} ${productCopy.name}`}
            className="quick-cart-button"
            onClick={() => addToCart(commerceItemFromProduct(productCopy), 1)}
            type="button"
          >
            <ShoppingBag size={16} strokeWidth={1.5} />
            <span>{t("shop.add")}</span>
          </button>
        ) : (
          <Link className="text-link" to={productCopy.to}>{t("shop.view")}</Link>
        )}
      </div>
    </MysticCard>
  );
}
