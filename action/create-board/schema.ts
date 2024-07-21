// 数据验证模式

import { z } from "zod";

// 创建一个对象模式
export const CreateBoard = z.object({
  title: z.string({
    // 此消息会在 title 字段为空或未提供时被抛出。
    required_error: "title不能为空",
    // 此消息会在 title 字段存在但不是字符串时被抛出。
    invalid_type_error: "title必须是字符串类型"
  }).min(3, {
    message: "标题至少需要3个字符"
  }),
  image: z.string({
    required_error:"图片不能为空",
    invalid_type_error:"图片不能为空"
  })
})