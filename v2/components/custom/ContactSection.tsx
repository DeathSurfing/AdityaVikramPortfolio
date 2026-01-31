"use client";

import ContactHero from "./contact/ContactHero";
import ContactForm from "./contact/ContactForm";
import ContactCards from "./contact/ContactCards";
import ContactCTA from "./contact/ContactCTA";
import DecorativeBackground from "./contact/DecorativeBackground";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative min-h-screen bg-background text-foreground overflow-hidden py-20"
    >
      <DecorativeBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20">
        <ContactHero />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <ContactForm />
          <ContactCards />
        </div>

        <ContactCTA />
      </div>
    </section>
  );
}
