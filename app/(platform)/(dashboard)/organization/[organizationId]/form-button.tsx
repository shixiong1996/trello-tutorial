'use client';

import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom";

export const FormButton = () => {
  const { pending } = useFormStatus();

  return (
    <div>
      <Button type="submit" disabled={pending}>
        {pending ? "提交中" : "提交"}
      </Button>
    </div>
  )
}