/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'egbnfonqeqseuptbfkyp.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'love.kyber.kr',
      },
      {
        protocol: 'https',
        hostname: 'k-tea.love',
      },
    ],
  },
}

module.exports = nextConfig
