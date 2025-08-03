import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import MouseFollower from "@/components/ui/mouse-follower";
import Footer from "@/components/ui/footer";
import CryptoPolyfill from "@/components/utility/crypto-polyfill"; // NEW

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Portfolio Website",
  description: "Created by Aditya Vikram Mahendru",
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
          <CryptoPolyfill /> {/* Ensures crypto.randomUUID exists */}
          <MouseFollower />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

