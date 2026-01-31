// NOTE: All contact data has been moved to @/data/contact.ts
// This file is kept for backward compatibility during migration
// Please import from @/data/* for all new code

import { LinkedInLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import React from "react";

// Re-export from centralized data for backward compatibility
export type { FormData } from "@/data/contact";
export {
  subjectOptions as SUBJECT_OPTIONS,
  EMAIL,
} from "@/data/contact";

// Legacy interface - kept for compatibility
export interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
  color: string;
}

// Legacy export - redirects to new data location
// Use @/data/social for new code
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "LinkedIn",
    icon: React.createElement(LinkedInLogoIcon, { className: "h-6 w-6 text-white" }),
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
