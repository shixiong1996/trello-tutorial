"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { CreateCard } from "./schema"
import { InputType, ReturnType } from "./types"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth() // 从auth中获取用户id和组织id

  if(!userId || !orgId) {
    return {
      error: '未经授权'
    }
  }

  const { title, boardId, listId } = data
  let card // 存储更新后的板块数据

  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId
        }
      }
    })

    if(!list) {
      return {
        error: '未找到列表'
      }
    }

    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { order: 'desc'},
      select: { order: true }
    })

    const newOrder = lastCard ? lastCard.order + 1 : 1

    card = await db.card.create({
      data: {
        title,
        listId,
        order: newOrder,
      }
    })
  } catch(error) {
    return {
      error: "创建失败"
    }
  }

  revalidatePath(`/board/${boardId}`) // 重新验证路径
  return { data: card } // 返回更新后的整个板块数据
}

// 确保在执行更新操作时进行必要的安全检查
export const createCard = createSafeAction(CreateCard, handler)