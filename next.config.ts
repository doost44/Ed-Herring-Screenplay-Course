import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/index",
        destination: "/master-index",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
