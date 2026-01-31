'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  IconHome,
  IconMenu2,
  IconSquareX,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { PreferencesPopover } from './PreferencesPopover';
import { lenisStore } from '@/lib/lenis-store';
import { navLinks } from '@/data/navigation';

/* Animation Variants */
const menuVariants = {
  hidden: { y: '100%' },
  visible: {
    y: '0%',
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 28,
    },
  },
  exit: {
    y: '100%',
    transition: {
      type: 'spring',
      stiffness: 220,
      damping: 30,
    },
  },
} as const;

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
} as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 z-50 w-full
          transition-all duration-200
          border-b-[6px] border-border
          ${scrolled ? 'bg-background/95 backdrop-blur-sm shadow-[0_6px_0_hsl(var(--border))]' : 'bg-background'}
        `}
      >
        {/* Striped top accent */}
        <div className="h-2.5 w-full bg-border flex">
          <div className="flex-1 bg-primary" />
          <div className="flex-1 bg-background" />
          <div className="flex-1 bg-primary" />
          <div className="flex-1 bg-background" />
        </div>

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-5">
          {/* LOGO */}
          <Link
            href="/#"
            onClick={(e) => {
              e.preventDefault();
              const lenis = lenisStore.lenis;
              if (lenis) {
                lenis.scrollTo(0, {
                  duration: 1.2,
                  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="
              flex items-center gap-2.5
              font-mono text-xl md:text-2xl font-black tracking-widest
              text-foreground
              hover:-translate-y-[1px]
              transition-transform
              group
              cursor-pointer
            "
          >
            <div className="p-1.5 bg-primary border-3 border-border shadow-[3px_3px_0_hsl(var(--border))] group-hover:shadow-[5px_5px_0_hsl(var(--border))] group-hover:-translate-x-[1px] group-hover:-translate-y-[1px] transition-all">
              <IconHome className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-4 text-sm font-black tracking-wide text-foreground">
            {navLinks.map(({ href, icon: Icon, label }) => (
              <NavLink key={href} href={href} icon={Icon} label={label} />
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2.5">
            {/* DESKTOP PREFERENCES */}
            <div className="hidden md:block">
              <PreferencesPopover />
            </div>

            {/* MOBILE HAMBURGER */}
            <button
              onClick={() => setMenuOpen(true)}
              className="
                md:hidden
                border-[4px] border-border
                bg-primary text-primary-foreground
                p-2.5
                shadow-[4px_4px_0_hsl(var(--border))]
                hover:-translate-x-[1px] hover:-translate-y-[1px]
                hover:shadow-[6px_6px_0_hsl(var(--border))]
                transition-all
                font-black
              "
              aria-label="Open menu"
            >
              <IconMenu2 className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </header>

      {/* FULLSCREEN MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-background flex flex-col overflow-y-auto overscroll-contain"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Striped top */}
            <div className="h-3 bg-border flex flex-shrink-0">
              <div className="flex-1 bg-primary" />
              <div className="flex-1 bg-background" />
              <div className="flex-1 bg-primary" />
            </div>

            <div className="flex items-center justify-between px-5 py-4 border-b-[6px] border-border flex-shrink-0">
              <span className="font-mono font-black text-xl tracking-widest">
                MENU
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="
                  border-[4px] border-border
                  bg-foreground text-background
                  p-2.5
                  shadow-[4px_4px_0_hsl(var(--border))]
                  active:shadow-[2px_2px_0_hsl(var(--border))]
                  active:translate-x-[2px] active:translate-y-[2px]
                  transition-all
                "
                aria-label="Close menu"
              >
                <IconSquareX className="h-5 w-5" strokeWidth={2.5} />
              </button>
            </div>

            {/* MENU CONTENT */}
            <motion.div
              className="flex flex-col gap-6 px-5 py-8 font-black text-[1.65rem] flex-1"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                },
              }}
            >
              {navLinks.map(({ href, icon: Icon, label }) => (
                <motion.div key={href} variants={itemVariants}>
                  <MenuLink href={href} onClick={() => setMenuOpen(false)}>
                    <Icon className="h-4 w-4" strokeWidth={2.5} /> {label}
                  </MenuLink>
                </motion.div>
              ))}

              <motion.div
                variants={itemVariants}
                className="pt-6 border-t-4 border-border"
              >
                <div className="mb-4 px-3 py-1.5 bg-muted inline-block border-3 border-border rotate-[-1deg] shadow-[3px_3px_0_hsl(var(--border))]">
                  <span className="text-xs font-black uppercase tracking-widest">
                    Preferences
                  </span>
                </div>
                <div className="pl-3">
                  <PreferencesPopover />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* Helper Components */

function scrollToSection(href: string) {
  const lenis = lenisStore.lenis;
  if (lenis) {
    lenis.scrollTo(href, {
      offset: 0,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }
}

function NavLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="
        group flex items-center gap-2
        px-3 py-1.5
        border-3 border-transparent
        hover:border-border
        hover:shadow-[3px_3px_0_hsl(var(--border))]
        hover:-translate-x-[1px]
        hover:-translate-y-[1px]
        transition-all
      "
    >
      <span className="transition-transform group-hover:rotate-[-5deg] translate-y-[0.5px]">
        <Icon className="h-4 w-4" strokeWidth={2.5} />
      </span>
      {label}
    </Link>
  );
}

function MenuLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick();
    scrollToSection(href);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="
        flex items-center gap-5
        border-l-[6px] border-border
        pl-5 py-3
        hover:border-primary
        hover:pl-7
        transition-all
      "
    >
      {children}
    </Link>
  );
}

function BrutalBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        border-[4px] border-border
        bg-background
        p-1.5
        shadow-[4px_4px_0_hsl(var(--border))]
        hover:-translate-x-[1px]
        hover:-translate-y-[1px]
        hover:shadow-[6px_6px_0_hsl(var(--border))]
        transition-all
      "
    >
      {children}
    </div>
  );
}
