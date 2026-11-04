"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  DownloadIcon,
  ExternalLinkIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
  TargetIcon,
} from "@radix-ui/react-icons";
import IdentityFooter from "@/components/identity/IdentityFooter";
import { profile } from "@/data/profile";
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
    id: "fullstack",
    label: "Full Stack Engineer",
    icon: <PersonIcon className="size-3.5" aria-hidden />,
    file: "/uploads/Resume-FullStack.pdf",
    description:
      "General software engineering: full-stack, backend, and technical leadership.",
  },
  {
    id: "ai-ml",
    label: "AI / ML Engineer",
    icon: <RocketIcon className="size-3.5" aria-hidden />,
    file: "/uploads/Resume-AI-ML.pdf",
    description:
      "Machine learning, deep learning, NLP, and AI research experience.",
  },
  {
    id: "mlops",
    label: "MLOps Engineer",
    icon: <GearIcon className="size-3.5" aria-hidden />,
    file: "/uploads/Resume-MLOps.pdf",
    description:
      "Kubernetes, CI/CD, infrastructure automation, and deployment of AI workloads.",
  },
  {
    id: "forward-deployed",
    label: "Forward Deployed Engineer",
    icon: <TargetIcon className="size-3.5" aria-hidden />,
    file: "/uploads/Resume-Forward-Deployed.pdf",
    description:
      "Embedded, client-facing engineering - privacy compliance and PII ML discovery.",
  },
];

export default function ResumeClient() {
  const [selected, setSelected] = useState<ResumeOption>(RESUME_OPTIONS[0]);

  return (
    <>
      <main id="main" className="page-main">
        <div className="shell page-content">
          <header className="flex flex-col gap-5 border-b border-line pb-10">
            <nav aria-label="Breadcrumb" className="breadcrumb">
              <Link href="/">home</Link>
              <span className="sep" aria-hidden>/</span>
              <span>resume</span>
            </nav>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-4">
                <h1 className="page-title">
                  <span className="sr-only">{"// "}</span>resume
                  <span className="sr-only"> - {profile.name}</span>
                </h1>
                <p className="lead">
                  {profile.shortBio} Pick a role and the PDF below swaps to the
                  tailored version.
                </p>
              </div>

              <div className="relative size-16 shrink-0 overflow-hidden border border-line">
                <Image
                  src={profile.image}
                  alt={profile.name}
                  fill
                  sizes="64px"
                  priority
                  className="object-cover grayscale transition duration-300 hover:grayscale-0"
                />
              </div>
            </div>
          </header>

          <div className="mt-10 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div className="role-grid">
                {RESUME_OPTIONS.map((option) => {
                  const active = selected.id === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelected(option)}
                      className="role-button"
                      aria-pressed={active}
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  );
                })}
              </div>

              <p key={selected.id} className="role-fade text-sm text-muted-foreground">
                {selected.description}
              </p>
              <p className="measure text-sm leading-relaxed text-muted-foreground">
                These PDFs are tailored snapshots. The current full record,
                including LexContra and iGlobus, is on the{" "}
                <Link
                  href="/experience"
                  className="link-underline text-foreground"
                >
                  experience page
                </Link>
                .
              </p>
            </div>

            <div className="link-row">
              <a
                href={selected.file}
                download={`Aditya_Vikram_Mahendru_${selected.label.replace(/[^A-Za-z0-9]+/g, "_")}.pdf`}
                className="action-primary"
              >
                <DownloadIcon className="size-3.5" aria-hidden />
                download pdf
              </a>
              <a
                href={selected.file}
                target="_blank"
                rel="noopener noreferrer"
                className="action-ghost"
              >
                <ExternalLinkIcon className="size-3.5" aria-hidden />
                open in new tab
              </a>
            </div>

            <div className="pdf-frame hidden lg:block">
              <div className="relative aspect-a4 w-full">
                <iframe
                  key={selected.id}
                  src={selected.file}
                  className="pdf-fade absolute inset-0 h-full w-full"
                  title={`${profile.name} Resume - ${selected.label}`}
                />
              </div>
            </div>

            <div className="pdf-preview lg:hidden">
              <div className="pdf-preview-sheet" aria-hidden>
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-medium text-foreground">{selected.label}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Use download or open in a new tab above to read the full
                  document.
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Interested in working together?{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="link-underline text-foreground"
              >
                Get in touch
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <IdentityFooter />
    </>
  );
}
