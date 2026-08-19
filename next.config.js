/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@octokit/rest', 'formidable']
  },
  webpack: (config) => {
    config.externals = [...config.externals, 'fs', 'path']
    return config
  }
}

module.exports = nextConfig