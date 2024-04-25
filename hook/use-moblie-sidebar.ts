// 侧边栏状态管理
import { create } from 'zustand'

type MoblieSidebarStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useMoblieSidebar = create<MoblieSidebarStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

