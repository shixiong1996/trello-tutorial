'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod';

// 定义可选属性 作用于错误提示
export type State = {
  error?: {
    title?: string[]
  },
  message?: string | null
}

// 验证表单的数据结构 传递附加参数 提示错误信息
const createBoard = z.object({
  title: z.string().min(3, {
    message: "最少3个字符"
  }),
});

// 创建board执行函数
export async function create(prevState: State, formData: FormData) {
  // 解析表单数据
  const validatedFields = createBoard.safeParse({
    title: formData.get('title')
  })

  // 如果验证失败 返回错误信息
  if(!validatedFields.success) {
    return {
      // 返回展品化的错误信息 zod库参考https://zod.dev/ERROR_HANDLING?id=flattening-errors
      error: validatedFields.error.flatten().fieldErrors,
      menubar: "请检查表单字段"
    }
  }
  
  // 解析表单数据验证成功的数据
  const { title } = validatedFields.data;

  // 创建board
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
  
  // 重新验证路径 更新页面
  revalidatePath('/organization/org_2ep4r2hELm4l6KrwKEe8gxz3aqQ');
  // 重定向
  redirect('/organization/org_2ep4r2hELm4l6KrwKEe8gxz3aqQ')
}