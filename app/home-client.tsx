"use client";

import { useEffect, useRef, useState } from "react";
import type { SiteLocale } from "./i18n";

const translations = {
  en: {
    nav: {
      label: "Main navigation",
      writing: "Writing",
      work: "Work",
      experience: "Experience",
      research: "Research",
      about: "About",
      resume: "Résumé",
    },
    hero: {
      role: "Software Engineer",
      focus: "Fintech · Distributed Systems",
      ariaLabel: "I build reliable financial and distributed systems.",
      lineOne: "I build reliable",
      lineTwo: "financial &",
      lineThree: "distributed",
      lineFour: "systems.",
      summary:
        "Software Engineer at iFood working across backend architecture, event-driven platforms and production observability while researching adaptive security at USP.",
      exploreOne: "Explore",
      exploreTwo: "selected work",
      exploreLabel: "Explore selected work",
      featured: "Featured",
      readArticle: "Read technical article",
      workMode: "Remote / Hybrid",
      timeZones: "Brazil-friendly time zones",
      kinetic: "BUILD · OBSERVE · ADAPT · BUILD · OBSERVE · ADAPT · ",
    },
    writing: {
      label: "01 / Featured technical writing",
      category: "Medium · Architecture",
      topics: "Spring Boot · Clean Architecture · Trade-offs",
      read: "Read the case study",
      titleOne: "Is Clean Architecture",
      titleTwo: "always a",
      titleThree: "good idea?",
      summary:
        "A practical analysis of boundaries, abstractions and the cost of applying Clean Architecture to modern Spring Boot services.",
      questionLabel: "Key question",
      question:
        "When does architectural discipline create leverage, and when does it become accidental complexity?",
    },
    about: {
      label: "02 / About",
      statement: "Engineering is not only about making systems work.",
      statementAccent: " It is about making complexity feel simple.",
      intro:
        "I'm Vinicius, a Brazilian software engineer working at the intersection of financial infrastructure, distributed systems, and security.",
      scope:
        "My work spans backend architecture, event-driven platforms, observability, and experiences used in high-trust environments.",
      profilesLabel: "Professional profiles",
      resume: "Résumé",
    },
    work: {
      label: "03 / Selected work",
      statement: "Impact over output. Systems over screens.",
    },
    experience: {
      label: "04 / Experience & education",
      statement: "Ownership, architectural decisions and production impact.",
      present: "2024 to Present",
      engineer: "Software Engineer",
      engineerCopy:
        "Building financial products and platform capabilities across Pix, transfers and banking journeys. Designing backend services with Go and Kotlin, event-driven integrations, caching and observability for reliable production operation.",
      impacts: [
        "Financial and transaction systems",
        "Distributed, event-driven services",
        "Reliability and production observability",
      ],
      researcherPeriod: "2023 to 2024",
      researcher: "Scientific Researcher",
      researcherCopy:
        "Designed and delivered web architecture for technology-assisted mental-health research using Next.js, TypeScript and CI/CD.",
      mastersStatus: "M.Sc. · In progress",
      mastersInstitution: "USP",
      mastersDegree: "M.Sc. in Computer Science",
      mastersCopy:
        "Graduate research in self-adaptive security for microservices, focused on software that can detect, prevent and recover from threats.",
      bachelorsStatus: "B.Sc. · Completed",
      bachelorsInstitution: "UFSCar",
      bachelorsDegree: "B.Sc. in Computer Science",
      bachelorsCopy: "Bachelor's degree in Computer Science from UFSCar.",
    },
    research: {
      label: "05 / Graduate research · USP",
      titleOne: "Can software",
      titleTwo: "protect itself?",
      copy: "Researching self-adaptive security for microservices, connecting MAPE-K, detection, prevention and recovery.",
      topicsLabel: "Research topics",
      topics: ["Self-protection", "Self-healing", "Microservices security"],
    },
    footer: {
      intro: "Have an ambitious system to build?",
      title: "Let's make it real.",
      contact: "Start a conversation",
      resume: "Résumé",
      location: "Based in Brazil · Americas & European time-zone overlap",
      backToTop: "Back to top",
    },
    projects: [
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
    ],
  },
  "pt-BR": {
    nav: {
      label: "Navegação principal",
      writing: "Artigos",
      work: "Projetos",
      experience: "Experiência",
      research: "Pesquisa",
      about: "Sobre",
      resume: "Currículo",
    },
    hero: {
      role: "Engenheiro de Software",
      focus: "Fintech · Sistemas Distribuídos",
      ariaLabel: "Construo produtos financeiros apoiados por sistemas distribuídos.",
      lineOne: "Construo produtos",
      lineTwo: "financeiros em",
      lineThree: "sistemas",
      lineFour: "distribuídos.",
      summary:
        "No iFood, construo serviços backend para produtos financeiros, com arquitetura orientada a eventos e observabilidade de produção. Na USP, pesquiso segurança adaptativa para microsserviços.",
      exploreOne: "Veja",
      exploreTwo: "meus projetos",
      exploreLabel: "Veja meus principais projetos",
      featured: "Artigo em destaque",
      readArticle: "Leia no Medium",
      workMode: "Remoto ou híbrido",
      timeZones: "Horário de Brasília",
      kinetic: "PROJETAR · CONSTRUIR · OBSERVAR · EVOLUIR · PROJETAR · CONSTRUIR · OBSERVAR · EVOLUIR · ",
    },
    writing: {
      label: "01 / Leitura em destaque",
      category: "Engenharia de Software · Arquitetura",
      topics: "Spring Boot · Clean Architecture · Trade-offs",
      read: "Ler artigo no Medium",
      titleOne: "Quando Clean Architecture",
      titleTwo: "deixa de ser uma",
      titleThree: "boa escolha?",
      summary:
        "Uma discussão prática sobre os limites, as abstrações e o custo real de aplicar Clean Architecture em serviços modernos com Spring Boot.",
      questionLabel: "Pergunta que guia o artigo",
      question:
        "Em que momento o rigor arquitetural deixa de ajudar e começa a criar complexidade sem retorno?",
    },
    about: {
      label: "02 / Sobre mim",
      statement: "Código em produção precisa fazer mais do que funcionar.",
      statementAccent: " Precisa tornar o complexo previsível.",
      intro:
        "Sou Vinicius, engenheiro de software brasileiro. Trabalho na interseção entre produtos financeiros, sistemas distribuídos e segurança.",
      scope:
        "Projeto serviços backend e plataformas orientadas a eventos para contextos em que confiabilidade, rastreabilidade e clareza operacional são essenciais.",
      profilesLabel: "Perfis profissionais",
      resume: "Currículo",
    },
    work: {
      label: "03 / Projetos selecionados",
      statement: "Projetos em que boas decisões de arquitetura viraram resultado.",
    },
    experience: {
      label: "04 / Experiência e formação",
      statement: "Decisões técnicas com responsabilidade de ponta a ponta.",
      present: "2024 até o presente",
      engineer: "Engenheiro de Software",
      engineerCopy:
        "No iFood, desenvolvo produtos financeiros e capacidades de plataforma para Pix, transferências e jornadas bancárias. Projeto serviços em Go e Kotlin, integrações orientadas a eventos, estratégias de cache e observabilidade para manter a operação confiável em produção.",
      impacts: [
        "Produtos financeiros e transacionais",
        "Arquitetura distribuída e orientada a eventos",
        "Confiabilidade e observabilidade em produção",
      ],
      researcherPeriod: "2023 a 2024",
      researcher: "Pesquisador Científico",
      researcherCopy:
        "Projetei e implementei a arquitetura web de uma pesquisa em saúde mental apoiada por tecnologia, usando Next.js, TypeScript e CI/CD.",
      mastersStatus: "Mestrado · Em andamento",
      mastersInstitution: "USP",
      mastersDegree: "Mestrado em Ciência da Computação",
      mastersCopy:
        "Na USP, pesquiso segurança autoadaptativa para microsserviços, com foco em software capaz de detectar, prevenir e se recuperar de ameaças.",
      bachelorsStatus: "Graduação · Concluída",
      bachelorsInstitution: "UFSCar",
      bachelorsDegree: "Bacharelado em Ciência da Computação",
      bachelorsCopy: "Graduação em Ciência da Computação pela UFSCar.",
    },
    research: {
      label: "05 / Pesquisa de mestrado · USP",
      titleOne: "Software também pode",
      titleTwo: "se defender?",
      copy: "Minha pesquisa investiga como microsserviços podem reagir a ameaças de forma autônoma, combinando MAPE-K com mecanismos de detecção, prevenção e recuperação.",
      topicsLabel: "Temas da pesquisa",
      topics: ["Autoproteção", "Autorrecuperação", "Segurança de microsserviços"],
    },
    footer: {
      intro: "Tem um desafio técnico ambicioso pela frente?",
      title: "Vamos tirar do papel.",
      contact: "Fale comigo",
      resume: "Currículo",
      location: "Brasil · Trabalho com times nas Américas e na Europa",
      backToTop: "Voltar ao topo",
    },
    projects: [
      {
        number: "01",
        tag: "FINTECH · SISTEMAS DISTRIBUÍDOS",
        title: "Plataforma de Chaves Pix",
        copy: "Arquitetura orientada a eventos para gerenciar chaves e reivindicações Pix com consistência, conciliação e visibilidade operacional.",
        stack: ["Go", "PostgreSQL", "SQS", "Kubernetes"],
        accent: "blue",
      },
      {
        number: "02",
        tag: "ENGENHARIA DE PLATAFORMA",
        title: "Auditoria como Plataforma",
        copy: "Uma base reutilizável de auditoria que transformou requisitos de conformidade em uma capacidade simples de adotar nas jornadas de backoffice financeiro.",
        stack: ["Go", "Kafka", "Observabilidade", "DDD"],
        accent: "ink",
      },
      {
        number: "03",
        tag: "PESQUISA · CIBERSEGURANÇA",
        title: "Sistemas que se Defendem",
        copy: "Pesquisa de mestrado sobre estratégias de autoproteção e recuperação autônoma em ecossistemas de microsserviços.",
        stack: ["MAPE-K", "Microsserviços", "Segurança", "IA"],
        accent: "orange",
      },
    ],
  },
} as const;

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

export default function HomeClient({ locale }: { locale: SiteLocale }) {
  const [time, setTime] = useState("");
  const t = translations[locale];
  const cursor = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const research = useRef<HTMLElement>(null);
  const researchReveal = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const updateTime = () =>
      setTime(
        new Intl.DateTimeFormat(locale, {
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
  }, [locale]);

  return (
    <main>
      <div className="cursor" ref={cursor} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="nav shell">
        <a className="brand magnetic" href="#top" aria-label="Vinicius Romualdo, home">
          VR<span>®</span>
        </a>
        <nav aria-label={t.nav.label}>
          <a href="#writing">{t.nav.writing}</a>
          <a href="#work">{t.nav.work}</a>
          <a href="#experience">{t.nav.experience}</a>
          <a href="#research">{t.nav.research}</a>
          <a href="#about">{t.nav.about}</a>
        </nav>
        <a
          className="nav-cta magnetic"
          href="/vinicius-romualdo-resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          {t.nav.resume} <Arrow />
        </a>
      </header>

      <section className="hero shell" id="top" ref={hero}>
        <div className="eyebrow reveal">
          <span>{t.hero.role}</span>
          <span>{t.hero.focus}</span>
        </div>

        <h1 aria-label={t.hero.ariaLabel}>
          <span className="hero-line line-one">
            <span>{t.hero.lineOne}</span>
            <i aria-hidden="true">●</i>
          </span>
          <span className="hero-line line-two">{t.hero.lineTwo}</span>
          <span className="hero-line line-three">
            <span>{t.hero.lineThree}</span>
            <em>{t.hero.lineFour}</em>
          </span>
        </h1>

        <div className="hero-footer reveal delay-3">
          <p>{t.hero.summary}</p>
          <div className="hero-actions">
            <a className="circle-link magnetic" href="#work" aria-label={t.hero.exploreLabel}>
              <span>{t.hero.exploreOne}</span>
              <span>{t.hero.exploreTwo}</span>
              <Arrow symbol="↓" className="circle-arrow" />
            </a>
            <a className="article-shortcut" href="#writing">
              <small>{t.hero.featured}</small>
              {t.hero.readArticle} <Arrow symbol="↘" />
            </a>
          </div>
          <div className="availability">
            <span className="pulse" />
            <span>{t.hero.workMode}</span>
            <strong>{t.hero.timeZones} · {time} BRT</strong>
          </div>
        </div>
        <div className="kinetic-track" aria-hidden="true">
          <span>{t.hero.kinetic}</span>
          <span>{t.hero.kinetic}</span>
        </div>
      </section>

      <section className="writing shell" id="writing">
        <div className="writing-index">
          <p className="section-label">{t.writing.label}</p>
          <span>{t.writing.category}</span>
        </div>
        <a
          className="article-feature"
          href="https://medium.com/@viniciusromualdobusiness/clean-architecture-with-spring-boot-a-good-idea-d6f97e450130"
          target="_blank"
          rel="noreferrer"
        >
          <div className="article-meta">
            <span>{t.writing.topics}</span>
            <span className="article-read">
              {t.writing.read} <Arrow />
            </span>
          </div>
          <h2>
            {t.writing.titleOne}
            <br />
            {t.writing.titleTwo}
            <br />
            <em>{t.writing.titleThree}</em>
          </h2>
          <div className="article-summary">
            <p>{t.writing.summary}</p>
            <div className="article-takeaway">
              <span>{t.writing.questionLabel}</span>
              <strong>{t.writing.question}</strong>
            </div>
          </div>
        </a>
      </section>

      <section className="statement shell" id="about">
        <p className="section-label">{t.about.label}</p>
        <div>
          <p className="big-copy">
            {t.about.statement}
            <span>{t.about.statementAccent}</span>
          </p>
          <div className="about-grid">
            <p>{t.about.intro}</p>
            <p>{t.about.scope}</p>
          </div>
          <div className="profile-links" aria-label={t.about.profilesLabel}>
            <a href="https://www.linkedin.com/in/vinimrs/" target="_blank" rel="noreferrer">
              LinkedIn <Arrow />
            </a>
            <a href="https://github.com/vinimrs" target="_blank" rel="noreferrer">
              GitHub <Arrow />
            </a>
            <a href="/vinicius-romualdo-resume.pdf" target="_blank" rel="noreferrer">
              {t.about.resume} <Arrow symbol="↓" />
            </a>
          </div>
        </div>
      </section>

      <section className="work shell" id="work">
        <div className="section-heading">
          <p className="section-label">{t.work.label}</p>
          <p>{t.work.statement}</p>
        </div>
        <div className="project-list">
          {t.projects.map((project) => (
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
          <p className="section-label">{t.experience.label}</p>
          <p>{t.experience.statement}</p>
        </div>
        <div className="timeline">
          <article>
            <div className="timeline-meta">
              <span>{t.experience.present}</span>
              <span>iFood</span>
            </div>
            <div>
              <h2>{t.experience.engineer}</h2>
              <p>{t.experience.engineerCopy}</p>
              <ul className="impact-list">
                {t.experience.impacts.map((impact) => (
                  <li key={impact}>{impact}</li>
                ))}
              </ul>
            </div>
          </article>
          <article>
            <div className="timeline-meta">
              <span>{t.experience.researcherPeriod}</span>
              <span>FAPESP</span>
            </div>
            <div>
              <h2>{t.experience.researcher}</h2>
              <p>{t.experience.researcherCopy}</p>
            </div>
          </article>
          <article>
            <div className="timeline-meta">
              <span>{t.experience.mastersStatus}</span>
              <span>{t.experience.mastersInstitution}</span>
            </div>
            <div>
              <h2>{t.experience.mastersDegree}</h2>
              <p>{t.experience.mastersCopy}</p>
            </div>
          </article>
          <article>
            <div className="timeline-meta">
              <span>{t.experience.bachelorsStatus}</span>
              <span>{t.experience.bachelorsInstitution}</span>
            </div>
            <div>
              <h2>{t.experience.bachelorsDegree}</h2>
              <p>{t.experience.bachelorsCopy}</p>
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
        <p className="section-label">{t.research.label}</p>
        <h2>
          {t.research.titleOne}
          <br />
          <span>{t.research.titleTwo}</span>
        </h2>
        <p className="research-copy">{t.research.copy}</p>
        <div className="research-tags" aria-label={t.research.topicsLabel}>
          {t.research.topics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
      </section>

      <footer className="footer shell" id="contact">
        <div className="footer-intro">
          <p>{t.footer.intro}</p>
          <h2>{t.footer.title}</h2>
        </div>
        <a
          className="contact-link magnetic"
          href="mailto:viniciusromualdobusiness@gmail.com"
        >
          {t.footer.contact} <Arrow />
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
            {t.footer.resume} <Arrow symbol="↓" />
          </a>
        </div>
        <div className="footer-bottom">
          <span>Vinicius Romualdo © 2026</span>
          <span>{t.footer.location}</span>
          <a href="#top">
            {t.footer.backToTop} <Arrow symbol="↑" />
          </a>
        </div>
      </footer>
    </main>
  );
}
