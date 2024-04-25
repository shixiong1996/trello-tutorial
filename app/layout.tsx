import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

// 元数据可帮助搜索引擎更好地了解您的内容（这可以带来更好的 SEO），并允许您自定义您的内容在社交媒体上的呈现方式，帮助您在各种平台上创建更具吸引力和一致的用户体验。
export const metadata: Metadata = {
  title: {
    default: siteConfig.name, //默认标题
    template: `%s | ${siteConfig.name}` // api生成原数据
  },
  description: siteConfig.Description,
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    other: {
      url: '/logo.svg',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
