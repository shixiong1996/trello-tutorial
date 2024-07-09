import { Hint } from "@/components/hint"
import { HelpCircle, User2 } from "lucide-react"

export const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" >
        <div
          role='button'
          className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gay items-center justify-center gap-y-1
					hover:opacity-75 transtion"
        >
          <p className="text-sm">Creat New Board</p>
          <span className="text-xs">
            5 remaining
          </span>
          <Hint
            sideOffest={40}
            description={`免费工作区有5个可以创建的板块。升级以创建更多板块。`}
          >
            <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
          </Hint>
        </div>
      </div>
    </div>
  )
}