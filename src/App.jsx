import { useEffect } from 'react';
import { useCursor } from './hooks/useCursor';
import { useRevealOnScroll } from './hooks/useRevealOnScroll';
import { useSidebar } from './hooks/useSidebar';
import { useTerminalAnimation } from './hooks/useTerminalAnimation';

function App() {
  const { cursorRef, ringRef, handleHoverEnter, handleHoverLeave } = useCursor();
  const { isOpen: sidebarOpen, openSidebar, closeSidebar } = useSidebar();
  const { ref: aboutRef } = useRevealOnScroll(0.15);
  const { ref: projectsRef } = useRevealOnScroll(0.15);
  const { ref: skillsRef } = useRevealOnScroll(0.15);
  const { termBodyRef, lines } = useTerminalAnimation();

  useEffect(() => {
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleHoverEnter);
      link.addEventListener('mouseleave', handleHoverLeave);
    });
    return () => {
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleHoverEnter);
        link.removeEventListener('mouseleave', handleHoverLeave);
      });
    };
  }, [handleHoverEnter, handleHoverLeave]);

  return (
    <>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={ringRef} className="cursor-ring"></div>

      {/* NAV */}
      <nav>
        <a href="#hero" className="logo">endbel<span>.dev</span></a>
        <ul className="nav-links">
          <li><a href="#about" data-num="01">sobre mí</a></li>
          <li><a href="#projects" data-num="02">proyectos</a></li>
          <li><a href="#skills" data-num="03">skills</a></li>
          <li><a href="#contact" data-num="04">contacto</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="glow-blob"></div>
        <div className="hero-inner">
          <p className="hero-tag">JUNIOR DEVELOPER — AVAILABLE</p>
          <h1 className="hero-name">
            Hola,<br />
            soy <span style={{ color: 'var(--accent)' }}>Belén</span>
            <br />
            <span className="line2">Developer.</span>
          </h1>
          <p className="hero-desc">
            Construyo experiencias web funcionales y elegantes. Apasionada por el código limpio, los proyectos de impacto y el aprendizaje continuo.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn-primary">Ver proyectos</a>
            <a href="#contact" className="btn-outline">Contactar</a>
          </div>
        </div>
        <div className="scroll-hint">scroll</div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={aboutRef}>
        <div className="reveal">
          <p className="section-label">01 — sobre mí</p>
          <h2 className="section-title">Código con<br />propósito.</h2>
          <div className="about-text">
            <p>
              Hola, soy <strong>Belén</strong>, desarrolladora junior con base en <strong>HTML, CSS, JavaScript, Node.js, React, Python, PHP, TypeScript, MySQL y Java</strong>. Me enfoco en construir proyectos reales que resuelvan problemas reales.
            </p>
            <p>
              Me interesa especialmente el desarrollo <strong>full-stack</strong> y los proyectos de alto impacto. Tengo habilidades de <strong>resolución de problemas</strong>, trabajo en equipo y familiaridad con <strong>metodologías ágiles (Scrum)</strong>. Actualmente construyendo mi portfolio y sumando proyectos que demuestren mis capacidades.
            </p>
            <p>
              Manejo <strong>inglés intermedio</strong> con capacidad de leer documentación técnica y comunicarme en entornos de trabajo.
            </p>
          </div>
          <div className="stack-grid">
            <div className="stack-item">
              <a href="https://www.google.com/search?q=HTML+que+es" target="_blank" rel="noreferrer" className="stack-link">
                <span className="stack-icon"><i className="devicon-html5-plain"></i></span>
                <span className="stack-name">HTML</span>
              </a>
            </div>
            <div className="stack-item">
              <a href="https://www.google.com/search?q=CSS+que+es" target="_blank" rel="noreferrer" className="stack-link">
                <span className="stack-icon"><i className="devicon-css3-plain"></i></span>
                <span className="stack-name">CSS</span>
              </a>
            </div>
            <div className="stack-item">
              <a href="https://www.google.com/search?q=JavaScript+que+es" target="_blank" rel="noreferrer" className="stack-link">
                <span className="stack-icon"><i className="devicon-javascript-plain"></i></span>
                <span className="stack-name">JavaScript</span>
              </a>
            </div>
            <div className="stack-item">
              <a href="https://www.google.com/search?q=TypeScript+que+es" target="_blank" rel="noreferrer" className="stack-link">
                <span className="stack-icon"><i className="devicon-typescript-plain"></i></span>
                <span className="stack-name">TypeScript</span>
              </a>
            </div>
            <div className="stack-item">
              <a href="https://www.google.com/search?q=React+que+es" target="_blank" rel="noreferrer" className="stack-link">
                <span className="stack-icon"><i className="devicon-react-original"></i></span>
                <span className="stack-name">React</span>
              </a>
            </div>
            <div className="stack-item">
              <a href="https://www.google.com/search?q=Node.js+que+es" target="_blank" rel="noreferrer" className="stack-link">
                <span className="stack-icon"><i className="devicon-nodejs-plain"></i></span>
                <span className="stack-name">Node.js</span>
              </a>
            </div>
            <div className="stack-item">
              <a href="https://www.google.com/search?q=Python+que+es" target="_blank" rel="noreferrer" className="stack-link">
                <span className="stack-icon"><i className="devicon-python-plain"></i></span>
                <span className="stack-name">Python</span>
              </a>
            </div>
            <div className="stack-item">
              <a href="https://www.google.com/search?q=PHP+que+es" target="_blank" rel="noreferrer" className="stack-link">
                <span className="stack-icon"><i className="devicon-php-plain"></i></span>
                <span className="stack-name">PHP</span>
              </a>
            </div>
            <div className="stack-item">
              <a href="https://www.google.com/search?q=Java+que+es" target="_blank" rel="noreferrer" className="stack-link">
                <span className="stack-icon"><i className="devicon-java-plain"></i></span>
                <span className="stack-name">Java</span>
              </a>
            </div>
            <div className="stack-item">
              <a href="https://www.google.com/search?q=MySQL+que+es" target="_blank" rel="noreferrer" className="stack-link">
                <span className="stack-icon"><i className="devicon-mysql-plain"></i></span>
                <span className="stack-name">MySQL</span>
              </a>
            </div>
            <div className="stack-item">
              <a href="https://www.google.com/search?q=Docker+que+es" target="_blank" rel="noreferrer" className="stack-link">
                <span className="stack-icon"><i className="devicon-docker-plain"></i></span>
                <span className="stack-name">Docker</span>
              </a>
            </div>
            <div className="stack-item">
              <a href="https://www.google.com/search?q=Git+que+es" target="_blank" rel="noreferrer" className="stack-link">
                <span className="stack-icon"><i className="devicon-git-plain"></i></span>
                <span className="stack-name">Git</span>
              </a>
            </div>
            <div className="stack-item">
              <a href="https://www.google.com/search?q=GitHub+que+es" target="_blank" rel="noreferrer" className="stack-link">
                <span className="stack-icon"><i className="devicon-github-original"></i></span>
                <span className="stack-name">GitHub</span>
              </a>
            </div>
            <div className="stack-item">
              <a href="https://www.google.com/search?q=npm+que+es" target="_blank" rel="noreferrer" className="stack-link">
                <span className="stack-icon"><i className="devicon-npm-original-wordmark"></i></span>
                <span className="stack-name">npm</span>
              </a>
            </div>
            <div className="stack-item">
              <a href="https://www.google.com/search?q=APIs+que+es" target="_blank" rel="noreferrer" className="stack-link">
                <span className="stack-icon"><i className="fa-solid fa-plug" style={{ color: 'var(--accent)' }}></i></span>
                <span className="stack-name">APIs</span>
              </a>
            </div>
            <div className="stack-item">
              <a href="https://www.google.com/search?q=Bash+que+es" target="_blank" rel="noreferrer" className="stack-link">
                <span className="stack-icon"><i className="devicon-bash-plain"></i></span>
                <span className="stack-name">Bash</span>
              </a>
            </div>
            <div className="stack-item">
              <a href="https://www.google.com/search?q=Scrum+que+es" target="_blank" rel="noreferrer" className="stack-link">
                <span className="stack-icon"><i className="fa-solid fa-arrows-spin" style={{ color: 'var(--accent)' }}></i></span>
                <span className="stack-name">Scrum</span>
              </a>
            </div>
            <div className="stack-item">
              <a href="https://www.google.com/search?q=nivel+ingles+B1+que+es" target="_blank" rel="noreferrer" className="stack-link">
                <span className="stack-icon"><i className="fa-solid fa-comments" style={{ color: 'var(--accent)' }}></i></span>
                <span className="stack-name">Inglés B1</span>
              </a>
            </div>
          </div>
        </div>

        {/* TERMINAL */}
        <div className="about-visual reveal">
          <div className="terminal">
            <div className="terminal-bar">
              <span className="t-dot" style={{ background: '#ff5f57' }}></span>
              <span className="t-dot" style={{ background: '#febc2e' }}></span>
              <span className="t-dot" style={{ background: '#28c840' }}></span>
              <span className="t-title">belen@portfolio ~</span>
            </div>
            <div className="terminal-body" ref={termBodyRef}></div>
          </div>
          <div className="accent-corner"></div>
          <div className="accent-corner2"></div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" ref={projectsRef}>
        <div className="projects-header reveal">
          <div>
            <p className="section-label">02 — proyectos</p>
            <h2 className="section-title">Lo que<br />he construido.</h2>
          </div>
        </div>

        <div className="project-grid reveal">
          <div className="project-card">
            <p className="project-num">// 001</p>
            <h3 className="project-title">App del Clima</h3>
            <p className="project-desc">Aplicación web que consulta una API pública para mostrar el clima actual según la ciudad ingresada. Trabajé con fetch, manejo de JSON y diseño responsive.</p>
            <div className="project-tags">
              <span className="tag">HTML</span>
              <span className="tag">CSS</span>
              <span className="tag">API REST</span>
            </div>
            <div className="project-links">
              <a href="https://github.com/endbel/mi-proyecto-clima" target="_blank" rel="noreferrer" className="project-link">⌥ github</a>
            </div>
          </div>

          <div className="project-card">
            <p className="project-num">// 002</p>
            <h3 className="project-title">Conversor de Monedas</h3>
            <p className="project-desc">Aplicación de consola en Java que convierte entre distintas monedas. Consolidé el uso de programación orientada a objetos, estructuras de control y manejo de entrada/salida.</p>
            <div className="project-tags">
              <span className="tag">Java</span>
              <span className="tag">POO</span>
              <span className="tag">CLI</span>
            </div>
            <div className="project-links">
              <a href="https://github.com/endbel/ConversorDeMonedasJava" target="_blank" rel="noreferrer" className="project-link">⌥ github</a>
            </div>
          </div>

          <div className="project-card">
            <p className="project-num">// 003</p>
            <h3 className="project-title">Voz Ciudadana</h3>
            <p className="project-desc">Plataforma full stack desarrollada en equipo que permite a ciudadanos reportar y visualizar problemas urbanos. Participé en frontend y backend con React, TypeScript y Node.js bajo metodología ágil.</p>
            <div className="project-tags">
              <span className="tag">React</span>
              <span className="tag">TypeScript</span>
              <span className="tag">Node.js</span>
              <span className="tag">Vite</span>
            </div>
            <div className="project-links">
              <a href="https://github.com/endbel/vozCiudadana" target="_blank" rel="noreferrer" className="project-link">⌥ github</a>
            </div>
          </div>

          <div className="project-card">
            <p className="project-num">// 004</p>
            <h3 className="project-title">ToDos App</h3>
            <p className="project-desc">App de gestión de tareas desarrollada en equipo para la UTN. Incluye registro de usuarios, prioridades, categorías, filtros y diseño mobile-first. Participé en frontend y backend.</p>
            <div className="project-tags">
              <span className="tag">HTML</span>
              <span className="tag">CSS</span>
              <span className="tag">JavaScript</span>
              <span className="tag">PHP</span>
              <span className="tag">MySQL</span>
            </div>
            <div className="project-links">
              <a href="https://github.com/DDarioBenitez/ToDos_app" target="_blank" rel="noreferrer" className="project-link">⌥ github</a>
            </div>
          </div>

          <div className="project-card">
            <p className="project-num">// 005</p>
            <h3 className="project-title">Demo Clínica</h3>
            <p className="project-desc">Sistema de gestión clínica desarrollado en equipo. Incluye autenticación, dashboard, gestión de pacientes y turnos. Participé en el frontend y base de datos con Next.js, Prisma y TypeScript.</p>
            <div className="project-tags">
              <span className="tag">Next.js</span>
              <span className="tag">React</span>
              <span className="tag">TypeScript</span>
              <span className="tag">Tailwind</span>
              <span className="tag">Prisma</span>
            </div>
            <div className="project-links">
              <a href="https://github.com/reedq1/demo-clinica" target="_blank" rel="noreferrer" className="project-link">⌥ github</a>
            </div>
          </div>

          <div className="project-card">
            <p className="project-num">// 006</p>
            <h3 className="project-title">CICI App</h3>
            <p className="project-desc">Plataforma de gestión para academia de inglés desarrollada en equipo. Administra alumnos, clases y profesores. Participé en frontend y backend con contenedorización mediante Docker.</p>
            <div className="project-tags">
              <span className="tag">JavaScript</span>
              <span className="tag">HTML/CSS</span>
              <span className="tag">Tailwind</span>
              <span className="tag">Prisma</span>
              <span className="tag">Docker</span>
            </div>
            <div className="project-links">
              <a href="https://github.com/endbel/cici-app" target="_blank" rel="noreferrer" className="project-link">⌥ github</a>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" ref={skillsRef}>
        <div className="skills-inner">
          <div className="reveal">
            <p className="section-label">03 — habilidades</p>
            <h2 className="section-title">Mi stack.</h2>
          </div>

          <div className="skills-row reveal">
            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">HTML</span>
                <span className="skill-bar-level">intermedio</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="75"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">CSS</span>
                <span className="skill-bar-level">intermedio</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="70"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">JavaScript</span>
                <span className="skill-bar-level">intermedio</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="65"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">TypeScript</span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="35"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">React</span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="45"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">Node.js</span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="45"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">PHP</span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="35"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">Python</span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="40"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">Java</span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="35"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">MySQL</span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="40"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">Git</span>
                <span className="skill-bar-level">intermedio</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="60"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">GitHub</span>
                <span className="skill-bar-level">intermedio</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="60"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">npm</span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="50"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">APIs</span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="50"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">Docker</span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="30"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">Bash</span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="30"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">Inglés</span>
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
      <section id="contact">
        <div className="reveal">
          <p className="section-label">04 — contacto</p>
          <h2 className="contact-big">¿Trabajamos<br /><span className="accent">juntos?</span></h2>
          <p className="contact-sub">Abierta a oportunidades, proyectos freelance y colaboraciones.</p>
          <div className="contact-links">
            <a href="mailto:tu@email.com" className="btn-primary">✉ enviar email</a>
            <a href="https://github.com/endbel" target="_blank" rel="noreferrer" className="btn-outline">⌥ GitHub</a>
            <a href="https://www.linkedin.com/in/miperfilbelenrodriguez/" target="_blank" rel="noreferrer" className="btn-outline">in LinkedIn</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2024 <span className="accent">Belén</span> · <span className="accent">endbel</span> — diseñado y desarrollado</p>
        <p>hecho con <span className="accent">♥</span> y mucho mate</p>
      </footer>
    </>
  );
}

export default App;
