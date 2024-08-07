"use client"

import { Plus } from "lucide-react"
import { useState, useRef, ElementRef } from "react"

import { ListWrapper } from "./list-wrapper"

export const ListForm = () => {
  const inputRef = useRef<ElementRef<"form">>(null)
  const formRef = useRef<ElementRef<"input">>(null)
  
  const [isEditing, setIsEditing] = useState(false)
  
  return (
    <ListWrapper>
      <button className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm">
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  )
}