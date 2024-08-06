"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { UpdateBoard } from "./schema"
import { InputType, ReturnType } from "./types"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth() // 从auth中获取用户id和组织id

  if(!userId || !orgId) {
    return {
      error: '未经授权'
    }
  }

  const { title, id } = data
  let board // 存储更新后的板块数据

  try {
    board = await db.board.update({
      where: {
        id,
        orgId,
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

  revalidatePath(`/board/${id}`) // 重新验证路径
  return { data: board } // 返回更新后的整个板块数据
}

export const updateBoard = createSafeAction(UpdateBoard, handler)