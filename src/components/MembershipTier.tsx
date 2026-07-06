import { MysticIcon } from "./MysticIcon";
import { MysticCard } from "./MysticCard";
import type { MembershipLevel } from "../data/account";

interface MembershipTierProps {
  active?: boolean;
  tier: MembershipLevel;
}

export function MembershipTier({ active = false, tier }: MembershipTierProps) {
  return (
    <MysticCard className={`membership-tier ${active ? "is-active" : ""}`}>
      <div className="membership-tier__head">
        <MysticIcon name={tier.icon} />
        <div>
          <span>{tier.label}</span>
          <h3>{tier.name}</h3>
        </div>
      </div>
      <p>{tier.description}</p>
      <ul>
        {tier.benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>
    </MysticCard>
  );
}
