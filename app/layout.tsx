import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { resolveSiteLocale } from "./i18n";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://viniromualdo.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveSiteLocale(await headers());
  const isPortuguese = locale === "pt-BR";
  const title = isPortuguese
    ? "Vinícius Romualdo | Full-stack, Sistemas Distribuídos e AI Aplicada"
    : "Vinícius Romualdo | Full-stack, Distributed Systems & Applied AI";
  const description = isPortuguese
    ? "Engenheiro de Software Full-stack no iFood e mestrando na USP, com experiência em produtos web, arquitetura de software, sistemas distribuídos, automação com AI e Model Context Protocol (MCP). Aberto a projetos remotos e internacionais."
    : "Full-stack Software Engineer at iFood and M.Sc. candidate at USP with experience in web products, software architecture, distributed systems, AI automation, and Model Context Protocol (MCP). Open to remote and international projects.";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: "%s | Vinícius Romualdo",
    },
    description,
    keywords: [
      "Vinícius Romualdo",
      "Software Engineer",
      "Full-stack Software Engineer",
      "Full Stack Engineer",
      "Full-stack Development",
      "Frontend Development",
      "Backend Software Engineer",
      "Software Architecture",
      "Legacy Modernization",
      "Fintech Engineer",
      "Distributed Systems",
      "Remote Software Engineer",
      "International Software Projects",
      "Go",
      "Kotlin",
      "TypeScript",
      "React",
      "Next.js",
      "Web Platforms",
      "Event-driven Architecture",
      "Microservices",
      "Artificial Intelligence",
      "Applied AI",
      "AI Engineering",
      "Generative AI",
      "AI Automation",
      "Model Context Protocol",
      "Model Context Protocol (MCP)",
      "MCP Servers",
      "Developer Tooling",
      "Workflow Automation",
      "Service Decommissioning",
    ],
    authors: [{ name: "Vinícius Romualdo" }],
    creator: "Vinícius Romualdo",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: isPortuguese ? "pt_BR" : "en_US",
      url: "/",
      siteName: "Vinícius Romualdo",
      title,
      description,
      images: [
        {
          url: "/vinicius-romualdo-og-fullstack.png",
          width: 1200,
          height: 630,
          alt: isPortuguese
            ? "Vinícius Romualdo, Engenheiro de Software Full-stack com foco em sistemas distribuídos e AI aplicada"
            : "Vinícius Romualdo, Full-stack Software Engineer focused on distributed systems and applied AI",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/vinicius-romualdo-og-fullstack.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = resolveSiteLocale(await headers());
  const structuredProfile = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vinícius Romualdo",
    url: siteUrl,
    email: "mailto:viniciusromualdobusiness@gmail.com",
    jobTitle: "Full-stack Software Engineer",
    description: "Full-stack Software Engineer working on web products, software architecture, distributed systems, production reliability, and AI-assisted developer tooling, including Model Context Protocol integrations.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Carlos",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    worksFor: {
      "@type": "Organization",
      name: "iFood",
    },
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Universidade de São Paulo",
    },
    sameAs: [
      "https://www.linkedin.com/in/vinimrs/",
      "https://github.com/vinimrs",
      "https://medium.com/@viniciusromualdobusiness",
    ],
    knowsAbout: [
      "Software architecture",
      "Full-stack engineering",
      "Frontend development",
      "Web platforms",
      "React",
      "Next.js",
      "Backend engineering",
      "Legacy modernization",
      "Distributed systems",
      "Production reliability",
      "Artificial intelligence",
      "Applied AI",
      "Generative AI",
      "AI-assisted automation",
      "Model Context Protocol (MCP)",
      "MCP servers",
      "Developer tooling",
      "Workflow automation",
      "Service decommissioning",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Full-stack Software Engineer",
      skills: [
        "Full-stack product engineering",
        "Frontend development",
        "React",
        "Next.js",
        "Backend architecture",
        "Distributed systems",
        "Go",
        "Kotlin",
        "TypeScript",
        "Event-driven architecture",
        "Artificial Intelligence (AI)",
        "Generative AI",
        "Model Context Protocol (MCP)",
        "AI automation",
        "Developer tooling",
      ],
    },
  };

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredProfile).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
