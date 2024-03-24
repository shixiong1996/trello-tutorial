// 标徽组件
import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local"; // 字体

import { cn } from "@/lib/utils"; // 合并类

const myFont = localFont({
  src: "../../public/font/font.woff2",
});

export const Logo = ()=> {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition
      items-center gap-x-2 hidden md:flex">
        <Image
          src="/logo.svg"
          alt="logo"
          height={30}
          width={50}
        />
      </div>
      <p className={cn("text-lg text-neutral-700 pb-1", myFont.className)}>
        Taskify
      </p>
    </Link>
  )
}
