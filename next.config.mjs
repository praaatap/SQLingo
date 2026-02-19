import withPWA from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: process.cwd(),
  // Turbopack configuration (Next.js 16 default bundler)
  turbopack: {
    resolveAlias: {
      // Stub out Node.js modules for browser compatibility with sql.js
      fs: { browser: './lib/empty-module.js' },
      path: { browser: './lib/empty-module.js' },
    },
  },
}

export default withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
})(nextConfig);
