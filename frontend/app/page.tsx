'use client';

import { motion } from 'framer-motion';
import { Inter, Geist_Mono, Playfair_Display } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Calendar, MapPin, Code2, Users, Download, Github, Linkedin, Mail, ArrowRight, ExternalLink, Briefcase, User } from 'lucide-react';

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

function StarShape({
  size = 100,
  gradient = 'from-white/[0.08]'
}: {
  size?: number;
  gradient?: string;
}) {
  // Create star path - 5-pointed star
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
    <div
      className="relative"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
      >
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

        {/* Star shape */}
        <path
          d={starPath}
          fill={`url(#starGradient-${size})`}
          className="stroke-black/60 dark:stroke-white/60 drop-shadow-lg"
          strokeWidth="2"
          filter={`url(#starGlow-${size})`}
        />

        {/* Inner sparkle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size * 0.08}
          className="fill-black/90 dark:fill-white/90 animate-pulse"
        />
      </svg>

      {/* Additional glow effect */}
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

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = 'from-white/[0.08]',
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  // Use the smaller dimension to determine star size
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
          repeat: Number.POSITIVE_INFINITY,
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
            repeat: Number.POSITIVE_INFINITY,
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
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3 + i * 0.1,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    }),
  };

  return (
    <div className={cn("bg-background relative flex min-h-screen w-full items-center justify-center overflow-hidden", inter.variable, playfair.variable)}>
      <div className="from-primary/20 dark:from-primary/30 absolute inset-0 bg-gradient-to-br via-transparent to-rose-500/20 blur-3xl dark:to-rose-500/30" />

      {/* Animated Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={140}
          height={140}
          rotate={12}
          gradient="from-indigo-500/70"
          className="top-[15%] left-[-10%] md:top-[20%] md:left-[-5%]"
        />

        <ElegantShape
          delay={0.5}
          width={120}
          height={120}
          rotate={-15}
          gradient="from-rose-400"
          className="top-[70%] right-[-5%] md:top-[75%] md:right-[0%]"
        />

        <ElegantShape
          delay={0.4}
          width={80}
          height={80}
          rotate={-8}
          gradient="from-violet-400"
          className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={60}
          height={60}
          rotate={20}
          gradient="from-amber-500/70 dark:from-amber-400/90"
          className="top-[10%] right-[15%] md:top-[15%] md:right-[20%]"
        />

        <ElegantShape
          delay={0.7}
          width={40}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/70 dark:from-cyan-400/90"
          className="top-[5%] left-[20%] md:top-[10%] md:left-[25%]"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto max-w-6xl px-6 pt-16 md:pt-20 lg:pt-24">
        <div className="text-center space-y-12">
          {/* Header */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight font-playfair">
              <span className="bg-gradient-to-r from-foreground via-foreground/95 to-foreground/85 bg-clip-text text-transparent">
                Aditya Vikram Mahendru
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto">
              Build Fast. Build Scaleable
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap">
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

          {/* Primary CTAs */}
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="/uploads/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Download className="h-5 w-5" />
              Download Resume
            </a>
            
            <a
              href="/whoami"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/30 text-foreground px-8 py-4 rounded-xl font-semibold hover:from-violet-500/20 hover:to-indigo-500/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              <User className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              Who Am I?
              <ArrowRight className="h-4 w-4 ml-1 text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="mailto:jobs.aditya.vikram.mahendru@gmail.com"
              className="inline-flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-border/50 text-foreground px-8 py-4 rounded-xl font-semibold hover:bg-card/80 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Mail className="h-5 w-5" />
              Let's Talk
              <ArrowRight className="h-4 w-4 ml-1" />
            </a>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          >
            {/* Current Internship */}
            <div className="bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300">
              <Calendar className="h-10 w-10 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">6mo+</div>
              <div className="text-sm font-medium text-foreground">Current Internship</div>
              <div className="text-xs text-muted-foreground mt-2">Woxsen AI Research Center</div>
            </div>
            
            {/* Featured Projects */}
            <div className="bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300">
              <Code2 className="h-10 w-10 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">7+</div>
              <div className="text-sm font-medium text-foreground">Projects Built</div>
              <div className="text-xs text-muted-foreground mt-2">Full-Stack & AI/ML</div>
            </div>
          </motion.div>

          {/* Value Proposition */}
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">What I Bring to Your Team</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-2xl p-6 text-left group hover:bg-card/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/10 p-3 rounded-xl">
                    <Code2 className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Production-Ready Code</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Experience building scalable systems handling thousands of users. I write clean, maintainable code with proper testing and documentation.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-2xl p-6 text-left group hover:bg-card/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500/10 p-3 rounded-xl">
                    <Users className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Team Collaboration</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Led development teams and collaborated with stakeholders. Strong communication skills and experience with agile workflows.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-2xl p-6 text-left group hover:bg-card/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-500/10 p-3 rounded-xl">
                    <Briefcase className="h-6 w-6 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Business Impact</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Optimized deployment times by 60%, reduced infrastructure costs, and improved user experience through performance enhancements.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-2xl p-6 text-left group hover:bg-card/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500/10 p-3 rounded-xl">
                    <ArrowRight className="h-6 w-6 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Continuous Learning</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Built CNN from scratch in Rust, implemented custom algorithms, and always diving deep to understand how things work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold">My Tech Arsenal</h3>
            <div className={cn("flex flex-wrap justify-center gap-3 max-w-4xl mx-auto", geistMono.className)}>
              {[
                { name: 'Python (CUDA)', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
                { name: 'JavaScript', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
                { name: 'Rust', color: 'bg-orange-500/10 text-orange-600 border-orange-500/20' },
                { name: 'Next.js', color: 'bg-gray-500/10 text-gray-600 border-gray-500/20' },
                { name: 'FastAPI', color: 'bg-green-500/10 text-green-600 border-green-500/20' },
                { name: 'Flask', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
                { name: 'Docker', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
                { name: 'PostgreSQL', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
                { name: 'GitHub Actions', color: 'bg-gray-500/10 text-gray-600 border-gray-500/20' },
                { name: 'Tailwind CSS', color: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20' }
              ].map((tech) => (
                <span
                  key={tech.name}
                  className={cn(
                    "px-4 py-2 text-sm rounded-full border font-medium transition-all hover:scale-105",
                    tech.color
                  )}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Secondary CTAs */}
          <motion.div
            custom={5}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/projects"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-foreground px-6 py-3 rounded-xl font-medium hover:from-indigo-500/20 hover:to-purple-500/20 transition-all duration-300 group"
              >
                View My Projects
                <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="/experience"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-foreground px-6 py-3 rounded-xl font-medium hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300 group"
              >
                See Experience
                <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/DeathSurfing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-14 h-14 bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl hover:bg-card/80 transition-all duration-300 hover:scale-110 group"
              >
                <Github className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </a>
              
              <a
                href="https://www.linkedin.com/in/aditya-vikram-mahendru/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-14 h-14 bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl hover:bg-card/80 transition-all duration-300 hover:scale-110 group"
              >
                <Linkedin className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </a>
              
              <a
                href="mailto:jobs.aditya.vikram.mahendru@gmail.com"
                className="inline-flex items-center justify-center w-14 h-14 bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl hover:bg-card/80 transition-all duration-300 hover:scale-110 group"
              >
                <Mail className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Final Summary */}
          <motion.div
            custom={6}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8">
              <p className="text-muted-foreground leading-relaxed text-lg">
                <span className="text-foreground font-semibold">Ready to contribute</span> to your next big project. 
                I bring <span className="text-primary font-medium">hands-on experience</span>, 
                <span className="text-primary font-medium"> production-ready skills</span>, and a 
                <span className="text-primary font-medium"> passion for building great software</span>.
              </p>
              <div className="mt-6 pt-4 border-t border-border/30">
                <p className="text-sm text-muted-foreground">
                  🚀 Open to: Full-time roles, internships, and exciting projects
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="from-background to-background/80 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent dark:from-black dark:to-black/80" />
    </div>
  );
}