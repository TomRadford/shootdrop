/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['shootdrop-images.s3.eu-west-1.amazonaws.com']
  }
}

module.exports = nextConfig
