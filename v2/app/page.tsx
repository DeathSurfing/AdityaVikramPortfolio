import CredibilitySection from "@/components/custom/CredibilitySection"
import HeroNeoBrutalist from "@/components/custom/hero-section"
import ProjectsNeoBrutalist from "@/components/custom/projectssection"
import WhoAmIHero from "@/components/custom/WhoAmIHero"
import WhoAmIAbout from "@/components/custom/WhoAmIAbout"
import WhoAmITestimonials from "@/components/custom/WhoAmITestimonials"
import SkillsInterestsSection from "@/components/custom/SkillsInterestsSection"
import { LatestBlogPosts } from "@/components/blog/LatestBlogPosts"
import BrutalCodingProof from "@/components/custom/BrutalCodingProof"
import ContactSection from "@/components/custom/ContactSection"
import Footer from "@/components/custom/Footer"
import ExperienceSection from "@/components/custom/ExperienceSection"
import { StackEffect } from "./stack-effect"

export default function HomePage() {
  return (
    <main className="relative bg-background">
      <StackEffect />
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

      <LatestBlogPosts />

      <BrutalCodingProof/>

      <ContactSection />

      <Footer />
    </main>
  )
}
