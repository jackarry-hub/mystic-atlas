import { ProductCard } from "../components/ProductCard";
import { MysticCard, MysticIcon, PageBackground, SectionTitle } from "../components";
import { hongKongFolkProducts } from "../data/products";
import { topicPages } from "../data/knowledge";

interface KnowledgeTopicPageProps {
  topic: "religions" | "eastern" | "western" | "hongkong";
}

export function KnowledgeTopicPage({ topic }: KnowledgeTopicPageProps) {
  const page = topicPages[topic];

  if (topic === "hongkong") {
    return (
      <PageBackground background={page.background}>
        <section className="folk-page">
          <div className="folk-page__head">
            <div>
              <SectionTitle subtitle={page.subtitle} title={page.title}>
                <p className="section-title__description">{page.description}</p>
              </SectionTitle>
            </div>
            {page.hero ? (
              <div className="folk-page__hero">
                <img alt={`${page.title}主视觉`} src={page.hero} />
              </div>
            ) : null}
          </div>
          <div className="product-grid product-grid--six folk-products">
            {page.items.map((item) => (
              <MysticCard compact key={item.title} to={item.to}>
                <div className="feature-card__icon">
                  <MysticIcon name={item.icon} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </MysticCard>
            ))}
            {hongKongFolkProducts.map((product) => (
              <ProductCard enableCart={false} key={product.name} product={product} />
            ))}
          </div>
        </section>
      </PageBackground>
    );
  }

  if (page.hero) {
    const splitIndex = Math.ceil(page.items.length / 2);
    const leftItems = page.items.slice(0, splitIndex);
    const rightItems = page.items.slice(splitIndex);

    return (
      <PageBackground background={page.background}>
        <section className={`topic-orbit-page topic-orbit-page--${topic}`}>
          <SectionTitle align="center" subtitle={page.subtitle} title={page.title} />
          <div className="topic-orbit-layout">
            <div className="topic-orbit-column">
              {leftItems.map((item) => (
                <MysticCard className="topic-orbit-card" compact key={item.title} to={item.to}>
                  <div className="feature-card__icon">
                    <MysticIcon name={item.icon} />
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <span>→</span>
                  </div>
                </MysticCard>
              ))}
            </div>
            <div className="topic-orbit-hero">
              <img alt={`${page.title}主视觉`} src={page.hero} />
            </div>
            <div className="topic-orbit-column">
              {rightItems.map((item) => (
                <MysticCard className="topic-orbit-card" compact key={item.title} to={item.to}>
                  <div className="feature-card__icon">
                    <MysticIcon name={item.icon} />
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <span>→</span>
                  </div>
                </MysticCard>
              ))}
            </div>
          </div>
        </section>
      </PageBackground>
    );
  }

  return (
    <PageBackground background={page.background}>
      <section className={`topic-page ${page.hero ? "topic-page--with-hero" : ""}`}>
        <div className="topic-page__intro">
          <SectionTitle subtitle={page.subtitle} title={page.title}>
            <p className="section-title__description">{page.description}</p>
          </SectionTitle>
        </div>
        {page.hero ? (
          <div className="topic-page__hero">
            <img alt={`${page.title}主视觉`} src={page.hero} />
          </div>
        ) : null}
        <div className="feature-grid feature-grid--topic">
          {page.items.map((item) => (
            <MysticCard compact key={item.title} to={item.to}>
              <div className="feature-card__icon">
                <MysticIcon name={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </MysticCard>
          ))}
        </div>
      </section>
    </PageBackground>
  );
}
