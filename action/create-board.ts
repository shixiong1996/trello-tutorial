'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from 'zod';

// 定义表单的数据结构
const createBoard = z.object({
  title: z.string(),
});

export async function create(formData: FormData) {
  // 获取表单中名为 title 的输入框的值 通过zod解析拿到的值是否正确
  const { title } = createBoard.parse({
    title: formData.get('title')
  })

  // 创建一个新的 board
  await db.board.create({
    data: {
      title: title,
    }
  })
  
  // 重定向
  revalidatePath('/organization/org_2ep4r2hELm4l6KrwKEe8gxz3aqQ')
}