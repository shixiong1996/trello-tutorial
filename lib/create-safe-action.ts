// 创建一个安全的操作函数，确保在处理输入数据之前进行验证。如果数据验证失败，它会返回详细的错误信息
// 如果验证成功，它会调用提供的处理函数来执行具体的逻辑。

// zod 是一个用于验证和解析数据的库
import { z } from 'zod'

// 定义了一个泛型，可以将其他对象的所有属性值都改成 string数组 类型。
export type FieldErrors<T> = {
	[K in keyof T]?: string[] // 类型映射
}

// 假设以下数据类型符合fireldErrors的类型
// FormFields : {
// 	username: string
// 	password: string
// }
// const formFiledErrors: FieldErrors<FormFields> = {
// 	username: ['用户名不能为空'],
// 	password: ['密码不能为空']
// }

export type ActionState<TInput, TOutput> = {
	fieldErrors?: FieldErrors<TInput>, // 存储与 TInput 类型字段相关的错误信息
	error?: string | null,  // 存储错误信息
	data?: TOutput // 存储处理后的数据
}

// 假设以下数据类型符合ActionState的类型
// const actionState: ActionState<FormFields, user> = { 
// 	fieldErrors: {
// 		username: ['用户名不能为空'],
// 		password: ['密码不能为空']
// 	},
// 	error: '用户名或密码错误',
// 	data: { id: 1, username: 'admin', email: 'admin@com' }
// }

// 创建一个安全操作的函数
export const createSafeAction = <TInput, TOutput>(
	schema: z.Schema<TInput>,
	handler: (validatedDate: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
	return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
		const validationResult = schema.safeParse(data)

		if (!validationResult.success) {
			return {
				fieldErrors: validationResult.error.flatten().fieldErrors as FieldErrors<TInput>,
			}
		}

		return handler(validationResult.data)
	}
}