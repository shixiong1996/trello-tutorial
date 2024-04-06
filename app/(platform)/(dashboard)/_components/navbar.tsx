import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"

import { Plus } from "lucide-react"

export const Navbar = () => {
  return (
    <div className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
      {/* TODO：Mobile Sidebar */}
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <Button size="sm" className="rounded-sm hidden md:block h-auto py-1.5 px-2">
          Create1
        </Button>
        <Button size="sm" className="rounded-sm block md:hidd">
          <Plus/>
        </Button>
      </div>
    </div>
  )
}