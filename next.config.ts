import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  experimental: {
    // Server Actions default to a 1 MB body limit, which rejects photo
    // uploads before uploadWork() runs. Match the 12 MB cap in actions.ts
    // (+ margin for multipart overhead).
    serverActions: {
      bodySizeLimit: "16mb",
    },
  },
};

export default nextConfig;
