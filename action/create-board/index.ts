// 处理创建看板的
'use server'

import { auth } from '@clerk/nextjs'

import { createSafeAction } from '@/lib/create-safe-action'
import { InputType, ReturnType } from './types' // 输入数据和返回数据的类型。
import { db } from '@/lib/db'

import { revalidatePath } from 'next/cache' // 重新验证某个路径的数据缓存
import { CreateBoard } from "./schema"; // 引入数据验证模式

const handler = async ( data: InputType ): Promise<ReturnType> => {
  const { userId } = auth()

  if(!userId) {
    return { error: '未授权' }
  }

  const { title } = data

  let board;

  try {
    // throw new Error('测试')
    board = await db.board.create({
      data: {
        title,
      }
    })
  } catch (error) {
    return { error: '创建失败' }
  }

  revalidatePath('/board/${board.id}')
  return { data: board }
}

export const createBoard = createSafeAction(CreateBoard, handler)