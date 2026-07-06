import { useMemo, useState } from "react";
import { OrderListItem, PageBackground, SectionTitle } from "../components";
import { useCommerce } from "../context/CommerceContext";
import type { Order } from "../data/account";
import { orders } from "../data/account";
import { assets } from "../lib/assets";

type OrderTab = "全部订单" | "商品订单" | "报告订单" | "服务预约";

const tabs: OrderTab[] = ["全部订单", "商品订单", "报告订单", "服务预约"];

export function OrdersPage() {
  const { orders: commerceOrders } = useCommerce();
  const [activeTab, setActiveTab] = useState<OrderTab>("全部订单");
  const unifiedOrders = useMemo<Order[]>(
    () => [
      ...commerceOrders.map((order) => ({
        id: order.id,
        title: order.title,
        description: order.description,
        category: order.category,
        amount: order.amount,
        status: order.status,
        tone: order.tone,
        detailTo: `/shop/order/${order.id}`
      })),
      ...orders
    ],
    [commerceOrders]
  );
  const visibleOrders = useMemo(
    () =>
      activeTab === "全部订单"
        ? unifiedOrders
        : unifiedOrders.filter((order) => order.category === activeTab),
    [activeTab, unifiedOrders]
  );

  return (
    <PageBackground background={assets.backgrounds.orders}>
      <section className="orders-page">
        <SectionTitle
          subtitle="商品订单、报告订单与虚拟商品开通状态。"
          title="我的订单"
        />
        <div className="segmented-control segmented-control--wide segmented-control--four" role="tablist">
          {tabs.map((tab) => (
            <button
              aria-selected={activeTab === tab}
              className={activeTab === tab ? "is-active" : ""}
              key={tab}
              onClick={() => setActiveTab(tab)}
              role="tab"
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="order-list">
          {visibleOrders.map((order) => (
            <OrderListItem key={order.id} order={order} />
          ))}
        </div>
      </section>
    </PageBackground>
  );
}
