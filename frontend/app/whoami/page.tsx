'use client';

import { motion } from 'framer-motion';
import LenisSmoothScroll from '@/components/ui/lenis-smooth-scroll';
import { Azeret_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';


const azeretMono = Azeret_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-azeret-mono',
});

export default function WhoAmIPage() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: [0.23, 1, 0.32, 1],
      },
    }),
  };

  return (
    <LenisSmoothScroll
      options={{
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        mouseMultiplier: 0.8,
      }}
    >
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              className={cn(
                "text-6xl md:text-8xl font-bold text-foreground mb-8",
                azeretMono.className
              )}
            >
              Who Am I?
            </motion.h1>
            <motion.p
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
            >
              A journey through code, creativity, and continuous learning
            </motion.p>
          </div>
        </section>

        {/* About Section */}
        <section className="min-h-screen flex items-center px-4 py-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">The Story</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I&apos;m a passionate developer who believes in building experiences that matter.
                My journey started with curiosity and has evolved into a dedication to crafting
                digital solutions that make a difference.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every line of code I write is an opportunity to solve problems,
                create beauty, and push the boundaries of what&apos;s possible on the web.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="h-full w-full flex justify-center"
            >
              <div className="w-72 h-72 md:w-96 md:h-96 relative rounded-2xl overflow-hidden shadow-lg border border-border">
                <img
                  src="/AdityaVikram.webp"
                  alt="Aditya Vikram"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>


        {/* Skills Section */}
        <section className="min-h-screen flex items-center px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="text-4xl md:text-5xl font-bold text-center mb-16"
            >
              What I Do
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Frontend Development",
                  description: "Creating responsive, interactive user interfaces with modern frameworks and tools.",
                  technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
                },
                {
                  title: "Backend Development",
                  description: "Building robust APIs and server-side applications with scalable architecture.",
                  technologies: ["Node.js", "Python", "PostgreSQL", "Docker"]
                },
                {
                  title: "UI/UX Design",
                  description: "Designing intuitive user experiences with attention to detail and accessibility.",
                  technologies: ["Figma", "Framer Motion", "Design Systems", "Prototyping"]
                }
              ].map((skill, index) => (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm"
                >
                  <h3 className="text-2xl font-bold mb-4">{skill.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {skill.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Testimonials Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-muted/10">
          <div className="max-w-6xl mx-auto w-full">
            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="text-4xl md:text-5xl font-bold text-center mb-16"
            >
              What People Say
            </motion.h2>
            <AnimatedTestimonials
              testimonials={[
                {
                  quote: "Aditya is one of the most creative indivdiuals I’ve worked with.",
                  name: "G. Lohith Reddy",
                  designation: "General Secretary at Woxsen University Student Council",
                  src: "/testimonials/Lohith.webp",
                },
                {
                  quote: "His problem-solving skills and UI sense are top-notch.",
                  name: "Melvin Johnson",
                  designation: "Intern at AI Research Center Woxsen University",
                  src: "/testimonials/melvin.webp",
                },
                {
                  quote: "He blends design and code like an artist.",
                  name: "Mitansh Seghal",
                  designation: "Software Engineer",
                  src: "/testimonials/mitansh.webp",
                },
              ]}
            />
          </div>
        </section>

        {/* Contact Section */}
        <section className="min-h-screen flex items-center px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="text-4xl md:text-5xl font-bold mb-8"
            >
              Let&apos;s Connect
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="text-xl text-muted-foreground mb-12"
            >
              Ready to build something amazing together?
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="mailto:jobs.aditya.vikram.mahendru@gmail.com"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Get In Touch
              </a>
              <a
                href="/projects"
                className="px-8 py-4 border border-border rounded-full font-medium hover:bg-accent transition-colors"
              >
                View My Work
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </LenisSmoothScroll>
  );
}
