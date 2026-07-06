import { PageBackground, ReportCard, SectionTitle } from "../components";
import { reportEntries } from "../data/reports";
import { assets } from "../lib/assets";

export function ReportsPage() {
  return (
    <PageBackground background={assets.backgrounds.reports}>
      <section className="split-page reports-page">
        <div>
          <SectionTitle
            subtitle="将星盘、塔罗、八字与空间建议沉淀为可保存的个人档案。"
            title="报告中心总览"
          />
          <div className="report-grid">
            {reportEntries.map((report) => (
              <ReportCard key={report.title} report={report} />
            ))}
          </div>
        </div>
        <aside className="side-hero">
          <img alt="报告书本主视觉" src={assets.heroes.reportBook} />
        </aside>
      </section>
    </PageBackground>
  );
}
