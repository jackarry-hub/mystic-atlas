import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from "react";
import {
  type CommerceItem,
  type CommerceTotals,
  formatMoney,
  getCommerceTotals
} from "../lib/commerce";

const STORAGE_KEY = "mystic-atlas-commerce-v1";

export type CheckoutSource = "cart" | "direct";
export type OrderCategory = "商品订单" | "报告订单" | "服务预约";
export type OrderTone = "done" | "pending" | "warn";

export interface CheckoutDraft {
  items: CommerceItem[];
  source: CheckoutSource;
}

export interface CheckoutCustomer {
  address?: string;
  email?: string;
  name: string;
  phone: string;
  schedule?: string;
}

export interface CommerceOrder {
  amount: string;
  category: OrderCategory;
  createdAt: string;
  customer?: CheckoutCustomer;
  description: string;
  id: string;
  items: CommerceItem[];
  paymentMethod: string;
  status: string;
  title: string;
  tone: OrderTone;
  totals: CommerceTotals;
}

export interface AfterSaleRequest {
  createdAt: string;
  id: string;
  orderId: string;
  reason: string;
  status: string;
  type: "退货退款" | "仅退款" | "换货" | "服务改期";
}

interface CommerceState {
  afterSales: AfterSaleRequest[];
  cartItems: CommerceItem[];
  checkoutDraft?: CheckoutDraft;
  orders: CommerceOrder[];
}

interface PlaceOrderPayload {
  customer?: CheckoutCustomer;
  paymentMethod: string;
}

interface CommerceContextValue extends CommerceState {
  addToCart: (item: CommerceItem, quantity?: number) => void;
  afterSaleForOrder: (orderId: string) => AfterSaleRequest | undefined;
  cartCount: number;
  cartTotals: CommerceTotals;
  clearCart: () => void;
  findOrder: (orderId: string) => CommerceOrder | undefined;
  placeOrder: (payload: PlaceOrderPayload) => CommerceOrder | null;
  removeFromCart: (itemId: string) => void;
  requestAfterSale: (
    orderId: string,
    type: AfterSaleRequest["type"],
    reason: string
  ) => AfterSaleRequest | null;
  startCheckout: (items?: CommerceItem[], source?: CheckoutSource) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
}

const CommerceContext = createContext<CommerceContextValue | null>(null);

function cloneItem(item: CommerceItem, quantity = item.quantity): CommerceItem {
  return {
    ...item,
    quantity: Math.max(1, quantity)
  };
}

function loadInitialState(): CommerceState {
  if (typeof window === "undefined") {
    return { afterSales: [], cartItems: [], orders: [] };
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return { afterSales: [], cartItems: [], orders: [] };
    }

    const parsed = JSON.parse(stored) as CommerceState;

    return {
      afterSales: Array.isArray(parsed.afterSales) ? parsed.afterSales : [],
      cartItems: Array.isArray(parsed.cartItems) ? parsed.cartItems : [],
      checkoutDraft: parsed.checkoutDraft,
      orders: Array.isArray(parsed.orders) ? parsed.orders : []
    };
  } catch {
    return { afterSales: [], cartItems: [], orders: [] };
  }
}

function persistState(nextState: CommerceState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

function getOrderCategory(items: CommerceItem[]): OrderCategory {
  if (items.some((item) => item.type === "service")) {
    return "服务预约";
  }

  if (items.some((item) => item.type === "virtual")) {
    return "报告订单";
  }

  return "商品订单";
}

function getOrderStatus(category: OrderCategory) {
  if (category === "服务预约") {
    return "待顾问确认";
  }

  if (category === "报告订单") {
    return "已开通";
  }

  return "待发货";
}

function getOrderTone(category: OrderCategory): OrderTone {
  return category === "商品订单" ? "pending" : "done";
}

function createOrderId() {
  const now = new Date();
  const date = `${String(now.getFullYear()).slice(2)}${String(
    now.getMonth() + 1
  ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const serial = String(now.getTime()).slice(-5);

  return `MA-${date}-${serial}`;
}

export function CommerceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CommerceState>(() => loadInitialState());

  const commitState = useCallback((updater: (current: CommerceState) => CommerceState) => {
    setState((current) => {
      const nextState = updater(current);
      persistState(nextState);
      return nextState;
    });
  }, []);

  const addToCart = useCallback(
    (item: CommerceItem, quantity = item.quantity) => {
      commitState((current) => {
        const existingItem = current.cartItems.find(
          (cartItem) => cartItem.id === item.id
        );
        const nextItem = cloneItem(item, quantity);

        return {
          ...current,
          cartItems: existingItem
            ? current.cartItems.map((cartItem) =>
                cartItem.id === item.id
                  ? {
                      ...cartItem,
                      quantity: cartItem.quantity + Math.max(1, quantity)
                    }
                  : cartItem
              )
            : [...current.cartItems, nextItem]
        };
      });
    },
    [commitState]
  );

  const updateCartQuantity = useCallback(
    (itemId: string, quantity: number) => {
      commitState((current) => ({
        ...current,
        cartItems: current.cartItems.map((item) =>
          item.id === itemId ? cloneItem(item, quantity) : item
        )
      }));
    },
    [commitState]
  );

  const removeFromCart = useCallback(
    (itemId: string) => {
      commitState((current) => ({
        ...current,
        cartItems: current.cartItems.filter((item) => item.id !== itemId)
      }));
    },
    [commitState]
  );

  const clearCart = useCallback(() => {
    commitState((current) => ({
      ...current,
      cartItems: [],
      checkoutDraft: undefined
    }));
  }, [commitState]);

  const startCheckout = useCallback(
    (items?: CommerceItem[], source: CheckoutSource = "cart") => {
      commitState((current) => {
        const checkoutItems = (items ?? current.cartItems).map((item) =>
          cloneItem(item)
        );

        return {
          ...current,
          checkoutDraft:
            checkoutItems.length > 0
              ? {
                  items: checkoutItems,
                  source
                }
              : undefined
        };
      });
    },
    [commitState]
  );

  const placeOrder = useCallback(
    ({ customer, paymentMethod }: PlaceOrderPayload) => {
      const checkoutDraft = state.checkoutDraft;
      const items = checkoutDraft?.items ?? state.cartItems;

      if (items.length === 0) {
        return null;
      }

      const totals = getCommerceTotals(items);
      const category = getOrderCategory(items);
      const order: CommerceOrder = {
        id: createOrderId(),
        title:
          items.length === 1
            ? items[0].name
            : `${items[0].name} 等 ${items.length} 项`,
        description:
          category === "服务预约"
            ? "付款成功，顾问将在 24 小时内确认咨询时间。"
            : category === "报告订单"
              ? "付款成功，数字内容已开通，可在报告中心或账户中心查看。"
              : "付款成功，仓库将开始拣货并更新物流状态。",
        category,
        amount: formatMoney(totals.totalCents),
        status: getOrderStatus(category),
        tone: getOrderTone(category),
        createdAt: new Date().toISOString(),
        customer,
        items: items.map((item) => cloneItem(item)),
        paymentMethod,
        totals
      };

      commitState((current) => ({
        ...current,
        cartItems:
          checkoutDraft?.source === "cart"
            ? []
            : current.cartItems,
        checkoutDraft: undefined,
        orders: [order, ...current.orders]
      }));

      return order;
    },
    [commitState, state.cartItems, state.checkoutDraft]
  );

  const requestAfterSale = useCallback(
    (orderId: string, type: AfterSaleRequest["type"], reason: string) => {
      const orderExists = state.orders.some((order) => order.id === orderId);

      if (!orderExists) {
        return null;
      }

      const request: AfterSaleRequest = {
        id: `AS-${Date.now().toString().slice(-7)}`,
        orderId,
        type,
        reason,
        status: "处理中",
        createdAt: new Date().toISOString()
      };

      commitState((current) => ({
        ...current,
        afterSales: [request, ...current.afterSales]
      }));

      return request;
    },
    [commitState, state.orders]
  );

  const findOrder = useCallback(
    (orderId: string) => state.orders.find((order) => order.id === orderId),
    [state.orders]
  );

  const afterSaleForOrder = useCallback(
    (orderId: string) =>
      state.afterSales.find((request) => request.orderId === orderId),
    [state.afterSales]
  );

  const cartCount = useMemo(
    () => state.cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [state.cartItems]
  );
  const cartTotals = useMemo(
    () => getCommerceTotals(state.cartItems),
    [state.cartItems]
  );

  const value = useMemo<CommerceContextValue>(
    () => ({
      ...state,
      addToCart,
      afterSaleForOrder,
      cartCount,
      cartTotals,
      clearCart,
      findOrder,
      placeOrder,
      removeFromCart,
      requestAfterSale,
      startCheckout,
      updateCartQuantity
    }),
    [
      addToCart,
      afterSaleForOrder,
      cartCount,
      cartTotals,
      clearCart,
      findOrder,
      placeOrder,
      removeFromCart,
      requestAfterSale,
      startCheckout,
      state,
      updateCartQuantity
    ]
  );

  return (
    <CommerceContext.Provider value={value}>
      {children}
    </CommerceContext.Provider>
  );
}

export function useCommerce() {
  const context = useContext(CommerceContext);

  if (!context) {
    throw new Error("useCommerce must be used within CommerceProvider");
  }

  return context;
}
