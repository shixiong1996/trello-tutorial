"use client"

import { useEffect } from "react"
// 读取由当前 URL 填充的路由的动态参数。
import { useParams } from "next/navigation"
// 创建组织并设置活动组织
import { useOrganizationList } from "@clerk/nextjs"

export const OrgContol = () => {
  const params = useParams()
  // 设置活动会话 改变组织
  const { setActive } = useOrganizationList()

  useEffect(() => {
    // 确保setActive函数确实被提供，防止在调用未定义或非函数值时抛出错误
    if (!setActive) return

    setActive({
      organization: params.organizationId as string
    })
  }, [setActive, params.organizationId])

  return (
    null
  )
}

export default OrgContol