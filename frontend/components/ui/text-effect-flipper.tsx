"use client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function TextEffectFlipper({ 
  texts, 
  className = "",
  duration = 2000 
}: { 
  texts: string[];
  className?: string;
  duration?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, duration);

    return () => clearInterval(interval);
  }, [texts.length, duration]);

  return (
    <div className={`relative inline-block overflow-hidden ${className}`}>
      <motion.div
        key={currentIndex}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut"
        }}
        className="whitespace-nowrap"
      >
        {texts[currentIndex]}
      </motion.div>
    </div>
  );
}

export function SocialSection() {
  const socialTexts = [
    "Let's Connect!",
    "Follow Me!",
    "Get In Touch!",
    "Say Hello!",
    "Join My Network!"
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/DeathSurfing",
      icon: "🐱"
    },
    {
      name: "LinkedIn", 
      href: "https://www.linkedin.com/in/aditya-vikram-mahendru/",
      icon: "💼"
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@VikramMahendru", 
      icon: "📺"
    },
    {
      name: "Email",
      href: "mailto:jobs.aditya.vikram.mahendru@gmail.com",
      icon: "📧"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12"
        >
          <TextEffectFlipper 
            texts={socialTexts}
            className="text-4xl md:text-6xl font-bold text-foreground mb-8"
            duration={2500}
          />
          <p className="text-xl text-muted-foreground">
            Ready to build something amazing together?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.1,
                ease: [0.23, 1, 0.32, 1]
              }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {link.icon}
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {link.name}
              </h3>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
