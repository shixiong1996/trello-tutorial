"use client"

import { useState, useRef, ElementRef } from "react";

import { ListWithCards } from "@/types";
import { ListHeader } from "./list-header";
import { CardForm } from "./card-form";

interface ListItemProps {
  data: ListWithCards;
  index: number
}

export const ListItem = ({
  data,
  index
}: ListItemProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  }

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => { // React 在更新状态时会重新渲染组件，如果直接在 enableEditing 函数中调用 focus()，可能会因为组件尚未完成渲染而导致无法正确聚焦。
      textareaRef.current?.focus();
    })
  }

  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader
        onAddCard={enableEditing}  
        data={data}
      />
      <CardForm
        listId={data.id}
        ref={textareaRef}
        isEditing={isEditing}
        enableEditing={enableEditing}
        disableEditing={disableEditing}
      />
      </div>
    </li>
  )
}