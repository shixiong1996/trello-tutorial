"use client"

import { Plus, X } from "lucide-react"
import { useState, useRef, ElementRef } from "react"
import { useParams } from "next/navigation"
import { useEventListener, useOnClickOutside } from "usehooks-ts"

import { FormInput } from "@/components/form/form-input"
import { FormSubmit } from "@/components/form/form-submit"
import { Button } from "@/components/ui/button"

import { ListWrapper } from "./list-wrapper"

export const ListForm = () => {
  const params = useParams()

  const inputRef = useRef<ElementRef<"input">>(null)
  const formRef = useRef<ElementRef<"form">>(null)
  
  const [isEditing, setIsEditing] = useState(false)

  const enableEditing = () => { // 用于开启编辑状态
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
    })
  }

  const disableEditing = () => { // 用于关闭编辑状态
    setIsEditing(false)
  }

  const onKeyDown = (e: KeyboardEvent) => { // 用于监听键盘按键
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
          <input
            hidden
            value={params.boardId}
            name="boardId"
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>
              Add List
            </FormSubmit>
            <Button
              onClick={disableEditing}
              size="sm"
              variant="ghost"
            >
              <X className="h-5 w-5"/>
            </Button>
          </div>
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