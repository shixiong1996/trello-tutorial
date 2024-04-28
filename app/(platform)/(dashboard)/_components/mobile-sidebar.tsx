'use client'

import { usePathname } from "next/navigation"
import { useState, useEffect, use } from "react"

import { useMoblieSidebar } from "@/hook/use-moblie-sidebar" // 侧边栏状态管理

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"

export const MobileSidebar = () => {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  const isOpen = useMoblieSidebar((state) => state.isOpen)
  const onOpen = useMoblieSidebar((state) => state.onOpen)
  const onClose = useMoblieSidebar((state) => state.onClose)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    onClose();
  }, [pathname, onClose])

  if (!isMounted) return null

  return (
    <>
      <div>
        <Button
          onClick={onOpen}
          className="block md:hidden mr-2"
          variant="ghost"
          size="sm"
        >
          <Menu className="h-4 w-4"></Menu>
        </Button>
        <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent side="left" className="p-2 pt-10">
            <Sidebar storageKey="t-sidebar-mobile-state"></Sidebar>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}