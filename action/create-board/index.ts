// 处理创建看板的
'use server'

import { auth } from '@clerk/nextjs'

import { createSafeAction } from '@/lib/create-safe-action'
import { InputType, ReturnType } from './types' // 输入数据和返回数据的类型。
import { db } from '@/lib/db'

import { revalidatePath } from 'next/cache' // 重新验证某个路径的数据缓存
import { CreateBoard } from "./schema"; // 引入数据验证模式

const handler = async ( data: InputType ): Promise<ReturnType> => {
  const { userId } = auth() // 获取当前用户id

  if(!userId) { // 如果id不存在 表示未授权
    return { error: '未授权' }
  }

  // 从输入数据中提取出title
  const { title } = data

  let board; // 用于存储创建的看板

  try {
    // throw new Error('测试')
    board = await db.board.create({ // 创建看板 如果成功，将结果赋值给board。
      data: {
        title,
      }
    })
  } catch (error) { // 如果出现错误，返回一个错误消息。
    return { error: '创建失败' }
  }

  revalidatePath('/board/${board.id}')
  return { data: board } // 新创建的看板数据
}

export const createBoard = createSafeAction(CreateBoard, handler)