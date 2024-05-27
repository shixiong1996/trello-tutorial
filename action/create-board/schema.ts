// 验证

import { z } from "zod";

export const CreateBoard = z.object({
  title: z.string({
    required_error: "需要输入标题",
    invalid_type_error: "需要输入标题"
  }).min(3, {
    message: "标题至少需要3个字符"
  })
})