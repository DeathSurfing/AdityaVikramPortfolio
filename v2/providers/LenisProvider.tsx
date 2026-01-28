"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

type Props = {
  children: ReactNode;
};

export default function LenisProvider({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // ❌ No Lenis on touch devices (good call)
    if (isTouch) return;

    let ScrollTrigger: any;
    let gsap: any;

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

      lenisRef.current = lenis;

      // 🧠 Tell ScrollTrigger every time Lenis scrolls
      lenis.on("scroll", ScrollTrigger.update);

      // 🧠 Use GSAP ticker instead of raw RAF
      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });

      // ❌ Disable GSAP lag smoothing (required)
      gsap.ticker.lagSmoothing(0);

      // ✅ VERY IMPORTANT — sync initial state
      ScrollTrigger.refresh();
    };

    init();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      if (gsap) {
        gsap.ticker.remove(() => {});
      }
    };
  }, []);

  return <>{children}</>;
}
