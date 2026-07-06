import { useCallback, useMemo, useRef, useState } from "react";
import { Home, LogIn, Menu, ShoppingBag, Store, UserRound, X } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  getLiveProjectPath,
  getProjectByFile,
  getProjectByServiceId,
  getProjectSource
} from "../data/mysticProjects";

export function ProjectHostPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [dockOpen, setDockOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const project = getProjectByServiceId(serviceId);
  const projectSrc = useMemo(
    () => (project ? getProjectSource(project.file) : ""),
    [project]
  );

  const alignProjectMenu = useCallback(() => {
    const frameWindow = iframeRef.current?.contentWindow;
    const frameDocument = iframeRef.current?.contentDocument;

    if (
      !frameWindow ||
      !frameDocument ||
      frameDocument.getElementById("main-site-dock-align")
    ) {
      return;
    }

    const dockOffset = frameWindow.innerWidth <= 760 ? "96px" : "126px";
    const style = frameDocument.createElement("style");
    style.id = "main-site-dock-align";
    style.textContent = `
      #topbar,
      header[data-ui],
      header.topbar,
      header.home-ui,
      .topbar {
        padding-left: ${dockOffset} !important;
      }

      @media (max-width: 760px) {
        #topbar,
        header[data-ui],
        header.topbar,
        header.home-ui,
        .topbar {
          padding-left: 96px !important;
        }
      }
    `;
    frameDocument.head.appendChild(style);

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
      alignProjectMenu();
      const file = frameWindow.location.pathname.split("/").pop();
      const nextProject = getProjectByFile(file);

      if (nextProject && nextProject.serviceId !== serviceId) {
        navigate(getLiveProjectPath(nextProject.serviceId), { replace: true });
      }
    } catch {
      // Same-origin iframe is expected; if the browser blocks access, keep the host stable.
    }
  }, [alignProjectMenu, navigate, serviceId]);

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
          title={`${project.title}互动项目`}
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
    </main>
  );
}
