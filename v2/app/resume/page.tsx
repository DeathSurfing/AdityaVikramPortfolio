import type { Metadata } from "next"
import { profile } from "@/data/profile"
import ResumeClient from "./ResumeClient"

export const metadata: Metadata = {
  title: "Resume",
  description: `View and download the resume of ${profile.name}, ${profile.title.toLowerCase()}.`,
  alternates: {
    canonical: "/resume",
  },
}

export default function ResumePage() {
  return <ResumeClient />
}
