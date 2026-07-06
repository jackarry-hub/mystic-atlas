import { useMemo, useState } from "react";
import { CreditCard, ShieldCheck, WalletCards } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { MysticButton, PageBackground, SectionTitle } from "../components";
import {
  type CheckoutCustomer,
  useCommerce
} from "../context/CommerceContext";
import { formatMoney, getCommerceTotals } from "../lib/commerce";
import { assets } from "../lib/assets";

const paymentMethods = [
  {
    icon: <WalletCards size={22} strokeWidth={1.35} />,
    label: "Mystic Pay",
    description: "推荐，用账户余额与会员权益完成支付。"
  },
  {
    icon: <CreditCard size={22} strokeWidth={1.35} />,
    label: "银行卡",
    description: "支持 Visa、Mastercard 与本地银行卡。"
  },
  {
    icon: <ShieldCheck size={22} strokeWidth={1.35} />,
    label: "PayPal",
    description: "适合跨境付款，支付结果实时同步。"
  }
];

interface PaymentLocationState {
  customer?: CheckoutCustomer;
}

export function PaymentPage() {
  const { cartItems, checkoutDraft, placeOrder } = useCommerce();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as PaymentLocationState | null;
  const checkoutItems = checkoutDraft?.items ?? cartItems;
  const totals = useMemo(() => getCommerceTotals(checkoutItems), [checkoutItems]);
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].label);
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    window.setTimeout(() => {
      const order = placeOrder({
        customer: locationState?.customer,
        paymentMethod: selectedMethod
      });

      if (order) {
        navigate(`/shop/order/${order.id}`);
      } else {
        navigate("/shop/cart");
      }
    }, 420);
  };

  return (
    <PageBackground background={assets.backgrounds.productDetail}>
      <section className="commerce-page payment-page">
        <SectionTitle
          subtitle="这是前端模拟支付流程，不会产生真实扣款。"
          title="支付订单"
        />

        {checkoutItems.length === 0 ? (
          <div className="empty-commerce-state">
            <h2>订单已失效</h2>
            <p>请重新从购物车提交订单。</p>
            <MysticButton to="/shop/cart">返回购物车</MysticButton>
          </div>
        ) : (
          <div className="commerce-layout">
            <div className="payment-methods">
              {paymentMethods.map((method) => (
                <button
                  className={selectedMethod === method.label ? "is-active" : ""}
                  key={method.label}
                  onClick={() => setSelectedMethod(method.label)}
                  type="button"
                >
                  <span>{method.icon}</span>
                  <strong>{method.label}</strong>
                  <small>{method.description}</small>
                </button>
              ))}
            </div>

            <aside className="checkout-summary">
              <h2>支付金额</h2>
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
              <MysticButton disabled={processing} onClick={handlePay}>
                {processing ? "支付处理中" : `确认支付 ${formatMoney(totals.totalCents)}`}
              </MysticButton>
              <MysticButton to="/shop/checkout" variant="text">
                返回结算
              </MysticButton>
            </aside>
          </div>
        )}
      </section>
    </PageBackground>
  );
}
