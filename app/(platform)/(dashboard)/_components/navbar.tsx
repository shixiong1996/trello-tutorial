import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs" // 组织切换器

import { Plus } from "lucide-react"

export const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
      {/* TODO：Mobile Sidebar */}
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <Button variant="primary" size="sm" className="rounded-sm hidden md:block h-auto py-2 px-3">
          Create
        </Button>
        <Button variant="primary" size="sm" className="rounded-sm block md:hidd">
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organiaztion/:id"
          afterSelectOrganizationUrl="/organiaztion/:id"
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