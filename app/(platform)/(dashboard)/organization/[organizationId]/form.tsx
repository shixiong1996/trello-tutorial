// 提交表单 用于创建一个新的board

'use client';

import { createBoard } from "@/action/create-board/index"; // 创建看板

import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";

import { useAction } from "@/hook/use-action"; // 处理异步操作，并管理操作的状态和错误处理。

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, 'success') // 回调在操作成功时被调用，并接收成功的数据。
    },
    onError: (error) => { // 回调在操作失败时被调用，并接收错误信息。
      console.error(error)
    }
  })

  // 表单提交处理函数
  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    execute({ title })
  }

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput label="Board Title" errors={fieldErrors} id={"title"} />
      </div>
      <FormSubmit>
        保存
      </FormSubmit>
    </form>
  )
}