"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { lenisStore } from "@/lib/lenis-store";

type Props = {
  children: ReactNode;
};

export default function LenisProvider({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // ❌ Disable Lenis on touch devices
    if (isTouch) return;

    let gsap: any;
    let ScrollTrigger: any;

    const init = async () => {
      gsap = (await import("gsap")).gsap;
      ScrollTrigger = (await import("gsap/ScrollTrigger")).ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) =>
          Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      // 🔗 Store references
      lenisRef.current = lenis;
      lenisStore.lenis = lenis;

      // 🔁 Sync Lenis → ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      // 🧠 Use GSAP ticker instead of RAF
      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });

      // ❌ Disable GSAP lag smoothing
      gsap.ticker.lagSmoothing(0);

      // ✅ Initial refresh
      ScrollTrigger.refresh();
    };

    init();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      lenisStore.lenis = null;
    };
  }, []);

  return <>{children}</>;
}
