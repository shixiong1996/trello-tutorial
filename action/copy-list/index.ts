"use server"

import { auth } from "@clerk/nextjs"

import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { CopyList } from "./schema"
import { InputType, ReturnType } from "./types"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth() // 从auth中获取用户id和组织id

  if(!userId || !orgId) {
    return {
      error: '未经授权'
    }
  }

  const { id, boardId } = data
  let list // 存储更新后的板块数据

  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId
        }
      },
      include: {
        cards: true
      }
    })

    if(!listToCopy) {
      return {
        error: "未找到列表"
      }
    }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: 'desc' },
      select: { order: true }
    })

    const newOrder = lastList ? lastList.order + 1 : 1

    list = await db.list.create({
      data: {
        boardId: listToCopy.boardId,
        title: `${listToCopy.title} - Copy`,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order
            }))
          }
        }
      },
      include: {
        cards: true
      }
    })
  } catch(error) {
    return {
      error: "无法复制"
    }
  }

  revalidatePath(`/board/${boardId}`) // 重新验证路径
  return { data: list }
}

// 确保在执行更新操作时进行必要的安全检查
export const copyList = createSafeAction(CopyList, handler)