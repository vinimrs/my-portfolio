"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { SiteLocale } from "./i18n";

type LocaleCopy = {
  skip: string;
  nav: { services: string; work: string; path: string; contact: string; resume: string };
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
  services: { marker: string; title: string; copy: string; items: string[] };
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
      scope: string;
      tags: string[];
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
    intro: string[];
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
    }>;
  };
  threshold: {
    enter: { mode: string; title: string; hint: string };
    leave: { mode: string; title: string; hint: string };
  };
  writing: { marker: string; title: string; copy: string; action: string; footnote: string };
  footer: { marker: string; title: string; copy: string; action: string; location: string; back: string };
};

function durationSince(year: number, zeroBasedMonth: number, locale: SiteLocale) {
  const today = new Date();
  const totalMonths = Math.max(0, (today.getFullYear() - year) * 12 + today.getMonth() - zeroBasedMonth);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (locale === "pt-BR") {
    return [years ? `${years} a` : "", months ? `${months} m` : ""].filter(Boolean).join(" ");
  }

  return [years ? `${years} yr` : "", months ? `${months} mo` : ""].filter(Boolean).join(" ");
}

const copy: Record<SiteLocale, LocaleCopy> = {
  en: {
    skip: "Skip to the story",
    nav: { services: "Expertise", work: "Systems", path: "Trajectory", contact: "Contact", resume: "Résumé" },
    hero: {
      eyebrow: "Software engineering · Full-stack systems & applied AI",
      role: "FULL-STACK SOFTWARE ENGINEER",
      focus: "FULL-STACK ENGINEERING · DISTRIBUTED SYSTEMS · APPLIED AI · RELIABILITY",
      statement: "I build and evolve software systems under real production constraints.",
      intro: "My work spans full-stack product engineering, software architecture, web platforms, distributed flows, legacy modernization, and AI-assisted developer tooling that must remain understandable and reliable in production. I am open to remote and international projects.",
      explore: "Discuss a project",
      availability: `${durationSince(2024, 2, "en")} at iFood · M.Sc. candidate in Computer Science at USP`,
      location: "São Carlos, Brazil · Open to remote and international projects",
    },
    services: {
      marker: "00 / Engineering approach",
      title: "Engineering that leads to clear technical decisions.",
      copy: "I work across user-facing products, internal platforms, and critical distributed systems where architecture and production trade-offs need to be explicit. My approach connects product context, system design, and implementation.",
      items: [
        "Full-stack product engineering and system design",
        "Software architecture, modernization, and integration",
        "Reliability and production readiness",
        "AI-assisted developer tooling and workflow automation",
      ],
    },
    work: {
      marker: "01 / Selected systems",
      title: "Real problems, technical decisions, and production outcomes.",
      intro: "Four examples of systems I have worked on directly, from architectural design to rollout and observability.",
      confidentiality: "Some details are intentionally generalized to protect product confidentiality.",
      labels: ["Problem", "Direction", "System", "Scope"],
      cases: [
        {
          number: "01",
          chapter: "Pix key lifecycle",
          field: "Fintech · Distributed systems",
          title: "The asynchronous lifecycle of Pix keys",
          context: "Ownership claims, provider webhooks, and local records had to remain coherent across an asynchronous journey with multiple failure modes.",
          decision: "Treat consistency as an explicit lifecycle, with idempotency and reconciliation instead of relying on the illusion of one synchronous request.",
          architecture: "Event-driven state transitions, idempotent consumers, and recovery paths aligned local and external state while keeping each step observable.",
          scope: "Led the backend work from architectural design and data modeling through integrations, infrastructure, rollout, and production observability.",
          tags: ["Go", "Kotlin", "CQRS", "PostgreSQL", "SQS", "Kubernetes"],
        },
        {
          number: "02",
          chapter: "Shared capability",
          field: "Platform engineering",
          title: "Audit as a shared capability",
          context: "Audit records were essential, but repeated service-level implementations multiplied code, inconsistencies, and maintenance cost.",
          decision: "Create and maintain the team’s first shared library so services could adopt one contract without rebuilding the same capability.",
          architecture: "A common audit contract and reusable capture layer separated the shared rules from each product flow while preserving observability.",
          scope: "Created and maintained the team’s first shared library, reducing duplicated implementation and making a common contract easier for services to adopt.",
          tags: ["Go", "Kafka", "DDD", "Observability"],
        },
        {
          number: "03",
          chapter: "Controlled change",
          field: "Legacy modernization · Integration",
          title: "Modernizing without moving the risk",
          context: "Legacy flows carried production knowledge and business risk that could not simply be moved into a new service all at once.",
          decision: "Separate responsibilities and migrate gradually, making compatibility, observability, and recovery part of the modernization plan.",
          architecture: "API- and event-based boundaries reduced coupling while parallel paths and operational signals supported a controlled transition.",
          scope: "Worked directly on evolving legacy flows while keeping gradual migration, observability, and recovery as explicit parts of the change.",
          tags: ["APIs", "Events", "Migration", "Observability", "Recovery"],
        },
        {
          number: "04",
          chapter: "AI-assisted decommissioning",
          field: "Developer tooling · Applied AI",
          title: "Turning service decommissioning into a guided system",
          context: "Decommissioning a service was a long and delicate process spread across manual checks and multiple internal systems, making dependencies, risks, and required steps difficult to see.",
          decision: "Replace the fragmented checklist with an AI-assisted workflow that gathers context before proposing action while keeping engineers in control of the final decisions.",
          architecture: "Model Context Protocol (MCP) servers connected the tool to internal platforms, aggregating service ownership, dependencies, runtime signals, and operational context into a unified view.",
          scope: "Developed the internal tool and guided flow that turns cross-system discovery into an actionable decommissioning plan that is easier to understand and execute.",
          tags: ["Artificial Intelligence", "Model Context Protocol (MCP)", "MCP servers", "Developer tooling", "Workflow automation", "Service decommissioning"],
        },
      ],
    },
    research: {
      marker: "02 / Research & technical authority",
      title: "Research that sharpens how I design production systems.",
      copy: "At USP, I investigate how microservices can detect attacks, adapt their behavior, and recover with less human intervention. The work connects self-protection, self-healing, MAPE-K, and distributed-system security.",
      thesis: "This research informs how I approach observability, feedback loops, safe automation, and recovery in production.",
      tags: ["Architecture paper accepted at AISecDev 2026", "Experiment in progress"],
      imageAlt: "Entrance to the EESC-USP campus in São Carlos, where Vinícius develops his master's research",
      imageCaption: "EESC-USP · São Carlos · Personal archive",
    },
    path: {
      marker: "03 / Trajectory",
      title: "From research to production—and back to research.",
      intro: [
        "My path began in São Carlos, building systems for mental-health research at UFSCar and later continuing that work with FAPESP funding. I then brought that foundation in architecture and delivery into financial products at iFood.",
        "Today, also based in São Carlos, I combine production engineering with my master’s research at USP. They are different paths guided by the same question: how do we keep software reliable as complexity grows?",
      ],
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
          range: "Nov 2024 — present", place: "iFood", role: "Software Engineer", duration: `${durationSince(2024, 10, "en")} · ${durationSince(2024, 2, "en")} at iFood`,
          copy: "Financial products, full-stack engineering, distributed systems, production reliability, and AI-assisted internal tooling across Pix, transfers, and banking journeys.",
        },
        { range: "Mar 2025 — present", place: "USP", role: "M.Sc. Computer Science", duration: "1 yr 5 mo", copy: "Self-adaptive security for microservices and the question of how software can defend itself." },
      ],
    },
    threshold: {
      enter: { mode: "Day ──▶ Instrument", title: "Follow the signal.", hint: "entering the systems" },
      leave: { mode: "Instrument ──▶ Day", title: "Back to the person.", hint: "leaving the systems" },
    },
    writing: {
      marker: "Technical writing",
      title: "Is Clean Architecture always a good idea?",
      copy: "A practical argument about boundaries, abstractions and the moment architectural discipline becomes accidental complexity.",
      action: "Read on Medium",
      footnote: "Spring Boot · Clean Architecture · Trade-offs",
    },
    footer: {
      marker: "04 / Remote & international projects",
      title: "Working on a difficult software or AI system?",
      copy: "I am open to remote and international projects involving full-stack product engineering, software architecture, distributed systems, legacy modernization, applied AI, or production reliability. If the work is a good fit, I would like to hear about the system and the team behind it.",
      action: "Discuss a project",
      location: "São Carlos, Brazil · Open to remote collaboration",
      back: "Back to top",
    },
  },
  "pt-BR": {
    skip: "Ir para a história",
    nav: { services: "Atuação", work: "Sistemas", path: "Trajetória", contact: "Contato", resume: "Currículo" },
    hero: {
      eyebrow: "Engenharia de software · Sistemas full-stack e AI aplicada",
      role: "ENGENHEIRO DE SOFTWARE FULL-STACK",
      focus: "ENGENHARIA FULL-STACK · SISTEMAS DISTRIBUÍDOS · AI APLICADA · CONFIABILIDADE",
      statement: "Construo e evoluo sistemas de software sob restrições reais de produção.",
      intro: "Minha atuação envolve engenharia de produto full-stack, arquitetura de software, plataformas web, fluxos distribuídos, modernização de sistemas legados e ferramentas internas apoiadas por AI que precisam permanecer compreensíveis e confiáveis em produção. Estou aberto a projetos remotos e internacionais.",
      explore: "Conversar sobre um projeto",
      availability: `${durationSince(2024, 2, "pt-BR")} no iFood · Mestrando em Ciência da Computação na USP`,
      location: "São Carlos, Brasil · Aberto a projetos remotos e internacionais",
    },
    services: {
      marker: "00 / Como atuo",
      title: "Engenharia que leva a decisões técnicas claras.",
      copy: "Atuo em produtos digitais, plataformas internas e sistemas distribuídos críticos nos quais arquitetura e decisões de produção precisam ser explícitas. Meu trabalho conecta contexto de produto, desenho de sistemas e implementação.",
      items: [
        "Engenharia de produto full-stack e desenho de sistemas",
        "Arquitetura de software, modernização e integração",
        "Confiabilidade e prontidão para produção",
        "Ferramentas internas e automação de fluxos com AI",
      ],
    },
    work: {
      marker: "01 / Sistemas selecionados",
      title: "Problemas reais, decisões técnicas e resultados em produção.",
      intro: "Quatro exemplos de sistemas nos quais atuei diretamente, da definição arquitetural ao rollout e à observabilidade.",
      confidentiality: "Alguns detalhes foram generalizados para preservar a confidencialidade dos produtos.",
      labels: ["Problema", "Direcionamento", "Sistema", "Atuação"],
      cases: [
        {
          number: "01",
          chapter: "Ciclo de vida Pix",
          field: "Fintech · Sistemas distribuídos",
          title: "O ciclo assíncrono das chaves Pix",
          context: "Reivindicações de titularidade, webhooks de provedores e registros locais precisavam permanecer coerentes em uma jornada assíncrona com diferentes modos de falha.",
          decision: "Tratar a consistência como um ciclo de vida explícito, com idempotência e reconciliação no lugar da ilusão de uma única requisição síncrona.",
          architecture: "Transições orientadas a eventos, consumidores idempotentes e caminhos de recuperação alinharam estados locais e externos mantendo cada etapa observável.",
          scope: "Liderei o trabalho backend da definição arquitetural e modelagem de dados às integrações, infraestrutura, rollout e observabilidade em produção.",
          tags: ["Go", "Kotlin", "CQRS", "PostgreSQL", "SQS", "Kubernetes"],
        },
        {
          number: "02",
          chapter: "Capacidade compartilhada",
          field: "Engenharia de plataforma",
          title: "Auditoria como capacidade compartilhada",
          context: "Registros de auditoria eram essenciais, mas implementações repetidas em cada serviço multiplicavam código, inconsistências e custo de manutenção.",
          decision: "Criar e manter a primeira biblioteca compartilhada do time para que os serviços adotassem um contrato comum sem reconstruir a mesma capacidade.",
          architecture: "Um contrato comum de auditoria e uma camada reutilizável de captura separaram as regras compartilhadas de cada fluxo de produto, preservando a observabilidade.",
          scope: "Criei e mantive a primeira biblioteca compartilhada do time, reduzindo implementações duplicadas e facilitando a adoção de um contrato comum entre serviços.",
          tags: ["Go", "Kafka", "DDD", "Observabilidade"],
        },
        {
          number: "03",
          chapter: "Mudança controlada",
          field: "Modernização de legado · Integração",
          title: "Modernização sem transferir o risco",
          context: "Fluxos legados carregavam conhecimento de produção e risco de negócio que não podiam simplesmente ser movidos de uma vez para um novo serviço.",
          decision: "Separar responsabilidades e migrar de forma gradual, tornando compatibilidade, observabilidade e recuperação partes do plano de modernização.",
          architecture: "Fronteiras baseadas em APIs e eventos reduziram acoplamento enquanto caminhos paralelos e sinais operacionais sustentaram uma transição controlada.",
          scope: "Atuei diretamente na evolução dos fluxos legados, mantendo migração gradual, observabilidade e recuperação como partes explícitas da mudança.",
          tags: ["APIs", "Eventos", "Migração", "Observabilidade", "Recuperação"],
        },
        {
          number: "04",
          chapter: "Descomissionamento com AI",
          field: "Ferramentas internas · AI aplicada",
          title: "Transformando o descomissionamento de serviços em um fluxo guiado",
          context: "Descomissionar um serviço era um processo longo e delicado, distribuído entre verificações manuais e diferentes sistemas internos. Dependências, riscos e etapas necessárias eram difíceis de visualizar em conjunto.",
          decision: "Substituir o checklist fragmentado por um fluxo apoiado por AI, capaz de reunir contexto antes de propor ações e mantendo as decisões finais sob controle dos engenheiros.",
          architecture: "Servidores Model Context Protocol (MCP) conectaram a ferramenta às plataformas internas, reunindo propriedade dos serviços, dependências, sinais de execução e contexto operacional em uma visão unificada.",
          scope: "Desenvolvi a ferramenta interna e o fluxo guiado que transforma a descoberta entre sistemas em um plano de descomissionamento acionável, mais simples de compreender e executar.",
          tags: ["Artificial Intelligence", "Model Context Protocol (MCP)", "Servidores MCP", "Ferramentas internas", "Automação de fluxos", "Descomissionamento de serviços"],
        },
      ],
    },
    research: {
      marker: "02 / Pesquisa e autoridade técnica",
      title: "Pesquisa que influencia a forma como projeto sistemas em produção.",
      copy: "Na USP, investigo como microsserviços podem detectar ataques, adaptar seu comportamento e se recuperar com menor intervenção humana. O trabalho conecta autoproteção, autorrecuperação, MAPE-K e segurança de arquiteturas distribuídas.",
      thesis: "Essa pesquisa fortalece minha atuação prática em observabilidade, ciclos de feedback, automação segura e estratégias de recuperação.",
      tags: ["Artigo sobre a arquitetura aceito no AISecDev 2026", "Experimento em andamento"],
      imageAlt: "Entrada da EESC-USP em São Carlos, onde Vinícius desenvolve sua pesquisa de mestrado",
      imageCaption: "EESC-USP · São Carlos · Arquivo pessoal",
    },
    path: {
      marker: "03 / Trajetória",
      title: "Da pesquisa à produção e de volta à pesquisa.",
      intro: [
        "Minha trajetória começou em São Carlos, com o desenvolvimento de sistemas para pesquisas em saúde mental na UFSCar e com um projeto financiado pela FAPESP. Depois, levei essa base de arquitetura e entrega para produtos financeiros no iFood.",
        "Hoje, também em São Carlos, concilio a construção de sistemas financeiros em produção com a pesquisa de mestrado na USP. São duas frentes diferentes, mas orientadas pela mesma pergunta: como construir software que continue confiável quando a complexidade aumenta?",
      ],
      axisSpan: "span",
      axisDuration: "duração",
      axisNow: "agora",
      legend: ["Recuo = aninhado no span acima · sobreposição é concorrência, não sequência", "Cauda tracejada = projeção até mar 2027"],
      entries: [
        { range: "Jan 2021 a abr 2025", place: "UFSCar", role: "Ciência da Computação", duration: "4 a 4 m", copy: "Algoritmos, pensamento sistêmico e um interesse duradouro por perguntas difíceis." },
        { range: "Mar 2022 a mar 2023", place: "UFSCar", role: "Pesquisador Científico", duration: "1 a 1 m", copy: "Arquitetura web para pesquisa em reabilitação de saúde mental e uso de substâncias, com Next.js, TypeScript e CI/CD." },
        { range: "Mar 2023 a mar 2024", place: "FAPESP", role: "Pesquisador Científico", duration: "1 a 1 m", copy: "A mesma plataforma de reabilitação sob financiamento FAPESP, com foco em arquitetura do sistema, boas práticas e provisionamento com CI/CD." },
        { range: "Mar 2024 a nov 2024", place: "iFood", role: "Engenheiro de Software (estágio)", duration: "9 m", copy: "Back-office do iFood Pago, a primeira biblioteca compartilhada do time e um backend integrado a IA no hackathon interno." },
        {
          range: "Desde nov 2024", place: "iFood", role: "Engenheiro de Software", duration: `${durationSince(2024, 10, "pt-BR")} · ${durationSince(2024, 2, "pt-BR")} no iFood`,
          copy: "Produtos financeiros, engenharia full-stack, sistemas distribuídos, confiabilidade em produção e ferramentas internas apoiadas por AI nas jornadas de Pix, transferências e banking.",
        },
        { range: "Desde mar 2025", place: "USP", role: "Mestrado em Ciência da Computação", duration: "1 a 5 m", copy: "Segurança autoadaptativa para microsserviços e a pergunta de como o software pode se defender." },
      ],
    },
    threshold: {
      enter: { mode: "Dia ──▶ Instrumento", title: "Siga o sinal.", hint: "entrando nos sistemas" },
      leave: { mode: "Instrumento ──▶ Dia", title: "De volta à pessoa.", hint: "saindo dos sistemas" },
    },
    writing: {
      marker: "Escrita técnica",
      title: "Clean Architecture é sempre uma boa ideia?",
      copy: "Um argumento prático sobre limites, abstrações e o momento em que disciplina arquitetural se transforma em complexidade acidental.",
      action: "Ler no Medium",
      footnote: "Spring Boot · Clean Architecture · Trade-offs",
    },
    footer: {
      marker: "04 / Projetos remotos e internacionais",
      title: "Trabalhando em um sistema de software ou AI desafiador?",
      copy: "Estou aberto a projetos remotos e internacionais em engenharia de produto full-stack, arquitetura de software, sistemas distribuídos, modernização de legado, AI aplicada ou confiabilidade em produção. Se houver alinhamento, quero conhecer o sistema e o time por trás dele.",
      action: "Conversar sobre um projeto",
      location: "São Carlos, Brasil · Colaboração remota",
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

const contactHref =
  "mailto:viniciusromualdobusiness@gmail.com?subject=Project%20inquiry%3A%20project%20name";

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

  if (index === 2) {
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

  return (
    <svg className="case-diagram" viewBox="0 0 620 480" aria-hidden="true">
      <g className="diagram-layer layer-context">
        <path className="diagram-path" d="M58 104H164M58 194H164M58 284H164M58 374H164" />
        <rect x="34" y="80" width="48" height="48" rx="6" />
        <circle cx="58" cy="194" r="24" />
        <rect x="34" y="260" width="48" height="48" rx="24" />
        <rect x="34" y="350" width="48" height="48" rx="6" />
      </g>
      <g className="diagram-layer layer-decision">
        <rect x="164" y="154" width="112" height="172" rx="8" />
        <path className="diagram-path" d="M192 190H248M192 224H248M192 258H248M192 292H232" />
        <circle cx="220" cy="120" r="9" /><path className="diagram-path" d="M220 129V154" />
      </g>
      <g className="diagram-layer layer-architecture">
        <path className="diagram-path" d="M276 240H342M342 240C366 240 366 154 402 154M342 240H420M342 240C366 240 366 326 402 326" />
        <circle cx="342" cy="240" r="11" /><circle cx="420" cy="240" r="42" className="diagram-orbit" /><circle cx="420" cy="240" r="12" />
        <circle cx="402" cy="154" r="7" /><circle cx="402" cy="326" r="7" />
      </g>
      <g className="diagram-layer layer-outcome">
        <path className="diagram-path" d="M462 240H500" />
        <rect x="500" y="142" width="88" height="196" rx="8" />
        <path className="diagram-path" d="M520 182H568M520 220H568M520 258H568M520 296H552" />
        <circle cx="510" cy="182" r="4" /><circle cx="510" cy="220" r="4" /><circle cx="510" cy="258" r="4" /><circle cx="510" cy="296" r="4" />
      </g>
      <circle className="diagram-pulse" data-end-x="588" cx="58" cy="104" r="11" />
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
    const updateTime = () => setTime(new Intl.DateTimeFormat(locale, { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
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
    ["services", locale === "pt-BR" ? "Como posso ajudar" : "How I can help"],
    ["work", t.nav.work],
    ["research", locale === "pt-BR" ? "Pesquisa" : "Research"],
    ["path", t.nav.path],
    ["contact", t.nav.contact],
  ];

  return (
    <main ref={root}>
      <a className="skip-link" href="#services">{t.skip}</a>
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
          <a href="#services">{t.nav.services}</a>
          <a href="#work">{t.nav.work}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>
        <div className="header-actions">
          <button className="locale-toggle" type="button" onClick={() => setLocale(locale === "en" ? "pt-BR" : "en")} aria-label={locale === "en" ? "Mudar idioma para português" : "Switch language to English"}>
            <span className={locale === "en" ? "is-active" : ""}>EN</span><i>/</i><span className={locale === "pt-BR" ? "is-active" : ""}>PT</span>
          </button>
          <a className="resume-link" href="/vinicius-romualdo-resume.pdf" target="_blank" rel="noreferrer" type="application/pdf" aria-label={`${t.nav.resume} (PDF)`}>{t.nav.resume} <Arrow /></a>
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
        <h1 className="hero-name">
          <div className="hero-line"><span className="hero-word">Vinícius</span></div>
          <div className="hero-line"><span className="hero-word">Romualdo</span></div>
          <span className="hero-role">{t.hero.role}</span>
        </h1>
        <div className="hero-visual"><HeroTopology /></div>
        <p className="hero-focus">{t.hero.focus}</p>
        <div className="hero-intro">
          <strong>{t.hero.statement}</strong>
          <p>{t.hero.intro}</p>
          <a href="#contact">{t.hero.explore}<Arrow /></a>
        </div>
        <div className="hero-status"><i /><span>{t.hero.availability}</span></div>
      </section>

      <section className="principle chapter page-grid" id="services" data-chapter>
        <p className="chapter-marker">{t.services.marker}</p>
        <div className="principle-heading">
          <h2 data-reveal-heading>{t.services.title}</h2>
          <p>{t.services.copy.split(" ").map((word, index) => <span className="word" key={`${word}-${index}`}>{word} </span>)}</p>
        </div>
        <ol className="principle-list">
          {t.services.items.map((service, index) => <li className="principle" key={service}><span>0{index + 1}</span><strong>{service}</strong><i /></li>)}
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
                {[study.context, study.decision, study.architecture, study.scope].map((paragraph, step) => (
                  <div className="case-step" key={t.work.labels[step]} data-step={step + 1}>
                    <span>0{step + 1} / {t.work.labels[step]}</span>
                    <p>{paragraph}</p>
                  </div>
                ))}
                <div className="case-tags">{study.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
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
          <div className="path-intro">
            {t.path.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
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
          <a href={contactHref}><span>{t.footer.action}</span><Arrow /></a>
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
