import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      "https://vinicius-portfolio.vercel.app",
  ),
  title: {
    default: "Vinicius Romualdo | Fintech & Distributed Systems Engineer",
    template: "%s | Vinicius Romualdo",
  },
  description:
    "Software Engineer at iFood building reliable financial and distributed systems with Go, Kotlin and event-driven architecture. Based in Brazil.",
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
    locale: "en_US",
    url: "/",
    siteName: "Vinicius Romualdo",
    title: "Vinicius Romualdo | Software Engineer",
    description:
      "Building reliable financial and distributed systems. Software Engineer at iFood and graduate researcher in adaptive microservices security at USP.",
    images: [
      {
        url: "/vinicius-romualdo-og.png",
        width: 1200,
        height: 630,
        alt: "Vinicius Romualdo, Software Engineer focused on financial and distributed systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinicius Romualdo | Software Engineer",
    description:
      "Building reliable financial and distributed systems at the intersection of fintech, backend architecture and security research.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
