/** @type {import('next').NextConfig} */
const isAnalyze = process.env.ANALYZE === "true";

const nextConfig = {
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
      // add analyzer plugin here
    }
    return config;
  }
};

export default nextConfig;
