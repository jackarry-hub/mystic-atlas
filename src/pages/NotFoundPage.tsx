import { MysticButton, PageBackground, SectionTitle } from "../components";
import { assets } from "../lib/assets";

export function NotFoundPage() {
  return (
    <PageBackground background={assets.backgrounds.home}>
      <section className="not-found-page">
        <SectionTitle
          align="center"
          subtitle="这条路径暂时没有对应的星图。"
          title="页面未找到"
        />
        <MysticButton to="/">回到首页</MysticButton>
      </section>
    </PageBackground>
  );
}
