/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  swcMinify: false, // Moved swcMinify here
  experimental: {
    optimizeFonts: true,
  },
  images: {
    domains: ['fonts.gstatic.com', 'fonts.googleapis.com'],
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

export default nextConfig
