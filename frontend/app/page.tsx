'use client';

import { motion } from 'framer-motion';
import { Inter, Geist_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Calendar, MapPin, Code2, Zap, Users, Download, Github, Linkedin, Mail } from 'lucide-react';

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
    <div className={cn("bg-background relative flex min-h-screen w-full items-center justify-center overflow-hidden", inter.variable)}>
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
      <div className="relative z-10 container mx-auto max-w-5xl px-6 pt-16 md:pt-20 lg:pt-24">
        <div className="text-center space-y-8">
          {/* Header */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Aditya Vikram Mahendru
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              Software Engineering Intern | AI & ML Enthusiast
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Hyderabad, India</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>B.Tech CSE (AI & ML), 2028</span>
              </div>
            </div>
          </motion.div>

          {/* Key Stats */}
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl p-4 text-center">
              <Zap className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold">100%</div>
              <div className="text-sm text-muted-foreground">Faster Deployment</div>
            </div>
            
            <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl p-4 text-center">
              <Users className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold">6,000+</div>
              <div className="text-sm text-muted-foreground">Users Served</div>
            </div>
            
            <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl p-4 text-center">
              <Code2 className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold">55%</div>
              <div className="text-sm text-muted-foreground">Cost Reduction</div>
            </div>
            
            <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl p-4 text-center">
              <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold">6mo</div>
              <div className="text-sm text-muted-foreground">Current Internship</div>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-foreground">Tech Stack</h3>
            <div className={cn("flex flex-wrap justify-center gap-3 max-w-3xl mx-auto", geistMono.className)}>
              {[
                'Python (CUDA)', 'JavaScript', 'Rust', 'Next.js', 'FastAPI', 'Flask', 
                'Docker', 'PostgreSQL', 'GitHub Actions', 'Tailwind CSS'
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full border border-primary/20 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* No-BS Look Into Me */}
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 max-w-3xl mx-auto"
          >
            <h3 className="text-lg font-semibold text-foreground">No-BS Look Into Me</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl p-4 space-y-3">
                <h4 className="font-semibold text-foreground">🚀 What Drives Me</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I love solving complex problems with simple, elegant code. Whether it's optimizing deployment times or building systems for thousands of users, I get excited about making things work better and faster.
                </p>
              </div>
              
              <div className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl p-4 space-y-3">
                <h4 className="font-semibold text-foreground">💡 My Approach</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I believe in learning by building. That's why I built a CNN from scratch in Rust instead of just using TensorFlow. I want to understand how things work under the hood.
                </p>
              </div>
              
              <div className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl p-4 space-y-3">
                <h4 className="font-semibold text-foreground">🔧 What I'm Good At</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Taking ideas from concept to production. I don't just write code - I think about scalability, cost optimization, and user experience. My internship showed me how to balance technical excellence with business needs.
                </p>
              </div>
              
              <div className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl p-4 space-y-3">
                <h4 className="font-semibold text-foreground">🎯 What's Next</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Looking for opportunities where I can contribute to meaningful projects, learn from experienced teams, and continue growing as a software engineer. I'm particularly interested in backend systems and AI applications.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="/uploads/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
            
            <div className="flex gap-3">
              <a
                href="https://github.com/DeathSurfing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-12 h-12 bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg hover:bg-card/80 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              
              <a
                href="https://www.linkedin.com/in/aditya-vikram-mahendru/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-12 h-12 bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg hover:bg-card/80 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              
              <a
                href="mailto:jobs.aditya.vikram.mahendru@gmail.com"
                className="inline-flex items-center justify-center w-12 h-12 bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg hover:bg-card/80 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Summary */}
          <motion.div
            custom={5}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto text-center"
          >
            <p className="text-muted-foreground leading-relaxed">
              Currently interning at <span className="text-foreground font-semibold">Woxsen AI Research Center</span>, 
              building scalable systems for 6,000+ users. Passionate about backend development, DevOps, 
              and AI/ML with hands-on experience in production environments.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="from-background to-background/80 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent dark:from-black dark:to-black/80" />
    </div>
  );
}
