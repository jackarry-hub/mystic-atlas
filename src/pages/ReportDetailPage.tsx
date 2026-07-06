import { useState } from "react";
import { Download, Share2, Sparkles } from "lucide-react";
import { MysticButton, MysticCard, PageBackground, SectionTitle } from "../components";
import { reportMetrics } from "../data/reports";
import { assets } from "../lib/assets";

export function ReportDetailPage() {
  const [notice, setNotice] = useState("报告已加载");

  return (
    <PageBackground background={assets.backgrounds.reportDetail}>
      <section className="report-detail-page">
        <div>
          <SectionTitle
            subtitle="星盘图、指标进度与深度解读入口。"
            title="专属报告详情"
          />
          <MysticCard className="report-panel" interactive={false}>
            <span className="small-label">当前状态：{notice}</span>
            <h2>星辉周期报告</h2>
            <p>
              近期主题集中在关系边界、资源分配与行动节奏。建议先完成一轮七日记录，
              再进入深度解读。
            </p>
            <div className="metric-list">
              {reportMetrics.map((metric) => (
                <div className="metric-row" key={metric.label}>
                  <div>
                    <span>{metric.label}</span>
                    <strong>{metric.value}%</strong>
                  </div>
                  <div className="progress-track">
                    <span style={{ width: `${metric.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="button-row">
              <MysticButton
                icon={<Download size={18} />}
                onClick={() => setNotice("已保存到报告中心")}
              >
                保存报告
              </MysticButton>
              <MysticButton
                icon={<Share2 size={18} />}
                onClick={() => setNotice("分享链接已生成")}
                variant="ghost"
              >
                分享报告
              </MysticButton>
              <MysticButton icon={<Sparkles size={18} />} to="/shop/virtual" variant="text">
                购买深度解读
              </MysticButton>
            </div>
          </MysticCard>
        </div>
        <div className="report-astrolabe">
          <img alt="星盘报告主视觉" src={assets.heroes.reportZodiacAstrolabe} />
        </div>
      </section>
    </PageBackground>
  );
}
