import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MysticButton, PageBackground, SectionTitle } from "../components";
import {
  type AfterSaleRequest,
  useCommerce
} from "../context/CommerceContext";
import { assets } from "../lib/assets";

const afterSaleTypes: AfterSaleRequest["type"][] = [
  "退货退款",
  "仅退款",
  "换货",
  "服务改期"
];

export function AfterSalesPage() {
  const [searchParams] = useSearchParams();
  const { afterSales, orders, requestAfterSale } = useCommerce();
  const queryOrderId = searchParams.get("order");
  const eligibleOrders = orders;
  const [selectedOrderId, setSelectedOrderId] = useState(
    queryOrderId ?? eligibleOrders[0]?.id ?? ""
  );
  const [type, setType] = useState<AfterSaleRequest["type"]>("退货退款");
  const [reason, setReason] = useState("商品或服务与预期不符，希望客服协助处理。");
  const [createdRequestId, setCreatedRequestId] = useState("");

  const selectedOrder = useMemo(
    () => eligibleOrders.find((order) => order.id === selectedOrderId),
    [eligibleOrders, selectedOrderId]
  );

  const handleSubmit = () => {
    if (!selectedOrderId || !reason.trim()) {
      return;
    }

    const request = requestAfterSale(selectedOrderId, type, reason.trim());

    if (request) {
      setCreatedRequestId(request.id);
    }
  };

  return (
    <PageBackground background={assets.backgrounds.orders}>
      <section className="commerce-page after-sales-page">
        <SectionTitle
          subtitle="退款、换货、服务改期与客服处理进度统一管理。"
          title="售后服务"
        />

        <div className="commerce-layout">
          <div className="checkout-panel">
            <h2>发起售后</h2>
            {eligibleOrders.length === 0 ? (
              <div className="empty-commerce-state empty-commerce-state--inline">
                <h3>暂无可售后的订单</h3>
                <p>完成一笔模拟支付后，这里会出现可申请售后的订单。</p>
                <MysticButton to="/shop">前往商城</MysticButton>
              </div>
            ) : (
              <>
                <div className="checkout-form-grid">
                  <label className="checkout-form-grid__wide">
                    <span>选择订单</span>
                    <select
                      onChange={(event) => setSelectedOrderId(event.target.value)}
                      value={selectedOrderId}
                    >
                      {eligibleOrders.map((order) => (
                        <option key={order.id} value={order.id}>
                          {order.id} / {order.title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>售后类型</span>
                    <select
                      onChange={(event) =>
                        setType(event.target.value as AfterSaleRequest["type"])
                      }
                      value={type}
                    >
                      {afterSaleTypes.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>当前状态</span>
                    <input disabled value={selectedOrder?.status ?? "未选择"} />
                  </label>
                  <label className="checkout-form-grid__wide">
                    <span>问题描述</span>
                    <textarea
                      onChange={(event) => setReason(event.target.value)}
                      value={reason}
                    />
                  </label>
                </div>
                <MysticButton onClick={handleSubmit}>提交售后申请</MysticButton>
                {createdRequestId ? (
                  <p className="form-success">售后申请 {createdRequestId} 已创建。</p>
                ) : null}
              </>
            )}
          </div>

          <aside className="checkout-summary">
            <h2>处理进度</h2>
            {afterSales.length === 0 ? (
              <p className="muted-copy">暂无售后记录。</p>
            ) : (
              <div className="after-sale-list">
                {afterSales.map((request) => (
                  <article key={request.id}>
                    <span>{request.id}</span>
                    <strong>{request.type}</strong>
                    <p>{request.reason}</p>
                    <em>{request.status}</em>
                  </article>
                ))}
              </div>
            )}
          </aside>
        </div>
      </section>
    </PageBackground>
  );
}
