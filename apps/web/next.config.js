/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')()

module.exports = withTM({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
})
