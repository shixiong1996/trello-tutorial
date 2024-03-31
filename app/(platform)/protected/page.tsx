// 客户端组件
'use client'

import { useAuth, useUser } from "@clerk/nextjs"


const ProtectedPage = () => {
  const { userId } = useAuth()
  const { user } = useUser()

  return (
    <div>
      User: {user?.firstName}
      userId: {userId}
    </div>
  )
}

export default ProtectedPage