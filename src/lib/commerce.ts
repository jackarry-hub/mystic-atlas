import type { Product } from "../data/products";
import type { ServiceItem } from "../data/services";

export type CommerceItemType = "physical" | "virtual" | "service";

export interface CommerceItem {
  category: string;
  description: string;
  fulfillment: string;
  id: string;
  image?: string;
  name: string;
  priceLabel: string;
  quantity: number;
  sku: string;
  to: string;
  type: CommerceItemType;
  unitPriceCents: number;
}

export interface CommerceTotals {
  serviceFeeCents: number;
  shippingCents: number;
  subtotalCents: number;
  totalCents: number;
}

export function parsePriceCents(price: string) {
  const match = price.match(/(\d+(?:\.\d{1,2})?)/);

  if (!match) {
    return 0;
  }

  return Math.round(Number(match[1]) * 100);
}

export function formatMoney(cents: number) {
  return `USD ${(cents / 100).toFixed(2)}`;
}

export function formatShortMoney(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export function isPurchasablePrice(price: string) {
  return parsePriceCents(price) > 0;
}

export function getCommerceTotals(items: CommerceItem[]): CommerceTotals {
  const subtotalCents = items.reduce(
    (sum, item) => sum + item.unitPriceCents * item.quantity,
    0
  );
  const hasPhysicalItem = items.some((item) => item.type === "physical");
  const serviceFeeCents = subtotalCents > 0 ? 300 : 0;
  const shippingCents = hasPhysicalItem && subtotalCents < 25000 ? 1200 : 0;

  return {
    serviceFeeCents,
    shippingCents,
    subtotalCents,
    totalCents: subtotalCents + serviceFeeCents + shippingCents
  };
}

export function commerceItemFromProduct(
  product: Product,
  quantity = 1
): CommerceItem {
  const type: CommerceItemType =
    product.type === "virtual" ? "virtual" : "physical";

  return {
    id: `product:${product.id}`,
    sku: product.sku,
    type,
    name: product.name,
    category: product.category,
    description: product.description,
    image: product.image,
    priceLabel: product.price,
    unitPriceCents: parsePriceCents(product.price),
    quantity,
    to: product.to,
    fulfillment:
      type === "virtual"
        ? "支付后立即开通，可在账户中心查看"
        : "专业包装发货，支持物流追踪与售后"
  };
}

export function commerceItemFromService(
  service: ServiceItem,
  quantity = 1
): CommerceItem {
  return {
    id: `service:${service.id}`,
    sku: service.sku,
    type: "service",
    name: service.title,
    category: "玄学服务",
    description: service.description,
    image: service.image,
    priceLabel: service.price,
    unitPriceCents: parsePriceCents(service.price),
    quantity,
    to: service.to,
    fulfillment: `${service.duration}，${service.deliverable}`
  };
}
