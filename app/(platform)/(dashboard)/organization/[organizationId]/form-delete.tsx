'use client';

import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom";

export const FormDelete = () => {
  const { pending } = useFormStatus();

  return (
    <div>
      <Button type="submit" disabled={pending} variant="destructive" size="sm">
        {pending ? "删除中" : "删除"}
      </Button>
    </div>
  )
}