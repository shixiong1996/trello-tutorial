'use server'

import { db } from "@/lib/db";

export async function create(formData: FormData) {
  // 获取表单中名为 title 的输入框的值
  const title = formData.get('title') as string

  // 创建一个新的 board
  await db.board.create({
    data: {
      title: title,
    }
  })
}