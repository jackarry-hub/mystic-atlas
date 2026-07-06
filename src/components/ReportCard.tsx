import { MysticIcon } from "./MysticIcon";
import { MysticCard } from "./MysticCard";
import type { ReportEntry } from "../data/reports";

interface ReportCardProps {
  report: ReportEntry;
}

export function ReportCard({ report }: ReportCardProps) {
  return (
    <MysticCard className="report-card" to={report.to}>
      <div className="report-card__head">
        <div className="report-card__icon">
          <MysticIcon name={report.icon} />
        </div>
        <span className="report-card__status">{report.status}</span>
      </div>
      <div className="report-card__body">
        <h3>{report.title}</h3>
        <p>{report.description}</p>
      </div>
      <span className="report-card__action">进入</span>
    </MysticCard>
  );
}
