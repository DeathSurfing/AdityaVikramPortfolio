import Link from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { quickLinks, socialLinks, type SocialLink } from "@/data";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-background overflow-hidden">
      {/* Top Accent Strip */}
      <div className="h-4 w-full bg-border flex">
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-background" />
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-background" />
        <div className="flex-1 bg-foreground" />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 border-t-[6px] border-border">
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Decorative Shapes */}
        <div className="absolute top-8 right-8 w-32 h-32 border-[4px] border-foreground/10 bg-primary/5 rotate-12 hidden lg:block" />
        <div className="absolute bottom-24 left-8 w-24 h-24 border-[4px] border-foreground/10 bg-secondary/5 -rotate-6 hidden lg:block" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="inline-block px-6 py-3 bg-foreground text-background border-4 border-border -rotate-1 shadow-[6px_6px_0_hsl(var(--border))]">
                <p className="font-mono font-black text-2xl tracking-widest">
                  ADITYA<span className="text-primary">.</span>
                </p>
              </div>
              <p className="text-base font-bold leading-relaxed border-l-4 border-primary pl-4 max-w-sm">
                Full Stack Developer crafting scalable digital experiences with
                modern technologies.
              </p>

              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                aria-label="Scroll back to top of page"
                className="group inline-flex items-center gap-2 border-[4px] border-border bg-background px-4 py-2 font-black text-sm uppercase tracking-wider shadow-[4px_4px_0_hsl(var(--border))] hover:shadow-[2px_2px_0_hsl(var(--border))] hover:translate-x-[2px] hover:translate-y-[2px] transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <ArrowUpIcon className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
                BACK TO TOP
              </button>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <div className="mb-4 px-4 py-2 bg-muted inline-block border-3 border-border shadow-[3px_3px_0_hsl(var(--border))] -rotate-1">
                <p className="font-black text-sm uppercase tracking-widest">
                  NAVIGATION
                </p>
              </div>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="
                        font-bold text-base
                        hover:text-primary
                        transition-colors
                        inline-flex items-center gap-2
                        group
                      "
                    >
                      <span className="w-2 h-2 bg-border group-hover:bg-primary transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Section */}
            <div className="space-y-4">
              <div className="mb-4 px-4 py-2 bg-primary inline-block border-3 border-border shadow-[3px_3px_0_hsl(var(--border))] rotate-1">
                <p className="font-black text-sm uppercase tracking-widest text-primary-foreground">
                  CONNECT
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social: SocialLink) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target={social.url.startsWith("http") ? "_blank" : undefined}
                      rel={
                        social.url.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="
                        group
                        flex items-center gap-3
                        border-[3px] border-border
                        bg-background
                        px-4 py-3
                        font-black text-sm
                        uppercase tracking-wider
                        shadow-[3px_3px_0_hsl(var(--border))]
                        hover:shadow-[1px_1px_0_hsl(var(--border))]
                        hover:translate-x-[2px]
                        hover:translate-y-[2px]
                        transition-all
                      "
                    >
                      <span className="text-foreground group-hover:text-primary transition-colors">
                        <IconComponent className="h-5 w-5" />
                      </span>
                      {social.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-[6px] border-border bg-muted">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="flex flex-col md:flex-row gap-4 items-center text-sm font-bold">
                <p>© {new Date().getFullYear()} ADITYA VIKRAM</p>
                <div className="hidden md:block w-2 h-2 bg-border rotate-45" />
                <p className="text-muted-foreground text-xs uppercase tracking-wider">
                  ALL RIGHTS RESERVED
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <span>Built with</span>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-background border-2 border-border">
                    Next.js
                  </span>
                  <span className="px-2 py-1 bg-background border-2 border-border">
                    TypeScript
                  </span>
                  <span className="px-2 py-1 bg-background border-2 border-border">
                    Tailwind
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
