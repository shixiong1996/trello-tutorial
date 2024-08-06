"use client"

import { toast } from "sonner"; // Toast 组件
import { ElementRef, useRef, useState } from "react";
import { board } from "@prisma/client"

import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form/form-input";
import { updateBoard } from "@/action/update-board";
import { useAction } from "@/hook/use-action";

interface BoardTitleFormProps {
  data: board;
}

export const BoardTitleForm = ({
  data,
}: BoardTitleFormProps) => {
  const { execute } = useAction(updateBoard, {
    onSuccess:(data) => {
      toast.success(`Board "${data.title}" updated`)
      setTitle(data.title) // 更新标题
      disableEditing()
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const formRef = useRef<ElementRef<"form">>(null)
  const inputRef = useRef<ElementRef<"input">>(null)

  const [title, setTitle] = useState(data.title)
  const [isEditing, setIsEditing] = useState(false)

  const enableEditing = () => {
    // 代办事项
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    execute({
      title,
      id: data.id
    })
  }

  // onBlur 事件会在元素失去焦点时触发
  // requestSubmit() 表单的内容会被验证并且表单仅在验证通过时提交
  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  if(isEditing) {
    return (
      <form action={onSubmit} ref={formRef} className="flex items-center gpa-x-2">
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={data.title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    )
  }

  return (
    <Button 
      className="font-bold text-lg h-auto w-auto p-1 px-2" 
      variant="transparent"
      onClick={enableEditing}
      >
        {title}
    </Button>
  )
}