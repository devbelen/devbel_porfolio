import { useEffect, useRef, useState } from "react";
import { useCursor } from "./hooks/useCursor";
import { useHeroTerminalTyping } from "./hooks/useHeroTerminalTyping";
import { useInteractiveTerminal } from "./hooks/useInteractiveTerminal";
import { useResponsiveViewport } from "./hooks/useResponsiveViewport";
import { useRevealOnScroll } from "./hooks/useRevealOnScroll";
import { useSidebar } from "./hooks/useSidebar";

function App() {
  useResponsiveViewport();

  const profilePhoto =
    "https://avatars.githubusercontent.com/devbelen?size=512";

  const { cursorRef, ringRef, handleHoverEnter, handleHoverLeave } =
    useCursor();
  const { isOpen: sidebarOpen, openSidebar, closeSidebar } = useSidebar();
  const {
    ref: aboutRef,
    isVisible: aboutVisible,
    hasBeenVisible: aboutSeen,
  } = useRevealOnScroll(0.15, { once: false });
  const { ref: projectsRef, isVisible: projectsVisible } =
    useRevealOnScroll(0.15);
  const { ref: skillsRef, isVisible: skillsVisible } = useRevealOnScroll(0.15);
  const { ref: contactRef, isVisible: contactVisible } =
    useRevealOnScroll(0.15);
  const terminalBodyRef = useRef(null);
  const [photoUnlocked, setPhotoUnlocked] = useState(false);
  const [scrollHintOpacity, setScrollHintOpacity] = useState(1);
  const [language, setLanguage] = useState("es");
  const [isAboutTerminalActive, setIsAboutTerminalActive] = useState(false);

  const t = {
    es: {
      nav: {
        hero: "junior developer",
        about: "sobre mí",
        projects: "proyectos",
        skills: "skills",
        contact: "contacto",
        menu: "menú",
        closeMenu: "cerrar menú",
      },
      hero: {
        recruiterSummary: "Resumen para reclutadores",
        line2: "especialista frontend · visión product · ux-driven",
        line3: "remoto/híbrido · utc-3 · disponibilidad inmediata",
        projectsCta: "PROYECTOS",
        contactCta: "Contactar",
        scroll: "scroll",
      },
      about: {
        sectionLabel: "01 sobre mí",
        snapshotTitle: "perfil y habilidades clave",
        pillsAria: "Resumen de stack y habilidades",
        terminalTitle: "Codigo con proposito.",
        hidePhoto: "Ocultar foto de perfil",
        revealPhoto: "Revelar foto de perfil",
        photoAlt: "Foto de perfil de Belén",
        lockHint: "click para bloquear",
        revealHint: "click para revelar",
      },
      projects: {
        sectionLabel: "02 proyectos",
        titleLine1: "Lo que",
        titleLine2: "he construido.",
        solo: "proyecto individual",
        team: "proyecto en equipo",
        problem: "problema",
        role: "mi rol",
        impact: "impacto",
      },
      skills: {
        sectionLabel: "03 habilidades",
        title: "Mi stack.",
        intermediate: "intermedio",
        basic: "básico",
        english: "Inglés",
      },
      contact: {
        sectionLabel: "04 contacto",
        heading1: "¿Trabajamos",
        heading2: "juntos?",
        availabilityAria: "Disponibilidad laboral",
        availabilityTitle: "disponibilidad",
        item1: "Inicio: inmediato",
        item2: "Modalidad: remoto",
        item3:
          "Franja horaria: UTC-3 con superposición en cualquier horario del mundo",
        item4: "Rol objetivo: full stack",
        sendEmail: "✉ enviar email",
      },
      footer: {
        line1: "diseñado y desarrollado",
        line2: "hecho con",
        line3: "y mucho mate",
      },
    },
    en: {
      nav: {
        hero: "junior developer",
        about: "about me",
        projects: "projects",
        skills: "skills",
        contact: "contact",
        menu: "menu",
        closeMenu: "close menu",
      },
      hero: {
        recruiterSummary: "Recruiter summary",
        line2: "frontend specialist · product mindset · ux-driven",
        line3: "remote/hybrid · utc-3 · immediate availability",
        projectsCta: "PROJECTS",
        contactCta: "Contact",
        scroll: "scroll",
      },
      about: {
        sectionLabel: "01 about me",
        snapshotTitle: "profile and key skills",
        pillsAria: "Stack and skills summary",
        terminalTitle: "Code with purpose.",
        hidePhoto: "Hide profile photo",
        revealPhoto: "Reveal profile photo",
        photoAlt: "Belén profile photo",
        lockHint: "click to lock",
        revealHint: "click to reveal",
      },
      projects: {
        sectionLabel: "02 projects",
        titleLine1: "What",
        titleLine2: "I've built.",
        solo: "solo project",
        team: "team project",
        problem: "problem",
        role: "my role",
        impact: "impact",
      },
      skills: {
        sectionLabel: "03 skills",
        title: "My stack.",
        intermediate: "intermediate",
        basic: "basic",
        english: "English",
      },
      contact: {
        sectionLabel: "04 contact",
        heading1: "Shall we",
        heading2: "work together?",
        availabilityAria: "Work availability",
        availabilityTitle: "availability",
        item1: "Start date: immediate",
        item2: "Mode: remote",
        item3: "Time zone: UTC-3 with overlap for any global schedule",
        item4: "Target role: full stack",
        sendEmail: "✉ send email",
      },
      footer: {
        line1: "designed and developed",
        line2: "made with",
        line3: "and lots of mate",
      },
    },
  }[language];

  const shouldStartAboutTerminal = isAboutTerminalActive || aboutVisible;
  const { history } = useInteractiveTerminal(
    language,
    shouldStartAboutTerminal,
  );
  const {
    lines: heroLines,
    activeLine,
    isDone,
  } = useHeroTerminalTyping(language);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  };

  const handleAboutNavClick = () => {
    setIsAboutTerminalActive(true);
  };

  const handleSidebarAboutNavClick = () => {
    setIsAboutTerminalActive(true);
    closeSidebar();
  };

  useEffect(() => {
    const links = document.querySelectorAll("a, button");
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleHoverEnter);
      link.addEventListener("mouseleave", handleHoverLeave);
    });
    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleHoverEnter);
        link.removeEventListener("mouseleave", handleHoverLeave);
      });
    };
  }, [handleHoverEnter, handleHoverLeave]);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const updateScrollHintOpacity = () => {
      if (!contactRef.current) return;

      const rect = contactRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;

      // Starts fading when contacto reaches the bottom edge, then fades out progressively.
      const fadeStart = viewportHeight;
      const fadeEnd = viewportHeight * 0.35;
      const progress = (fadeStart - rect.top) / (fadeStart - fadeEnd);
      const clamped = Math.min(Math.max(progress, 0), 1);

      setScrollHintOpacity(1 - clamped);
    };

    updateScrollHintOpacity();
    window.addEventListener("scroll", updateScrollHintOpacity, {
      passive: true,
    });
    window.addEventListener("resize", updateScrollHintOpacity);

    return () => {
      window.removeEventListener("scroll", updateScrollHintOpacity);
      window.removeEventListener("resize", updateScrollHintOpacity);
    };
  }, [contactRef]);

  return (
    <>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={ringRef} className="cursor-ring"></div>

      {/* NAV */}
      <nav>
        <a href="#hero" className="logo">
          dev<span>bel_</span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#hero" data-num="00">
              {t.nav.hero}
            </a>
          </li>
          <li>
            <a href="#about" data-num="01" onClick={handleAboutNavClick}>
              {t.nav.about}
            </a>
          </li>
          <li>
            <a href="#projects" data-num="02">
              {t.nav.projects}
            </a>
          </li>
          <li>
            <a href="#skills" data-num="03">
              {t.nav.skills}
            </a>
          </li>
          <li>
            <a href="#contact" data-num="04">
              {t.nav.contact}
            </a>
          </li>
          <li className="nav-lang-item">
            <button
              type="button"
              className="lang-switch"
              onClick={toggleLanguage}
              aria-label={
                language === "es" ? "Switch to English" : "Cambiar a español"
              }
            >
              <span
                className={`lang-chip ${language === "es" ? "active" : ""}`}
              >
                ES
              </span>
              <span
                className={`lang-chip ${language === "en" ? "active" : ""}`}
              >
                EN
              </span>
            </button>
          </li>
        </ul>
        <button
          className={`hamburger ${sidebarOpen ? "active" : ""}`}
          id="hamburger"
          aria-label={t.nav.menu}
          onClick={openSidebar}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* SIDEBAR */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        id="sidebarOverlay"
        onClick={closeSidebar}
      ></div>
      <aside className={`sidebar ${sidebarOpen ? "active" : ""}`} id="sidebar">
        <button
          className="sidebar-close"
          id="sidebarClose"
          aria-label={t.nav.closeMenu}
          onClick={closeSidebar}
        >
          ✕
        </button>
        <a href="#hero" className="sidebar-logo" onClick={closeSidebar}>
          dev<span>bel_</span>
        </a>
        <ul className="sidebar-links">
          <li>
            <a href="#hero" data-num="00" onClick={closeSidebar}>
              {t.nav.hero}
            </a>
          </li>
          <li>
            <a href="#about" data-num="01" onClick={handleSidebarAboutNavClick}>
              {t.nav.about}
            </a>
          </li>
          <li>
            <a href="#projects" data-num="02" onClick={closeSidebar}>
              {t.nav.projects}
            </a>
          </li>
          <li>
            <a href="#skills" data-num="03" onClick={closeSidebar}>
              {t.nav.skills}
            </a>
          </li>
          <li>
            <a href="#contact" data-num="04" onClick={closeSidebar}>
              {t.nav.contact}
            </a>
          </li>
        </ul>
        <div className="sidebar-lang-switch-wrap">
          <button
            type="button"
            className="lang-switch"
            onClick={toggleLanguage}
            aria-label={
              language === "es" ? "Switch to English" : "Cambiar a español"
            }
          >
            <span className={`lang-chip ${language === "es" ? "active" : ""}`}>
              ES
            </span>
            <span className={`lang-chip ${language === "en" ? "active" : ""}`}>
              EN
            </span>
          </button>
        </div>
        <div className="sidebar-footer">
          <a
            href="https://github.com/devbelen"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/devbelen/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </aside>

      {/* HERO */}
      <section id="hero">
        <div className="glow-blob"></div>
        <div className="hero-inner">
          <p className="hero-tag"> 00 JUNIOR DEVELOPER</p>
          <h1 className="hero-name">
            <span className="hero-line">
              {heroLines[0]}
              {activeLine === 0 && <span className="hero-cursor"></span>}
            </span>
            <span className="hero-line">
              {heroLines[1].slice(0, 4)}
              <span style={{ color: "var(--accent)" }}>
                {heroLines[1].slice(4)}
              </span>
              {activeLine === 1 && <span className="hero-cursor"></span>}
            </span>
            <span className="hero-line line2">
              {heroLines[2]}
              {activeLine === 2 && (
                <span className="hero-cursor hero-cursor-outline"></span>
              )}
              {isDone && (
                <span className="hero-cursor hero-cursor-outline hero-cursor-final"></span>
              )}
            </span>
          </h1>
          <div className="hero-actions">
            <div
              className="recruiter-scan"
              aria-label={t.hero.recruiterSummary}
            >
              <div className="scan-shell">
                <ul className="scan-list">
                  <li className="scan-stack">
                    react · javascript · typescript · node.js · sql
                  </li>
                  <li>{t.hero.line2}</li>
                  <li>{t.hero.line3}</li>
                </ul>
                <a
                  href="#projects"
                  className="scan-availability is-project-link"
                >
                  {t.hero.projectsCta}
                </a>
              </div>
            </div>
            <div className="hero-cta">
              <a href="mailto:devbel_@outlook.com" className="btn-outline">
                {t.hero.contactCta}
              </a>
              <div className="hero-social">
                <a
                  href="https://github.com/devbelen"
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub"
                >
                  GitHub
                </a>
                <span className="social-separator">·</span>
                <a
                  href="https://www.linkedin.com/in/devbelen/"
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-hint" style={{ opacity: scrollHintOpacity }}>
          {t.hero.scroll}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={aboutRef}>
        <div
          className={`reveal ${aboutVisible ? "visible" : ""} ${aboutSeen ? "seen" : ""}`}
        >
          <p className="section-label">{t.about.sectionLabel}</p>
          <div className="about-snapshot">
            <p className="about-snapshot-title">{t.about.snapshotTitle}</p>
            <div className="about-pills" aria-label={t.about.pillsAria}>
              <span>
                {language === "es"
                  ? "Frontend: HTML, CSS, JavaScript, React, TypeScript"
                  : "Frontend: HTML, CSS, JavaScript, React, TypeScript"}
              </span>
              <span>
                {language === "es"
                  ? "Backend y datos: Node.js, PHP, Python, Java, SQL"
                  : "Backend and data: Node.js, PHP, Python, Java, SQL"}
              </span>
              <span>
                {language === "es"
                  ? "Bases de datos: MySQL, MongoDB, Prisma"
                  : "Databases: MySQL, MongoDB, Prisma"}
              </span>
              <span>Tooling: Vite, npm, ESLint, Git, GitHub Actions</span>
              <span>
                {language === "es"
                  ? "Arquitectura UI: componentes reutilizables y escalables"
                  : "UI architecture: reusable and scalable components"}
              </span>
              <span>
                {language === "es"
                  ? "API & estado: fetch, async/await, manejo de errores"
                  : "API & state: fetch, async/await, error handling"}
              </span>
              <span>
                {language === "es"
                  ? "Calidad: clean code, refactor, documentación técnica"
                  : "Quality: clean code, refactor, technical documentation"}
              </span>
              <span>
                {language === "es"
                  ? "Fortalezas: resolución de problemas y trabajo en equipo"
                  : "Strengths: problem solving and teamwork"}
              </span>
            </div>
          </div>
          <div className="about-visual">
            <div className="terminal">
              <div className="terminal-bar">
                <span
                  className="t-dot"
                  style={{ background: "#ff5f57" }}
                ></span>
                <span
                  className="t-dot"
                  style={{ background: "#febc2e" }}
                ></span>
                <span
                  className="t-dot"
                  style={{ background: "#28c840" }}
                ></span>
                <span className="t-title">{t.about.terminalTitle}</span>
              </div>
              <div
                className="terminal-body terminal-body-static"
                ref={terminalBodyRef}
              >
                {history.map((line, idx) => (
                  <span className="t-line" key={`${line.type}-${idx}`}>
                    <span
                      className={
                        line.type === "val"
                          ? "t-val"
                          : line.type === "cmd"
                            ? "t-cmd"
                            : "t-out"
                      }
                    >
                      {line.text}
                    </span>
                    {idx === history.length - 1 && (
                      <span className="t-cursor"></span>
                    )}
                  </span>
                ))}
              </div>
            </div>
            <div className="about-profile-slot">
              <button
                type="button"
                className={`about-profile-lock ${photoUnlocked ? "unlocked" : "locked"}`}
                onClick={() => setPhotoUnlocked((prev) => !prev)}
                aria-pressed={photoUnlocked}
                aria-label={
                  photoUnlocked ? t.about.hidePhoto : t.about.revealPhoto
                }
              >
                <img
                  src={profilePhoto}
                  alt={t.about.photoAlt}
                  className="about-profile-photo"
                />
                <span className="about-profile-overlay" aria-hidden="true">
                  {photoUnlocked ? t.about.lockHint : t.about.revealHint}
                </span>
              </button>
            </div>
            <div className="accent-corner"></div>
            <div className="accent-corner2"></div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" ref={projectsRef}>
        <div
          className={`projects-header reveal ${projectsVisible ? "visible" : ""}`}
        >
          <div>
            <p className="section-label">{t.projects.sectionLabel}</p>
            <h2 className="section-title">
              {t.projects.titleLine1}
              <br />
              {t.projects.titleLine2}
            </h2>
          </div>
        </div>

        <div
          className={`project-grid reveal ${projectsVisible ? "visible" : ""}`}
        >
          <div className="project-card">
            <p className="project-num">// 001</p>
            <div className="project-headline">
              <h3 className="project-title">App del Clima</h3>
              <span className="project-role-badge">{t.projects.solo}</span>
            </div>
            <p className="project-pitch">
              {language === "es"
                ? "Aplicación web que consulta una API pública y devuelve el clima actual por ciudad con foco en claridad de uso."
                : "Web app that queries a public API and returns current city weather with a focus on clarity of use."}
            </p>
            <div className="project-breakdown">
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.problem}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Las consultas sin feedback daban sensación de lentitud e incertidumbre al usuario."
                    : "Queries without feedback felt slow and created user uncertainty."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.role}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Implementé fetch, manejo de JSON, validaciones y estructura responsive completa de interfaz."
                    : "I implemented fetch, JSON handling, validations, and a fully responsive interface structure."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.impact}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Reduje el tiempo de consulta percibido con estados de carga visibles y respuestas más predecibles."
                    : "I reduced perceived lookup time with visible loading states and more predictable responses."}
                </p>
              </article>
            </div>
            <div className="project-tags">
              <span className="tag">HTML</span>
              <span className="tag">CSS</span>
              <span className="tag">API REST</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/devbelen/mi-proyecto-clima"
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                ⌥ github
              </a>
            </div>
          </div>

          <div className="project-card">
            <p className="project-num">// 002</p>
            <div className="project-headline">
              <h3 className="project-title">Conversor de Monedas</h3>
              <span className="project-role-badge">{t.projects.solo}</span>
            </div>
            <p className="project-pitch">
              {language === "es"
                ? "Aplicación de consola en Java para convertir monedas con una lógica modular pensada para crecer."
                : "Java console app for currency conversion with a modular design built to scale."}
            </p>
            <div className="project-breakdown">
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.problem}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "El cálculo y la validación estaban acoplados, dificultando mantenimiento y extensión."
                    : "Calculation and validation were coupled, making maintenance and extension harder."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.role}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Apliqué POO y separé conversión, entrada/salida y validaciones en componentes reutilizables."
                    : "I applied OOP and separated conversion, input/output, and validations into reusable components."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.impact}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Mejoré mantenibilidad y velocidad para incorporar nuevas monedas y reglas."
                    : "I improved maintainability and speed for adding new currencies and rules."}
                </p>
              </article>
            </div>
            <div className="project-tags">
              <span className="tag">Java</span>
              <span className="tag">POO</span>
              <span className="tag">CLI</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/devbelen/ConversorDeMonedasJava"
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                ⌥ github
              </a>
            </div>
          </div>

          <div className="project-card">
            <p className="project-num">// 003</p>
            <div className="project-headline">
              <h3 className="project-title">Voz Ciudadana</h3>
              <span className="project-role-badge">{t.projects.team}</span>
            </div>
            <p className="project-pitch">
              {language === "es"
                ? "Plataforma full stack para reportar y visualizar problemas urbanos con entregas iterativas por sprint."
                : "Full-stack platform to report and visualize urban issues with iterative sprint deliveries."}
            </p>
            <div className="project-breakdown">
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.problem}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Había fricción entre integración frontend/backend y tiempos de entrega inconsistentes."
                    : "There was friction between frontend/backend integration and inconsistent delivery times."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.role}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Trabajé en frontend y backend con React, TypeScript y Node.js dentro de metodología ágil."
                    : "I worked on frontend and backend with React, TypeScript, and Node.js within an agile workflow."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.impact}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Reducimos issues de integración y sostuvimos mejoras funcionales semanales."
                    : "We reduced integration issues and sustained weekly functional improvements."}
                </p>
              </article>
            </div>
            <div className="project-tags">
              <span className="tag">React</span>
              <span className="tag">TypeScript</span>
              <span className="tag">Node.js</span>
              <span className="tag">Vite</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/devbelen/vozCiudadana"
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                ⌥ github
              </a>
            </div>
          </div>

          <div className="project-card">
            <p className="project-num">// 004</p>
            <div className="project-headline">
              <h3 className="project-title">ToDos App</h3>
              <span className="project-role-badge">{t.projects.team}</span>
            </div>
            <p className="project-pitch">
              {language === "es"
                ? "App de gestión de tareas para UTN con prioridades, categorías, filtros y enfoque mobile-first."
                : "Task management app for UTN with priorities, categories, filters, and a mobile-first approach."}
            </p>
            <div className="project-breakdown">
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.problem}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "El flujo de tareas no priorizaba acciones y afectaba la velocidad de uso."
                    : "The task flow did not prioritize actions and reduced usage speed."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.role}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Participé en frontend y backend implementando filtros, categorías y estructura de prioridades."
                    : "I contributed to frontend and backend, implementing filters, categories, and priority structure."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.impact}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Mejoró la velocidad de uso en pruebas funcionales y la claridad operativa diaria."
                    : "Usage speed improved in functional tests along with day-to-day operational clarity."}
                </p>
              </article>
            </div>
            <div className="project-tags">
              <span className="tag">HTML</span>
              <span className="tag">CSS</span>
              <span className="tag">JavaScript</span>
              <span className="tag">PHP</span>
              <span className="tag">MySQL</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/DDarioBenitez/ToDos_app"
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                ⌥ github
              </a>
            </div>
          </div>

          <div className="project-card">
            <p className="project-num">// 005</p>
            <div className="project-headline">
              <h3 className="project-title">Demo Clínica</h3>
              <span className="project-role-badge">{t.projects.team}</span>
            </div>
            <p className="project-pitch">
              {language === "es"
                ? "Sistema de gestión clínica con autenticación, dashboard y módulo de pacientes/turnos para operaciones diarias."
                : "Clinical management system with authentication, dashboard, and patient/appointments module for daily operations."}
            </p>
            <div className="project-breakdown">
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.problem}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Los flujos administrativos eran lentos y el modelo de datos no era suficientemente claro."
                    : "Administrative flows were slow and the data model lacked clarity."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.role}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Trabajé en frontend y base de datos con Next.js, TypeScript y Prisma."
                    : "I worked on frontend and database with Next.js, TypeScript, and Prisma."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.impact}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Se optimizaron procesos clave y se ordenó la estructura de turnos/pacientes."
                    : "Key processes were optimized and the appointments/patients structure was reorganized."}
                </p>
              </article>
            </div>
            <div className="project-tags">
              <span className="tag">Next.js</span>
              <span className="tag">React</span>
              <span className="tag">TypeScript</span>
              <span className="tag">Tailwind</span>
              <span className="tag">Prisma</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/reedq1/demo-clinica"
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                ⌥ github
              </a>
            </div>
          </div>

          <div className="project-card">
            <p className="project-num">// 006</p>
            <div className="project-headline">
              <h3 className="project-title">CICI App</h3>
              <span className="project-role-badge">{t.projects.team}</span>
            </div>
            <p className="project-pitch">
              {language === "es"
                ? "Plataforma de gestión para academia de inglés con administración de alumnos, clases y profesores."
                : "Management platform for an English academy with students, classes, and teachers administration."}
            </p>
            <div className="project-breakdown">
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.problem}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "El onboarding técnico era lento por diferencias de entorno entre integrantes."
                    : "Technical onboarding was slow due to environment differences across team members."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.role}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Participé en frontend y backend, y trabajé la contenedorización con Docker."
                    : "I contributed to frontend and backend and worked on containerization with Docker."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.impact}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Se estandarizó el entorno de desarrollo y se aceleró la incorporación técnica del equipo."
                    : "The development environment was standardized and team technical onboarding sped up."}
                </p>
              </article>
            </div>
            <div className="project-tags">
              <span className="tag">JavaScript</span>
              <span className="tag">HTML/CSS</span>
              <span className="tag">Tailwind</span>
              <span className="tag">Prisma</span>
              <span className="tag">Docker</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/devbelen/cici-app"
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                ⌥ github
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" ref={skillsRef}>
        <div className="skills-inner">
          <div className={`reveal ${skillsVisible ? "visible" : ""}`}>
            <p className="section-label">{t.skills.sectionLabel}</p>
            <h2 className="section-title">{t.skills.title}</h2>
          </div>

          <div
            className={`skills-row reveal ${skillsVisible ? "visible" : ""}`}
          >
            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-html5-plain"></i>
                  HTML
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="75"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-css3-plain"></i>
                  CSS
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="70"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-javascript-plain"></i>
                  JavaScript
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="65"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-typescript-plain"></i>
                  TypeScript
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="35"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-react-original"></i>
                  React
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="45"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-nodejs-plain"></i>
                  Node.js
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="45"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-php-plain"></i>
                  PHP
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="35"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-python-plain"></i>
                  Python
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="40"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-java-plain"></i>
                  Java
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="35"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-mysql-plain"></i>
                  MySQL
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="40"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-git-plain"></i>
                  Git
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="60"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-github-original"></i>
                  GitHub
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="60"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-npm-original-wordmark"></i>
                  npm
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="50"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-vitejs-plain"></i>
                  Vite
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="65"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-githubactions-plain"></i>
                  GitHub Actions
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="40"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-prisma-original"></i>
                  Prisma
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="40"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-mongodb-plain"></i>
                  MongoDB
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="35"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-eslint-original"></i>
                  ESLint
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="60"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i
                    className="fa-solid fa-plug"
                    style={{ color: "var(--accent)" }}
                  ></i>
                  APIs
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="50"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-docker-plain"></i>
                  Docker
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="30"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-bash-plain"></i>
                  Bash
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="30"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i
                    className="fa-solid fa-comments"
                    style={{ color: "var(--accent)" }}
                  ></i>
                  {t.skills.english}
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="55"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={contactRef}>
        <div className={`reveal ${contactVisible ? "visible" : ""}`}>
          <p className="section-label">{t.contact.sectionLabel}</p>
          <h2 className="contact-big">
            {t.contact.heading1}
            <br />
            <span className="accent">{t.contact.heading2}</span>
          </h2>
          <div
            className="availability-box"
            aria-label={t.contact.availabilityAria}
          >
            <div className="availability-layout">
              <div className="availability-main">
                <p className="availability-title">
                  {t.contact.availabilityTitle}
                </p>
                <ul className="availability-list">
                  <li>{t.contact.item1}</li>
                  <li>{t.contact.item2}</li>
                  <li>{t.contact.item3}</li>
                  <li>{t.contact.item4}</li>
                </ul>
              </div>
              <div className="availability-actions">
                <div className="contact-links">
                  <a
                    href="mailto:devbel_@outlook.com"
                    className="btn-primary contact-email-btn"
                  >
                    {t.contact.sendEmail}
                  </a>
                  <a
                    href="https://github.com/devbelen"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/devbelen/"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>
          © 2024 <span className="accent">Belén</span> ·{" "}
          <span className="accent">devbelen</span> — {t.footer.line1}
        </p>
        <p>
          {t.footer.line2} <span className="accent">♥</span> {t.footer.line3}
        </p>
      </footer>
    </>
  );
}

export default App;
