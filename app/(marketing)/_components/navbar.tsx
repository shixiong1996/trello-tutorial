// 	_folde选择文件夹和所有子段不参与路由
import { Logo } from "@/components/logo";

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex
      items-center w-full justify-between">
        <Logo />
      </div>
    </div>
  );
};
