import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    // Static assets in public/ never change in place: Next fingerprints the
    // build output, and these files are replaced by deploy, not by request.
    // Cloudflare's default for unhashed paths is max-age=14400 (4 hours),
    // which Lighthouse flags. A year is safe here and only affects the
    // repeat-visit case.
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'opengraph.githubassets.com',
      },
    ],
  },
};

export default nextConfig;
