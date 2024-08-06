"use server"

import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { DeleteBoard } from "./schema"
import { InputType, ReturnType } from "./types"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth() // 从auth中获取用户id和组织id

  if(!userId || !orgId) {
    return {
      error: '未经授权'
    }
  }

  const { id } = data
  let board // 存储更新后的板块数据

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      }
    })
  } catch(error) {
    return {
      error: "删除失败"
    }
  }

  revalidatePath(`/organization/${orgId}`) // 重新验证路径
  redirect(`/organization/${orgId}`) // 重定向到组织页面
}

// 确保在执行更新操作时进行必要的安全检查
export const deleteBoard = createSafeAction(DeleteBoard, handler)