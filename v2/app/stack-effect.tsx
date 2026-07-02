"use client"

import { useEffect } from "react"

export function StackEffect() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      const cards = document.querySelectorAll(".stack-card")
      cards.forEach((card, i) => {
        (card as HTMLElement).style.transform =
          `scale(${1 - i * 0.05}) translateY(${-i * 40}px)`
      })
    }
  }, [])

  return null
}
