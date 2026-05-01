import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    webpackMemoryOptimizations: true,
  },
};

export default nextConfig;
