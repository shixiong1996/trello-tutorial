'use client';

import { create } from "@/action/create-board"
import { Button } from "@/components/ui/button"

export const Form = () => {
  return (
    <form action={create}>
        <input
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
          className="border-black border p-1"
        />
        <Button type="submit">
          提交
        </Button>
      </form>
  )
}