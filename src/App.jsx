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
  const { history } = useInteractiveTerminal();
  const { lines: heroLines, activeLine, isDone } = useHeroTerminalTyping();
  const terminalBodyRef = useRef(null);
  const [photoUnlocked, setPhotoUnlocked] = useState(false);
  const [scrollHintOpacity, setScrollHintOpacity] = useState(1);

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
              junior developer
            </a>
          </li>
          <li>
            <a href="#about" data-num="01">
              sobre mí
            </a>
          </li>
          <li>
            <a href="#projects" data-num="02">
              proyectos
            </a>
          </li>
          <li>
            <a href="#skills" data-num="03">
              skills
            </a>
          </li>
          <li>
            <a href="#contact" data-num="04">
              contacto
            </a>
          </li>
        </ul>
        <button
          className={`hamburger ${sidebarOpen ? "active" : ""}`}
          id="hamburger"
          aria-label="menú"
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
          aria-label="cerrar menú"
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
              junior developer
            </a>
          </li>
          <li>
            <a href="#about" data-num="01" onClick={closeSidebar}>
              sobre mí
            </a>
          </li>
          <li>
            <a href="#projects" data-num="02" onClick={closeSidebar}>
              proyectos
            </a>
          </li>
          <li>
            <a href="#skills" data-num="03" onClick={closeSidebar}>
              skills
            </a>
          </li>
          <li>
            <a href="#contact" data-num="04" onClick={closeSidebar}>
              contacto
            </a>
          </li>
        </ul>
        <div className="sidebar-footer">
          <a
            href="https://github.com/devbelen"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/miperfilbelenrodriguez/"
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
              aria-label="Resumen para reclutadores"
            >
              <div className="scan-shell">
                <ul className="scan-list">
                  <li className="scan-stack">
                    react · javascript · typescript · node.js · sql
                  </li>
                  <li>especialista frontend · visión product · ux-driven</li>
                  <li>remoto/híbrido · utc-3 · disponibilidad inmediata</li>
                </ul>
                <a
                  href="#projects"
                  className="scan-availability is-project-link"
                >
                  PROYECTOS
                </a>
              </div>
            </div>
            <div className="hero-cta">
              <a href="#contact" className="btn-outline">
                Contactar
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
                  href="https://www.linkedin.com/in/miperfilbelenrodriguez/"
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
          scroll
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={aboutRef}>
        <div
          className={`reveal ${aboutVisible ? "visible" : ""} ${aboutSeen ? "seen" : ""}`}
        >
          <p className="section-label">01 sobre mí</p>
          <div className="about-snapshot">
            <p className="about-snapshot-title">perfil y habilidades clave</p>
            <div
              className="about-pills"
              aria-label="Resumen de stack y habilidades"
            >
              <span>Frontend: HTML, CSS, JavaScript, React, TypeScript</span>
              <span>Backend y datos: Node.js, PHP, Python, Java, SQL</span>
              <span>Bases de datos: MySQL, MongoDB, Prisma</span>
              <span>Tooling: Vite, npm, ESLint, Git, GitHub Actions</span>
              <span>
                Arquitectura UI: componentes reutilizables y escalables
              </span>
              <span>API & estado: fetch, async/await, manejo de errores</span>
              <span>Calidad: clean code, refactor, documentación técnica</span>
              <span>
                Fortalezas: resolución de problemas y trabajo en equipo
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
                <span className="t-title">Codigo con proposito.</span>
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
                  photoUnlocked
                    ? "Ocultar foto de perfil"
                    : "Revelar foto de perfil"
                }
              >
                <img
                  src={profilePhoto}
                  alt="Foto de perfil de Belén"
                  className="about-profile-photo"
                />
                <span className="about-profile-overlay" aria-hidden="true">
                  {photoUnlocked ? "click para bloquear" : "click para revelar"}
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
            <p className="section-label">02 proyectos</p>
            <h2 className="section-title">
              Lo que
              <br />
              he construido.
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
              <span className="project-role-badge">proyecto individual</span>
            </div>
            <p className="project-pitch">
              Aplicación web que consulta una API pública y devuelve el clima
              actual por ciudad con foco en claridad de uso.
            </p>
            <div className="project-breakdown">
              <article className="breakdown-item">
                <p className="breakdown-label">problema</p>
                <p className="breakdown-text">
                  Las consultas sin feedback daban sensación de lentitud e
                  incertidumbre al usuario.
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">mi rol</p>
                <p className="breakdown-text">
                  Implementé fetch, manejo de JSON, validaciones y estructura
                  responsive completa de interfaz.
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">impacto</p>
                <p className="breakdown-text">
                  Reduje el tiempo de consulta percibido con estados de carga
                  visibles y respuestas más predecibles.
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
              <span className="project-role-badge">proyecto individual</span>
            </div>
            <p className="project-pitch">
              Aplicación de consola en Java para convertir monedas con una
              lógica modular pensada para crecer.
            </p>
            <div className="project-breakdown">
              <article className="breakdown-item">
                <p className="breakdown-label">problema</p>
                <p className="breakdown-text">
                  El cálculo y la validación estaban acoplados, dificultando
                  mantenimiento y extensión.
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">mi rol</p>
                <p className="breakdown-text">
                  Apliqué POO y separé conversión, entrada/salida y validaciones
                  en componentes reutilizables.
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">impacto</p>
                <p className="breakdown-text">
                  Mejoré mantenibilidad y velocidad para incorporar nuevas
                  monedas y reglas.
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
              <span className="project-role-badge">proyecto en equipo</span>
            </div>
            <p className="project-pitch">
              Plataforma full stack para reportar y visualizar problemas urbanos
              con entregas iterativas por sprint.
            </p>
            <div className="project-breakdown">
              <article className="breakdown-item">
                <p className="breakdown-label">problema</p>
                <p className="breakdown-text">
                  Había fricción entre integración frontend/backend y tiempos de
                  entrega inconsistentes.
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">mi rol</p>
                <p className="breakdown-text">
                  Trabajé en frontend y backend con React, TypeScript y Node.js
                  dentro de metodología ágil.
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">impacto</p>
                <p className="breakdown-text">
                  Reducimos issues de integración y sostuvimos mejoras
                  funcionales semanales.
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
              <span className="project-role-badge">proyecto en equipo</span>
            </div>
            <p className="project-pitch">
              App de gestión de tareas para UTN con prioridades, categorías,
              filtros y enfoque mobile-first.
            </p>
            <div className="project-breakdown">
              <article className="breakdown-item">
                <p className="breakdown-label">problema</p>
                <p className="breakdown-text">
                  El flujo de tareas no priorizaba acciones y afectaba la
                  velocidad de uso.
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">mi rol</p>
                <p className="breakdown-text">
                  Participé en frontend y backend implementando filtros,
                  categorías y estructura de prioridades.
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">impacto</p>
                <p className="breakdown-text">
                  Mejoró la velocidad de uso en pruebas funcionales y la
                  claridad operativa diaria.
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
              <span className="project-role-badge">proyecto en equipo</span>
            </div>
            <p className="project-pitch">
              Sistema de gestión clínica con autenticación, dashboard y módulo
              de pacientes/turnos para operaciones diarias.
            </p>
            <div className="project-breakdown">
              <article className="breakdown-item">
                <p className="breakdown-label">problema</p>
                <p className="breakdown-text">
                  Los flujos administrativos eran lentos y el modelo de datos no
                  era suficientemente claro.
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">mi rol</p>
                <p className="breakdown-text">
                  Trabajé en frontend y base de datos con Next.js, TypeScript y
                  Prisma.
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">impacto</p>
                <p className="breakdown-text">
                  Se optimizaron procesos clave y se ordenó la estructura de
                  turnos/pacientes.
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
              <span className="project-role-badge">proyecto en equipo</span>
            </div>
            <p className="project-pitch">
              Plataforma de gestión para academia de inglés con administración
              de alumnos, clases y profesores.
            </p>
            <div className="project-breakdown">
              <article className="breakdown-item">
                <p className="breakdown-label">problema</p>
                <p className="breakdown-text">
                  El onboarding técnico era lento por diferencias de entorno
                  entre integrantes.
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">mi rol</p>
                <p className="breakdown-text">
                  Participé en frontend y backend, y trabajé la
                  contenedorización con Docker.
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">impacto</p>
                <p className="breakdown-text">
                  Se estandarizó el entorno de desarrollo y se aceleró la
                  incorporación técnica del equipo.
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
            <p className="section-label">03 habilidades</p>
            <h2 className="section-title">Mi stack.</h2>
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
                <span className="skill-bar-level">intermedio</span>
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
                <span className="skill-bar-level">intermedio</span>
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
                <span className="skill-bar-level">intermedio</span>
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
                <span className="skill-bar-level">básico</span>
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
                <span className="skill-bar-level">básico</span>
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
                <span className="skill-bar-level">básico</span>
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
                <span className="skill-bar-level">básico</span>
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
                <span className="skill-bar-level">básico</span>
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
                <span className="skill-bar-level">básico</span>
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
                <span className="skill-bar-level">básico</span>
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
                <span className="skill-bar-level">intermedio</span>
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
                <span className="skill-bar-level">intermedio</span>
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
                <span className="skill-bar-level">básico</span>
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
                <span className="skill-bar-level">intermedio</span>
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
                <span className="skill-bar-level">básico</span>
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
                <span className="skill-bar-level">básico</span>
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
                <span className="skill-bar-level">básico</span>
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
                <span className="skill-bar-level">intermedio</span>
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
                <span className="skill-bar-level">básico</span>
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
                <span className="skill-bar-level">básico</span>
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
                <span className="skill-bar-level">básico</span>
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
                  Inglés
                </span>
                <span className="skill-bar-level">intermedio</span>
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
          <p className="section-label">04 contacto</p>
          <h2 className="contact-big">
            ¿Trabajamos
            <br />
            <span className="accent">juntos?</span>
          </h2>
          <div className="availability-box" aria-label="Disponibilidad laboral">
            <div className="availability-layout">
              <div className="availability-main">
                <p className="availability-title">disponibilidad</p>
                <ul className="availability-list">
                  <li>Inicio: inmediato</li>
                  <li>Modalidad: remoto o híbrido</li>
                  <li>
                    Franja horaria: UTC-3 con superposición en cualquier horario
                    del mundo
                  </li>
                  <li>Rol objetivo: full stack junior</li>
                </ul>
              </div>
              <div className="availability-actions">
                <div className="contact-links">
                  <a
                    href="mailto:devbel_@outlook.com"
                    className="btn-primary contact-email-btn"
                  >
                    ✉ enviar email
                  </a>
                  <a
                    href="https://github.com/devbelen"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline"
                  >
                    ⌥ GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/miperfilbelenrodriguez/"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline"
                  >
                    in LinkedIn
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
          <span className="accent">devbelen</span> — diseñado y desarrollado
        </p>
        <p>
          hecho con <span className="accent">♥</span> y mucho mate
        </p>
      </footer>
    </>
  );
}

export default App;
