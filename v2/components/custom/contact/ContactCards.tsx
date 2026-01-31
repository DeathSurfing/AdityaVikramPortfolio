"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  EnvelopeClosedIcon,
  FileTextIcon,
  CheckIcon,
  CopyIcon,
  ArrowRightIcon,
} from "@radix-ui/react-icons";
import { EMAIL, SOCIAL_LINKS } from "./constants";

gsap.registerPlugin(ScrollTrigger);

function EmailCard() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div
      className="contact-card group cursor-pointer"
      onClick={copyEmailToClipboard}
    >
      <div className="border-[4px] border-border bg-background p-6 shadow-[8px_8px_0px_0px_var(--border)] transition-all duration-300 group-hover:shadow-[4px_4px_0px_0px_var(--border)] group-hover:translate-x-1 group-hover:translate-y-1">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 border-[4px] border-border bg-primary flex items-center justify-center shadow-[4px_4px_0px_0px_var(--border)]">
              <EnvelopeClosedIcon className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-black text-xl">Email</h3>
              <p className="font-bold text-sm text-muted-foreground">{EMAIL}</p>
            </div>
          </div>
          <div className="w-10 h-10 border-[3px] border-border flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            {copiedEmail ? (
              <CheckIcon className="h-5 w-5" />
            ) : (
              <CopyIcon className="h-5 w-5" />
            )}
          </div>
        </div>
        <p className="mt-4 text-xs font-black uppercase tracking-wider text-muted-foreground">
          {copiedEmail ? "COPIED!" : "CLICK TO COPY"}
        </p>
      </div>
    </div>
  );
}

function ResumeCard() {
  return (
    <Link href="/resume" target="_blank" className="contact-card block">
      <div className="border-[4px] border-border bg-background p-6 shadow-[8px_8px_0px_0px_var(--border)] transition-all duration-300 hover:shadow-[4px_4px_0px_0px_var(--border)] hover:translate-x-1 hover:translate-y-1">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 border-[4px] border-border bg-accent flex items-center justify-center shadow-[4px_4px_0px_0px_var(--border)]">
              <FileTextIcon className="h-7 w-7 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-black text-xl">Resume</h3>
              <p className="font-bold text-sm text-muted-foreground">
                View & Download CV
              </p>
            </div>
          </div>
          <ArrowRightIcon className="h-6 w-6" />
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="h-2 w-full bg-border">
            <div className="h-full w-3/4 bg-primary" />
          </div>
          <span className="text-xs font-black">PDF</span>
        </div>
      </div>
    </Link>
  );
}

function SocialLinks() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card group"
        >
          <div className="border-[4px] border-border bg-background p-4 shadow-[6px_6px_0px_0px_var(--border)] transition-all duration-300 group-hover:shadow-[3px_3px_0px_0px_var(--border)] group-hover:translate-x-[3px] group-hover:translate-y-[3px]">
            <div
              className={`w-10 h-10 ${social.color} flex items-center justify-center mb-3`}
            >
              {social.icon}
            </div>
            <h4 className="font-black text-sm uppercase tracking-wider">
              {social.name}
            </h4>
          </div>
        </a>
      ))}
    </div>
  );
}

export default function ContactCards() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".contact-card") ?? [];
      gsap.from(cards, {
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
      });
    }, cardsRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={cardsRef} className="space-y-6">
      <div className="mb-6">
        <div className="inline-block px-4 py-2 bg-primary text-background border-4 border-border font-black text-xl rotate-1 shadow-[4px_4px_0px_0px_var(--border)]">
          QUICK LINKS
        </div>
      </div>

      <EmailCard />
      <ResumeCard />
      <SocialLinks />
    </div>
  );
}
