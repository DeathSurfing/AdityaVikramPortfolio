import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-32 border-t-[8px] border-border bg-background relative overflow-hidden">
      {/* Background accent shapes */}
      <div className="absolute right-[-5%] top-[20%] h-[200px] w-[200px] bg-primary/10 rotate-[20deg] border-4 border-border/20" />
      <div className="absolute left-[-3%] bottom-[10%] h-[150px] w-[150px] bg-secondary/10 rotate-[-15deg] border-4 border-border/20" />

      {/* Top accent strip */}
      <div className="h-3 w-full bg-border flex">
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-background" />
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="inline-block px-6 py-3 bg-foreground text-background border-4 border-border rotate-[-1deg] shadow-[6px_6px_0_hsl(var(--border))]">
              <p className="font-mono font-black text-2xl tracking-widest">
                adityavikram.dev
              </p>
            </div>
            <p className="text-base font-bold leading-relaxed border-l-4 border-primary pl-4">
              Elite gaming tools for competitive domination. Undetected, updated, unstoppable.
            </p>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <div className="mb-4 px-4 py-2 bg-muted inline-block border-3 border-border shadow-[3px_3px_0_hsl(var(--border))]">
              <p className="font-black text-sm uppercase tracking-widest">LEGAL</p>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/legal/terms"
                  className="
                    font-bold text-base
                    hover:text-primary
                    transition-colors
                    inline-flex items-center gap-2
                    group
                  "
                >
                  <span className="w-2 h-2 bg-border group-hover:bg-primary transition-colors" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy"
                  className="
                    font-bold text-base
                    hover:text-primary
                    transition-colors
                    inline-flex items-center gap-2
                    group
                  "
                >
                  <span className="w-2 h-2 bg-border group-hover:bg-primary transition-colors" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/refund"
                  className="
                    font-bold text-base
                    hover:text-primary
                    transition-colors
                    inline-flex items-center gap-2
                    group
                  "
                >
                  <span className="w-2 h-2 bg-border group-hover:bg-primary transition-colors" />
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <div className="mb-4 px-4 py-2 bg-muted inline-block border-3 border-border shadow-[3px_3px_0_hsl(var(--border))]">
              <p className="font-black text-sm uppercase tracking-widest">SUPPORT</p>
            </div>
            <div className="space-y-4">
              <Link
                href="https://discord.gg/YOUR_INVITE_CODE"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-3
                  px-6 py-3
                  bg-primary text-primary-foreground
                  border-4 border-border
                  shadow-[4px_4px_0_hsl(var(--border))]
                  hover:shadow-[6px_6px_0_hsl(var(--border))]
                  hover:-translate-x-[1px]
                  hover:-translate-y-[1px]
                  transition-all
                  font-black
                  uppercase
                  tracking-wide
                  text-sm
                "
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                JOIN DISCORD
              </Link>
              <p className="text-sm font-bold text-muted-foreground">
                Official support channel only
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t-[6px] border-border bg-muted">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="flex flex-col md:flex-row gap-4 items-center text-sm font-bold">
            <p>© {new Date().getFullYear()} 69K.LOL. ALL RIGHTS RESERVED.</p>
            <div className="hidden md:block w-1 h-1 bg-border" />
            <p className="text-muted-foreground text-xs">
              INDEPENDENT PLATFORM • NOT AFFILIATED WITH GAME PUBLISHERS
            </p>
          </div>

          <div className="px-4 py-2 border-3 border-border bg-background shadow-[3px_3px_0_hsl(var(--border))]">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}