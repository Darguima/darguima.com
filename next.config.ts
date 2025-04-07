import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/darguima.png',
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
