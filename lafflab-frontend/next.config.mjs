import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: false,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@personalization": path.resolve(__dirname, "src/personalization"),
      "@notifications": path.resolve(__dirname, "src/notifications"),
      "@core": path.resolve(__dirname, "src/core"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    };
    return config;
  },
};

export default nextConfig;
