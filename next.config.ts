import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iqps8tvf9cebkyhe.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
