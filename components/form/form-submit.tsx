// 提交按钮

'use client'

import { useFormStatus } from "react-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FormSubmitProps {
  children: React.ReactNode; // React节点，通常用于定义组件内部显示的内容。
  disabled?: boolean;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary";
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant = "primary"
}: FormSubmitProps) => {
  const { pending } = useFormStatus() // 获取表单的状态，pending是一个布尔值，表示表单是否正在提交中。

  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      size="sm"
      className={cn(className)}
    >
      {children}
    </Button>
  )
}