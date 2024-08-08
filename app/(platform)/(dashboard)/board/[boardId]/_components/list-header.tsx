"use client"

import { useState, useRef, ElementRef } from "react"
import { List } from "@prisma/client"

interface ListHeaderProps {
  data: List
}

export const ListHeader = ({
  data
}: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title)

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      <div className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
        {title}
      </div>
    </div>
  )
}