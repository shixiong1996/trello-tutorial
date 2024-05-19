'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod';

export type State = {
  error?: {
    title?: string[]
  },
  message?: string | null
}

// 定义表单的数据结构
const createBoard = z.object({
  title: z.string().min(3, {
    message: "最少3个字符"
  }),
});

export async function create(prevState: State, formData: FormData) {
  // 
  const validatedFields = createBoard.safeParse({
    title: formData.get('title')
  })

  if(!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
      menubar: "请检查表单字段"
    }
  }
 
  const { title } = validatedFields.data

  // 创建一个新的 board
  try {
    await db.board.create({
      data: {
        title: title,
      }
    })
  } catch(error) {
    return {
      error: {
        message: "数据库错误"
      }
    }
  }
  
  // 重定向 重新验证路径 更新页面
  revalidatePath('/organization/org_2ep4r2hELm4l6KrwKEe8gxz3aqQ');
  redirect('/organization/org_2ep4r2hELm4l6KrwKEe8gxz3aqQ')
}