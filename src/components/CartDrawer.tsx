import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useCommerce } from "../context/CommerceContext";
import { formatMoney } from "../lib/commerce";
import { MysticButton } from "./MysticButton";

interface CartDrawerProps {
  onClose: () => void;
  open: boolean;
}

export function CartDrawer({ onClose, open }: CartDrawerProps) {
  const {
    cartItems,
    cartTotals,
    removeFromCart,
    startCheckout,
    updateCartQuantity
  } = useCommerce();
  const navigate = useNavigate();

  if (!open) {
    return null;
  }

  const handleCheckout = () => {
    startCheckout(undefined, "cart");
    onClose();
    navigate("/shop/checkout");
  };

  return createPortal(
    <aside className="cart-drawer" aria-label="购物车抽屉">
      <button
        aria-label="关闭购物车"
        className="cart-drawer__scrim"
        onClick={onClose}
        type="button"
      />
      <section className="cart-drawer__panel" role="dialog" aria-modal="true">
        <header className="cart-drawer__head">
          <div>
            <span className="small-label">Mystic Cart</span>
            <h2>购物车</h2>
          </div>
          <button
            aria-label="关闭购物车"
            className="cart-drawer__close"
            onClick={onClose}
            type="button"
          >
            <X size={20} strokeWidth={1.4} />
          </button>
        </header>

        {cartItems.length === 0 ? (
          <div className="cart-drawer__empty">
            <ShoppingBag size={30} strokeWidth={1.2} />
            <h3>购物车暂时为空</h3>
            <p>从总商城或主题商城加入商品后，会统一显示在这里。</p>
            <MysticButton onClick={onClose} variant="ghost">
              继续浏览
            </MysticButton>
          </div>
        ) : (
          <>
            <div className="cart-drawer__list">
              {cartItems.map((item) => (
                <article className="cart-drawer__item" key={item.id}>
                  <div className="cart-drawer__media">
                    {item.image ? <img alt={item.name} src={item.image} /> : null}
                  </div>
                  <div className="cart-drawer__copy">
                    <span>{item.category}</span>
                    <h3>{item.name}</h3>
                    <p>{item.fulfillment}</p>
                    <strong>{formatMoney(item.unitPriceCents * item.quantity)}</strong>
                  </div>
                  <div className="cart-drawer__controls">
                    <button
                      aria-label={`减少 ${item.name} 数量`}
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      type="button"
                    >
                      <Minus size={14} />
                    </button>
                    <output>{item.quantity}</output>
                    <button
                      aria-label={`增加 ${item.name} 数量`}
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      type="button"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      aria-label={`移除 ${item.name}`}
                      onClick={() => removeFromCart(item.id)}
                      type="button"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <footer className="cart-drawer__summary">
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
                <div>
                  <dt>合计</dt>
                  <dd>{formatMoney(cartTotals.totalCents)}</dd>
                </div>
              </dl>
              <MysticButton onClick={handleCheckout}>去结算</MysticButton>
            </footer>
          </>
        )}
      </section>
    </aside>,
    document.body
  );
}
