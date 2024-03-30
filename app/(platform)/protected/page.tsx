// 客户端组件
'use client';

// 身份验证状态
import { useAuth } from "@clerk/nextjs"

const ProtectedPage = () => {
  const {} = useAuth()

  return (
    <div>
    </div>
  )
}

export default ProtectedPage