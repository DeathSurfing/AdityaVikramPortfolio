import type { Metadata } from "next"
import ResumeClient from "./ResumeClient"

export const metadata: Metadata = {
  title: "Resume",
  description:
    "View and download Aditya Vikram's resume — full stack developer specializing in TypeScript, React, and modern web technologies.",
  alternates: {
    canonical: "/resume",
  },
}

export default function ResumePage() {
  return <ResumeClient />
}
