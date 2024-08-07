import { z } from "zod";

export const CreateList = z.object({
  title: z.string({
    required_error: "标题不能为空",
    invalid_type_error: "标题必须是字符串类型"
  }).min(3, {
    message: "标题至少需要3个字符"
  }),
  boardId: z.string()
});