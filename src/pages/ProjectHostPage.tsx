import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Home,
  LogIn,
  Menu,
  ShoppingBag,
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
  getProjectSource,
  isProjectServiceId
} from "../data/mysticProjects";

type ProjectFrameWindow = Window & {
  __mysticAtlasSyncCleanup?: () => void;
  ResizeObserver?: typeof ResizeObserver;
};

export function ProjectHostPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
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

    const existingStyle = frameDocument.getElementById("mystic-host-integration");
    const style = existingStyle ?? frameDocument.createElement("style");
    style.id = "mystic-host-integration";
    style.textContent = `
      .navIcons,
      #soundBtn {
        display: none !important;
        pointer-events: none !important;
      }

      html,
      body {
        max-width: 100vw !important;
      }

      body.mystic-project-menu-open #leftcol,
      body.mystic-project-menu-open .side-rail {
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) #topbar,
      html[data-lang]:not([data-lang="zh-Hans"]) #topnav,
      html[data-lang]:not([data-lang="zh-Hans"]) header[data-ui],
      html[data-lang]:not([data-lang="zh-Hans"]) header.topbar,
      html[data-lang]:not([data-lang="zh-Hans"]) header.home-ui,
      html[data-lang]:not([data-lang="zh-Hans"]) .topbar {
        gap: clamp(8px, 1vw, 16px) !important;
        padding-left: clamp(18px, 2vw, 32px) !important;
        padding-right: clamp(18px, 2vw, 32px) !important;
        overflow: hidden !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) #topbar,
      html[data-lang]:not([data-lang="zh-Hans"]) #topnav {
        grid-template-columns: minmax(132px, auto) minmax(0, 1fr) auto !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) .brand {
        max-width: min(58vw, 620px) !important;
        min-width: 0 !important;
        white-space: nowrap !important;
        text-align: center !important;
        text-indent: 0 !important;
        letter-spacing: .12em !important;
        font-size: clamp(28px, 2.8vw, 38px) !important;
        line-height: 1.05 !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) #navTitle {
        display: none !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) .navside {
        display: none !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) .navside button,
      html[data-lang]:not([data-lang="zh-Hans"]) .navlink {
        max-width: 132px !important;
        min-width: 0 !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
        font-size: clamp(13px, .92vw, 15px) !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) .navlink,
      html[data-lang]:not([data-lang="zh-Hans"]) #projBtn,
      html[data-lang]:not([data-lang="zh-Hans"]) .project-btn,
      html[data-lang]:not([data-lang="zh-Hans"]) .pm-it {
        letter-spacing: .04em !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) #projBtn,
      html[data-lang]:not([data-lang="zh-Hans"]) .project-btn,
      html[data-lang]:not([data-lang="zh-Hans"]) #project {
        width: auto !important;
        max-width: 176px !important;
        min-width: 118px !important;
        padding-left: 12px !important;
        padding-right: 12px !important;
        font-size: 14px !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) .feature,
      html[data-lang]:not([data-lang="zh-Hans"]) .daily,
      html[data-lang]:not([data-lang="zh-Hans"]) .today-tip,
      html[data-lang]:not([data-lang="zh-Hans"]) .steps-card,
      html[data-lang]:not([data-lang="zh-Hans"]) .quote,
      html[data-lang]:not([data-lang="zh-Hans"]) .result-card,
      html[data-lang]:not([data-lang="zh-Hans"]) .reading-card {
        overflow-wrap: anywhere !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) .side-rail,
      html[data-lang]:not([data-lang="zh-Hans"]) #leftcol {
        width: clamp(188px, 15vw, 230px) !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) .rail-item,
      html[data-lang]:not([data-lang="zh-Hans"]) #leftcol button,
      html[data-lang]:not([data-lang="zh-Hans"]) #leftcol a {
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        overflow-wrap: normal !important;
        word-break: keep-all !important;
        gap: 12px !important;
        padding-left: 14px !important;
        padding-right: 14px !important;
        letter-spacing: .04em !important;
        font-size: clamp(15px, 1.25vw, 18px) !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) .steps-card {
        width: min(300px, 23vw) !important;
        padding: clamp(20px, 2vw, 26px) !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) .panel-title {
        letter-spacing: .1em !important;
        font-size: clamp(22px, 2vw, 27px) !important;
        line-height: 1.18 !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) .right-stack {
        width: min(390px, 31vw) !important;
        right: clamp(24px, 3vw, 54px) !important;
        gap: 14px !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) .feature {
        min-height: 96px !important;
        padding: 16px 20px !important;
        grid-template-columns: minmax(0, 1fr) 58px !important;
        gap: 14px !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) .feature-art {
        height: 56px !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) .daily {
        width: min(390px, 31vw) !important;
        left: clamp(24px, 3vw, 54px) !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) .quote {
        width: min(390px, 31vw) !important;
        right: clamp(24px, 3vw, 54px) !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) .start-plaque {
        left: 50% !important;
        right: auto !important;
        bottom: clamp(84px, 12vh, 128px) !important;
        width: min(300px, 24vw) !important;
        height: 64px !important;
        min-width: 248px !important;
        transform: translateX(-50%) !important;
        font-size: clamp(26px, 2.4vw, 34px) !important;
        letter-spacing: .12em !important;
        text-indent: .12em !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) .feature h3,
      html[data-lang]:not([data-lang="zh-Hans"]) .daily h3,
      html[data-lang]:not([data-lang="zh-Hans"]) .today-tip h3,
      html[data-lang]:not([data-lang="zh-Hans"]) .panel-title,
      html[data-lang]:not([data-lang="zh-Hans"]) .steps-title,
      html[data-lang]:not([data-lang="zh-Hans"]) .dock-title,
      html[data-lang]:not([data-lang="zh-Hans"]) .rail-title,
      html[data-lang]:not([data-lang="zh-Hans"]) .side-title {
        letter-spacing: .08em !important;
        font-size: clamp(21px, 1.8vw, 30px) !important;
        line-height: 1.16 !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) .feature p,
      html[data-lang]:not([data-lang="zh-Hans"]) .daily p,
      html[data-lang]:not([data-lang="zh-Hans"]) .today-tip p,
      html[data-lang]:not([data-lang="zh-Hans"]) .steps-card p,
      html[data-lang]:not([data-lang="zh-Hans"]) .step span,
      html[data-lang]:not([data-lang="zh-Hans"]) .quote,
      html[data-lang]:not([data-lang="zh-Hans"]) .result-card p,
      html[data-lang]:not([data-lang="zh-Hans"]) .reading-card p,
      html[data-lang]:not([data-lang="zh-Hans"]) .hint {
        letter-spacing: .02em !important;
        line-height: 1.55 !important;
      }

      html[data-lang]:not([data-lang="zh-Hans"]) .start-plaque,
      html[data-lang]:not([data-lang="zh-Hans"]) .gold-btn,
      html[data-lang]:not([data-lang="zh-Hans"]) .ghost-btn,
      html[data-lang]:not([data-lang="zh-Hans"]) .chip {
        letter-spacing: .04em !important;
        white-space: normal !important;
      }

      @media (max-width: 1180px) {
        html[data-lang]:not([data-lang="zh-Hans"]) #topbar,
        html[data-lang]:not([data-lang="zh-Hans"]) #topnav,
        html[data-lang]:not([data-lang="zh-Hans"]) header[data-ui],
        html[data-lang]:not([data-lang="zh-Hans"]) header.topbar,
        html[data-lang]:not([data-lang="zh-Hans"]) header.home-ui,
        html[data-lang]:not([data-lang="zh-Hans"]) .topbar {
          grid-template-columns: minmax(126px, auto) minmax(0, 1fr) auto !important;
        }

        html[data-lang]:not([data-lang="zh-Hans"]) .brand {
          max-width: 46vw !important;
        }

        html[data-lang]:not([data-lang="zh-Hans"]) .navside {
          display: none !important;
        }
      }

      @media (max-width: 1400px) {
        html[data-lang]:not([data-lang="zh-Hans"]) .daily,
        html[data-lang]:not([data-lang="zh-Hans"]) .quote {
          display: none !important;
        }

        html[data-lang]:not([data-lang="zh-Hans"]) .start-plaque {
          bottom: 36px !important;
        }
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
          grid-template-columns: minmax(138px, auto) 1fr !important;
          align-items: center !important;
          gap: 8px !important;
          padding-left: 12px !important;
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
          width: min(172px, calc(100vw - 24px)) !important;
          max-width: calc(100vw - 24px) !important;
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

    if (frameDocument.body && !frameDocument.body.dataset.mysticProjectMenuWatcher) {
      frameDocument.body.dataset.mysticProjectMenuWatcher = "true";

      const syncProjectMenuState = () => {
        const menuOpen = Boolean(
          frameDocument.querySelector(
            "#projMenu.show, .project.open .project-menu, .project-menu.show"
          )
        );

        frameDocument.body.classList.toggle("mystic-project-menu-open", menuOpen);
      };

      const scheduleProjectMenuSync = () => frameWindow.setTimeout(syncProjectMenuState, 0);

      frameDocument.addEventListener("click", scheduleProjectMenuSync, true);
      frameDocument.addEventListener("keydown", scheduleProjectMenuSync, true);
      syncProjectMenuState();
    }

    frameDocument
      .querySelectorAll("[data-mystic-theme-shop-link]")
      .forEach((shopLink) => shopLink.remove());

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

  }, [language, project]);

  const handleFrameLoad = useCallback(() => {
    const frameWindow = iframeRef.current?.contentWindow;

    if (!frameWindow) {
      return;
    }

    try {
      prepareProjectDocument();
      const file = frameWindow.location.pathname.split("/").pop();
      const nextProject = getProjectByFile(file);

      if (nextProject && !isProjectServiceId(nextProject, serviceId)) {
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
      <header className="project-host-bar project-host-bar--immersive">
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

        <span className="project-host-bar__spacer" aria-hidden="true" />

        <Link className="project-host-shop-link" to={project.shopRoute}>
          <Store size={16} />
          <span>{language === "en" ? "Shop" : project.shopLabel}</span>
        </Link>
      </header>

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
    </main>
  );
}
