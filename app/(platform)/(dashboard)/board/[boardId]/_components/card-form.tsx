"use client"

import { forwardRef } from "react"; // forwardRef 允许组件使用 ref 将 DOM 节点暴露给父组件。

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CardFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({
  listId,
  enableEditing,
  disableEditing,
  isEditing
}, ref) => {
  return (
    <div>
      <Button
        onClick={enableEditing}
        className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
        size="sm"
        variant="ghost"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a card
      </Button>
    </div>
  )
})

CardForm.displayName = "CardForm";