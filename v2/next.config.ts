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
async redirects() {
    // Old blog slugs that were retargeted to the query Google already showed
    // them for. Kept as permanent redirects so the accumulated signals on the
    // old URLs transfer instead of 404ing. Remove a pair only when the old URL
    // has stopped receiving requests in Search Console.
    const moved: [string, string][] = [
      ["bare-metal-kubernetes-cluster", "k3s-bare-metal"],
      ["clean-architecture-in-typescript", "typescript-clean-architecture"],
      ["postgres-can-replace-your-whole-stack", "replaced-my-entire-stack-with-postgres"],
      ["proxmox-lxc-containers", "proxmox-lxc"],
      ["understanding-react-server-components", "what-are-react-server-components"],
    ];
    return moved.map(([from, to]) => ({
      source: `/blog/${from}`,
      destination: `/blog/${to}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
