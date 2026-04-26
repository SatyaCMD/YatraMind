/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },

  // Optional (good defaults for production-ready apps)
  images: {
    domains: [],
  },

  experimental: {},

};

export default nextConfig;