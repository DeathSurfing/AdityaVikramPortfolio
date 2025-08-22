import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import MouseFollower from "@/components/ui/mouse-follower";
import Footer from "@/components/ui/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
//
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aditya Vikram Mahendru - Software Engineer & AI/ML Enthusiast",
  description: "Software Engineering Intern at Woxsen AI Research Center. Full-stack developer with expertise in Python, JavaScript, Rust, Next.js, and AI/ML. Building scalable systems for 600+ users.",
  keywords: "Software Engineer, Full Stack Developer, AI ML, Next.js, Python, Rust, JavaScript, React, Portfolio, Aditya Vikram Mahendru",
  authors: [{ name: "Aditya Vikram Mahendru" }],
  creator: "Aditya Vikram Mahendru",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adityavikram.dev",
    title: "Aditya Vikram Mahendru - Software Engineer & AI/ML Enthusiast",
    description: "Software Engineering Intern at Woxsen AI Research Center. Full-stack developer with expertise in Python, JavaScript, Rust, Next.js, and AI/ML.",
    siteName: "Aditya Vikram Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Vikram Mahendru - Software Engineer & AI/ML Enthusiast",
    description: "Software Engineering Intern at Woxsen AI Research Center. Full-stack developer with expertise in Python, JavaScript, Rust, Next.js, and AI/ML.",
    creator: "@adityavikram",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/AFavicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased pb-16`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MouseFollower />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

