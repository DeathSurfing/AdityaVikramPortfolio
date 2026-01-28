import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    default: "Aditya Vikram — Full Stack Developer",
    template: "%s | Aditya Vikram",
  },
  description:
    "Full stack developer specializing in TypeScript, React, and modern web technologies. Explore my projects and digital products.",
  applicationName: "Aditya Vikram Portfolio",

  metadataBase: new URL("https://adityavikram.dev"),
  alternates: {
    canonical: "/",
  },

  keywords: [
    "Aditya Vikram",
    "full stack developer",
    "TypeScript",
    "React",
    "web development",
    "portfolio",
  ],

  authors: [{ name: "Aditya Vikram" }],
  creator: "Aditya Vikram",
  publisher: "Aditya Vikram",

  openGraph: {
    title: "Aditya Vikram — Full Stack Developer",
    description:
      "Full stack developer creating modern web applications with TypeScript and React.",
    url: "https://adityavikram.dev",
    siteName: "Aditya Vikram",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Aditya Vikram — Full Stack Developer",
    description:
      "Exploring full stack development, modern technologies, and digital innovation.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
};

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
    >
      <body className="bg-background text-foreground antialiased">
          <ThemeProvider>
            <LenisProvider>
              <LenisHashHandler />
                  <Header />
                  {children}
            </LenisProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
