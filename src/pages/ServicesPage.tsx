import { MysticCard, MysticIcon, PageBackground, SectionTitle } from "../components";
import { services } from "../data/services";
import { assets } from "../lib/assets";

export function ServicesPage() {
  return (
    <PageBackground background={assets.backgrounds.services}>
      <section className="split-page split-page--services">
        <div>
          <SectionTitle
            subtitle="多元智慧工具，探寻属于你的答案。"
            title="服务总览"
          />
          <div className="feature-grid feature-grid--three">
            {services.map((service) => (
              <MysticCard compact key={service.title} to={service.liveTo}>
                <div className="feature-card__icon">
                  <MysticIcon name={service.icon} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </MysticCard>
            ))}
          </div>
        </div>
        <aside className="side-hero">
          <img alt="服务水晶主视觉" src={assets.heroes.serviceCrystal} />
        </aside>
      </section>
    </PageBackground>
  );
}
