"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { UpdateCardOrder } from "./schema"
import { InputType, ReturnType } from "./types"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth() // 从auth中获取用户id和组织id

  if (!userId || !orgId) {
    return {
      error: '未经授权'
    }
  }

  const { items, boardId } = data
  let updadeCards; // 存储更新后的板块数据

  try {
    const transaction = items.map((card) => 
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            }
          }
        },
        data: {
          order: card.order,
          listId: card.listId
        }
      })
    )

    updadeCards = await db.$transaction(transaction) // 执行事务
  } catch (error) {
    return {
      error: "重新排序失败"
    }
  }

  revalidatePath(`/board/${boardId}`) // 重新验证路径
  return { data: updadeCards } // 返回更新后的整个板块数据
}

// 确保在执行更新操作时进行必要的安全检查
export const updateCardOrder = createSafeAction(UpdateCardOrder, handler)