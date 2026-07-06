import { MysticCard, MysticIcon, PageBackground, SectionTitle } from "../components";
import { knowledgeCards } from "../data/knowledge";
import { assets } from "../lib/assets";

export function KnowledgePage() {
  const leftCards = knowledgeCards.slice(0, 3);
  const rightCards = knowledgeCards.slice(3, 6);

  return (
    <PageBackground background={assets.backgrounds.knowledge}>
      <section className="knowledge-overview">
        <SectionTitle
          align="center"
          subtitle="跨越时空的智慧结晶，探索人类对于宇宙与自我的永恒追问。"
          title="知识概览"
        />
        <div className="knowledge-orbit-layout">
          <div className="knowledge-card-column">
            {leftCards.map((card) => (
              <MysticCard className="knowledge-overview-card" compact key={card.title} to={card.to}>
                <div className="feature-card__icon">
                  <MysticIcon name={card.icon} />
                </div>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <span>→</span>
                </div>
              </MysticCard>
            ))}
          </div>
          <div className="knowledge-overview__hero">
            <img alt="知识书本与水晶主视觉" src={assets.heroes.knowledgeBookCrystal} />
          </div>
          <div className="knowledge-card-column">
            {rightCards.map((card) => (
              <MysticCard className="knowledge-overview-card" compact key={card.title} to={card.to}>
                <div className="feature-card__icon">
                  <MysticIcon name={card.icon} />
                </div>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
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
