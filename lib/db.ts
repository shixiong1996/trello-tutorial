// 以下操作参考官网：帮助和排除故障 使用Next.js 实例化 Prisma Client 的最佳实践

// 这里我们使用PrismaClient来连接数据库
import { PrismaClient } from '@prisma/client'

// TypeScript语法：声明全局变量prisma
declare global {
  var prisma : PrismaClient | undefined
}

// 实例化PrismaClient 检查prisma是否已经实例化，如果没有实例化，我们就实例化一个，以免重复创建实例
// globalThis是全局对象，我们可以在任何地方访问它
export const db = globalThis.prisma || new PrismaClient({
  errorFormat: 'pretty' // 启用美观的错误格式。这种格式通常会提供更友好的输出，便于阅读和理解错误信息，适合开发环境中的调试。
})

// 如果是生产环境，我们将全局变量globalThis.prisma设置为db 任何地方都可以访问数据库
if (process.env.NODE_ENV === 'production') {
  globalThis.prisma = db
}
