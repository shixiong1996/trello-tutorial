// 使用 TypeScript 和 Prisma 的类型系统来定义一些新的类型，以便在 TypeScript 中更好地处理数据库模型

import { Card, List } from "@prisma/client"

export type ListWithCards = List & { cards: Card[] }

export type CardWithList = Card & { list: List }