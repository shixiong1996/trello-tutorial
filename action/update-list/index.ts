"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { UpdateList } from "./schema"
import { InputType, ReturnType } from "./types"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth() // 从auth中获取用户id和组织id

  if(!userId || !orgId) {
    return {
      error: '未经授权'
    }
  }

  const { title, id, boardId } = data
  let list // 存储更新后的板块数据

  try {
    list = await db.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId // 关联board的组织id
        }
      },
      data: {
        title
      }
    })
  } catch(error) {
    return {
      error: "更新失败"
    }
  }

  revalidatePath(`/board/${boardId}`) // 重新验证路径
  return { data: list } // 返回更新后的整个板块数据
}

// 确保执行更新操作时进行必要的安全检查
export const updateList = createSafeAction(UpdateList, handler)