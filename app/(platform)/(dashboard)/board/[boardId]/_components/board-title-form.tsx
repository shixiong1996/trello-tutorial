"use client"

import { Button } from "@/components/ui/button"
import { board } from "@prisma/client"
import { ElementRef, useRef, useState } from "react";
import { FormInput } from "@/components/form/form-input";

interface BoardTitleFormProps {
  data: board;
}

export const BoardTitleForm = ({
  data,
}: BoardTitleFormProps) => {
  const formRef = useRef<ElementRef<"form">>(null)
  const inputRef = useRef<ElementRef<"input">>(null)

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
    console.log('I am submitted' + title)
  }

  if(isEditing) {
    return (
      <form action={onSubmit} ref={formRef} className="flex items-center gpa-x-2">
        <FormInput 
          ref={inputRef}
          id="title"
          onBlur={() => {}}
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
        {data.title}
    </Button>
  )
}