import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['opengraph.githubassets.com'],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint during `next build`
  },
  // Removed optimizeFonts (not a valid Next.js option)
  // Removed optimizeCss to avoid critters dependency issue
};

export default nextConfig;
