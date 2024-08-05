import { Logo } from "@/components/logo"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs" // 组织切换器

import { MobileSidebar } from "./mobile-sidebar" // 移动侧边栏
import { FormPopover } from "@/components/form/form-popover"

const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <FormPopover>
          <Button variant="primary" size="sm" className="rounded-sm hidden md:block h-auto py-2 px-3">
            Create
          </Button>
        </FormPopover>
        <FormPopover>
          <Button variant="primary" size="sm" className="rounded-sm block md:hidd">
            <Plus className="h-5 w-5" />
          </Button>
        </FormPopover>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterSelectOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }
            }
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30
              }
            }
          }}
        />
      </div>
    </nav>
  )
}

export default Navbar