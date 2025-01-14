"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { UpdateListOrder } from "./schema"
import { InputType, ReturnType } from "./types"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth() // 从auth中获取用户id和组织id

  if (!userId || !orgId) {
    return {
      error: '未经授权'
    }
  }

  const { items, boardId } = data
  let lists // 存储更新后的板块数据

  try {
    const transaction = items.map((list) =>
      db.list.update({
        where: {
          id: list.id,
          board: {
            orgId,
          },
        },
        data: {
          order: list.order,
        }
      })
    )

    lists = await db.$transaction(transaction) // 批量更新数据
  } catch (error) {
    return {
      error: "重新排序失败"
    }
  }

  revalidatePath(`/board/${boardId}`) // 重新验证路径
  return { data: lists } // 返回更新后的整个板块数据
}

// 确保在执行更新操作时进行必要的安全检查
export const updateListOrder = createSafeAction(UpdateListOrder, handler)