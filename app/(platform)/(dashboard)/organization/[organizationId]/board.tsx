interface BoardProps {
  id: string;
  title: string
}

export const Board = ({ title, id}: BoardProps) => {
  return (
    <div>
      Board: { title }
    </div>
  )
}