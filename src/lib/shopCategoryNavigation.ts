export function getProductsForCategory<T extends { category: string }>(
  products: readonly T[],
  category: string
) {
  return products.filter((product) => product.category === category);
}
