/*
 * @Author: Victor
 * @Date: 2024-03-12 13:39:52
 * @LastEditTime: 2024-03-12 14:20:13
 */


import { z } from 'zod'

export type FieldErrors<T> = {
	[K in keyof T]?: string[]
}

export type ActionState<TInput, TOutput> = {
	fieldErrors?: FieldErrors<TInput>,
	error?: string | null,
	data?: TOutput
}

export const createSafeAction = <TInput, TOutput>(schema: z.Schema<TInput>, handler: (validatedDate: TInput) => Promise<ActionState<TInput, TOutput>>) => {
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