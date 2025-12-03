"use client";

import { useEffect, useRef } from "react";
import StarShape from "./StarShape";

export default function AnimatedShapes() {
  const starRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const speeds = [0.25, 0.45, 0.18, 0.35]; // parallax depth speeds
    const drift = [0.4, 0.6, 0.25, 0.5];     // horizontal drifting factor
    const wobble = [0.0015, 0.002, 0.001, 0.0018]; // float wobble frequency

    let lastScroll = 0;

    function handleScroll(e: CustomEvent) {
      const scrollY = e.detail;
      const scrollDelta = scrollY - lastScroll;
      lastScroll = scrollY;

      starRefs.current.forEach((el, i) => {
        if (!el) return;

        const depthSpeed = speeds[i];
        const wobbleFreq = wobble[i];
        const driftAmount = drift[i];

        // Falling motion
        const y = scrollY * depthSpeed;

        // Horizontal drift + wobble
        const time = performance.now() * wobbleFreq;
        const x =
          Math.sin(time) * 20 * driftAmount + // gentle wave
          scrollY * 0.02 * (i % 2 === 0 ? 1 : -1); // slight scroll-based drift

        // Stretch / streak effect when scrolling fast
        const streakScale = Math.min(1.6, 1 + Math.abs(scrollDelta) * 0.015);

        el.style.transform = `
          translate3d(${x}px, ${y}px, 0)
          scaleY(${streakScale})
        `;
        el.style.opacity = `${Math.max(0.3, 1 - depthSpeed * 0.6)}`;
      });
    }

    window.addEventListener("lenis-scroll", handleScroll as any);

    return () =>
      window.removeEventListener("lenis-scroll", handleScroll as any);
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* ⭐ STAR 1 */}
      <div
        ref={(el) => (starRefs.current[0] = el)}
        className="absolute top-[10%] left-[-6%] will-change-transform"
      >
        <StarShape size={150} gradient="from-indigo-500/40" />
      </div>

      {/* ⭐ STAR 2 */}
      <div
        ref={(el) => (starRefs.current[1] = el)}
        className="absolute top-[60%] right-[-4%] will-change-transform"
      >
        <StarShape size={110} gradient="from-rose-400/30" />
      </div>

      {/* ⭐ STAR 3 */}
      <div
        ref={(el) => (starRefs.current[2] = el)}
        className="absolute bottom-[5%] left-[12%] will-change-transform"
      >
        <StarShape size={80} gradient="from-violet-400/30" />
      </div>

      {/* ⭐ STAR 4 */}
      <div
        ref={(el) => (starRefs.current[3] = el)}
        className="absolute top-[18%] right-[18%] will-change-transform"
      >
        <StarShape size={60} gradient="from-amber-400/30" />
      </div>
    </div>
  );
}
