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
	data?: TOutput  // 存储处理后的数据
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
	schema: z.Schema<TInput>, // Zod 模式，提取出推断的类型
	// 这是一个处理函数，接受验证后的数据，返回一个包含操作状态的Promise
	handler: (validatedDate: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
	// 返回一个异步函数，该函数接受输入数据并返回一个包含操作状态的Promise
	return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
		const validationResult = schema.safeParse(data) // 使用 Zod 的 safeParse 方法对传入的数据进行验证。

		// 处理验证失败的情况
		if (!validationResult.success) { // 如果验证失败
			return {
				// 返回展平化的错误信息 zod库参考https://zod.dev/ERROR_HANDLING?id=flattening-errors
				// 获取字段错误，并将其转换为 FieldErrors<TInput> 类型。
				fieldErrors: validationResult.error.flatten().fieldErrors as FieldErrors<TInput>,
			}
		}
		
		// 如果验证成功，调用处理函数handler并传递验证后的数据
		return handler(validationResult.data)
	}
}