"use client"

import { useEffect } from "react"

import CredibilitySection from "@/components/custom/CredibilitySection"
import HeroNeoBrutalist from "@/components/custom/hero-section"
import ProjectsNeoBrutalist from "@/components/custom/projectssection"
import WhoAmIHero from "@/components/custom/WhoAmIHero"
import WhoAmIAbout from "@/components/custom/WhoAmIAbout"
import WhoAmITestimonials from "@/components/custom/WhoAmITestimonials"
import SkillsInterestsSection from "@/components/custom/SkillsInterestsSection"
import BrutalCodingProof from "@/components/custom/BrutalCodingProof"
import ContactSection from "@/components/custom/ContactSection"
import Footer from "@/components/custom/Footer"
import ExperienceSection from "@/components/custom/ExperienceSection"

export default function HomePage() {

  // Optional depth (visual stack) - only on desktop
  useEffect(() => {
    // Only apply transforms on desktop (lg breakpoint)
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      const cards = document.querySelectorAll(".stack-card")
      cards.forEach((card, i) => {
        (card as HTMLElement).style.transform =
          `scale(${1 - i * 0.05}) translateY(${-i * 40}px)`
      })
    }
  }, [])

  return (
    <main className="relative bg-background">
      <div id="top"></div>
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

      <div id="experience"></div>
      <ExperienceSection />

      <WhoAmITestimonials />

      <ProjectsNeoBrutalist />

      <CredibilitySection />

      <div id="skillset"></div>
      <SkillsInterestsSection />

      <BrutalCodingProof/>

      <ContactSection />
      
      <Footer />
    </main>
  )
}
