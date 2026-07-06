import { Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MysticButton, PageBackground, SectionTitle } from "../components";
import { useCommerce } from "../context/CommerceContext";
import { formatMoney } from "../lib/commerce";
import { assets } from "../lib/assets";

export function CartPage() {
  const {
    cartItems,
    cartTotals,
    removeFromCart,
    startCheckout,
    updateCartQuantity
  } = useCommerce();
  const navigate = useNavigate();

  const handleCheckout = () => {
    startCheckout(undefined, "cart");
    navigate("/shop/checkout");
  };

  return (
    <PageBackground background={assets.backgrounds.shop}>
      <section className="commerce-page cart-page">
        <SectionTitle
          subtitle="确认商品、服务与虚拟内容，统一进入安全结算。"
          title="购物车"
        />

        {cartItems.length === 0 ? (
          <div className="empty-commerce-state">
            <h2>购物车暂时为空</h2>
            <p>你可以从商城挑选护符器物，也可以把玄学服务加入预约清单。</p>
            <div className="commerce-actions">
              <MysticButton to="/shop">前往商城</MysticButton>
              <MysticButton to="/services" variant="ghost">
                浏览服务
              </MysticButton>
            </div>
          </div>
        ) : (
          <div className="commerce-layout">
            <div className="cart-line-list">
              {cartItems.map((item) => (
                <article className="cart-line-item" key={item.id}>
                  <div className="cart-line-item__media">
                    {item.image ? <img alt={item.name} src={item.image} /> : null}
                  </div>
                  <div className="cart-line-item__copy">
                    <span>{item.category}</span>
                    <h3>{item.name}</h3>
                    <p>{item.fulfillment}</p>
                    <small>{item.sku}</small>
                  </div>
                  <div className="cart-line-item__controls">
                    <div className="quantity-control quantity-control--compact">
                      <button
                        aria-label={`减少 ${item.name} 数量`}
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        type="button"
                      >
                        <Minus size={15} />
                      </button>
                      <output>{item.quantity}</output>
                      <button
                        aria-label={`增加 ${item.name} 数量`}
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        type="button"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                    <strong>{formatMoney(item.unitPriceCents * item.quantity)}</strong>
                    <button
                      aria-label={`移除 ${item.name}`}
                      className="icon-action"
                      onClick={() => removeFromCart(item.id)}
                      type="button"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="checkout-summary">
              <h2>订单摘要</h2>
              <dl>
                <div>
                  <dt>商品小计</dt>
                  <dd>{formatMoney(cartTotals.subtotalCents)}</dd>
                </div>
                <div>
                  <dt>服务处理费</dt>
                  <dd>{formatMoney(cartTotals.serviceFeeCents)}</dd>
                </div>
                <div>
                  <dt>物流费用</dt>
                  <dd>{formatMoney(cartTotals.shippingCents)}</dd>
                </div>
                <div className="checkout-summary__total">
                  <dt>应付合计</dt>
                  <dd>{formatMoney(cartTotals.totalCents)}</dd>
                </div>
              </dl>
              <MysticButton onClick={handleCheckout}>去结算</MysticButton>
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
