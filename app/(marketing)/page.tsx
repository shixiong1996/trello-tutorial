// 营销页面
import { Medal } from "lucide-react"; //图标
import Link from "next/link"; // 链接
import localFont from "next/font/local"; // 字体
import { Poppins } from "next/font/google"; // 字体

import { cn } from "@/lib/utils"; // 合并类
import { Button } from "@/components/ui/button"; //button按钮

const myFont = localFont({
  src: "../../public/font/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"], // 预加载的子集
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={cn(
          "flex items-center justify-normal flex-col",
          myFont.className
        )}
      >
        <div
          className="mb-4 flex items-center border shadow-sm p-4
        bg-amber-100 text-amber-700 rounded-full uppercase"
        >
          <Medal className="h-6 w-6 mr-2" />
          No 1 task managment
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          Taskify helps team move
        </h1>
        <div
          className="text-3xl md:text-6xl bg-gradient-to-r 
        from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-1 w-fit"
        >
          work forward
        </div>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
          textFont.className
        )}
      >
        Collaborate, manage projects,and reach new productivity peaks. From high
        rises to the home office, the way your team works is unique - accomplish
        it all with Taskify.
      </div>
      <Button className="mt-4" size="lg" asChild>
        <Link href="/sign-up">Get Taskify for free</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
