'use server'

import { db } from "@/lib/db"; 
import { revalidatePath } from "next/cache";

export async function deleteBoard(id: string) {
  await db.board.delete({
    where: { id }
  })

  // 重定向
  revalidatePath('/organization/org_2ep4r2hELm4l6KrwKEe8gxz3aqQ')
}