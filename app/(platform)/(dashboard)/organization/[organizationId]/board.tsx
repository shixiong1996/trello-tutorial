import { deleteBoard } from "@/action/delete-board";
import { Button } from "@/components/ui/button";

interface BoardProps {
  id: string;
  title: string
}

export const Board = ({ title, id}: BoardProps) => {
  // 删除指定id的board 提前绑定id 以便在点击删除按钮时调用
  const deleBoardWithId = deleteBoard.bind(null, id)

  return (
    <form action={deleBoardWithId} className="flex items-center gatp-x-2">
      <p>
        Board title is: {title}
      </p>
      <Button variant="destructive" size="sm">
        Delete
      </Button>
    </form>
  )
}