'use client';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Home, User, FolderOpen, FileText, Sun, Moon, Monitor, Github, Linkedin, Twitter, Mail, Users, Youtube, Briefcase } from 'lucide-react';
import { FloatingDock } from '@/components/ui/floating-dock';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState, useEffect } from 'react';

type Theme = "light" | "dark" | "system";

const Footer = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [themePopoverOpen, setThemePopoverOpen] = useState(false);
  const [socialPopoverOpen, setSocialPopoverOpen] = useState(false);

  // Ensure component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const getThemeIcon = () => {
    if (!mounted) return <Monitor className="h-4 w-4" />;

    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const themes: Theme[] = ["light", "dark", "system"];

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="h-4 w-4" />,
      href: "https://github.com/DeathSurfing",
      color: "hover:text-gray-900 dark:hover:text-white"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-4 w-4" />,
      href: "https://www.linkedin.com/in/aditya-vikram-mahendru/",
      color: "hover:text-blue-600"
    },
    {
      name: "Youtube",
      icon: <Youtube className="h-4 w-4" />,
      href: "https://www.youtube.com/@VikramMahendru",
      color: "hover:text-blue-400"
    },
    {
      name: "Email",
      icon: <Mail className="h-4 w-4" />,
      href: "mailto:jobs.aditya.vikram.mahendru@gmail.com",
      color: "hover:text-red-500"
    },
  ];

  const dockItems = [
    {
      title: "Home",
      icon: <Home className="h-4 w-4" />,
      href: "/",
    },
    {
      title: "Who Am I?",
      icon: <User className="h-4 w-4" />,
      href: "/whoami",
    },
    {
      title: "Projects",
      icon: <FolderOpen className="h-4 w-4" />,
      href: "/projects",
    },
    {
      title: "Experience",
      icon: <Briefcase className="h-4 w-4" />,
      href: "/experience",
    },
    {
      title: "Resume",
      icon: <FileText className="h-4 w-4" />,
      href: "/uploads/Resume.pdf",
    },
  ];

  const footerVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 2,
        ease: [0.23, 1, 0.32, 1] as any,
      },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40"
    >
      <div className="flex items-center gap-4">
        <FloatingDock
          items={dockItems}
          desktopClassName="bg-background/80 backdrop-blur-md border border-border/50 shadow-lg"
          mobileClassName="bg-background/80 backdrop-blur-md border border-border/50 shadow-lg"
        />

        {/* Social Links Popover */}
        <div className="hidden md:flex">
          <Popover open={socialPopoverOpen} onOpenChange={setSocialPopoverOpen}>
            <PopoverTrigger asChild>
              <motion.button
                className="h-12 w-12 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-md border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Social Links"
              >
                <Users className="h-4 w-4" />
              </motion.button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-4" align="center" side="top">
              <h3 className="text-sm font-medium text-foreground mb-3">
                Connect with me
              </h3>
              <div className="space-y-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center px-3 py-2 text-sm rounded-md hover:bg-muted/50 transition-colors ${social.color}`}
                  >
                    {social.icon}
                    <span className="ml-3">{social.name}</span>
                  </a>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Theme Switcher Popover */}
        <div className="hidden md:flex">
          <Popover open={themePopoverOpen} onOpenChange={setThemePopoverOpen}>
            <PopoverTrigger asChild>
              <motion.button
                className="h-12 w-12 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-md border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={`Current theme: ${mounted ? theme : 'system'}`}
              >
                {getThemeIcon()}
              </motion.button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2" align="center" side="top">
              <h3 className="text-sm tracking-tight text-muted-foreground mb-2">
                Theme
              </h3>
              <div className="space-y-2">
                {themes.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTheme(t);
                      setThemePopoverOpen(false);
                    }}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${theme === t
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted/50"
                      }`}
                  >
                    {t === "light" && <Sun className="mr-2 h-4 w-4" />}
                    {t === "dark" && <Moon className="mr-2 h-4 w-4" />}
                    {t === "system" && <Monitor className="mr-2 h-4 w-4" />}
                    <span className="capitalize">{t}</span>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
