import { MysticCard, MysticIcon, PageBackground, SectionTitle } from "../components";
import { accountShortcuts } from "../data/account";
import { assets } from "../lib/assets";

export function AccountPage() {
  return (
    <PageBackground background={assets.backgrounds.account}>
      <section className="account-page">
        <div className="account-hero">
          <div>
            <SectionTitle
              subtitle="会员等级、预约、订单、报告与收藏内容集中管理。"
              title="账户中心概览"
            />
            <MysticCard className="account-summary" interactive={false}>
              <span className="small-label">Starlight Member</span>
              <h2>玄夜旅人</h2>
              <p>当前会员成长值 6,420，距离 Aurum 还需 1,580。</p>
              <div className="progress-track">
                <span style={{ width: "78%" }} />
              </div>
            </MysticCard>
          </div>
          <img alt="账户水晶头像主视觉" src={assets.heroes.accountAvatarCrystal} />
        </div>
        <div className="feature-grid feature-grid--three">
          {accountShortcuts.map((item) => (
            <MysticCard compact key={item.label} to={item.to}>
              <div className="feature-card__icon">
                <MysticIcon name={item.icon} />
              </div>
              <h3>{item.label}</h3>
              <p>{item.description}</p>
            </MysticCard>
          ))}
        </div>
      </section>
    </PageBackground>
  );
}
