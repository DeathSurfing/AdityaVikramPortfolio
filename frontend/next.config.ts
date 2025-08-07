import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['opengraph.githubassets.com'],
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds for now
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
      };
    }
    return config;
  },
};

export default nextConfig;
