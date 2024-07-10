'use client'

import { X } from "lucide-react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

import { useAction } from "@/hook/use-action"
import { createBoard } from "@/action/create-board"

import { FormInput } from "./form-input"
import { FormSubmit } from "./form-submit"

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0
}: FormPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600">
          Create board
        </div>
        <PopoverClose asChild >
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
}