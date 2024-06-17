'use client'

import { forwardRef } from "react" // forwardRef 允许组件使用 ref 将 DOM 节点暴露给父组件。
import { useFormStatus } from "react-dom" // Hook 提供了上次表单提交的状态信息
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils" // 用于合并类名
import { FormErrors } from "./form-errors"


interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  errors?: Record<string, string[] | undefined>; // Record<Keys, Type>返回一个对象类型，参数Keys用作键名，参数Type用作键值类型。
  className?: string;
  onBlur?: () => void; // 当元素失去焦点时触发
}

// forwardRef 允许组件使用 ref 将 DOM 节点暴露给父组件。
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({
    id,
    label,
    type,
    placeholder,
    required,
    disabled,
    errors,
    className,
    defaultValue = '',
    onBlur
  }, ref) => {

    const { pending } = useFormStatus() // 获取表单的状态
    return (
      <div>
        <div>
          {label ?
            <Label
              htmlFor={id} // 与 input 的 id 对应
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
            : null}
          <Input
            onBlur={onBlur}
            defaultValue={defaultValue}
            ref={ref}
            required={required}
            name={id}
            id={id}
            placeholder={placeholder}
            type={type}
            disabled={pending || disabled}
            className={cn("text-sm px-2 py-1 h-7", className)}
            aria-describedby={`${id}-error`} // 无障碍访问
          />
        </div>
        <FormErrors id={id} errors={errors}></FormErrors>
      </div>
    )
  })

FormInput.displayName = "FormInput"

// displayName 是 React 组件的一个特殊属性，用于设置组件的显示名称。这个名称在调试工具（如 React Developer Tools）中显示，便于调试和开发。
// 设置 displayName 可以让调试工具显示自定义的组件名称，而不是匿名函数或其他不友好的名称。特别是在使用高阶组件（HOC）或 forwardRef 包装组件时，设置 displayName 可以保持调试工具中的组件树清晰易懂。