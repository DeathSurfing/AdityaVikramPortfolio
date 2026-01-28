"use client";

import { useEffect } from "react";
import { lenisStore } from "@/lib/lenis-store";

function scrollToHash() {
  const hash = window.location.hash;
  if (!hash) return;

  const target = document.querySelector(hash) as HTMLElement;
  const lenis = lenisStore.lenis;

  if (!target || !lenis) return;

  // 🔥 Reset native anchor jump
  window.scrollTo(0, 0);
  lenis.scrollTo(0, { immediate: true });

  // 🎥 Smooth Lenis scroll (next frames)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      lenis.scrollTo(target, {
        offset: -96, // navbar height
        duration: 1.4,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    });
  });
}

export default function LenisHashHandler() {
  useEffect(() => {
    // ⏱ Initial load with hash
    const initTimer = setInterval(() => {
      if (lenisStore.lenis) {
        scrollToHash();
        clearInterval(initTimer);
      }
    }, 50);

    // 🔁 Subsequent hash changes
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      clearInterval(initTimer);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return null;
}
