"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  DownloadIcon,
  ExternalLinkIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";

export default function ResumePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-2xl font-black">Loading…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b-[6px] border-border">
        {/* Striped top accent */}
        <div className="h-2.5 w-full bg-border flex">
          <div className="flex-1 bg-primary" />
          <div className="flex-1 bg-background" />
          <div className="flex-1 bg-primary" />
          <div className="flex-1 bg-background" />
        </div>

        <div className="mx-auto max-w-7xl px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <Link
              href="/#contact"
              className="group flex items-center gap-2 border-[4px] border-border bg-background px-4 py-2 font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_var(--border)] transition-all hover:shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              BACK
            </Link>

            {/* Title */}
            <div className="hidden md:flex items-center gap-3">
              <div className="w-10 h-10 border-[4px] border-border bg-primary flex items-center justify-center">
                <FileTextIcon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="font-black text-xl tracking-wider">
                ADITYA VIKRAM - RESUME
              </h1>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <a
                href="/uploads/Resume.pdf"
                download="Aditya_Vikram_Resume.pdf"
                className="flex items-center gap-2 border-[4px] border-border bg-primary px-4 py-2 font-black text-sm uppercase tracking-wider text-primary-foreground shadow-[4px_4px_0px_0px_var(--border)] transition-all hover:shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                <DownloadIcon className="h-4 w-4" />
                <span className="hidden sm:inline">DOWNLOAD</span>
              </a>

              <a
                href="/uploads/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-[4px] border-border bg-background px-4 py-2 font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_var(--border)] transition-all hover:shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                <ExternalLinkIcon className="h-4 w-4" />
                <span className="hidden sm:inline">OPEN</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {/* Decorative Elements */}
        <div className="absolute top-8 left-8 w-24 h-24 border-[4px] border-foreground bg-primary rotate-12 hidden lg:block" />
        <div className="absolute top-8 right-8 w-20 h-20 border-[4px] border-foreground bg-background -rotate-6 hidden lg:block" />

        {/* PDF Viewer */}
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-8">
          <div className="border-[6px] border-border bg-background shadow-[12px_12px_0px_0px_var(--border)]">
            {/* PDF Container */}
            <div className="relative aspect-[8.5/11] w-full bg-muted">
              <iframe
                src="/uploads/Resume.pdf"
                className="absolute inset-0 w-full h-full"
                title="Aditya Vikram Resume"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="border-[4px] border-border bg-background p-6 shadow-[6px_6px_0px_0px_var(--border)]">
              <h2 className="font-black text-xl mb-4 border-b-[3px] border-border pb-2">
                ABOUT THIS RESUME
              </h2>
              <p className="font-bold text-sm leading-relaxed text-muted-foreground">
                This resume contains my professional experience, skills, and
                achievements. Feel free to download it or view it in full screen
                for better readability.
              </p>
            </div>

            <div className="border-[4px] border-border bg-primary p-6 shadow-[6px_6px_0px_0px_var(--border)]">
              <h2 className="font-black text-xl mb-4 text-primary-foreground border-b-[3px] border-primary-foreground/30 pb-2">
                GET IN TOUCH
              </h2>
              <p className="font-bold text-sm leading-relaxed text-primary-foreground mb-4">
                Interested in working together? Let's discuss your project!
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 border-[3px] border-primary-foreground bg-background px-4 py-2 font-black text-sm uppercase tracking-wider text-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] transition-all hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                CONTACT ME
                <ArrowLeftIcon className="h-4 w-4 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-[6px] border-border bg-muted mt-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-black text-sm">
              © {new Date().getFullYear()} ADITYA VIKRAM
            </p>
            <p className="font-bold text-xs text-muted-foreground uppercase tracking-wider">
              Full Stack Developer
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
