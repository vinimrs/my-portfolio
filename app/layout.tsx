import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { resolveSiteLocale } from "./i18n";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

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
    ? "Vinicius Romualdo | Engenharia de Software, Fintech e Sistemas Distribuídos"
    : "Vinicius Romualdo | Fintech & Distributed Systems Engineer";
  const description = isPortuguese
    ? "Engenheiro de Software no iFood construindo sistemas financeiros e distribuídos confiáveis com Go, Kotlin e arquitetura orientada a eventos."
    : "Software Engineer at iFood building reliable financial and distributed systems with Go, Kotlin and event-driven architecture. Based in Brazil.";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: "%s | Vinicius Romualdo",
    },
    description,
    keywords: [
      "Vinicius Romualdo",
      "Software Engineer",
      "Fintech Engineer",
      "Distributed Systems",
      "Backend Engineer",
      "Go",
      "Kotlin",
      "Event-driven Architecture",
      "Microservices",
    ],
    authors: [{ name: "Vinicius Romualdo" }],
    creator: "Vinicius Romualdo",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: isPortuguese ? "pt_BR" : "en_US",
      url: "/",
      siteName: "Vinicius Romualdo",
      title,
      description,
      images: [
        {
          url: "/vinicius-romualdo-og.png",
          width: 1200,
          height: 630,
          alt: isPortuguese
            ? "Vinicius Romualdo, Engenheiro de Software especializado em sistemas financeiros e distribuídos"
            : "Vinicius Romualdo, Software Engineer focused on financial and distributed systems",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/vinicius-romualdo-og.png"],
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

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
