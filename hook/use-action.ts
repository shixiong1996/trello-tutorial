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
  ); // 存储字段错误信息，初始值为 undefined
  const [error, setError] = useState<string | undefined>(undefined) // 存储操作过程中发生的错误信息，初始值为 undefined
  const [data, setData] = useState<TOutput | undefined>(undefined) // 存储操作成功时返回的数据，初始值为 undefined
  const [isLoading, setIsLoading] = useState<boolean>(false) // 表示操作是否正在进行，初始值为 false

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true) // 函数开始时设置isLoading为true
      try {
        const result = await action(input);

        if (!result) { // 如果没有返回值，直接返回
          return;
        }

        if (result.fieldErrors) { // 如果存在字段错误 (result.fieldErrors)，调用 setFieldErrors 更新 fieldErrors 状态。
          setFieldErrors(result.fieldErrors)
        }

        if (result.error) {
          setError(result.error); // 如果存在错误信息 (result.error)，调用 setError 更新 error 状态，并调用 options.onError 回调（如果存在）。
          options.onError?.(result.error)
        }

        if (result.data) { // 如果存在返回数据 (result.data)，调用 setData 更新 data 状态，并调用 options.onSuccess 回调（如果存在）。
          setData(result.data)
          options.onSuccess?.(result.data)
        }
      } finally { // 无论操作成功与否，都会将 isLoading 状态设置为 false，并调用 options.onComplete 回调（如果存在）。
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