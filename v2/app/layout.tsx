import type { Metadata, Viewport } from "next";
import {
  Space_Grotesk,
  Archivo_Black,
  IBM_Plex_Mono,
} from "next/font/google";

import "./globals.css";

import StaggeredMenu from "@/components/identity/StaggeredMenu";
import PageWipe from "@/components/identity/PageWipe";
import { siteMetadata } from "@/data/site";
import { profile } from "@/data/profile";
import { siteJsonLd } from "@/lib/schema";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "Projects", ariaLabel: "View projects", link: "/projects" },
  { label: "Experience", ariaLabel: "View experience", link: "/experience" },
  { label: "Blog", ariaLabel: "Read the blog", link: "/blog" },
  { label: "Resume", ariaLabel: "View resume", link: "/resume" },
];

const socialItems = [
  {
    label: "LinkedIn",
    link: profile.sameAs[1],
  },
  { label: "GitHub", link: profile.sameAs[0] },
];

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
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
      className={`dark ${archivoBlack.variable} ${spaceGrotesk.variable} ${plexMono.variable}`}
      style={{ colorScheme: "dark" }}
    >
      <body className="bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        {children}
        {/* Rendered after the page content so the page's h1 is the first
            heading in the accessibility tree. The menu is position: fixed,
            so visual order is unchanged. */}
        <StaggeredMenu
          isFixed
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={false}
          closeOnClickAway={true}
        />
        <PageWipe />
      </body>
    </html>
  );
}
