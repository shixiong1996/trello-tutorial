"use server"

import { auth } from "@clerk/nextjs"

import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { DeleteList } from "./schema"
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
    list = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId
        }
      }
    })
  } catch(error) {
    return {
      error: "删除失败"
    }
  }

  revalidatePath(`/board/${boardId}`) // 重新验证路径
  return { data: list }
}

// 确保在执行更新操作时进行必要的安全检查
export const deleteList = createSafeAction(DeleteList, handler)