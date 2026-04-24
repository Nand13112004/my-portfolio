/** @type {import('next').NextConfig} */
const nextConfig = {
  // Serve modern image formats (AVIF + WebP) for faster loads
  images: {
    formats: ["image/avif", "image/webp"],
    // Aggressive caching — images are considered fresh for 1 year
    minimumCacheTTL: 31536000,
  },

  // Compress HTML/JS responses with gzip
  compress: true,

  // Faster builds — only transpile what's needed
  experimental: {
    optimizePackageImports: ["react-icons", "framer-motion"],
  },
};

module.exports = nextConfig;
