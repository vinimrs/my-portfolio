"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    number: "01",
    tag: "FINTECH · DISTRIBUTED SYSTEMS",
    title: "Pix Keys Platform",
    copy: "A resilient event-driven architecture for managing instant-payment keys and claims, designed around consistency, reconciliation and operational clarity.",
    stack: ["Go", "PostgreSQL", "SQS", "Kubernetes"],
    accent: "blue",
  },
  {
    number: "02",
    tag: "PLATFORM ENGINEERING",
    title: "Audit as a Capability",
    copy: "A reusable audit foundation that turned compliance requirements into a developer-friendly capability across financial backoffice journeys.",
    stack: ["Go", "Kafka", "Observability", "DDD"],
    accent: "ink",
  },
  {
    number: "03",
    tag: "RESEARCH · CYBERSECURITY",
    title: "Systems That Defend Themselves",
    copy: "Graduate research exploring self-protection and self-healing strategies for security in microservice ecosystems.",
    stack: ["MAPE-K", "Microservices", "Security", "AI"],
    accent: "orange",
  },
];

function Arrow({
  symbol = "↗",
  className = "",
}: {
  symbol?: "↗" | "↘" | "↓" | "↑";
  className?: string;
}) {
  return (
    <span className={`arrow-glyph ${className}`} aria-hidden="true">
      {symbol}&#xfe0e;
    </span>
  );
}

export default function Home() {
  const [time, setTime] = useState("");
  const cursor = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const research = useRef<HTMLElement>(null);
  const researchReveal = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const updateTime = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Maceio",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    updateTime();
    const interval = window.setInterval(updateTime, 30_000);

    const moveCursor = (event: PointerEvent) => {
      if (cursor.current) {
        cursor.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };
    const moveHeroGlow = (event: PointerEvent) => {
      if (!hero.current) return;
      const bounds = hero.current.getBoundingClientRect();
      hero.current.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
      hero.current.style.setProperty("--my", `${event.clientY - bounds.top}px`);
    };
    const showHeroGlow = () =>
      hero.current?.style.setProperty("--hero-glow-opacity", "1");
    const hideHeroGlow = () =>
      hero.current?.style.setProperty("--hero-glow-opacity", "0");
    let previousResearchPoint: { x: number; y: number } | null = null;
    const prepareResearchCanvas = () => {
      const canvas = researchReveal.current;
      const section = research.current;
      if (!canvas || !section) return;
      const bounds = section.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(bounds.width * pixelRatio);
      canvas.height = Math.round(bounds.height * pixelRatio);
      const context = canvas.getContext("2d");
      if (!context) return;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.globalCompositeOperation = "source-over";
      context.fillStyle = "#194bff";
      context.fillRect(0, 0, bounds.width, bounds.height);
    };
    const revealResearchPoint = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
    ) => {
      const gradient = context.createRadialGradient(
        x,
        y,
        radius * 0.08,
        x,
        y,
        radius,
      );
      gradient.addColorStop(0, "rgba(0,0,0,1)");
      gradient.addColorStop(0.48, "rgba(0,0,0,.88)");
      gradient.addColorStop(0.76, "rgba(0,0,0,.38)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = gradient;
      context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    };
    const moveResearchImage = (event: PointerEvent) => {
      const section = research.current;
      const canvas = researchReveal.current;
      const context = canvas?.getContext("2d");
      if (!section || !canvas || !context || event.pointerType === "touch") return;
      const bounds = section.getBoundingClientRect();
      const current = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
      context.globalCompositeOperation = "destination-out";

      if (!previousResearchPoint) {
        revealResearchPoint(context, current.x, current.y, 145);
        previousResearchPoint = current;
        return;
      }

      const distance = Math.hypot(
        current.x - previousResearchPoint.x,
        current.y - previousResearchPoint.y,
      );
      const steps = Math.max(1, Math.ceil(distance / 18));
      for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps;
        const x =
          previousResearchPoint.x +
          (current.x - previousResearchPoint.x) * progress;
        const y =
          previousResearchPoint.y +
          (current.y - previousResearchPoint.y) * progress;
        const organicWave =
          Math.sin((x + y) * 0.018) * 17 +
          Math.sin(x * 0.041) * 9;
        revealResearchPoint(context, x, y, 138 + organicWave);
      }
      previousResearchPoint = current;
    };
    const endResearchTrail = () => {
      previousResearchPoint = null;
    };

    window.addEventListener("pointermove", moveCursor);
    window.addEventListener("resize", prepareResearchCanvas);
    const heroElement = hero.current;
    const researchElement = research.current;
    prepareResearchCanvas();
    heroElement?.addEventListener("pointermove", moveHeroGlow);
    heroElement?.addEventListener("pointerenter", showHeroGlow);
    heroElement?.addEventListener("pointerleave", hideHeroGlow);
    researchElement?.addEventListener("pointermove", moveResearchImage);
    researchElement?.addEventListener("pointerleave", endResearchTrail);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("resize", prepareResearchCanvas);
      heroElement?.removeEventListener("pointermove", moveHeroGlow);
      heroElement?.removeEventListener("pointerenter", showHeroGlow);
      heroElement?.removeEventListener("pointerleave", hideHeroGlow);
      researchElement?.removeEventListener("pointermove", moveResearchImage);
      researchElement?.removeEventListener("pointerleave", endResearchTrail);
    };
  }, []);

  return (
    <main>
      <div className="cursor" ref={cursor} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="nav shell">
        <a className="brand magnetic" href="#top" aria-label="Vinicius Romualdo, home">
          VR<span>®</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#writing">Writing</a>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#research">Research</a>
          <a href="#about">About</a>
        </nav>
        <a
          className="nav-cta magnetic"
          href="/vinicius-romualdo-resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Résumé <Arrow />
        </a>
      </header>

      <section className="hero shell" id="top" ref={hero}>
        <div className="eyebrow reveal">
          <span>Software Engineer</span>
          <span>Fintech · Distributed Systems</span>
        </div>

        <h1 aria-label="I build reliable financial and distributed systems.">
          <span className="hero-line line-one">
            <span>I build reliable</span>
            <i aria-hidden="true">●</i>
          </span>
          <span className="hero-line line-two">financial &amp;</span>
          <span className="hero-line line-three">
            <span>distributed</span>
            <em>systems.</em>
          </span>
        </h1>

        <div className="hero-footer reveal delay-3">
          <p>
            Software Engineer at iFood working across backend architecture,
            event-driven platforms and production observability while
            researching adaptive security at USP.
          </p>
          <div className="hero-actions">
            <a className="circle-link magnetic" href="#work" aria-label="Explore selected work">
              <span>Explore</span>
              <span>selected work</span>
              <Arrow symbol="↓" className="circle-arrow" />
            </a>
            <a className="article-shortcut" href="#writing">
              <small>Featured</small>
              Read technical article <Arrow symbol="↘" />
            </a>
          </div>
          <div className="availability">
            <span className="pulse" />
            <span>Remote / Hybrid</span>
            <strong>Brazil-friendly time zones · {time} BRT</strong>
          </div>
        </div>
        <div className="kinetic-track" aria-hidden="true">
          <span>BUILD · OBSERVE · ADAPT · BUILD · OBSERVE · ADAPT ·&nbsp;</span>
          <span>BUILD · OBSERVE · ADAPT · BUILD · OBSERVE · ADAPT ·&nbsp;</span>
        </div>
      </section>

      <section className="writing shell" id="writing">
        <div className="writing-index">
          <p className="section-label">01 / Featured technical writing</p>
          <span>Medium · Architecture</span>
        </div>
        <a
          className="article-feature"
          href="https://medium.com/@viniciusromualdobusiness/clean-architecture-with-spring-boot-a-good-idea-d6f97e450130"
          target="_blank"
          rel="noreferrer"
        >
          <div className="article-meta">
            <span>Spring Boot · Clean Architecture · Trade-offs</span>
            <span className="article-read">
              Read the case study <Arrow />
            </span>
          </div>
          <h2>
            Is Clean Architecture
            <br />
            always a
            <br />
            <em>good idea?</em>
          </h2>
          <div className="article-summary">
            <p>
              A practical analysis of boundaries, abstractions and the cost of
              applying Clean Architecture to modern Spring Boot services.
            </p>
            <div className="article-takeaway">
              <span>Key question</span>
              <strong>
                When does architectural discipline create leverage, and when
                does it become accidental complexity?
              </strong>
            </div>
          </div>
        </a>
      </section>

      <section className="statement shell" id="about">
        <p className="section-label">02 / About</p>
        <div>
          <p className="big-copy">
            Engineering is not only about making systems work.
            <span> It is about making complexity feel simple.</span>
          </p>
          <div className="about-grid">
            <p>
              I&apos;m Vinicius, a Brazilian software engineer working at the
              intersection of financial infrastructure, distributed systems,
              and security.
            </p>
            <p>
              My work spans backend architecture, event-driven platforms,
              observability, and experiences used in high-trust environments.
            </p>
          </div>
          <div className="profile-links" aria-label="Professional profiles">
            <a href="https://www.linkedin.com/in/vinimrs/" target="_blank" rel="noreferrer">
              LinkedIn <Arrow />
            </a>
            <a href="https://github.com/vinimrs" target="_blank" rel="noreferrer">
              GitHub <Arrow />
            </a>
            <a href="/vinicius-romualdo-resume.pdf" target="_blank" rel="noreferrer">
              Résumé <Arrow symbol="↓" />
            </a>
          </div>
        </div>
      </section>

      <section className="work shell" id="work">
        <div className="section-heading">
          <p className="section-label">03 / Selected work</p>
          <p>Impact over output. Systems over screens.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className={`project ${project.accent}`} key={project.number}>
              <div className="project-top">
                <span>{project.number}</span>
                <span>{project.tag}</span>
                <Arrow className="project-arrow" />
              </div>
              <div className="project-body">
                <h2>{project.title}</h2>
                <p>{project.copy}</p>
              </div>
              <div className="project-stack">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="experience shell" id="experience">
        <div className="section-heading">
          <p className="section-label">04 / Experience</p>
          <p>Ownership, architectural decisions and production impact.</p>
        </div>
        <div className="timeline">
          <article>
            <div className="timeline-meta">
              <span>2024 to Present</span>
              <span>iFood</span>
            </div>
            <div>
              <h2>Software Engineer</h2>
              <p>
                Building financial products and platform capabilities across
                Pix, transfers and banking journeys. Designing backend services
                with Go and Kotlin, event-driven integrations, caching and
                observability for reliable production operation.
              </p>
              <ul className="impact-list">
                <li>Financial and transaction systems</li>
                <li>Distributed, event-driven services</li>
                <li>Reliability and production observability</li>
              </ul>
            </div>
          </article>
          <article>
            <div className="timeline-meta">
              <span>2023 to 2024</span>
              <span>FAPESP</span>
            </div>
            <div>
              <h2>Scientific Researcher</h2>
              <p>
                Designed and delivered web architecture for technology-assisted
                mental-health research using Next.js, TypeScript and CI/CD.
              </p>
            </div>
          </article>
          <article>
            <div className="timeline-meta">
              <span>2021 to 2027</span>
              <span>UFSCar · USP</span>
            </div>
            <div>
              <h2>Computer Science</h2>
              <p>
                B.Sc. in Computer Science at UFSCar and M.Sc. candidate at
                USP, researching self-adaptive security for microservices.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="research shell" id="research" ref={research}>
        <div className="research-photo" aria-hidden="true">
          <img
            src="/usp-campus.jpg"
            alt=""
            draggable="false"
          />
        </div>
        <canvas
          className="research-reveal"
          ref={researchReveal}
          aria-hidden="true"
        />
        <div className="orb" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="section-label">05 / Graduate research · USP</p>
        <h2>
          Can software
          <br />
          <span>protect itself?</span>
        </h2>
        <p className="research-copy">
          Researching self-adaptive security for microservices, connecting
          MAPE-K, detection, prevention and recovery.
        </p>
        <div className="research-tags" aria-label="Research topics">
          <span>Self-protection</span>
          <span>Self-healing</span>
          <span>Microservices security</span>
        </div>
      </section>

      <footer className="footer shell" id="contact">
        <div className="footer-intro">
          <p>Have an ambitious system to build?</p>
          <h2>Let&apos;s make it real.</h2>
        </div>
        <a
          className="contact-link magnetic"
          href="mailto:viniciusromualdobusiness@gmail.com"
        >
          Start a conversation <Arrow />
        </a>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/vinimrs/" target="_blank" rel="noreferrer">
            LinkedIn <Arrow />
          </a>
          <a href="https://github.com/vinimrs" target="_blank" rel="noreferrer">
            GitHub <Arrow />
          </a>
          <a
            href="https://medium.com/@viniciusromualdobusiness"
            target="_blank"
            rel="noreferrer"
          >
            Medium <Arrow />
          </a>
          <a href="/vinicius-romualdo-resume.pdf" target="_blank" rel="noreferrer">
            Résumé <Arrow symbol="↓" />
          </a>
        </div>
        <div className="footer-bottom">
          <span>Vinicius Romualdo © 2026</span>
          <span>Based in Brazil · Americas &amp; European time-zone overlap</span>
          <a href="#top">
            Back to top <Arrow symbol="↑" />
          </a>
        </div>
      </footer>
    </main>
  );
}
