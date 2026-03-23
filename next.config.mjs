/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Set globalObject to 'self' for web worker compatibility
    if (!isServer) {
      config.output.globalObject = 'self';
    }
    return config;
  },
};

export default nextConfig;
