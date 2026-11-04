import type { Metadata, Viewport } from "next";
import {
  Space_Grotesk,
  Instrument_Serif,
  IBM_Plex_Mono,
} from "next/font/google";

import "./globals.css";

import StaggeredMenu from "@/components/identity/StaggeredMenu";
import PageWipe from "@/components/identity/PageWipe";
import SiteHeader from "@/components/identity/SiteHeader";
import { siteMetadata } from "@/data/site";
import { profile } from "@/data/profile";
import { siteJsonLd } from "@/lib/schema";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "About", ariaLabel: "Read about Aditya", link: "/about" },
  { label: "Projects", ariaLabel: "View projects", link: "/projects" },
  { label: "Experience", ariaLabel: "View experience", link: "/experience" },
  { label: "Blog", ariaLabel: "Read the blog", link: "/blog" },
  { label: "Resume", ariaLabel: "View resume", link: "/resume" },
];

const socialItems = [
  {
    label: "LinkedIn",
    link: profile.accounts.linkedin,
  },
  { label: "GitHub", link: profile.accounts.github },
  { label: "Substack", link: profile.accounts.substack },
  { label: "Hugging Face", link: profile.accounts.huggingface },
];

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-editorial",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-space",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

/* ─────────────────────── Metadata ─────────────────────── */

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a09' },
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
      className={`dark ${instrumentSerif.variable} ${spaceGrotesk.variable} ${plexMono.variable}`}
    >
      <body className="bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <SiteHeader />
        {/* The menu is rendered before the page content so the mobile toggle is
            early in the tab order. The fixed panel is inert while closed and
            has no headings, so the page h1 remains the first heading. */}
        <StaggeredMenu
          isFixed
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={false}
          closeOnClickAway={true}
          colors={['#121210', '#1c1a16']}
          menuButtonColor="#f4f1e8"
          openMenuButtonColor="#ffcc00"
          accentColor="#ffcc00"
        />
        {children}
        <PageWipe />
      </body>
    </html>
  );
}
