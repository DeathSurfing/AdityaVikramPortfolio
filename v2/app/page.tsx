"use client"

import { useEffect } from "react"

import CredibilitySection from "@/components/custom/CredibilitySection"
import HeroNeoBrutalist from "@/components/custom/hero-section"
import ProjectsNeoBrutalist from "@/components/custom/projectssection"
import WhoAmIHero from "@/components/custom/WhoAmIHero"
import WhoAmIAbout from "@/components/custom/WhoAmIAbout"
import WhoAmITestimonials from "@/components/custom/WhoAmITestimonials"
import BrutalCodingProof from "@/components/custom/BrutalCodingProof"

export default function HomePage() {

  // Optional depth (visual stack)
  useEffect(() => {
    const cards = document.querySelectorAll(".stack-card")
    cards.forEach((card, i) => {
      (card as HTMLElement).style.transform =
        `scale(${1 - i * 0.05}) translateY(${-i * 40}px)`
    })
  }, [])

  return (
    <main className="relative bg-background">
      <div id="#"></div>
      <section className="stack-card">
        <HeroNeoBrutalist />
      </section>
      <div id="about"></div>
      <section className="stack-card">
        <WhoAmIHero />
      </section>
      <section className="stack-card">
        <WhoAmIAbout />
      </section>

        <WhoAmITestimonials />


        <ProjectsNeoBrutalist />

        <CredibilitySection />
        <BrutalCodingProof/>
    </main>
  )
}
