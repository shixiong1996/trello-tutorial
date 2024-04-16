// 客户端组件
'use client'

import Link from "next/link"
import { Plus } from "lucide-react"
// 将 React 的状态管理与浏览器的本地存储 API 结合起来。使用这个钩子可以使得在应用中保存和检索数据变得更简单且更符合 React 的工作流程。
import { useLocalStorage } from "usehooks-ts"
// 使用组织
import { useOrganization, useOrganizationList } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Accordion } from "@/components/ui/accordion"

interface SidebarProps {
  storageKey?: string
}

export const Sidebar = ({
  storageKey = "t-sidebar-state"
}: SidebarProps) => {

  // expanded存储在本地存储中的数据的状态值  setExpanded更新 expanded 的值
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  )

  // organization当前活跃的组织 isLoaded在 Clerk 加载并初始化之前设置为 false 的布尔值。
  const {
    organization: activeOrganization,
    isLoaded: isLoadedOrg
  } = useOrganization()

  // userMemberships 返回 PaginatedResources，其中包括用户的组织成员资格列表。
  // isLoaded 在 Clerk 加载并初始化之前，布尔值将设置为 false。一旦 Clerk 加载，isLoaded 将被设置为 true。
  const {
    userMemberships,
    isLoaded: isLoadedOrgList
  } = useOrganizationList({
    // 分页数据来实现无限滚动列表
    userMemberships: {
      infinite: true
    }
  })

  // 默认手风琴值
  const defaultAccordionValue: string[] = Object.keys(expanded)
    .reduce((acc:string[], key:string) =>{
      if(expanded[key]) {
        acc.push(key);
      }
      return acc;
    }, [])

  // 手风琴展开与折叠状态
  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id]
    }))
  }

  // 手风琴加载状态
  if(!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <Skeleton />
      </>
    )
  }

  return (
    <div>
      Sidebar!
    </div>
  )
}