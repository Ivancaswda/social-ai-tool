import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    eslint: {
        ignoreDuringBuilds: true, // отключает ESLint при сборке
    },
    typescript: {
        ignoreBuildErrors: true, // отключает ошибки TypeScript при сборке
    },
    images: {
        domains: ['ik.imagekit.io', 'i.ytimg.com']
    }
};

export default nextConfig;
