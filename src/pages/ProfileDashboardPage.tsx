import { MysticCard, PageBackground, SectionTitle } from "../components";
import { dashboardStats } from "../data/account";
import { assets } from "../lib/assets";

export function ProfileDashboardPage() {
  return (
    <PageBackground background={assets.backgrounds.profileDashboard}>
      <section className="profile-dashboard">
        <div className="profile-dashboard__identity">
          <img alt="个人头像主视觉" src={assets.heroes.profileAvatar} />
          <div>
            <SectionTitle
              subtitle="你的报告、收藏、预约与会员权益总览。"
              title="个人中心仪表盘"
            />
            <p>
              最近一次报告指出，你的行动节奏正在从整理期进入推进期，建议保留每周一次复盘。
            </p>
          </div>
        </div>
        <div className="stats-grid">
          {dashboardStats.map((stat) => (
            <MysticCard compact key={stat.label}>
              <span className="small-label">{stat.label}</span>
              <strong>{stat.value}</strong>
            </MysticCard>
          ))}
        </div>
        <MysticCard className="benefit-panel" interactive={false}>
          <div>
            <span className="small-label">会员权益素材</span>
            <h2>本月可领取：水晶冥想与深度报告折扣</h2>
            <p>权益会随成长值解锁，当前已开放虚拟报告折扣、音频内容与预约优先。</p>
          </div>
          <img alt="权益水晶簇素材" src={assets.heroes.profileCrystalCluster} />
        </MysticCard>
      </section>
    </PageBackground>
  );
}
