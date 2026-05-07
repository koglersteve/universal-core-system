import type { NextConfig } from "next";

const isAnalyze = process.env.ANALYZE === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    typedRoutes: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**"
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: false
  },
  typescript: {
    ignoreBuildErrors: false
  },
  webpack: (config) => {
    if (isAnalyze) {
      // hook for bundle analyzer or custom plugins
    }
    return config;
  }
};

export default nextConfig;
