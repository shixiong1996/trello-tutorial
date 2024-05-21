'use client';

import { create } from "@/action/create-board"
import { Button } from "@/components/ui/button"
import { useActionState } from "react";

export const Form = () => {
  const initialState = { message: "", errors: {} }
  // state当前的状态 dispatch新动作 create提交表单后设置为提供操作的返回值 initialState初始状态
  // 提交表单后，将调用您提供的create函数。它的返回值将成为表单的新的state。
  const [state, dispatch] = useActionState(create, initialState)

  return (
    <form action={dispatch}>
      <div className="flex flex-col space-y-2">
        <input
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
          className="border-black border p-1"
        />
      {state?.errors?.title ? (
        <div>
          {state.errors.title.map((error) => (
            <p key={error} className="text-rose-500">
              {error}
            </p>
          ))}
        </div>
      ) : null}
      </div>
      <Button type="submit">
        提交
      </Button>
    </form>
  )
}