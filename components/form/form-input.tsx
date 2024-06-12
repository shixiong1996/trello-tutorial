'use client'

import { forwardRef } from "react"

interface FormInputProps {
  id: string,
  lable?: string,
  type?: string,
  placeholder?: string,
  required?: boolean,
  disabled?: boolean,
  errors?: Record<string, string[] | undefined>,
  className?: string,
  defaultValue?: string,
  onBlure?: () => void,
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
  id,
  label,
  type,
  placeholder,
  required,
  disabled,
  errors,
  className,
  defaultValue,
  onBlur,
}, ref)) => {
  const 
}