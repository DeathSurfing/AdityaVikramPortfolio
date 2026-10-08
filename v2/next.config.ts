import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Link response headers for agent discovery, per RFC 8288 and RFC 9727
  // section 3. Agents reading only the response headers can find the API
  // catalog, the OpenAPI description, and the markdown representation without
  // parsing HTML.
  //
  // pruned: no `describedby` header. It points at a resource describing the
  // page, and the useful candidate is the machine-readable identity document,
  // but a wrong relation is worse than an absent one, so only the registered
  // relations that point at real resources here are declared.
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: [
              '</.well-known/api-catalog>; rel="api-catalog"',
              '</openapi.json>; rel="service-desc"; type="application/json"',
              '</llms.txt>; rel="service-doc"; type="text/plain"',
            ].join(", "),
          },
        ],
      },
    ];
  },
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
