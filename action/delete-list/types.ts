import { z } from "zod";
import { List } from "@prisma/client"; // 引入prisma生成的类型

import { ActionState } from "@/lib/create-safe-action"; // 引入自定义的类型

import { DeleteList } from "./schema"; // 引入自定义的类型

export type InputType = z.infer<typeof DeleteList> // 提取出推断的类型
export type ReturnType = ActionState<InputType, List> // <提取出推断的类型, 数据库模型>