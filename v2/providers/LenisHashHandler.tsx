"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { lenisStore } from "@/lib/lenis-store";

export default function LenisHashHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    let attempts = 0;

    const tryScroll = () => {
      const el = document.querySelector(hash) as HTMLElement | null;
      const lenis = lenisStore.lenis;

      if (el && lenis) {
        lenis.scrollTo(el, {
          offset: -96, // 🔧 navbar height
          duration: 1.2,
        });
        return true;
      }
      return false;
    };

    const interval = setInterval(() => {
      if (tryScroll() || attempts > 30) {
        clearInterval(interval);
      }
      attempts++;
    }, 50);

    return () => clearInterval(interval);
  }, [pathname]);

  return null;
}
