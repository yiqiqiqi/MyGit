/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['your-domain.com'],
  },
  // 暂时关闭这些高级配置，解决启动问题
  // i18n: {
  //   locales: ['zh', 'en'],
  //   defaultLocale: 'zh',
  // },
  // experimental: {
  //   optimizeCss: false,
  //   fontLoaders: [
  //     { loader: '@next/font/google', options: { subsets: ['latin'] } },
  //   ],
  // },
};

module.exports = nextConfig; 