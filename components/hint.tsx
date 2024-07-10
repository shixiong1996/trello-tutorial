import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components//ui/tooltip";

interface HintProps {
	children: React.ReactNode;
	description: string,
	side?: "left" | "right" | "top" | "bottom";
	sideOffest?: number
}

export const Hint: React.FC<HintProps> = ({ children, description, side = "bottom", sideOffest = 0 }) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger>{children}</TooltipTrigger>
				<TooltipContent side={side} sideOffset={sideOffest} className="text-xs max-w-[220px] break-words">
					{description}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}