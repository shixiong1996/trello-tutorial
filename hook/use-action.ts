// 处理异步操作，并管理操作的状态和错误处理。

import { useState, useCallback } from 'react';

import { ActionState, FieldErrors } from '@/lib/create-safe-action';

type Action<TInput, TOutput> = (data: TInput) =>
  Promise<ActionState<TInput, TOutput>>;

// 三个可选的回调函数，分别在操作成功、失败和完成时调用。
interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput> | undefined>(
    undefined
  ); // 存储字段错误信息
  const [error, setError] = useState<string | undefined>(undefined) // 存储操作过程中发生的错误信息
  const [data, setData] = useState<TOutput | undefined>(undefined) // 存储操作成功时返回的数据
  const [isLoading, setIsLoading] = useState<boolean>(false) // 操作是否正在进行

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true)
      try {
        const result = await action(input);

        if (!result) {
          return;
        }

        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors)
        }

        if (result.error) {
          setError(result.error);
          options.onError?.(result.error)
        }

        if (result.data) {
          setData(result.data)
          options.onSuccess?.(result.data)
        }
      } finally {
        setIsLoading(false)
        options.onComplete?.()
      }
    },
    [action, options]
  )
  return {
    execute,
    fieldErrors,
    error,
    data,
    isLoading
  }
}