import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // ===== Performance =====
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
  },

  // ===== Images =====
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
    minimumCacheTTL: 3600,
  },

  // ===== Security Headers =====
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://api.groq.com https://generativelanguage.googleapis.com https://*.supabase.co https://api.resend.com",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },

  // ===== Redirects =====
  async redirects() {
    return [
      { source: '/feed', destination: '/api/rss', permanent: true },
      { source: '/subscribe', destination: '/#newsletter', permanent: false },
    ]
  },

  // ===== Rewrites (API) =====
  async rewrites() {
    return []
  },

  // ===== Compression =====
  compress: true,

  // ===== Output =====
  poweredByHeader: false,

  // ===== TypeScript & ESLint (don't fail builds) =====
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },
}

export default nextConfig
