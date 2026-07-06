import { useCallback, useMemo, useRef, useState } from "react";
import { Globe2, Home, LogIn, Menu, ShoppingBag, Store, UserRound, X } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  getLiveProjectPath,
  getProjectByFile,
  getProjectByServiceId,
  getProjectSource
} from "../data/mysticProjects";
import { languages } from "../lib/i18n";

export function ProjectHostPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { currentLanguage, language, setLanguage, t } = useLanguage();
  const [dockOpen, setDockOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const project = getProjectByServiceId(serviceId);
  const projectSrc = useMemo(
    () => (project ? getProjectSource(project.file) : ""),
    [project]
  );

  const prepareProjectDocument = useCallback(() => {
    const frameWindow = iframeRef.current?.contentWindow;
    const frameDocument = iframeRef.current?.contentDocument;

    if (!frameWindow || !frameDocument) {
      return;
    }

    let viewport = frameDocument.querySelector<HTMLMetaElement>('meta[name="viewport"]');

    if (!viewport) {
      viewport = frameDocument.createElement("meta");
      viewport.name = "viewport";
      frameDocument.head.prepend(viewport);
    }

    viewport.content = "width=device-width, initial-scale=1.0, viewport-fit=cover";

    const dockOffset = frameWindow.innerWidth <= 760 ? "96px" : "126px";
    const existingStyle = frameDocument.getElementById("main-site-dock-align");
    const style = existingStyle ?? frameDocument.createElement("style");
    style.id = "main-site-dock-align";
    style.textContent = `
      #topbar,
      header[data-ui],
      header.topbar,
      header.home-ui,
      .topbar {
        padding-left: ${dockOffset} !important;
      }

      html,
      body {
        max-width: 100vw !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) #topbar,
      html[data-lang]:not([data-lang="zh-Hans"]) #topnav,
      html[data-lang]:not([data-lang="zh-Hans"]) header[data-ui],
      html[data-lang]:not([data-lang="zh-Hans"]) header.topbar,
      html[data-lang]:not([data-lang="zh-Hans"]) header.home-ui,
      html[data-lang]:not([data-lang="zh-Hans"]) .topbar {
        gap: 12px !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) #navTitle {
        display: none !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) .navside {
        gap: clamp(8px, 1.4vw, 22px) !important;
        min-width: 0 !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) .navlink,
      html[data-lang]:not([data-lang="zh-Hans"]) #projBtn,
      html[data-lang]:not([data-lang="zh-Hans"]) .project-btn,
      html[data-lang]:not([data-lang="zh-Hans"]) .pm-it {
        letter-spacing: .08em !important;
      }

      @media (max-width: 760px) {
        html,
        body {
          width: 100% !important;
          min-width: 0 !important;
          max-width: 100vw !important;
          overflow-x: hidden !important;
        }

        body {
          touch-action: pan-y manipulation;
        }

        #topbar,
        #topnav,
        header[data-ui],
        header.topbar,
        header.home-ui,
        .topbar {
          width: 100% !important;
          min-width: 0 !important;
          min-height: 70px !important;
          height: auto !important;
          display: grid !important;
          grid-template-columns: minmax(96px, auto) 1fr !important;
          align-items: center !important;
          gap: 8px !important;
          padding-left: 96px !important;
          padding-right: 12px !important;
          overflow-x: auto !important;
          overflow-y: visible !important;
        }

        #projBtn,
        .project-btn,
        #project {
          width: min(172px, calc(100vw - 116px)) !important;
          max-width: calc(100vw - 116px) !important;
          height: 38px !important;
          min-width: 0 !important;
          padding-left: 10px !important;
          padding-right: 10px !important;
          font-size: 12px !important;
          letter-spacing: .08em !important;
        }

        #projMenu,
        .project-menu {
          width: min(238px, calc(100vw - 24px)) !important;
          max-width: calc(100vw - 24px) !important;
          max-height: 62vh !important;
          overflow: auto !important;
        }

        #navTitle {
          min-width: 0 !important;
          max-width: 100% !important;
          text-indent: 0 !important;
          white-space: normal !important;
          overflow-wrap: anywhere !important;
          letter-spacing: .12em !important;
          font-size: clamp(24px, 8vw, 34px) !important;
          line-height: 1.15 !important;
        }

        .navside {
          min-width: 0 !important;
          justify-content: flex-start !important;
          gap: 14px !important;
          overflow-x: auto !important;
        }

        .navlink {
          flex: 0 0 auto !important;
          white-space: nowrap !important;
          font-size: 13px !important;
          letter-spacing: .1em !important;
        }

        .navIcons {
          justify-content: flex-start !important;
          gap: 8px !important;
        }

        .navico {
          width: 38px !important;
          height: 38px !important;
        }

        #home {
          position: relative !important;
          inset: auto !important;
          width: 100% !important;
          min-height: 100svh !important;
          display: grid !important;
          grid-template-columns: 1fr !important;
          align-items: start !important;
          gap: 14px !important;
          padding: 96px 14px 34px !important;
          overflow: visible !important;
        }

        #leftcol,
        #rightcol,
        #stepsPanel,
        #centerPanel,
        #stepPanel,
        #todayPanel,
        #bottomBar,
        .side-rail,
        .steps-card,
        .right-stack,
        .daily,
        .today-tip,
        #ritualDock {
          position: relative !important;
          inset: auto !important;
          left: auto !important;
          right: auto !important;
          top: auto !important;
          bottom: auto !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          margin: 0 !important;
          align-self: stretch !important;
        }

        [data-ui],
        .pnl,
        .panel,
        .feature,
        .mi,
        .result-section,
        .analysis,
        .camera-panel,
        .select-card {
          max-width: 100% !important;
          min-width: 0 !important;
        }

        .layer,
        #readingLayer,
        #resultLayer,
        #captureLayer,
        #selectLayer,
        #introLayer,
        #drawLayer,
        #burstLayer,
        #castingStage {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          overflow: auto !important;
        }

        #rdInner,
        .result-grid,
        .analysis-grid,
        .reading-grid,
        .choice-grid,
        .chips,
        #spreads {
          width: 100% !important;
          max-width: 100% !important;
        }

        .choice-grid,
        .chips,
        #spreads {
          overflow-x: auto !important;
          scrollbar-width: none;
        }

        img,
        video,
        canvas,
        svg {
          max-width: 100%;
        }
      }
    `;

    if (!existingStyle) {
      frameDocument.head.appendChild(style);
    }

    const projectControl = frameDocument.querySelector<HTMLElement>("#projBtn, #project");

    if (projectControl) {
      const position = frameWindow.getComputedStyle(projectControl).position;

      if (position === "absolute" || position === "fixed") {
        projectControl.style.setProperty("left", dockOffset, "important");
      }
    }
  }, []);

  const handleFrameLoad = useCallback(() => {
    const frameWindow = iframeRef.current?.contentWindow;

    if (!frameWindow) {
      return;
    }

    try {
      prepareProjectDocument();
      const file = frameWindow.location.pathname.split("/").pop();
      const nextProject = getProjectByFile(file);

      if (nextProject && nextProject.serviceId !== serviceId) {
        navigate(getLiveProjectPath(nextProject.serviceId), { replace: true });
      }
    } catch {
      // Same-origin iframe is expected; if the browser blocks access, keep the host stable.
    }
  }, [navigate, prepareProjectDocument, serviceId]);

  if (!project) {
    return <Navigate replace to="/services" />;
  }

  return (
    <main className="project-host-page project-host-page--immersive">
      <section className="project-frame-wrap project-frame-wrap--immersive">
        <iframe
          ref={iframeRef}
          allow="autoplay; fullscreen"
          allowFullScreen
          className="project-frame"
          onLoad={handleFrameLoad}
          src={projectSrc}
          title={`${project.title} ${t("dock.aria")}`}
        />
      </section>

      <aside
        aria-label={t("dock.aria")}
        className={`project-quick-dock${dockOpen ? " is-open" : ""}`}
      >
        <button
          aria-expanded={dockOpen}
          aria-label={dockOpen ? t("dock.close") : t("dock.open")}
          className="project-quick-dock__toggle"
          onClick={() => setDockOpen((current) => !current)}
          type="button"
        >
          {dockOpen ? <X size={18} /> : <Menu size={18} />}
          <span>{t("dock.main")}</span>
        </button>

        {dockOpen ? (
          <nav className="project-quick-dock__panel">
            <Link to="/" onClick={() => setDockOpen(false)}>
              <Home size={16} />
              <span>{t("dock.home")}</span>
            </Link>
            <Link to="/shop" onClick={() => setDockOpen(false)}>
              <Store size={16} />
              <span>{t("dock.shop")}</span>
            </Link>
            <Link to="/login" onClick={() => setDockOpen(false)}>
              <LogIn size={16} />
              <span>{t("dock.login")}</span>
            </Link>
            <Link to="/account" onClick={() => setDockOpen(false)}>
              <UserRound size={16} />
              <span>{t("dock.account")}</span>
            </Link>
            <Link to="/shop/cart" onClick={() => setDockOpen(false)}>
              <ShoppingBag size={16} />
              <span>{t("dock.cart")}</span>
            </Link>
            <div className="project-quick-dock__language">
              <div className="project-quick-dock__language-head">
                <Globe2 size={15} />
                <span>
                  {t("nav.language")} {currentLanguage.short}
                </span>
              </div>
              <div
                aria-label={t("nav.languageSelect")}
                className="project-quick-dock__language-options"
              >
                {languages.map((item) => (
                  <button
                    className={`project-quick-dock__language-option${
                      item.code === language ? " is-active" : ""
                    }`}
                    key={item.code}
                    onClick={() => setLanguage(item.code)}
                    type="button"
                  >
                    <span>{item.label}</span>
                    <em>{item.short}</em>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        ) : null}
      </aside>
    </main>
  );
}
