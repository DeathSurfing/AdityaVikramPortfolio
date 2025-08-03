import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['opengraph.githubassets.com'],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint during `next build`
  },
  optimizeFonts: true,
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
