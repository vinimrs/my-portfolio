"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { SiteLocale } from "./i18n";

type LocaleCopy = {
  skip: string;
  nav: { work: string; path: string; contact: string; resume: string };
  hero: {
    eyebrow: string;
    role: string;
    focus: string;
    statement: string;
    intro: string;
    explore: string;
    availability: string;
    location: string;
  };
  thesis: { marker: string; title: string; copy: string; principles: string[] };
  work: {
    marker: string;
    title: string;
    intro: string;
    confidentiality: string;
    labels: [string, string, string, string];
    cases: Array<{
      number: string;
      chapter: string;
      field: string;
      title: string;
      context: string;
      decision: string;
      architecture: string;
      outcome: string;
      tags: string[];
      metric?: { value: string; label: string };
    }>;
  };
  research: {
    marker: string;
    title: string;
    copy: string;
    thesis: string;
    tags: string[];
    imageAlt: string;
    imageCaption: string;
  };
  path: {
    marker: string;
    title: string;
    intro: string;
    axisSpan: string;
    axisDuration: string;
    axisNow: string;
    legend: [string, string];
    entries: Array<{
      range: string;
      place: string;
      role: string;
      copy: string;
      duration: string;
      attrs?: Array<{ k: string; v: string }>;
    }>;
  };
  threshold: {
    enter: { mode: string; title: string; hint: string };
    leave: { mode: string; title: string; hint: string };
  };
  writing: { marker: string; title: string; copy: string; action: string; footnote: string };
  footer: { marker: string; title: string; copy: string; action: string; location: string; back: string };
};

const copy: Record<SiteLocale, LocaleCopy> = {
  en: {
    skip: "Skip to the story",
    nav: { work: "Systems", path: "Trajectory", contact: "Contact", resume: "Résumé" },
    hero: {
      eyebrow: "Software engineer · Creative technologist",
      role: "SOFTWARE ENGINEER",
      focus: "FINTECH · DISTRIBUTED SYSTEMS · RELIABILITY · ADAPTIVE SECURITY",
      statement: "Systems, decisions, impact.",
      intro: "I design the logic behind high-trust financial products—and turn distributed complexity into experiences people can rely on.",
      explore: "Follow the signal",
      availability: "Building fintech at iFood · Researching adaptive security at USP",
      location: "Maceió, Brazil",
    },
    thesis: {
      marker: "00 / Operating principle",
      title: "Reliability is a creative medium.",
      copy: "The best systems do not expose their complexity. They transform it into confidence: one clear state, one explainable decision, one experience that earns trust.",
      principles: ["Make complexity legible", "Design for failure before it arrives", "Turn constraints into leverage"],
    },
    work: {
      marker: "01 / Selected systems",
      title: "Engineering stories, told through decisions.",
      intro: "Three chapters across financial infrastructure, platform engineering and adaptive security. Each begins with tension and ends with a system that behaves more clearly.",
      confidentiality: "Product narratives are intentionally generalized to respect confidentiality.",
      labels: ["Context", "Decision", "Architecture", "Outcome"],
      cases: [
        {
          number: "01",
          chapter: "Money in motion",
          field: "Fintech · Distributed systems",
          title: "Pix keys, without the uncertainty.",
          context: "A payment key looks simple. Behind it live ownership, claims, asynchronous events and reconciliation across multiple boundaries.",
          decision: "Model consistency as a visible journey—not as the illusion of one synchronous request.",
          architecture: "Event-driven state transitions, idempotent consumers and reconciliation paths keep every participant aligned.",
          outcome: "Clear states across an asynchronous journey, with failure designed as part of the product—not hidden beneath it.",
          tags: ["Go", "Kotlin", "CQRS", "PostgreSQL", "SQS", "Kubernetes"],
          metric: { value: "1 of 3", label: "core platforms led end to end at iFood" },
        },
        {
          number: "02",
          chapter: "Trust at scale",
          field: "Platform engineering",
          title: "Audit became a product capability.",
          context: "Compliance data was essential, but every team solving it independently multiplied friction, gaps and maintenance cost.",
          decision: "Create one reusable foundation that made the correct path the easiest path for product teams.",
          architecture: "A normalized event contract, shared capture layer and observable pipeline separated policy from product code.",
          outcome: "Shared traceability with lower adoption cost—and a platform capability that improved as more teams used it.",
          tags: ["Go", "Kafka", "DDD", "Observability"],
        },
        {
          number: "03",
          chapter: "Systems with instincts",
          field: "Research · Cybersecurity",
          title: "What if software noticed danger first?",
          context: "Microservices scale quickly. Their attack surface and operational uncertainty grow just as fast.",
          decision: "Connect detection, prevention and recovery in one continuous adaptive feedback loop.",
          architecture: "MAPE-K coordinates monitoring, analysis, planning and execution around a shared model of system knowledge.",
          outcome: "A research direction toward software that can move from reacting to threats to anticipating them.",
          tags: ["MAPE-K", "Microservices", "Security", "AI"],
        },
      ],
    },
    research: {
      marker: "02 / Current research",
      title: "Can software develop instincts?",
      copy: "At USP, I research self-adaptive security for microservices: systems that can detect, prevent and recover from threats with increasing autonomy.",
      thesis: "From software that reacts to software that anticipates.",
      tags: ["Self-protection", "Self-healing", "Microservice security"],
      imageAlt: "Entrance to the EESC–USP campus in São Carlos, where Vinícius develops his master's research",
      imageCaption: "EESC–USP · São Carlos · Personal archive",
    },
    path: {
      marker: "03 / Trajectory",
      title: "Code, consequence and curiosity.",
      intro: "Each chapter added a different kind of responsibility to the systems I build. Two spans are still open.",
      axisSpan: "span",
      axisDuration: "duration",
      axisNow: "now",
      legend: ["Indent = nested inside the span above · overlap is concurrency, not sequence", "Dashed tail = projected to Mar 2027"],
      entries: [
        { range: "Jan 2021 — Apr 2025", place: "UFSCar", role: "Computer Science", duration: "4 yr 4 mo", copy: "Algorithms, systems thinking and a durable appetite for difficult questions." },
        { range: "Mar 2022 — Mar 2023", place: "UFSCar", role: "Scientific Researcher", duration: "1 yr 1 mo", copy: "Web architecture for mental-health and substance-use rehabilitation research — Next.js, TypeScript, CI/CD." },
        { range: "Mar 2023 — Mar 2024", place: "FAPESP", role: "Scientific Researcher", duration: "1 yr 1 mo", copy: "The same rehabilitation platform under FAPESP funding: system architecture, best practices and CI/CD provisioning." },
        { range: "Mar 2024 — Nov 2024", place: "iFood", role: "Software Engineer Intern", duration: "9 mo", copy: "Back-office for iFood Pago, the team's first shared library, and an AI-integrated backend built at the internal hackathon." },
        {
          range: "Nov 2024 — present", place: "iFood", role: "Software Engineer", duration: "1 yr 10 mo",
          copy: "Financial products, backend architecture and production reliability across Pix, transfers and banking journeys.",
          attrs: [
            { k: "team slo", v: "45.0 → 61.1" },
            { k: "infra cost", v: "−81%" },
            { k: "core platforms", v: "3, led end to end" },
          ],
        },
        { range: "Mar 2025 — present", place: "USP", role: "M.Sc. Computer Science", duration: "1 yr 5 mo", copy: "Self-adaptive security for microservices and the question of how software can defend itself." },
      ],
    },
    threshold: {
      enter: { mode: "Day ──▶ Instrument", title: "Follow the signal.", hint: "entering the systems" },
      leave: { mode: "Instrument ──▶ Day", title: "Back to the person.", hint: "leaving the systems" },
    },
    writing: {
      marker: "Featured field note",
      title: "Is Clean Architecture always a good idea?",
      copy: "A practical argument about boundaries, abstractions and the moment architectural discipline becomes accidental complexity.",
      action: "Read on Medium",
      footnote: "Spring Boot · Clean Architecture · Trade-offs",
    },
    footer: {
      marker: "04 / Next signal",
      title: "Let’s build what’s next.",
      copy: "Have a difficult system, an international opportunity or an unusual idea? I would like to hear about it.",
      action: "Start a conversation",
      location: "Brazil · Americas & European overlap",
      back: "Back to top",
    },
  },
  "pt-BR": {
    skip: "Ir para a história",
    nav: { work: "Sistemas", path: "Trajetória", contact: "Contato", resume: "Currículo" },
    hero: {
      eyebrow: "Engenheiro de software · Tecnólogo criativo",
      role: "ENGENHEIRO DE SOFTWARE",
      focus: "FINTECH · SISTEMAS DISTRIBUÍDOS · CONFIABILIDADE · SEGURANÇA ADAPTATIVA",
      statement: "Sistemas, decisões, impacto.",
      intro: "Projeto a lógica por trás de produtos financeiros de alta confiança—e transformo complexidade distribuída em experiências nas quais as pessoas podem confiar.",
      explore: "Seguir o sinal",
      availability: "Construindo fintech no iFood · Pesquisando segurança adaptativa na USP",
      location: "Maceió, Brasil",
    },
    thesis: {
      marker: "00 / Princípio de operação",
      title: "Confiabilidade é matéria-prima criativa.",
      copy: "Os melhores sistemas não exibem sua complexidade. Eles a transformam em confiança: um estado claro, uma decisão explicável, uma experiência que merece ser usada.",
      principles: ["Tornar a complexidade legível", "Projetar a falha antes que ela aconteça", "Transformar restrições em alavancagem"],
    },
    work: {
      marker: "01 / Sistemas selecionados",
      title: "Histórias de engenharia contadas por decisões.",
      intro: "Três capítulos entre infraestrutura financeira, engenharia de plataforma e segurança adaptativa. Cada um começa com tensão e termina em um sistema que se comporta de forma mais clara.",
      confidentiality: "Narrativas intencionalmente generalizadas para preservar a confidencialidade dos produtos.",
      labels: ["Contexto", "Decisão", "Arquitetura", "Resultado"],
      cases: [
        {
          number: "01",
          chapter: "Dinheiro em movimento",
          field: "Fintech · Sistemas distribuídos",
          title: "Chaves Pix, sem a incerteza.",
          context: "Uma chave parece simples. Por trás dela existem titularidade, reivindicações, eventos assíncronos e conciliação entre múltiplas fronteiras.",
          decision: "Modelar consistência como uma jornada visível—não como a ilusão de uma única requisição síncrona.",
          architecture: "Transições orientadas a eventos, consumidores idempotentes e fluxos de conciliação mantêm cada participante alinhado.",
          outcome: "Estados claros em uma jornada assíncrona, com a falha projetada como parte do produto—não escondida sob ele.",
          tags: ["Go", "Kotlin", "CQRS", "PostgreSQL", "SQS", "Kubernetes"],
          metric: { value: "1 de 3", label: "plataformas core, ponta a ponta no iFood" },
        },
        {
          number: "02",
          chapter: "Confiança em escala",
          field: "Engenharia de plataforma",
          title: "Auditoria virou capacidade de produto.",
          context: "Dados de conformidade eram essenciais, mas cada time resolvendo sozinho multiplicava atrito, lacunas e custo de manutenção.",
          decision: "Criar uma base reutilizável que tornasse o caminho correto também o caminho mais fácil.",
          architecture: "Um contrato de eventos normalizado, uma camada de captura compartilhada e um pipeline observável separaram política do código de produto.",
          outcome: "Rastreabilidade compartilhada com menor custo de adoção—e uma plataforma que melhorava quanto mais times a utilizavam.",
          tags: ["Go", "Kafka", "DDD", "Observabilidade"],
        },
        {
          number: "03",
          chapter: "Sistemas com instinto",
          field: "Pesquisa · Cibersegurança",
          title: "E se o software percebesse o perigo primeiro?",
          context: "Microsserviços escalam rápido. Sua superfície de ataque e sua incerteza operacional crescem na mesma velocidade.",
          decision: "Conectar detecção, prevenção e recuperação em um ciclo adaptativo contínuo.",
          architecture: "MAPE-K coordena monitoramento, análise, planejamento e execução em torno de um modelo compartilhado de conhecimento.",
          outcome: "Uma direção de pesquisa rumo a software capaz de passar da reação à antecipação de ameaças.",
          tags: ["MAPE-K", "Microsserviços", "Segurança", "IA"],
        },
      ],
    },
    research: {
      marker: "02 / Pesquisa atual",
      title: "Software pode desenvolver instintos?",
      copy: "Na USP, pesquiso segurança autoadaptativa para microsserviços: sistemas capazes de detectar, prevenir e se recuperar de ameaças com autonomia crescente.",
      thesis: "Do software que reage ao software que antecipa.",
      tags: ["Autoproteção", "Autorrecuperação", "Segurança de microsserviços"],
      imageAlt: "Entrada da EESC–USP em São Carlos, onde Vinícius desenvolve sua pesquisa de mestrado",
      imageCaption: "EESC–USP · São Carlos · Arquivo pessoal",
    },
    path: {
      marker: "03 / Trajetória",
      title: "Código, consequência e curiosidade.",
      intro: "Cada capítulo adicionou um tipo diferente de responsabilidade aos sistemas que construo. Dois spans seguem abertos.",
      axisSpan: "span",
      axisDuration: "duração",
      axisNow: "agora",
      legend: ["Recuo = aninhado no span acima · sobreposição é concorrência, não sequência", "Cauda tracejada = projeção até mar 2027"],
      entries: [
        { range: "Jan 2021 — Abr 2025", place: "UFSCar", role: "Ciência da Computação", duration: "4 a 4 m", copy: "Algoritmos, pensamento sistêmico e um interesse duradouro por perguntas difíceis." },
        { range: "Mar 2022 — Mar 2023", place: "UFSCar", role: "Pesquisador Científico", duration: "1 a 1 m", copy: "Arquitetura web para pesquisa em reabilitação de saúde mental e uso de substâncias — Next.js, TypeScript, CI/CD." },
        { range: "Mar 2023 — Mar 2024", place: "FAPESP", role: "Pesquisador Científico", duration: "1 a 1 m", copy: "A mesma plataforma de reabilitação sob financiamento FAPESP: arquitetura do sistema, boas práticas e provisionamento com CI/CD." },
        { range: "Mar 2024 — Nov 2024", place: "iFood", role: "Engenheiro de Software (estágio)", duration: "9 m", copy: "Back-office do iFood Pago, a primeira biblioteca compartilhada do time e um backend integrado a IA no hackathon interno." },
        {
          range: "Nov 2024 — presente", place: "iFood", role: "Engenheiro de Software", duration: "1 a 10 m",
          copy: "Produtos financeiros, arquitetura backend e confiabilidade em produção nas jornadas de Pix, transferências e banking.",
          attrs: [
            { k: "slo do time", v: "45,0 → 61,1" },
            { k: "custo de infra", v: "−81%" },
            { k: "plataformas core", v: "3, ponta a ponta" },
          ],
        },
        { range: "Mar 2025 — presente", place: "USP", role: "Mestrado em Ciência da Computação", duration: "1 a 5 m", copy: "Segurança autoadaptativa para microsserviços e a pergunta de como o software pode se defender." },
      ],
    },
    threshold: {
      enter: { mode: "Dia ──▶ Instrumento", title: "Siga o sinal.", hint: "entrando nos sistemas" },
      leave: { mode: "Instrumento ──▶ Dia", title: "De volta à pessoa.", hint: "saindo dos sistemas" },
    },
    writing: {
      marker: "Artigo em destaque",
      title: "Clean Architecture é sempre uma boa ideia?",
      copy: "Um argumento prático sobre limites, abstrações e o momento em que disciplina arquitetural se transforma em complexidade acidental.",
      action: "Ler no Medium",
      footnote: "Spring Boot · Clean Architecture · Trade-offs",
    },
    footer: {
      marker: "04 / Próximo sinal",
      title: "Vamos construir o que vem depois.",
      copy: "Tem um sistema difícil, uma oportunidade internacional ou uma ideia incomum? Quero conhecê-la.",
      action: "Iniciar uma conversa",
      location: "Brasil · Américas e Europa",
      back: "Voltar ao topo",
    },
  },
};

/* Span geometry for the trajectory waterfall, as percentages of a shared
   month axis running Jan 2021 → Mar 2027 (74 months). Locale-independent. */
const pathSpans: Array<{
  start: number;
  width: number;
  nested?: boolean;
  open?: boolean;
  projection?: { start: number; width: number };
}> = [
  { start: 0, width: 68.9 },
  { start: 18.9, width: 16.2, nested: true },
  { start: 35.1, width: 16.2, nested: true },
  { start: 51.4, width: 10.8, nested: true },
  { start: 62.2, width: 28.4, nested: true, open: true },
  { start: 67.6, width: 23, nested: true, open: true, projection: { start: 90.5, width: 9.5 } },
];

const pathAxis: Array<{ at: number; label?: string; now?: boolean }> = [
  { at: 0, label: "2021" },
  { at: 16.2, label: "2022" },
  { at: 32.4, label: "2023" },
  { at: 48.6, label: "2024" },
  { at: 64.9, label: "2025" },
  { at: 81.1, label: "2026" },
  { at: 90.5, now: true },
  { at: 97.3, label: "2027" },
];

function Arrow({ direction = "ne" }: { direction?: "ne" | "down" | "up" }) {
  return <span aria-hidden="true">{direction === "down" ? "↓" : direction === "up" ? "↑" : "↗"}&#xfe0e;</span>;
}

function HeroTopology() {
  return (
    <svg className="hero-topology" viewBox="0 0 700 520" aria-hidden="true">
      <g className="topology-ghost">
        <path d="M54 92L188 154L315 71L439 137L614 72" />
        <path d="M72 377L188 154L286 288L439 137L593 321" />
        <path d="M130 455L286 288L451 367L593 321" />
      </g>
      <g className="topology-signal">
        <path className="draw-path" d="M54 92L188 154L286 288L451 367L593 321" />
        <path className="draw-path" d="M188 154L315 71L439 137L593 321" />
        <path className="draw-path" d="M286 288L439 137L614 72" />
      </g>
      {["54,92", "188,154", "315,71", "286,288", "439,137", "451,367", "593,321", "614,72", "130,455"].map((point, index) => {
        const [cx, cy] = point.split(",");
        return <circle className={`topology-node topology-node-${index + 1}`} key={point} cx={cx} cy={cy} r={index === 4 ? 10 : 5} />;
      })}
      <g className="topology-core" transform="translate(439 137)">
        <circle r="38" />
        <circle r="62" />
        <circle r="86" />
      </g>
      <path className="topology-exit draw-path" d="M439 137C455 207 448 250 507 274C576 302 560 397 652 430" />
    </svg>
  );
}

function CaseDiagram({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg className="case-diagram" viewBox="0 0 620 480" aria-hidden="true">
        <g className="diagram-layer layer-context">
          <circle cx="132" cy="238" r="104" className="diagram-orbit" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((node) => <circle key={node} cx={98 + (node % 3) * 36} cy={184 + Math.floor(node / 3) * 44} r="5" />)}
        </g>
        <g className="diagram-layer layer-decision">
          <path className="diagram-path" d="M236 238H300M300 238L370 166M300 238H382M300 238L370 310" />
          <circle cx="300" cy="238" r="9" /><circle cx="370" cy="166" r="7" /><circle cx="382" cy="238" r="7" /><circle cx="370" cy="310" r="7" />
        </g>
        <g className="diagram-layer layer-architecture">
          <path className="diagram-path" d="M382 238H438M438 238V148H507M438 238H530M438 238V328H507" />
          <rect x="421" y="221" width="34" height="34" rx="5" /><rect x="507" y="130" width="48" height="36" rx="5" /><rect x="530" y="220" width="48" height="36" rx="18" /><rect x="507" y="310" width="48" height="36" rx="5" />
        </g>
        <g className="diagram-layer layer-outcome">
          <circle cx="530" cy="238" r="46" /><circle cx="530" cy="238" r="72" /><circle cx="530" cy="238" r="98" />
        </g>
        <circle className="diagram-pulse" data-end-x="530" cx="132" cy="238" r="11" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg className="case-diagram" viewBox="0 0 620 480" aria-hidden="true">
        <g className="diagram-layer layer-context">
          <path className="diagram-path" d="M65 122L170 190M65 238L170 238M65 354L170 286" />
          <circle cx="65" cy="122" r="7" /><circle cx="65" cy="238" r="7" /><circle cx="65" cy="354" r="7" />
        </g>
        <g className="diagram-layer layer-decision">
          <rect x="170" y="174" width="118" height="128" rx="8" />
          <path className="diagram-path" d="M196 210H260M196 238H260M196 266H242" />
        </g>
        <g className="diagram-layer layer-architecture">
          <path className="diagram-path" d="M288 238H362M362 238L430 150M362 238H446M362 238L430 326" />
          <circle cx="362" cy="238" r="10" /><rect x="414" y="132" width="54" height="38" rx="5" /><rect x="430" y="219" width="54" height="38" rx="5" /><rect x="414" y="308" width="54" height="38" rx="5" />
        </g>
        <g className="diagram-layer layer-outcome">
          <path className="diagram-path" d="M468 151C532 151 548 188 548 238C548 288 532 327 468 327M484 238H584" />
          <circle cx="548" cy="238" r="44" /><circle cx="548" cy="238" r="70" />
        </g>
        <circle className="diagram-pulse" data-end-x="584" cx="65" cy="238" r="11" />
      </svg>
    );
  }

  return (
    <svg className="case-diagram" viewBox="0 0 620 480" aria-hidden="true">
      <g className="diagram-layer layer-context">
        <circle cx="126" cy="238" r="96" className="diagram-orbit" /><path className="diagram-path" d="M126 142V334M30 238H222" />
        <circle cx="126" cy="238" r="9" /><circle cx="126" cy="170" r="6" /><circle cx="194" cy="238" r="6" /><circle cx="126" cy="306" r="6" /><circle cx="58" cy="238" r="6" />
      </g>
      <g className="diagram-layer layer-decision">
        <path className="diagram-path" d="M222 238H292C318 238 318 174 348 174M292 238C318 238 318 302 348 302" />
        <circle cx="292" cy="238" r="9" /><circle cx="348" cy="174" r="7" /><circle cx="348" cy="302" r="7" />
      </g>
      <g className="diagram-layer layer-architecture">
        <path className="diagram-path" d="M348 174L444 238L348 302L444 238L518 174L566 238L518 302L444 238" />
        {["444,238", "518,174", "566,238", "518,302"].map((point) => { const [cx, cy] = point.split(","); return <circle key={point} cx={cx} cy={cy} r="10" />; })}
      </g>
      <g className="diagram-layer layer-outcome">
        <circle cx="566" cy="238" r="42" /><circle cx="566" cy="238" r="68" /><path className="diagram-path" d="M566 170A68 68 0 1 1 500 222" />
      </g>
      <circle className="diagram-pulse" data-end-x="566" cx="126" cy="238" r="11" />
    </svg>
  );
}

export default function HomeClient({ locale: initialLocale }: { locale: SiteLocale }) {
  const [locale, setLocale] = useState<SiteLocale>(initialLocale === "en" ? initialLocale : "en");
  const [time, setTime] = useState("");
  const [activeChapter, setActiveChapter] = useState("top");
  const root = useRef<HTMLElement>(null);
  const t = copy[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    const updateTime = () => setTime(new Intl.DateTimeFormat(locale, { timeZone: "America/Maceio", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    updateTime();
    const interval = window.setInterval(updateTime, 30_000);
    return () => window.clearInterval(interval);
  }, [locale]);

  useEffect(() => {
    // PRODUCT.md commits to reduced-motion alternatives: skip the whole
    // orchestration rather than animating at zero duration. Every resting
    // state is already the CSS default, so nothing is left hidden.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let dispose = () => {};

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      if (cancelled || !root.current) return;
      const gsap = gsapModule.gsap;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        gsap.set(".hero-word", { yPercent: 112 });
        gsap.set(".hero-meta, .hero-intro, .hero-status", { autoAlpha: 0, y: 24 });
        gsap.set(".draw-path", { strokeDasharray: 900, strokeDashoffset: 900 });
        gsap.set(".topology-node", { scale: 0, transformOrigin: "center" });

        gsap.timeline({ defaults: { ease: "power4.out" } })
          .to(".hero-word", { yPercent: 0, duration: 1.3, stagger: 0.09 })
          .to(".hero-meta, .hero-intro, .hero-status", { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, "-=0.8")
          .to(".hero-topology .draw-path", { strokeDashoffset: 0, duration: 1.7, stagger: 0.12 }, "-=1.15")
          .to(".topology-node", { scale: 1, duration: 0.55, stagger: 0.06, ease: "back.out(2)" }, "-=1.3");

        gsap.timeline({
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.1 },
        })
          .to(".hero-name", { yPercent: -12, ease: "none" }, 0)
          .to(".hero-topology", { yPercent: 18, rotate: 4, scale: 1.08, ease: "none" }, 0)
          .to(".topology-core", { rotate: 120, transformOrigin: "center", ease: "none" }, 0);

        document.querySelectorAll<HTMLElement>("[data-chapter]").forEach((chapter) => {
          const id = chapter.id;
          ScrollTrigger.create({
            trigger: chapter,
            start: "top 52%",
            end: "bottom 48%",
            onToggle: (self) => { if (self.isActive && id) setActiveChapter(id); },
          });

          const heading = chapter.querySelector("[data-reveal-heading]");
          if (heading) {
            gsap.from(heading, {
              yPercent: 24,
              autoAlpha: 0,
              duration: 1.1,
              ease: "power4.out",
              scrollTrigger: { trigger: heading, start: "top 92%", toggleActions: "play none none reverse" },
            });
          }
        });

        document.querySelectorAll<HTMLElement>(".case-study").forEach((caseStudy) => {
          const steps = caseStudy.querySelectorAll(".case-step");
          const layers = caseStudy.querySelectorAll(".diagram-layer");
          const paths = caseStudy.querySelectorAll(".diagram-path");
          const pulse = caseStudy.querySelector<SVGCircleElement>(".diagram-pulse");
          const diagramShapes = caseStudy.querySelectorAll<SVGElement>(".diagram-layer path, .diagram-layer circle, .diagram-layer rect");
          const pulseStartX = Number(pulse?.getAttribute("cx") ?? 0);
          const pulseEndX = Number(pulse?.dataset.endX ?? pulseStartX);
          gsap.set(steps, { autoAlpha: 0.18, y: 18 });
          gsap.set(layers, { autoAlpha: 0.12 });
          gsap.set(paths, { strokeDasharray: 560, strokeDashoffset: 560 });

          const timeline = gsap.timeline({
            scrollTrigger: { trigger: caseStudy, start: "top top", end: "bottom 92%", scrub: 0.75 },
          });

          steps.forEach((step, index) => {
            const point = index * 1.05;
            timeline.to(step, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, point);
            timeline.to(layers[index], { autoAlpha: 1, duration: 0.35 }, point);
            if (paths[index]) timeline.to(paths[index], { strokeDashoffset: 0, duration: 0.8, ease: "none" }, point);
            if (pulse) {
              const progress = (index + 1) / steps.length;
              timeline.to(pulse, { attr: { cx: pulseStartX + (pulseEndX - pulseStartX) * progress }, duration: 0.8, ease: "power2.inOut" }, point);
            }
            if (index > 0) {
              timeline.to(steps[index - 1], { autoAlpha: 0.42, duration: 0.25 }, point + 0.45);
              timeline.to(layers[index - 1], { autoAlpha: 0.42, duration: 0.25 }, point + 0.45);
            }
          });

          const activationPoint = Math.max(0, (steps.length - 1) * 1.05 + 0.8);
          timeline
            .to(paths, { strokeDashoffset: 0, duration: 0.18, ease: "none" }, activationPoint)
            .to(layers, { autoAlpha: 1, duration: 0.18, ease: "power4.out" }, activationPoint)
            .to(diagramShapes, {
              stroke: "#245bff",
              strokeWidth: 1.85,
              opacity: 1,
              filter: "drop-shadow(0 0 2.5px rgba(36, 91, 255, 0.32))",
              duration: 0.68,
              ease: "power2.inOut",
            }, activationPoint)
            .to(pulse, { attr: { r: 14 }, filter: "drop-shadow(0 0 7px rgba(36, 91, 255, 0.5))", duration: 0.28, ease: "power2.out" }, activationPoint)
            .to(pulse, { attr: { r: 11 }, filter: "drop-shadow(0 0 4px rgba(36, 91, 255, 0.3))", duration: 0.46, ease: "power2.inOut" }, activationPoint + 0.28);
        });

        gsap.set(".research-photo-frame", { clipPath: "inset(18% 10% 18% 10%)" });
        gsap.set(".research-photo img", { scale: 1.12, yPercent: -4, filter: "grayscale(1) saturate(.4) contrast(1.08) sepia(.18) hue-rotate(178deg)" });
        gsap.set(".research-campus-path", { strokeDasharray: 520, strokeDashoffset: 520 });
        gsap.timeline({
          scrollTrigger: { trigger: ".research", start: "top 88%", end: "center center", scrub: 0.55 },
        })
          .to(".research-photo-frame", { clipPath: "inset(0% 0% 0% 0%)", ease: "power3.inOut" }, 0)
          .to(".research-photo img", { scale: 1.025, yPercent: 2, filter: "grayscale(0) saturate(1) contrast(1) sepia(0) hue-rotate(0deg)", ease: "none" }, 0)
          .to(".research-photo-tint", { autoAlpha: 0, ease: "none" }, 0)
          .to(".research-loop", { rotate: 128, scale: 0.84, xPercent: -12, yPercent: -10, ease: "none" }, 0)
          .to(".research-campus-path", { strokeDashoffset: 0, ease: "none" }, 0.08)
          .to(".research-core", { scale: 0.86, xPercent: -34, yPercent: -56, ease: "power2.inOut" }, 0.12);

        gsap.timeline({
          scrollTrigger: { trigger: ".research", start: "center center", end: "bottom top", scrub: 0.8 },
        })
          .to(".research-photo img", { yPercent: 7, ease: "none" }, 0)
          .to(".research-loop", { rotate: 240, scale: 0.72, xPercent: -22, yPercent: -22, ease: "none" }, 0)
          .to(".research-core", { scale: 0.78, xPercent: -48, yPercent: -84, ease: "none" }, 0);

        gsap.set(".writing-path", { strokeDasharray: 760, strokeDashoffset: 760 });
        gsap.set(".writing-node", { scale: 0, transformOrigin: "center" });
        gsap.timeline({
          scrollTrigger: { trigger: ".writing", start: "top 82%", end: "bottom 34%", scrub: 0.75 },
        })
          .to(".writing-path", { strokeDashoffset: 0, stagger: 0.08, ease: "none" })
          .to(".writing-node", { scale: 1, stagger: 0.06, ease: "power4.out" }, "-=0.45")
          .to(".writing-signal-core", { scale: 1.35, transformOrigin: "center", ease: "power3.inOut" }, "-=0.35");

        gsap.set(".contact-path", { strokeDasharray: 1200, strokeDashoffset: 1200 });
        gsap.set(".contact-node", { scale: 0, transformOrigin: "center" });
        gsap.timeline({ scrollTrigger: { trigger: ".contact", start: "top 70%", end: "center 40%", scrub: 0.8 } })
          .to(".contact-path", { strokeDashoffset: 0, stagger: 0.08, ease: "none" })
          .to(".contact-node", { scale: 1, stagger: 0.05, ease: "back.out(2)" }, "-=0.5")
          .to(".contact-core", { scale: 1.2, transformOrigin: "center", ease: "power2.out" }, "-=0.35");

        const hero = document.querySelector<HTMLElement>(".hero");
        const moveField = (event: PointerEvent) => {
          const x = (event.clientX / window.innerWidth - 0.5) * 28;
          const y = (event.clientY / window.innerHeight - 0.5) * 28;
          gsap.to(".hero-topology", { x, y, duration: 1.2, ease: "power3.out", overwrite: "auto" });
        };
        hero?.addEventListener("pointermove", moveField);
        dispose = () => hero?.removeEventListener("pointermove", moveField);
      }, root);

      ScrollTrigger.refresh();
      const previousDispose = dispose;
      dispose = () => {
        previousDispose();
        context.revert();
      };
    });

    return () => {
      cancelled = true;
      dispose();
    };
  }, [locale]);

  const chapters = [
    ["top", locale === "pt-BR" ? "Início" : "Index"],
    ["principle", locale === "pt-BR" ? "Princípio" : "Principle"],
    ["work", t.nav.work],
    ["research", locale === "pt-BR" ? "Pesquisa" : "Research"],
    ["path", t.nav.path],
    ["contact", t.nav.contact],
  ];

  return (
    <main ref={root}>
      <a className="skip-link" href="#principle">{t.skip}</a>
      <div className="story-progress" aria-hidden="true">
        <span className="story-progress__fill" />
        <span className="story-progress__echo story-progress__echo--3" />
        <span className="story-progress__echo story-progress__echo--2" />
        <span className="story-progress__echo story-progress__echo--1" />
        <span className="story-progress__packet" />
      </div>
      <div className="edge-blur" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Vinícius Romualdo, home"><span>VR</span><i>®</i></a>
        <div className="wordmark">Vinícius Romualdo</div>
        <nav aria-label={locale === "pt-BR" ? "Navegação principal" : "Main navigation"}>
          <a href="#work">{t.nav.work}</a>
          <a href="#research">{locale === "pt-BR" ? "Pesquisa" : "Research"}</a>
          <a href="#path">{t.nav.path}</a>
        </nav>
        <div className="header-actions">
          <button className="locale-toggle" type="button" onClick={() => setLocale(locale === "en" ? "pt-BR" : "en")} aria-label={locale === "en" ? "Mudar idioma para português" : "Switch language to English"}>
            <span className={locale === "en" ? "is-active" : ""}>EN</span><i>/</i><span className={locale === "pt-BR" ? "is-active" : ""}>PT</span>
          </button>
          <a className="resume-link" href="/vinicius-romualdo-resume.pdf" target="_blank" rel="noreferrer">{t.nav.resume} <Arrow /></a>
        </div>
      </header>

      <aside className="chapter-rail" aria-label={locale === "pt-BR" ? "Capítulos" : "Chapters"}>
        <div className="chapter-rail__line" />
        {chapters.map(([id, label], index) => (
          <a href={`#${id}`} className={activeChapter === id ? "is-active" : ""} key={id}>
            <i />
            <span>{String(index + 1).padStart(2, "0")} · {label}</span>
          </a>
        ))}
      </aside>

      <section className="hero page-grid" id="top" data-chapter>
        <div className="hero-meta">
          <span>{t.hero.eyebrow}</span>
          <span>{t.hero.location} · {time} BRT</span>
        </div>
        <div className="hero-name">
          <div className="hero-line"><span className="hero-word">Vinícius</span></div>
          <div className="hero-line"><span className="hero-word">Romualdo</span></div>
          <span className="hero-role">{t.hero.role}</span>
        </div>
        <div className="hero-visual"><HeroTopology /></div>
        <p className="hero-focus">{t.hero.focus}</p>
        <div className="hero-intro">
          <strong>{t.hero.statement}</strong>
          <p>{t.hero.intro}</p>
          <a href="#principle">{t.hero.explore}<Arrow direction="down" /></a>
        </div>
        <div className="hero-status"><i /><span>{t.hero.availability}</span></div>
      </section>

      <section className="principle chapter page-grid" id="principle" data-chapter>
        <p className="chapter-marker">{t.thesis.marker}</p>
        <div className="principle-heading">
          <h2 data-reveal-heading>{t.thesis.title}</h2>
          <p>{t.thesis.copy.split(" ").map((word, index) => <span className="word" key={`${word}-${index}`}>{word} </span>)}</p>
        </div>
        <ol className="principle-list">
          {t.thesis.principles.map((principle, index) => <li className="principle" key={principle}><span>0{index + 1}</span><strong>{principle}</strong><i /></li>)}
        </ol>
      </section>

      <section className="threshold threshold--in">
        <span className="threshold__scan" aria-hidden="true" />
        <p className="threshold__mode"><span>mode</span><b>{t.threshold.enter.mode}</b></p>
        <p className="threshold__title">{t.threshold.enter.title}</p>
        <p className="threshold__hint">{t.threshold.enter.hint}</p>
      </section>

      <div className="night-zone">
      <section className="work chapter" id="work" data-chapter>
        <div className="work-heading page-grid">
          <p className="chapter-marker">{t.work.marker}</p>
          <h2 data-reveal-heading>{t.work.title}</h2>
          <div><p>{t.work.intro}</p><small>{t.work.confidentiality}</small></div>
        </div>

        <div className="case-list">
          {t.work.cases.map((study, index) => (
            <article className="case-study page-grid" key={study.number}>
              <div className="case-index"><b>{study.number}</b><span>{study.chapter}</span><small>{study.field}</small></div>
              <div className="case-copy">
                <h3>{study.title}</h3>
                {[study.context, study.decision, study.architecture, study.outcome].map((paragraph, step) => (
                  <div className="case-step" key={t.work.labels[step]} data-step={step + 1}>
                    <span>0{step + 1} / {t.work.labels[step]}</span>
                    <p>{paragraph}</p>
                  </div>
                ))}
                <div className="case-tags">{study.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                {study.metric ? <div className="case-metric"><span><b>{study.metric.value}</b>{study.metric.label}</span></div> : null}
              </div>
              <div className="case-visual"><div className="case-visual-inner"><span className="visual-caption">{study.number} / LIVE SYSTEM MAP</span><CaseDiagram index={index} /></div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="writing chapter page-grid" data-chapter>
        <p className="chapter-marker">{t.writing.marker}</p>
        <a href="https://medium.com/@viniciusromualdobusiness/clean-architecture-with-spring-boot-a-good-idea-d6f97e450130" target="_blank" rel="noreferrer">
          <span className="writing-meta"><b>{t.writing.footnote}&#160;&#160;·&#160;&#160;{t.writing.footnote}&#160;&#160;·&#160;&#160;{t.writing.footnote}</b></span>
          <div className="writing-title-row">
            <h2 data-reveal-heading>{t.writing.title}</h2>
            <svg className="writing-schematic" viewBox="0 0 520 360" aria-hidden="true">
              <path className="writing-path" d="M24 58H142C184 58 184 150 230 150H328" />
              <path className="writing-path" d="M24 180H110C166 180 174 150 230 150" />
              <path className="writing-path" d="M24 302H142C184 302 184 150 230 150" />
              <path className="writing-path" d="M328 150C388 150 398 94 448 94H502" />
              <path className="writing-path" d="M328 150C388 150 398 230 448 230H502" />
              {["24,58", "24,180", "24,302", "230,150", "328,150", "502,94", "502,230"].map((point) => {
                const [cx, cy] = point.split(",");
                const isCore = point === "328,150";
                return <circle className={isCore ? "writing-node writing-signal-core" : "writing-node"} key={point} cx={cx} cy={cy} r={isCore ? 12 : 6} />;
              })}
            </svg>
          </div>
          <div className="writing-bottom"><p>{t.writing.copy}</p><strong>{t.writing.action} <Arrow /></strong></div>
        </a>
      </section>

      <section className="research chapter page-grid" id="research" data-chapter>
        <p className="chapter-marker">{t.research.marker}</p>
        <div className="research-copy">
          <h2 data-reveal-heading>{t.research.title}</h2>
          <p>{t.research.copy}</p>
          <strong>{t.research.thesis}</strong>
          <div>{t.research.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
        <div className="research-visual">
          <figure className="research-photo-frame">
            <div className="research-photo">
              <Image src="/usp-sao-carlos.webp" alt={t.research.imageAlt} fill sizes="(max-width: 560px) 100vw, (max-width: 820px) 58vw, 52vw" />
              <span className="research-photo-tint" aria-hidden="true" />
            </div>
            <figcaption>{t.research.imageCaption}</figcaption>
          </figure>
          <svg className="research-loop" viewBox="0 0 520 520" aria-hidden="true">
            <circle cx="260" cy="260" r="198" /><circle cx="260" cy="260" r="142" /><circle cx="260" cy="260" r="82" />
            <path d="M260 62C312 118 403 116 458 260C400 310 398 410 260 458C204 402 108 402 62 260C118 202 112 112 260 62Z" />
            <g><circle cx="260" cy="62" r="9" /><circle cx="458" cy="260" r="9" /><circle cx="260" cy="458" r="9" /><circle cx="62" cy="260" r="9" /></g>
          </svg>
          <svg className="research-campus-signal" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path className="research-campus-path" d="M51 100C52 86 54 73 58 61C62 50 64 42 62 34C60 25 53 19 48 13" />
          </svg>
          <div className="research-core"><span>MAPE</span><i>↻</i><span>KNOWLEDGE</span></div>
        </div>
      </section>

      </div>

      <section className="threshold threshold--out">
        <span className="threshold__scan" aria-hidden="true" />
        <p className="threshold__mode"><span>mode</span><b>{t.threshold.leave.mode}</b></p>
        <p className="threshold__title">{t.threshold.leave.title}</p>
        <p className="threshold__hint">{t.threshold.leave.hint}</p>
      </section>

      <section className="path chapter page-grid" id="path" data-chapter>
        <div className="path-heading">
          <p className="chapter-marker">{t.path.marker}</p>
          <h2 data-reveal-heading>{t.path.title}</h2>
          <p>{t.path.intro}</p>
        </div>
        <div className="path-list">
          <div className="path-axis">
            <span>{t.path.axisSpan}</span>
            <div className="path-ticks">
              {pathAxis.map((tick) => (
                <span key={tick.at} className={tick.now ? "is-now" : undefined} style={{ "--x": `${tick.at}%` } as CSSProperties}>
                  {tick.now ? t.path.axisNow : tick.label}
                </span>
              ))}
            </div>
            <span className="path-duration">{t.path.axisDuration}</span>
          </div>

          {t.path.entries.map((entry, index) => {
            const span = pathSpans[index];
            return (
              <article className="path-entry" key={`${entry.place}-${entry.range}`}>
                <div className="path-label">
                  {span.nested ? <i /> : null}
                  <strong>{entry.place}</strong>
                  <span>{entry.role}</span>
                </div>
                <div className="path-lane">
                  {span.projection ? (
                    <div className="path-projection" style={{ "--s": `${span.projection.start}%`, "--w": `${span.projection.width}%` } as CSSProperties} />
                  ) : null}
                  <div
                    className={span.open ? "path-span is-open" : "path-span"}
                    style={{ "--s": `${span.start}%`, "--w": `${span.width}%` } as CSSProperties}
                  />
                </div>
                <div className="path-duration">{entry.duration}</div>
                <p>{entry.copy} <b>{entry.range}</b></p>
                {entry.attrs ? (
                  <div className="path-attrs">
                    {entry.attrs.map((attr) => <span key={attr.k}><b>{attr.k}</b>{attr.v}</span>)}
                  </div>
                ) : null}
              </article>
            );
          })}

          <div className="path-legend"><span>{t.path.legend[0]}</span><span>{t.path.legend[1]}</span></div>
        </div>
      </section>

      <footer className="contact chapter page-grid" id="contact" data-chapter>
        <p className="chapter-marker">{t.footer.marker}</p>
        <div className="contact-copy">
          <h2 data-reveal-heading>{t.footer.title}</h2>
          <p>{t.footer.copy}</p>
          <a href="mailto:viniciusromualdobusiness@gmail.com"><span>{t.footer.action}</span><Arrow /></a>
        </div>
        <svg className="contact-visual" viewBox="0 0 680 500" aria-hidden="true">
          <path className="contact-path" d="M26 68C172 68 174 250 328 250" /><path className="contact-path" d="M26 164C144 164 188 250 328 250" /><path className="contact-path" d="M26 336C144 336 188 250 328 250" /><path className="contact-path" d="M26 432C172 432 174 250 328 250" /><path className="contact-path" d="M328 250H650" />
          {["26,68", "26,164", "26,336", "26,432", "328,250", "650,250"].map((point) => { const [cx, cy] = point.split(","); return <circle className={point === "328,250" ? "contact-node contact-core" : "contact-node"} key={point} cx={cx} cy={cy} r={point === "328,250" ? 14 : 7} />; })}
          <circle className="contact-ring" cx="328" cy="250" r="52" /><circle className="contact-ring" cx="328" cy="250" r="84" />
        </svg>
        <div className="contact-bottom">
          <div><a href="https://www.linkedin.com/in/vinimrs/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/vinimrs" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://medium.com/@viniciusromualdobusiness" target="_blank" rel="noreferrer">Medium ↗</a></div>
          <span>{t.footer.location}</span>
          <a href="#top">{t.footer.back} <Arrow direction="up" /></a>
        </div>
      </footer>
    </main>
  );
}
