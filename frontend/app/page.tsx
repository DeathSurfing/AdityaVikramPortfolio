// app/page.tsx
// SERVER COMPONENT (no "use client" here) — Page paints fast, client-only pieces hydrate later.

import React from "react";
import LenisSmoothScroll from "@/components/ui/lenis-smooth-scroll"; // client component
import AnimatedShapesWrapper from "@/components/AnimatedShapesWrapper"; // client component (wraps the heavy shapes)
import { Inter } from "next/font/google";
import {
  Calendar,
  MapPin,
  Code2,
  Users,
  Download,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Briefcase,
  User,
  Sparkles,
} from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-inter",
});

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function HomePage() {
  return (
    // Lenis is a client component; rendering it here does not block server paint.
    <LenisSmoothScroll>
      <div
        className={cn(
          "bg-background relative w-full overflow-hidden",
          inter.variable
        )}
      >
        {/* Hero Section */}
        <section className="relative flex min-h-screen w-full items-center justify-center">
          {/* subtle background gradient (reduced blur/cost) */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-rose-500/8 pointer-events-none" />

          <div className="relative z-10 container mx-auto max-w-6xl px-6 py-20">
            <div className="text-center space-y-12">
              {/* Header — NO animation on h1 to avoid delaying LCP */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight font-serif">
                  <span className="bg-gradient-to-r from-foreground via-foreground/95 to-foreground/85 bg-clip-text text-transparent">
                    Aditya Vikram Mahendru
                  </span>
                </h1>

                <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium max-w-3xl mx-auto">
                  Build Fast. Build Scaleable
                </p>

                <div className="flex items-center justify-center gap-6 text-sm md:text-base text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>Hyderabad, India</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>B.Tech CSE (AI & ML), 2028</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span>Available for Internships</span>
                  </div>
                </div>
              </div>

              {/* Primary CTAs (kept simple, small animations on hover only) */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6" style={{ animationDelay: "0.35s" }}>
                <a
                  href="/whoami"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-marron-600 to-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 shadow-md text-lg group"
                >
                  <User className="h-5 w-5" />
                  Who Am I?
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="/experience"
                  className="inline-flex items-center gap-2 bg-green-600 text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:scale-105 shadow-md text-lg group"
                >
                  <Briefcase className="h-5 w-5" />
                  Experience
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 shadow-md text-lg group"
                >
                  <Code2 className="h-5 w-5" />
                  Projects
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Scroll indicator (tiny, non-blocking) */}
              <div className="pt-8">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <span className="text-sm font-medium">Scroll to explore</span>
                  <ArrowRight className="h-5 w-5 rotate-90" />
                </div>
              </div>
            </div>
          </div>

          {/* subtle top overlay to unify look */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent dark:from-black dark:to-black/80" />
        </section>

        {/* Value Proposition Section */}
        <section id="bring-to-team" className="relative min-h-screen flex items-center py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/8 via-transparent to-violet-500/8 pointer-events-none" />
          <div className="relative z-10 container mx-auto max-w-6xl px-6">
            <div className="space-y-16">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">What I Bring to Your Team</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Production-ready skills and real-world experience to make an impact from day one
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                <div className="bg-card border border-border/40 rounded-2xl p-8 text-left group hover:bg-card/50 transition-all hover:scale-[1.02]">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500/10 p-4 rounded-xl">
                      <Code2 className="h-7 w-7 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-3">Production-Ready Code</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Experience building scalable systems handling thousands of users.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border/40 rounded-2xl p-8 text-left group hover:bg-card/50 transition-all hover:scale-[1.02]">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500/10 p-4 rounded-xl">
                      <Users className="h-7 w-7 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-3">Team Collaboration</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Led development teams and collaborated with stakeholders.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border/40 rounded-2xl p-8 text-left group hover:bg-card/50 transition-all hover:scale-[1.02]">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-500/10 p-4 rounded-xl">
                      <Briefcase className="h-7 w-7 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-3">Business Impact</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Improved deployment times by 60%, reduced cloud costs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border/40 rounded-2xl p-8 text-left group hover:bg-card/50 transition-all hover:scale-[1.02]">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-500/10 p-4 rounded-xl">
                      <Sparkles className="h-7 w-7 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-3">Continuous Learning</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Built CNNs from scratch in Rust and always curious about systems.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="relative min-h-screen flex items-center py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/8 via-transparent to-amber-500/8 pointer-events-none" />
          <div className="relative z-10 container mx-auto max-w-6xl px-6">
            <div className="space-y-12">
              <div className="text-center space-y-4">
                <h3 className="text-3xl md:text-4xl font-bold">My Tech Arsenal</h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Modern tools and frameworks to build fast, scalable applications
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                {[
                  { name: "Kubernetes", color: "border-blue-500/30 hover:border-blue-500" },
                  { name: "K3s", color: "border-blue-400/30 hover:border-blue-400" },
                  { name: "MetalLB", color: "border-sky-500/30 hover:border-sky-500" },
                  { name: "Docker", color: "border-sky-400/30 hover:border-sky-400" },
                  { name: "Raspberry Pi", color: "border-red-400/30 hover:border-red-400" },
                  { name: "Proxmox", color: "border-orange-500/30 hover:border-orange-500" },
                  { name: "Nginx", color: "border-green-500/30 hover:border-green-500" },

                  { name: "Next.js", color: "border-neutral-500/30 hover:border-neutral-500" },
                  { name: "Tailwind CSS", color: "border-cyan-500/30 hover:border-cyan-500" },
                  { name: "MongoDB", color: "border-emerald-500/30 hover:border-emerald-500" },
                  { name: "Redis", color: "border-red-500/30 hover:border-red-500" },
                  { name: "Umami Analytics", color: "border-purple-500/30 hover:border-purple-500" },

                  { name: "Python", color: "border-blue-500/30 hover:border-blue-500" },
                  { name: "Pandas", color: "border-yellow-500/30 hover:border-yellow-500" },
                  { name: "Machine Learning", color: "border-indigo-500/30 hover:border-indigo-500" },
                  { name: "Data Analysis", color: "border-indigo-400/30 hover:border-indigo-400" },
                  { name: "Spotify API", color: "border-green-400/30 hover:border-green-400" },

                  { name: "LLaMA 3.1", color: "border-pink-500/30 hover:border-pink-500" },
                  { name: "Natural Language Processing", color: "border-fuchsia-500/30 hover:border-fuchsia-500" },
                  { name: "AI", color: "border-violet-500/30 hover:border-violet-500" },

                  { name: "Rust", color: "border-orange-500/30 hover:border-orange-500" },
                  { name: "Neural Networks", color: "border-yellow-400/30 hover:border-yellow-400" },
                  { name: "Deep Learning", color: "border-purple-400/30 hover:border-purple-400" },
                  { name: "Linear Algebra", color: "border-zinc-400/30 hover:border-zinc-400" },

                  { name: "Text Processing", color: "border-gray-400/30 hover:border-gray-400" },
                  { name: "Data Cleaning", color: "border-gray-300/30 hover:border-gray-300" },
                  { name: "Interactive UI", color: "border-blue-300/30 hover:border-blue-300" }
                ].map((tech, i) => (
                  <span
                    key={tech.name}
                    className={`px-6 py-3 text-base rounded-full border-2 font-medium transition-all hover:scale-110 ${tech.color}`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative min-h-screen flex items-center py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 pointer-events-none" />
          <div className="relative z-10 container mx-auto max-w-4xl px-6">
            <div className="space-y-12 text-center">
              <div className="bg-card border border-primary/20 rounded-3xl p-10 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Build Something Amazing</h2>
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                  <span className="text-foreground font-semibold">Ready to contribute</span> to your next big project.
                </p>

                <div className="pt-6 border-t border-border/30 mb-8">
                  <p className="text-sm text-muted-foreground">Open to: Full-time roles, internships, and exciting projects</p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <a href="/uploads/Resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-card border-2 border-primary/50 text-foreground px-6 py-3 rounded-xl font-semibold">
                    <Download className="h-5 w-5" /> Download Resume
                  </a>
                  <a href="mailto:jobs.aditya.vikram.mahendru@gmail.com" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold">
                    <Mail className="h-5 w-5" /> Get in Touch
                  </a>
                </div>

                <div className="flex justify-center gap-4">
                  <a href="https://github.com/DeathSurfing" target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center bg-card rounded-xl">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/aditya-vikram-mahendru/" target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center bg-card rounded-xl">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="mailto:jobs.aditya.vikram.mahendru@gmail.com" className="w-12 h-12 flex items-center justify-center bg-card rounded-xl">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Animated shapes are intentionally mounted after the core hero/content so they hydrate later */}
        <AnimatedShapesWrapper />
      </div>
    </LenisSmoothScroll>
  );
}
