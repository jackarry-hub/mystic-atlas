import { MysticButton } from "./MysticButton";
import type { Order } from "../data/account";

interface OrderListItemProps {
  order: Order;
}

export function OrderListItem({ order }: OrderListItemProps) {
  return (
    <article className="order-list-item">
      <div className="order-list-item__main">
        <span>{order.id}</span>
        <h3>{order.title}</h3>
        <p>{order.description}</p>
      </div>
      <div className="order-list-item__meta">
        <strong>{order.amount}</strong>
        <span className={`status-pill status-pill--${order.tone}`}>
          {order.status}
        </span>
        <MysticButton to={order.detailTo ?? "/account/orders"} variant="text">
          查看详情
        </MysticButton>
      </div>
    </article>
  );
}
