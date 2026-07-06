import { MembershipTier, MysticCard, PageBackground, SectionTitle } from "../components";
import { membershipLevels } from "../data/account";
import { assets } from "../lib/assets";

export function MembershipPage() {
  return (
    <PageBackground background={assets.backgrounds.membership}>
      <section className="membership-page">
        <div className="membership-page__head">
          <div>
            <SectionTitle
              subtitle="成长值、等级路线与会员权益。"
              title="会员等级"
            />
            <MysticCard className="membership-current" interactive={false}>
              <span className="small-label">当前等级 Starlight</span>
              <h2>成长值 6,420 / 8,000</h2>
              <div className="progress-track">
                <span style={{ width: "80%" }} />
              </div>
            </MysticCard>
          </div>
          <img alt="会员等级徽章主视觉" src={assets.heroes.membershipBadge} />
        </div>
        <div className="membership-route">
          {membershipLevels.map((tier, index) => (
            <MembershipTier active={index === 1} key={tier.name} tier={tier} />
          ))}
        </div>
      </section>
    </PageBackground>
  );
}
