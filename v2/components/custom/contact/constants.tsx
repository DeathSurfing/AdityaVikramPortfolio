import { LinkedInLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import React from "react";

export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const SUBJECT_OPTIONS = [
  "Project Inquiry",
  "Collaboration",
  "Job Opportunity",
  "Just saying hi",
  "Other",
];

export interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
  color: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "LinkedIn",
    icon: React.createElement(LinkedInLogoIcon, { className: "h-6 w-6" }),
    url: "https://www.linkedin.com/in/aditya-vikram-mahendru/",
    color: "bg-[#0A66C2]",
  },
  {
    name: "GitHub",
    icon: React.createElement(GitHubLogoIcon, { className: "h-6 w-6 text-white" }),
    url: "https://github.com/deathSurfing",
    color: "bg-[#24292e]",
  },
];

export const EMAIL = "jobs.aditya.vikram.mahendru@gmail.com";
