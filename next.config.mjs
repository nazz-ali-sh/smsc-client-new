import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,

  // Performance optimizations
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled', 'react-icons']
    // Faster refresh - Turbo mode enabled
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          mui: {
            test: /[\\/]node_modules[\\/]@mui[\\/]/,
            name: 'mui',
            chunks: 'all',
            priority: 10
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            priority: 5
          }
        }
      }
    }

    // Faster builds in development
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300
      }

      // Speed up development builds
      config.optimization.removeAvailableModules = false
      config.optimization.removeEmptyChunks = false
      config.optimization.splitChunks = false
    }

    return config
  },

  images: {
    domains: ['fonts.gstatic.com', 'fonts.googleapis.com', '127.0.0.1', 'localhost']
  },

  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default withBundleAnalyzer(nextConfig)
