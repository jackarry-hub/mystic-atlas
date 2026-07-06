import { useMemo, useState } from "react";
import { MysticCard, PageBackground, SectionTitle } from "../components";
import { archivedReports } from "../data/reports";
import { assets } from "../lib/assets";

type ArchiveTab = "全部" | "已完成" | "收藏";

const tabs: ArchiveTab[] = ["全部", "已完成", "收藏"];

export function ReportArchivePage() {
  const [activeTab, setActiveTab] = useState<ArchiveTab>("全部");
  const visibleReports = useMemo(
    () =>
      activeTab === "全部"
        ? archivedReports
        : archivedReports.filter((report) => report.type === activeTab),
    [activeTab]
  );

  return (
    <PageBackground background={assets.backgrounds.reportArchive}>
      <section className="archive-page">
        <div className="archive-page__head">
          <SectionTitle
            subtitle="按状态整理已生成、已收藏和历史归档报告。"
            title="历史报告归档"
          />
          <img alt="归档水晶主视觉" src={assets.heroes.archiveCrystal} />
        </div>
        <div className="segmented-control segmented-control--wide" role="tablist">
          {tabs.map((tab) => (
            <button
              aria-selected={activeTab === tab}
              className={activeTab === tab ? "is-active" : ""}
              key={tab}
              onClick={() => setActiveTab(tab)}
              role="tab"
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="archive-list">
          {visibleReports.map((report) => (
            <MysticCard compact key={report.title}>
              <span className="small-label">{report.date}</span>
              <h3>{report.title}</h3>
              <p>{report.description}</p>
              <strong>{report.type}</strong>
            </MysticCard>
          ))}
        </div>
      </section>
    </PageBackground>
  );
}
