import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = { // 元数据 网站的标题 图标等
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
