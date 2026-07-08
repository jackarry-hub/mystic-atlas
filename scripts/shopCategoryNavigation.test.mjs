import assert from "node:assert/strict";
import { getProductsForCategory } from "../src/lib/shopCategoryNavigation.ts";

const products = [
  { id: "a", category: "护符" },
  { id: "b", category: "水晶" },
  { id: "c", category: "护符" }
];

assert.deepEqual(getProductsForCategory(products, "护符"), [
  { id: "a", category: "护符" },
  { id: "c", category: "护符" }
]);

assert.deepEqual(getProductsForCategory(products, "塔罗神谕卡"), []);
