import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  Globe2,
  Home,
  LogIn,
  Menu,
  ShoppingBag,
  Sparkles,
  Store,
  UserRound,
  X
} from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  getLiveProjectPath,
  getProjectByFile,
  getProjectByServiceId,
  getProjectSource
} from "../data/mysticProjects";
import { selectableLanguages } from "../lib/i18n";

type ProjectFrameWindow = Window & {
  __mysticAtlasSyncCleanup?: () => void;
  ResizeObserver?: typeof ResizeObserver;
};

export function ProjectHostPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { currentLanguage, language, lt, setLanguage, t } = useLanguage();
  const [dockOpen, setDockOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
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

    const syncMobileFrameHeight = () => {
      const hostFrame = iframeRef.current;

      if (!hostFrame) {
        return;
      }

      const isMobile = frameWindow.innerWidth <= 760 || window.innerWidth <= 760;

      if (!isMobile) {
        hostFrame.style.removeProperty("height");
        hostFrame.style.removeProperty("min-height");
        return;
      }

      const nextHeight = Math.ceil(
        Math.max(
          frameDocument.documentElement.scrollHeight,
          frameDocument.body?.scrollHeight ?? 0,
          frameWindow.innerHeight,
          window.innerHeight
        )
      );

      hostFrame.style.setProperty("height", `${nextHeight}px`);
      hostFrame.style.setProperty("min-height", "100dvh");
    };

    const projectFrameWindow = frameWindow as ProjectFrameWindow;
    projectFrameWindow.__mysticAtlasSyncCleanup?.();

    if (frameWindow.innerWidth <= 760 || window.innerWidth <= 760) {
      let resizeObserver: ResizeObserver | undefined;
      const interval = frameWindow.setInterval(syncMobileFrameHeight, 900);

      syncMobileFrameHeight();
      [120, 360, 900, 1800, 3200].forEach((delay) => {
        frameWindow.setTimeout(syncMobileFrameHeight, delay);
      });

      const ResizeObserverCtor = projectFrameWindow.ResizeObserver;

      if (ResizeObserverCtor) {
        resizeObserver = new ResizeObserverCtor(syncMobileFrameHeight);
        resizeObserver?.observe(frameDocument.documentElement);

        if (frameDocument.body) {
          resizeObserver?.observe(frameDocument.body);
        }
      }

      frameWindow.addEventListener("resize", syncMobileFrameHeight);
      frameDocument.addEventListener("click", syncMobileFrameHeight, true);
      frameDocument.addEventListener("input", syncMobileFrameHeight, true);

      projectFrameWindow.__mysticAtlasSyncCleanup = () => {
        resizeObserver?.disconnect();
        frameWindow.clearInterval(interval);
        frameWindow.removeEventListener("resize", syncMobileFrameHeight);
        frameDocument.removeEventListener("click", syncMobileFrameHeight, true);
        frameDocument.removeEventListener("input", syncMobileFrameHeight, true);
      };
    }

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

      .navIcons,
      #soundBtn {
        display: none !important;
        pointer-events: none !important;
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
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }

        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }

        body {
          touch-action: pan-y manipulation;
        }

        * {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }

        *::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }

        #topbar,
        #topnav,
        header[data-ui],
        header.topbar,
        header.home-ui,
        .topbar {
          width: 100% !important;
          max-width: 100vw !important;
          min-width: 0 !important;
          min-height: 70px !important;
          height: auto !important;
          display: grid !important;
          grid-template-columns: minmax(96px, auto) 1fr !important;
          align-items: center !important;
          gap: 8px !important;
          padding-left: 96px !important;
          padding-right: 12px !important;
          overflow-x: hidden !important;
          overflow-y: visible !important;
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }

        #topbar > *,
        #topnav > *,
        header[data-ui] > *,
        header.topbar > *,
        header.home-ui > *,
        .topbar > * {
          min-width: 0 !important;
        }

        #topbar::-webkit-scrollbar,
        #topnav::-webkit-scrollbar,
        header[data-ui]::-webkit-scrollbar,
        header.topbar::-webkit-scrollbar,
        header.home-ui::-webkit-scrollbar,
        .topbar::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
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

        #projBtn,
        .project-btn,
        #project {
          grid-column: 1 !important;
          grid-row: 1 !important;
          justify-self: start !important;
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
          grid-column: 1 / -1 !important;
          grid-row: 2 !important;
          justify-self: center !important;
          text-align: center !important;
          margin-top: 4px !important;
        }

        .navside {
          display: none !important;
        }

        .navlink {
          flex: 0 0 auto !important;
          white-space: nowrap !important;
          font-size: 13px !important;
          letter-spacing: .1em !important;
        }

        .navIcons {
          display: none !important;
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

        #home > *,
        #introLayer > *,
        #readingLayer > *,
        #resultLayer > *,
        #captureLayer > *,
        #selectLayer > *,
        #drawLayer > *,
        #burstLayer > *,
        #castingStage > * {
          min-width: 0 !important;
          max-width: 100% !important;
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
          grid-column: 1 / -1 !important;
          grid-row: auto !important;
          justify-self: stretch !important;
        }

        .steps-title,
        .rail-title,
        .side-title {
          writing-mode: horizontal-tb !important;
          text-orientation: mixed !important;
          white-space: normal !important;
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
        .reading-blocks,
        .result-top,
        .summary-grid,
        .summaryGrid,
        .reportGrid,
        .planet-grid,
        .aspect-grid,
        .birth-grid,
        .form-grid,
        .pillar-table,
        .luck-table,
        .featureRow,
        #layoutStep,
        #layoutStep.show,
        .choice-grid,
        .chips,
        #spreads {
          width: 100% !important;
          max-width: 100% !important;
        }

        .result-grid,
        .analysis-grid,
        .reading-grid,
        .reading-blocks,
        .result-top,
        .summary-grid,
        .summaryGrid,
        .reportGrid,
        .planet-grid,
        .aspect-grid,
        .birth-grid,
        .form-grid,
        .pillar-table,
        .luck-table,
        .featureRow,
        #layoutStep,
        #layoutStep.show {
          grid-template-columns: 1fr !important;
        }

        .side-menu {
          grid-template-columns: repeat(auto-fit, minmax(64px, 1fr)) !important;
        }

        .featureRow,
        .side-menu {
          display: grid !important;
          gap: 10px !important;
        }

        .choice-grid,
        .chips,
        .navside,
        #spreads {
          overflow-x: auto !important;
          scrollbar-width: none;
        }

        .choice-grid::-webkit-scrollbar,
        .chips::-webkit-scrollbar,
        .navside::-webkit-scrollbar,
        #spreads::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
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

    const file = frameWindow.location.pathname.split("/").pop() ?? "";
    const isPalmOrFace = file === "index_palm.html" || file === "index_mianxiang.html";

    if (isPalmOrFace && !frameDocument.getElementById("mystic-atlas-drag-fix")) {
      const dragStyle = frameDocument.createElement("style");
      dragStyle.id = "mystic-atlas-drag-fix";
      dragStyle.textContent = `
        #viewfinder {
          touch-action: none !important;
          cursor: grab;
        }

        #viewfinder.is-dragging {
          cursor: grabbing !important;
        }

        #snapshotImg {
          transform: translate(var(--mystic-drag-x, 0px), var(--mystic-drag-y, 0px)) scale(var(--mystic-drag-scale, 1));
          transform-origin: center center !important;
          will-change: transform;
        }
      `;
      frameDocument.head.appendChild(dragStyle);
    }

    const viewfinder = frameDocument.querySelector<HTMLElement>("#viewfinder");
    const snapshot = frameDocument.querySelector<HTMLImageElement>("#snapshotImg");

    if (isPalmOrFace && viewfinder && snapshot && !viewfinder.dataset.mysticDragReady) {
      viewfinder.dataset.mysticDragReady = "true";
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let originX = 0;
      let originY = 0;
      let offsetX = 0;
      let offsetY = 0;
      let scale = 1;

      const applyTransform = () => {
        snapshot.style.setProperty("--mystic-drag-x", `${offsetX}px`);
        snapshot.style.setProperty("--mystic-drag-y", `${offsetY}px`);
        snapshot.style.setProperty("--mystic-drag-scale", String(scale));
      };

      const resetTransform = () => {
        offsetX = 0;
        offsetY = 0;
        scale = 1;
        applyTransform();
      };

      viewfinder.addEventListener("pointerdown", (event) => {
        const target = event.target as Element | null;

        if (
          !viewfinder.classList.contains("has-shot") ||
          target?.closest("button, input, select, textarea, label")
        ) {
          return;
        }

        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;
        originX = offsetX;
        originY = offsetY;
        viewfinder.classList.add("is-dragging");
        viewfinder.setPointerCapture?.(event.pointerId);
        event.preventDefault();
      });

      frameDocument.addEventListener("pointermove", (event) => {
        if (!isDragging) {
          return;
        }

        offsetX = originX + event.clientX - startX;
        offsetY = originY + event.clientY - startY;
        applyTransform();
      });

      const stopDragging = (event: PointerEvent) => {
        if (!isDragging) {
          return;
        }

        isDragging = false;
        viewfinder.classList.remove("is-dragging");
        viewfinder.releasePointerCapture?.(event.pointerId);
      };

      frameDocument.addEventListener("pointerup", stopDragging);
      frameDocument.addEventListener("pointercancel", stopDragging);
      viewfinder.addEventListener("dblclick", resetTransform);
      viewfinder.addEventListener(
        "wheel",
        (event) => {
          if (!viewfinder.classList.contains("has-shot")) {
            return;
          }

          scale = Math.min(1.5, Math.max(0.82, scale + (event.deltaY < 0 ? 0.04 : -0.04)));
          applyTransform();
          event.preventDefault();
        },
        { passive: false }
      );

      frameDocument.addEventListener("click", (event) => {
        const target = event.target as Element | null;

        if (target?.closest('[data-act="retake"], [data-act="skip-camera"], [data-act="capture"]')) {
          frameWindow.setTimeout(resetTransform, 120);
        }
      });
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

  useEffect(() => {
    return () => {
      try {
        const frameWindow = iframeRef.current?.contentWindow as ProjectFrameWindow | null;
        frameWindow?.__mysticAtlasSyncCleanup?.();
      } catch {
        // Ignore iframe teardown races.
      }
    };
  }, []);

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
          </nav>
        ) : null}
      </aside>

      <div className="project-top-actions" aria-label={t("dock.aria")}>
        <div className={`project-language-switch${languageOpen ? " is-open" : ""}`}>
          <button
            aria-expanded={languageOpen}
            aria-label={t("nav.languageSelect")}
            className="project-top-actions__button project-language-switch__button"
            onClick={() => setLanguageOpen((current) => !current)}
            type="button"
          >
            <Globe2 size={17} />
            <span>
              {t("nav.language")} {currentLanguage.short}
            </span>
            <ChevronDown size={14} />
          </button>

          {languageOpen ? (
            <div className="project-language-switch__panel">
              {selectableLanguages.map((item) => (
                <button
                  className={`project-language-switch__option${
                    item.code === language ? " is-active" : ""
                  }`}
                  key={item.code}
                  onClick={() => {
                    setLanguage(item.code);
                    setLanguageOpen(false);
                  }}
                  type="button"
                >
                  <span>{item.label}</span>
                  <em>{item.short}</em>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <button
          aria-label={t("dock.account")}
          className="project-top-actions__icon"
          onClick={() => navigate("/account")}
          type="button"
        >
          <UserRound size={21} />
        </button>
        <button
          aria-label={lt("每日运势")}
          className="project-top-actions__icon"
          onClick={() => navigate(getLiveProjectPath("zodiac-forecast"))}
          type="button"
        >
          <Sparkles size={22} />
        </button>
      </div>
    </main>
  );
}
