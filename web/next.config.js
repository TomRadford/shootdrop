/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ToDo: relook enabling https://github.com/bpampuch/pdfmake/issues/2486
  swcMinify: false,

  images: {
    domains: [
      "shootdrop-images.s3.eu-west-1.amazonaws.com",
      "images.shootdrop.com",
      "s3.eu-west-1.amazonaws.com",
      "localhost",
    ],
  },
}

module.exports = nextConfig
