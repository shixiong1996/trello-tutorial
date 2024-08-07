"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { CreateList } from "./schema"
import { InputType, ReturnType } from "./types"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth() // 从auth中获取用户id和组织id

  if(!userId || !orgId) {
    return {
      error: '未经授权'
    }
  }

  const { title, boardId } = data
  let list // 存储更新后的板块数据

  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId
      }
    })

    if(!board) {
      return {
        error: '未找到板块'
      }
    }

    const lastList = await db.list.findFirst({
      where: { boardId: boardId },
      orderBy: { order: 'desc' },
      select: { order: true }
    })

    const newOrder = lastList ? lastList.order + 1 : 1

    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder
      }
    })
  } catch(error) {
    return {
      error: "创建失败"
    }
  }

  revalidatePath(`/board/${boardId}`) // 重新验证路径
  return { data: list } // 返回更新后的整个板块数据
}

// 确保在执行更新操作时进行必要的安全检查
export const createList = createSafeAction(CreateList, handler)