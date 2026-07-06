import { Link, useParams } from "react-router-dom";
import { MysticButton, PageBackground, SectionTitle } from "../components";
import { useCommerce } from "../context/CommerceContext";
import { orders as mockOrders } from "../data/account";
import { formatMoney } from "../lib/commerce";
import { assets } from "../lib/assets";

export function OrderDetailPage() {
  const { orderId } = useParams();
  const { afterSaleForOrder, findOrder } = useCommerce();
  const commerceOrder = orderId ? findOrder(orderId) : undefined;
  const mockOrder = mockOrders.find((order) => order.id === orderId);
  const afterSale = commerceOrder ? afterSaleForOrder(commerceOrder.id) : undefined;
  const title = commerceOrder?.title ?? mockOrder?.title ?? "订单不存在";

  return (
    <PageBackground background={assets.backgrounds.orders}>
      <section className="commerce-page order-detail-page">
        <SectionTitle
          subtitle="订单状态、支付信息、交付进度与售后入口。"
          title="订单详情"
        />

        {!commerceOrder && !mockOrder ? (
          <div className="empty-commerce-state">
            <h2>没有找到这笔订单</h2>
            <p>请回到订单中心查看最新订单列表。</p>
            <MysticButton to="/account/orders">返回订单中心</MysticButton>
          </div>
        ) : (
          <div className="order-detail-layout">
            <article className="order-detail-main">
              <span className="small-label">{orderId}</span>
              <h2>{title}</h2>
              <p>{commerceOrder?.description ?? mockOrder?.description}</p>

              {commerceOrder ? (
                <div className="order-item-table">
                  {commerceOrder.items.map((item) => (
                    <Link key={item.id} to={item.to}>
                      <span className="order-item-table__media">
                        {item.image ? <img alt={item.name} src={item.image} /> : null}
                      </span>
                      <span>
                        <strong>{item.name}</strong>
                        <small>{item.fulfillment}</small>
                      </span>
                      <em>
                        {item.quantity} x {formatMoney(item.unitPriceCents)}
                      </em>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="checkout-panel__note">
                  <strong>历史订单</strong>
                  <p>这笔订单来自初始示例数据，可在订单中心查看状态。新下单的订单会展示完整明细。</p>
                </div>
              )}
            </article>

            <aside className="checkout-summary">
              <h2>订单状态</h2>
              <span className={`status-pill status-pill--${commerceOrder?.tone ?? mockOrder?.tone}`}>
                {commerceOrder?.status ?? mockOrder?.status}
              </span>
              <dl>
                <div>
                  <dt>订单类型</dt>
                  <dd>{commerceOrder?.category ?? mockOrder?.category}</dd>
                </div>
                <div>
                  <dt>支付方式</dt>
                  <dd>{commerceOrder?.paymentMethod ?? "示例订单"}</dd>
                </div>
                <div className="checkout-summary__total">
                  <dt>实付金额</dt>
                  <dd>{commerceOrder?.amount ?? mockOrder?.amount}</dd>
                </div>
              </dl>
              {afterSale ? (
                <div className="after-sale-chip">
                  <strong>{afterSale.type}</strong>
                  <span>{afterSale.status}</span>
                </div>
              ) : null}
              {commerceOrder ? (
                <MysticButton to={`/account/after-sales?order=${commerceOrder.id}`}>
                  申请售后
                </MysticButton>
              ) : (
                <MysticButton to="/account/orders">返回订单</MysticButton>
              )}
              <MysticButton to="/shop" variant="text">
                继续选购
              </MysticButton>
            </aside>
          </div>
        )}
      </section>
    </PageBackground>
  );
}
