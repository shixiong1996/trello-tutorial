'use client';

import { createBoard } from "@/action/create-board/index";

// import { useFormState } from "react-dom";
import { FormInput } from "./form-input";
import { FormButton } from "./form-button";
import { useAction } from "@/hook/use-action";

export const Form = () => {
  // const initialState = { message: "", errors: {} }
  // state当前的状态 dispatch新动作 create提交表单后设置为提供操作的返回值 initialState初始状态
  // 提交表单后，将调用您提供的create函数。它的返回值将成为表单的新的state。
  // 当用户填写表单并提交时，dispatch 函数会被调用，执行 create 函数。
  // 根据 create 函数的执行结果（比如成功、失败或错误信息的返回），state 会相应更新，以反映当前表单的状态，这包括显示错误或提交成功的消息。
  // const [state, dispatch] = useFormState(create, initialState)

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, 'success')
    },
    onError: (error) => {
      console.log(error, 'error')
    }
  })

  const onSubmit = (formData: FormData) => { 
    const title = formData.get('title') as string

    execute({ title })
  }



  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={fieldErrors} />
      </div>
      <FormButton />
    </form>
  )
}