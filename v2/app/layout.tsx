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
import { ConvexClientProvider } from "@/providers/ConvexClientProvider";
import { siteMetadata } from "@/data/site";


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
