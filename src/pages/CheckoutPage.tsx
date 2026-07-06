import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MysticButton, PageBackground, SectionTitle } from "../components";
import {
  type CheckoutCustomer,
  useCommerce
} from "../context/CommerceContext";
import { formatMoney, getCommerceTotals } from "../lib/commerce";
import { assets } from "../lib/assets";

export function CheckoutPage() {
  const { cartItems, checkoutDraft, startCheckout } = useCommerce();
  const navigate = useNavigate();
  const checkoutItems = checkoutDraft?.items ?? cartItems;
  const totals = useMemo(() => getCommerceTotals(checkoutItems), [checkoutItems]);
  const hasPhysicalItem = checkoutItems.some((item) => item.type === "physical");
  const hasServiceItem = checkoutItems.some((item) => item.type === "service");
  const [customer, setCustomer] = useState<CheckoutCustomer>({
    name: "玄夜旅人",
    phone: "13800000000",
    email: "hello@mysticatlas.test",
    address: "上海市静安区星辉路 88 号",
    schedule: "今晚 20:00 - 22:00"
  });

  const canContinue = customer.name.trim() && customer.phone.trim();

  const updateCustomer = (field: keyof CheckoutCustomer, value: string) => {
    setCustomer((current) => ({
      ...current,
      [field]: value
    }));
  };

  const handlePayment = () => {
    startCheckout(checkoutItems, checkoutDraft?.source ?? "cart");
    navigate("/shop/payment", { state: { customer } });
  };

  return (
    <PageBackground background={assets.backgrounds.productDetail}>
      <section className="commerce-page checkout-page">
        <SectionTitle
          subtitle="确认联系人、服务时间与物流信息，下一步进入模拟支付。"
          title="订单结算"
        />

        {checkoutItems.length === 0 ? (
          <div className="empty-commerce-state">
            <h2>没有可结算的项目</h2>
            <p>请先从商城或服务详情页加入购物车。</p>
            <MysticButton to="/shop">返回商城</MysticButton>
          </div>
        ) : (
          <div className="commerce-layout">
            <div className="checkout-panel">
              <h2>联系人信息</h2>
              <div className="checkout-form-grid">
                <label>
                  <span>姓名</span>
                  <input
                    onChange={(event) => updateCustomer("name", event.target.value)}
                    value={customer.name}
                  />
                </label>
                <label>
                  <span>手机</span>
                  <input
                    onChange={(event) => updateCustomer("phone", event.target.value)}
                    value={customer.phone}
                  />
                </label>
                <label>
                  <span>邮箱</span>
                  <input
                    onChange={(event) => updateCustomer("email", event.target.value)}
                    value={customer.email}
                  />
                </label>
                <label>
                  <span>服务时间偏好</span>
                  <input
                    disabled={!hasServiceItem}
                    onChange={(event) =>
                      updateCustomer("schedule", event.target.value)
                    }
                    value={customer.schedule}
                  />
                </label>
                <label className="checkout-form-grid__wide">
                  <span>收货地址</span>
                  <input
                    disabled={!hasPhysicalItem}
                    onChange={(event) =>
                      updateCustomer("address", event.target.value)
                    }
                    value={customer.address}
                  />
                </label>
              </div>

              <div className="checkout-panel__note">
                <strong>交付说明</strong>
                <p>
                  实物商品支持物流追踪；虚拟商品支付后立即开通；服务预约由顾问在 24 小时内确认。
                </p>
              </div>
            </div>

            <aside className="checkout-summary">
              <h2>本次结算</h2>
              <div className="checkout-mini-list">
                {checkoutItems.map((item) => (
                  <div key={item.id}>
                    <span>{item.name}</span>
                    <strong>
                      {item.quantity} x {formatMoney(item.unitPriceCents)}
                    </strong>
                  </div>
                ))}
              </div>
              <dl>
                <div>
                  <dt>商品小计</dt>
                  <dd>{formatMoney(totals.subtotalCents)}</dd>
                </div>
                <div>
                  <dt>服务处理费</dt>
                  <dd>{formatMoney(totals.serviceFeeCents)}</dd>
                </div>
                <div>
                  <dt>物流费用</dt>
                  <dd>{formatMoney(totals.shippingCents)}</dd>
                </div>
                <div className="checkout-summary__total">
                  <dt>应付合计</dt>
                  <dd>{formatMoney(totals.totalCents)}</dd>
                </div>
              </dl>
              <MysticButton disabled={!canContinue} onClick={handlePayment}>
                提交订单
              </MysticButton>
              <MysticButton to="/shop/cart" variant="text">
                返回购物车
              </MysticButton>
            </aside>
          </div>
        )}
      </section>
    </PageBackground>
  );
}
