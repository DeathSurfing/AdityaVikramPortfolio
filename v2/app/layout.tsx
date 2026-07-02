import type { Metadata, Viewport } from "next";
import {
  Space_Grotesk,
  Archivo_Black,
  IBM_Plex_Mono,
} from "next/font/google";

import "./globals.css";

import Header from "@/components/custom/header";
import { ThemeProvider } from "@/components/theme-provider";
import LenisProvider from "@/providers/LenisProvider";
import LenisHashHandler from "@/providers/LenisHashHandler";
import { ConvexClientProvider } from "@/providers/ConvexClientProvider";
import { siteMetadata, siteConfig } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Aditya Vikram Mahendru",
      url: siteConfig.url,
      image: `${siteConfig.url}/AdityaVikram.webp`,
      jobTitle: "Full Stack Developer",
      email: `mailto:${siteConfig.email}`,
      sameAs: [
        siteConfig.linkedin.url,
        siteConfig.github.url,
      ],
      knowsAbout: [
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "Docker",
        "Kubernetes",
      ],
    },
    {
      "@type": "WebSite",
      name: "Aditya Vikram",
      url: siteConfig.url,
      author: {
        "@type": "Person",
        name: "Aditya Vikram Mahendru",
      },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};


/* ───────────────────────── Fonts ───────────────────────── */

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-head",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

/* ─────────────────────── Metadata ─────────────────────── */

export const metadata: Metadata = siteMetadata;

/* ─────────────────────── Layout ─────────────────────── */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${plexMono.variable}`}
      style={{ colorScheme: "dark" }}
    >
      <body className="bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ConvexClientProvider>
          <ThemeProvider>
            <LenisProvider>
              <LenisHashHandler />
              <Header />
              {children}
            </LenisProvider>
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
