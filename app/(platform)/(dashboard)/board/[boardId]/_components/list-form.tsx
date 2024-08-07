"use client"

import { Plus } from "lucide-react"
import { useState, useRef, ElementRef } from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"

import { FormInput } from "@/components/form/form-input"

import { ListWrapper } from "./list-wrapper"

export const ListForm = () => {
  const inputRef = useRef<ElementRef<"input">>(null)
  const formRef = useRef<ElementRef<"form">>(null)
  
  const [isEditing, setIsEditing] = useState(false)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if(e.key === "Escape") {
      disableEditing()
    }
  }

  // 当用户触发键盘按键时，调用 onKeyDown 函数
  useEventListener("keydown", onKeyDown)
  // 当用户点击页面其他地方时，调用 disableEditing 函数
  useOnClickOutside(formRef, disableEditing)

  if(isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="输入列表标题"
          />
        </form>
      </ListWrapper>
    )
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm">
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  )
}