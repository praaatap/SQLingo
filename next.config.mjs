/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Turbopack configuration (Next.js 16 default bundler)
  turbopack: {
    resolveAlias: {
      // Stub out Node.js modules for browser compatibility with sql.js
      fs: { browser: './lib/empty-module.js' },
      path: { browser: './lib/empty-module.js' },
    },
  },
}

export default nextConfig
