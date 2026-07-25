"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  DownloadIcon,
  ExternalLinkIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import MotionRoot from "@/components/identity/MotionRoot";
import IdentityFooter from "@/components/identity/IdentityFooter";
import {
  AnimatedLink,
  EASE,
  FadeUp,
  SectionHeading,
} from "@/components/identity/motion-primitives";
import { siteConfig } from "@/data/site";

type ResumeOption = {
  id: string;
  label: string;
  icon: React.ReactNode;
  file: string;
  description: string;
};

const RESUME_OPTIONS: ResumeOption[] = [
  {
    id: "general",
    label: "General",
    icon: <PersonIcon className="size-3.5" />,
    file: "/uploads/Resume.pdf",
    description:
      "Full-stack development, software engineering, and technical leadership.",
  },
  {
    id: "ai-ml",
    label: "AI / ML Intern",
    icon: <RocketIcon className="size-3.5" />,
    file: "/uploads/Resume-AI-ML.pdf",
    description:
      "Machine learning, deep learning, NLP, and AI research experience.",
  },
  {
    id: "devops",
    label: "DevOps Intern",
    icon: <GearIcon className="size-3.5" />,
    file: "/uploads/Resume-DevOps.pdf",
    description:
      "Kubernetes, CI/CD, infrastructure automation, and cloud deployment.",
  },
];

export default function ResumeClient() {
  const [selected, setSelected] = useState<ResumeOption>(RESUME_OPTIONS[0]);

  return (
    <MotionRoot>
      <main className="min-h-screen bg-[#0a0a0a] font-sans text-[#e5e5e5] selection:bg-[#e5e5e5] selection:text-[#0a0a0a]">
        <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 pt-32 pb-20">
          {/* Heading */}
          <div className="flex flex-col gap-5">
            <SectionHeading>// resume</SectionHeading>
            <FadeUp
              as="p"
              className="text-base leading-relaxed text-[#b0b0b0]"
            >
              Pick a role — the PDF below swaps to the tailored version.
            </FadeUp>
          </div>

          {/* Role selector */}
          <FadeUp delay={1}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {RESUME_OPTIONS.map((option) => {
                  const active = selected.id === option.id;
                  return (
                    <motion.button
                      key={option.id}
                      type="button"
                      onClick={() => setSelected(option)}
                      whileTap={{ scale: 0.96 }}
                      className={`flex items-center gap-2 rounded-sm border px-3 py-1.5 font-mono text-xs transition-colors ${
                        active
                          ? "border-[#e5e5e5] bg-[#e5e5e5] text-[#0a0a0a]"
                          : "border-[#262626] text-[#8a8a8a] hover:border-[#3a3a3a] hover:text-[#e5e5e5]"
                      }`}
                      aria-pressed={active}
                    >
                      {option.icon}
                      {option.label}
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={selected.id}
                  className="text-sm text-[#8a8a8a]"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  {selected.description}
                </motion.p>
              </AnimatePresence>
            </div>
          </FadeUp>

          {/* Actions */}
          <FadeUp delay={2}>
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
              <AnimatedLink
                href={selected.file}
                download={`Aditya_Vikram_${selected.id === "general" ? "Resume" : `Resume_${selected.id.toUpperCase()}`}.pdf`}
                className="gap-2 text-[#b0b0b0] transition-colors hover:text-[#e5e5e5]"
              >
                <DownloadIcon className="size-3.5" />
                download pdf
              </AnimatedLink>
              <AnimatedLink
                href={selected.file}
                external
                className="gap-2 text-[#b0b0b0] transition-colors hover:text-[#e5e5e5]"
              >
                <ExternalLinkIcon className="size-3.5" />
                open in new tab
              </AnimatedLink>
            </div>
          </FadeUp>

          {/* PDF viewer */}
          <FadeUp delay={3}>
            <div className="overflow-hidden rounded-sm border border-[#262626] bg-[#141414]">
              <div className="relative aspect-[8.5/11] w-full">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.iframe
                    key={selected.id}
                    src={selected.file}
                    className="absolute inset-0 h-full w-full"
                    title={`Aditya Vikram Resume — ${selected.label}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  />
                </AnimatePresence>
              </div>
            </div>
          </FadeUp>

          {/* Contact */}
          <FadeUp delay={4}>
            <p className="text-sm leading-relaxed text-[#8a8a8a]">
              Interested in working together?{" "}
              <AnimatedLink
                href={`mailto:${siteConfig.email}`}
                className="inline text-[#e5e5e5]"
              >
                Get in touch
              </AnimatedLink>
              .
            </p>
          </FadeUp>
        </div>
        <IdentityFooter />
      </main>
    </MotionRoot>
  );
}
