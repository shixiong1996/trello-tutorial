// 客户端组件
'use client'

import { UserButton } from "@clerk/nextjs"

const ProtectedPage = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/">
        
      </UserButton>
    </div>
  )
}

export default ProtectedPage