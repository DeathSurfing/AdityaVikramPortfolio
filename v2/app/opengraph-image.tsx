import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Aditya Vikram — Full Stack Developer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
          padding: "80px",
          fontFamily: "sans-serif",
          backgroundImage: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "#ffcc00",
            marginBottom: 24,
            textTransform: "uppercase",
          }}
        >
          Full Stack Developer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          Aditya Vikram
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#a0a0a0",
            maxWidth: 800,
          }}
        >
          TypeScript, React, Next.js & modern web technologies
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 24,
            fontWeight: 700,
            color: "#ffcc00",
            border: "4px solid #ffcc00",
            padding: "12px 28px",
          }}
        >
          adityavikram.dev
        </div>
      </div>
    ),
    { ...size }
  )
}
