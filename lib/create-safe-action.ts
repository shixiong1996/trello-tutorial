// 安全操作处理器
import { z } from "zod";

export type FieldErrors<T> = {
  [key in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  fieldError?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
}

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validateData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validateData = schema.safeParse(data);
    if(!validateData.success) {
      return { fieldError: validateData.error.flatten().fieldErrors as FieldErrors<TInput> };
    }

    return handler(validateData.data);
  }
}