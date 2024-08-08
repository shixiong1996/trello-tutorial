import { z } from "zod";

export const UpdateList = z.object({
  title: z.string({
    required_error: "标题不能为空",
    invalid_type_error: "标题必须是字符串类型"
  }).min(3, {
    message: "标题至少需要3个字符"
  }),
  id: z.string(),
  boardId: z.string() // 为了知道我们要更新哪个列表
});