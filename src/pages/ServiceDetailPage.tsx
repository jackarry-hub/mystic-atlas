import { useState } from "react";
import { CalendarClock, PlayCircle, ShoppingBag } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  MysticButton,
  MysticCard,
  MysticIcon,
  PageBackground
} from "../components";
import { useCommerce } from "../context/CommerceContext";
import { getServiceById } from "../data/services";
import { commerceItemFromService } from "../lib/commerce";
import { assets } from "../lib/assets";

export function ServiceDetailPage() {
  const { serviceId } = useParams();
  const service = getServiceById(serviceId);
  const { addToCart, startCheckout } = useCommerce();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  if (!service) {
    return <Navigate replace to="/services" />;
  }

  const serviceItem = commerceItemFromService(service);

  const handleAddToCart = () => {
    addToCart(serviceItem, 1);
    setAdded(true);
  };

  const handleBookNow = () => {
    startCheckout([serviceItem], "direct");
    navigate("/shop/checkout");
  };

  return (
    <PageBackground background={assets.backgrounds.services}>
      <section className="service-detail-page">
        <div className="service-detail-page__copy">
          <MysticButton to="/services" variant="text">
            返回服务总览
          </MysticButton>
          <span className="small-label">{service.category}</span>
          <h1>{service.title}</h1>
          <p>{service.description}</p>

          <div className="service-detail-page__facts">
            <div>
              <span>服务价格</span>
              <strong>{service.price}</strong>
            </div>
            <div>
              <span>服务时长</span>
              <strong>{service.duration}</strong>
            </div>
            <div>
              <span>服务形式</span>
              <strong>{service.mode}</strong>
            </div>
          </div>

          <div className="product-detail__actions">
            <MysticButton
              icon={<PlayCircle size={18} strokeWidth={1.35} />}
              to={service.liveTo}
            >
              进入测算
            </MysticButton>
            <MysticButton
              icon={<CalendarClock size={18} strokeWidth={1.35} />}
              onClick={handleBookNow}
              variant="ghost"
            >
              立即预约
            </MysticButton>
            <MysticButton
              icon={<ShoppingBag size={18} strokeWidth={1.35} />}
              onClick={handleAddToCart}
              variant="text"
            >
              {added ? "已加入购物车" : "加入购物车"}
            </MysticButton>
          </div>

          <div className="service-detail-page__links">
            <MysticButton to={service.knowledgeTo} variant="text">
              查看相关知识
            </MysticButton>
            <MysticButton to={service.reportTo} variant="text">
              查看报告示例
            </MysticButton>
          </div>
        </div>

        <aside className="service-detail-page__visual">
          <img alt={`${service.title}主视觉`} src={service.image} />
        </aside>

        <div className="service-detail-page__grid">
          {service.highlights.map((item) => (
            <MysticCard compact key={item}>
              <div className="feature-card__icon">
                <MysticIcon name={service.icon} />
              </div>
              <h3>{item}</h3>
              <p>{service.deliverable}</p>
            </MysticCard>
          ))}
        </div>
      </section>
    </PageBackground>
  );
}
