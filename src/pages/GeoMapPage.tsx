import { MysticCard, PageBackground, SectionTitle } from "../components";
import { geoMapRegions } from "../data/knowledge";
import { assets } from "../lib/assets";

const categories = ["信仰源流", "术数系统", "民俗仪式", "护符器物", "疗愈实践"];

export function GeoMapPage() {
  return (
    <PageBackground background={assets.backgrounds.geoMap}>
      <section className="geo-map-page">
        <SectionTitle
          subtitle="用地域线索理解不同文化中的神秘传统。"
          title="地域玄学地图"
        />
        <div className="geo-map-layout">
          <MysticCard className="geo-map-sidebar" interactive={false}>
            {categories.map((category, index) => (
              <button className={index === 0 ? "is-active" : ""} key={category} type="button">
                {category}
              </button>
            ))}
          </MysticCard>
          <div className="geo-map-stage">
            <img alt="世界玄学地图主视觉" src={assets.heroes.geoWorldMap} />
          </div>
          <div className="geo-map-data">
            {geoMapRegions.map((item) => (
              <MysticCard compact key={item.region}>
                <span className="small-label">{item.density}密度</span>
                <h3>{item.region}</h3>
                <p>{item.signal}</p>
                <strong>{item.highlight}</strong>
              </MysticCard>
            ))}
          </div>
        </div>
      </section>
    </PageBackground>
  );
}
