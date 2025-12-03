'use client';

import { motion } from 'framer-motion';
import { Inter, Geist_Mono, Playfair_Display } from 'next/font/google';
import { Calendar, MapPin, Code2, Users, Download, Github, Linkedin, Mail, ArrowRight, Briefcase, User, Sparkles } from 'lucide-react';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-geist-mono',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
});

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}



function StarShape({
  size = 100,
  gradient = 'from-white/[0.08]'
}) {
  const starPath = `
    M${size / 2},${size * 0.1} 
    L${size * 0.61},${size * 0.35} 
    L${size * 0.95},${size * 0.35} 
    L${size * 0.68},${size * 0.57} 
    L${size * 0.79},${size * 0.91} 
    L${size / 2},${size * 0.7} 
    L${size * 0.21},${size * 0.91} 
    L${size * 0.32},${size * 0.57} 
    L${size * 0.05},${size * 0.35} 
    L${size * 0.39},${size * 0.35} 
    Z
  `;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0">
        <defs>
          <linearGradient id={`starGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:rgba(0,0,0,0.8)] dark:[stop-color:rgba(255,255,255,0.8)]" />
            <stop offset="50%" className="[stop-color:rgba(0,0,0,0.4)] dark:[stop-color:rgba(255,255,255,0.4)]" />
            <stop offset="100%" className="[stop-color:rgba(0,0,0,0.1)] dark:[stop-color:rgba(255,255,255,0.1)]" />
          </linearGradient>
          <filter id={`starGlow-${size}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d={starPath}
          fill={`url(#starGradient-${size})`}
          className="stroke-black/60 dark:stroke-white/60 drop-shadow-lg"
          strokeWidth="2"
          filter={`url(#starGlow-${size})`}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={size * 0.08}
          className="fill-black/90 dark:fill-white/90 animate-pulse"
        />
      </svg>

      <div
        className={cn(
          'absolute inset-0 rounded-full blur-xl opacity-50',
          'bg-gradient-to-r',
          gradient
        )}
        style={{
          transform: 'scale(1.2)',
        }}
      />
    </div>
  );
}

type ElegantShapeProps = {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
};

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = 'from-white/[0.08]',
}: ElegantShapeProps) {
  const starSize = Math.min(width, height);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn('absolute', className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          width,
          height,
        }}
        className="relative flex items-center justify-center"
      >
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <StarShape size={starSize} gradient={gradient} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function HomePage() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i:number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3 + i * 0.1,
        ease: [0.23, 1, 0.32, 1] as any,

      },
    }),
  };

  return (
    <div className={cn("bg-background relative w-full overflow-hidden", inter.variable, playfair.variable)}>
      
      {/* Hero Section */}
      <section className="relative flex min-h-screen w-full items-center justify-center">
        <div className="from-primary/20 dark:from-primary/30 absolute inset-0 bg-gradient-to-br via-transparent to-rose-500/20 blur-3xl dark:to-rose-500/30" />

        {/* Stars Background */}
        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape delay={0.3} width={140} height={140} rotate={12} gradient="from-indigo-500/70" className="top-[15%] left-[-10%]" />
          <ElegantShape delay={0.5} width={120} height={120} rotate={-15} gradient="from-rose-400" className="top-[70%] right-[-5%]" />
          <ElegantShape delay={0.4} width={80} height={80} rotate={-8} gradient="from-violet-400" className="bottom-[5%] left-[5%]" />
          <ElegantShape delay={0.6} width={60} height={60} rotate={20} gradient="from-amber-500/70 dark:from-amber-400/90" className="top-[10%] right-[15%]" />
          <ElegantShape delay={0.7} width={40} height={40} rotate={-25} gradient="from-cyan-500/70 dark:from-cyan-400/90" className="top-[5%] left-[20%]" />
        </div>

        <div className="relative z-10 container mx-auto max-w-6xl px-6 py-20">
          <div className="text-center space-y-12">

            {/* Header */}
            <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible" className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight font-playfair">
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
            </motion.div>

            {/* Three Primary CTAs */}
            <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible" className="flex flex-wrap justify-center gap-4 md:gap-6">
              <a
                href="/whoami"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-marron-600 to-red-600 text-white px-10 py-5 rounded-xl font-semibold hover:from-marron-700 hover:to-red-700 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl text-lg group"
              >
                <User className="h-6 w-6" />
                Who Am I?
                <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/experience"
                className="inline-flex items-center gap-2 bg-green-600 text-primary-foreground px-10 py-5 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl text-lg group"
              >
                <Briefcase className="h-6 w-6" />
                Experience
                <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/projects"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-10 py-5 rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl text-lg group"
              >
                <Code2 className="h-6 w-6" />
                Projects
                <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
              custom={2} 
              variants={fadeUpVariants} 
              initial="hidden" 
              animate="visible"
              className="pt-8"
            >
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex flex-col items-center gap-2 text-muted-foreground"
              >
                <span className="text-sm font-medium">Scroll to explore</span>
                <ArrowRight className="h-5 w-5 rotate-90" />
              </motion.div>
            </motion.div>

          </div>
        </div>

        <div className="from-background to-background/80 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent dark:from-black dark:to-black/80" />
      </section>

      {/* Value Proposition Section */}
      <section className="relative min-h-screen flex items-center py-24">
        <div className="from-indigo-500/10 absolute inset-0 bg-gradient-to-br via-transparent to-violet-500/10" />
        
        <div className="relative z-10 container mx-auto max-w-6xl px-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-16"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">What I Bring to Your Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Production-ready skills and real-world experience to make an impact from day one
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border/40 rounded-2xl p-8 text-left group hover:bg-card/50 transition-all hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/10 p-4 rounded-xl">
                    <Code2 className="h-7 w-7 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl mb-3">Production-Ready Code</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Experience building scalable systems handling thousands of users. I write clean, maintainable code with proper testing and documentation.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-card border border-border/40 rounded-2xl p-8 text-left group hover:bg-card/50 transition-all hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-green-500/10 p-4 rounded-xl">
                    <Users className="h-7 w-7 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl mb-3">Team Collaboration</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Led development teams and collaborated with stakeholders. Strong communication skills and agile workflow experience.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-card border border-border/40 rounded-2xl p-8 text-left group hover:bg-card/50 transition-all hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-purple-500/10 p-4 rounded-xl">
                    <Briefcase className="h-7 w-7 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl mb-3">Business Impact</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Improved deployment times by 60%, reduced cloud costs, and enhanced UX with better UI and caching strategies.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-card border border-border/40 rounded-2xl p-8 text-left group hover:bg-card/50 transition-all hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500/10 p-4 rounded-xl">
                    <Sparkles className="h-7 w-7 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl mb-3">Continuous Learning</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Built CNNs from scratch in Rust, reverse-engineered libraries, and always curious about how systems actually work.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative min-h-screen flex items-center py-24">
        <div className="from-rose-500/10 absolute inset-0 bg-gradient-to-br via-transparent to-amber-500/10" />
        
        <div className="relative z-10 container mx-auto max-w-6xl px-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold">My Tech Arsenal</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Modern tools and frameworks to build fast, scalable applications
              </p>
            </div>
            
            <div className={cn("flex flex-wrap justify-center gap-4 max-w-5xl mx-auto", geistMono.className)}>
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
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className={cn(
                    "px-6 py-3 text-base rounded-full border-2 font-medium transition-all hover:scale-110",
                    tech.color
                  )}
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative min-h-screen flex items-center py-24">
        <div className="from-primary/20 absolute inset-0 bg-gradient-to-br via-transparent to-purple-500/20" />
        
        <div className="relative z-10 container mx-auto max-w-4xl px-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12 text-center"
          >
            <div className="bg-card border border-primary/20 rounded-3xl p-10 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Build Something Amazing</h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                <span className="text-foreground font-semibold">Ready to contribute</span> to your next big project. 
                I bring <span className="text-primary font-medium">hands-on experience</span>, 
                <span className="text-primary font-medium"> production-ready skills</span>, and a 
                <span className="text-primary font-medium"> passion for building great software</span>.
              </p>
              <div className="pt-6 border-t border-border/30 mb-8">
                <p className="text-sm text-muted-foreground">
                  Open to: Full-time roles, internships, and exciting projects
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <a
                  href="/uploads/Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-card border-2 border-primary/50 text-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-105 group"
                >
                  <Download className="h-5 w-5" />
                  Download Resume
                </a>

                <a
                  href="mailto:jobs.aditya.vikram.mahendru@gmail.com"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-primary/90 hover:scale-105 group"
                >
                  <Mail className="h-5 w-5" />
                  Get in Touch
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4">
                <a
                  href="https://github.com/DeathSurfing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-14 h-14 bg-card border border-border/50 rounded-xl hover:bg-card/80 transition-all duration-300 hover:scale-110 group"
                >
                  <Github className="h-6 w-6 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href="https://www.linkedin.com/in/aditya-vikram-mahendru/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-14 h-14 bg-card border border-border/50 rounded-xl hover:bg-card/80 transition-all duration-300 hover:scale-110 group"
                >
                  <Linkedin className="h-6 w-6 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href="mailto:jobs.aditya.vikram.mahendru@gmail.com"
                  className="inline-flex items-center justify-center w-14 h-14 bg-card border border-border/50 rounded-xl hover:bg-card/80 transition-all duration-300 hover:scale-110 group"
                >
                  <Mail className="h-6 w-6 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}