// 创建一个安全的操作函数，确保在处理输入数据之前进行验证。如果数据验证失败，它会返回详细的错误信息
// 如果验证成功，它会调用提供的处理函数来执行具体的逻辑。

// zod 是一个用于验证和解析数据的库
import { z } from 'zod'

// 
export type FieldErrors<T> = {
	[K in keyof T]?: string[]
}

export type ActionState<TInput, TOutput> = {
	fieldErrors?: FieldErrors<TInput>,
	error?: string | null,
	data?: TOutput
}

export const createSafeAction = <TInput, TOutput>(schema: z.Schema<TInput>, 
	handler: (validatedDate: TInput) => Promise<ActionState<TInput, TOutput>>) => {
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