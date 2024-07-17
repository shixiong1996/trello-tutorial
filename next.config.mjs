/** @type {import('next').NextConfig} */
const nextConfig = {
  // 为了保护您的应用程序免受恶意用户的侵害，需要进行配置才能使用外部映像。这可确保 Next.js 图像优化 API 只能提供您帐户中的外部图像。
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  }
};

export default nextConfig;
