import { XCircle } from "lucide-react"; // 图标库

interface FormErrorsProps {
	id: string;
	errors?: Record<string, string[] | undefined>; // Record<Keys, Type>返回一个对象类型，参数Keys用作键名，参数Type用作键值类型。
}

export const FormErrors = ({ id, errors }: FormErrorsProps) => {
	if (!errors) { // 如果errors对象不存在，则组件不渲染任何内容，直接返回null。
		return null
	}

	return <div
		id={`${id}-error`}
		aria-live="polite"
		className="mt-2 text-xs text-rose-500"
	>
		{errors?.[id]?.map((error: string) => (
			<div
				key={error}
				className="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm"
			>
				<XCircle className="h-4 w-4 mr-2" />
				{error}
			</div>
		))}
	</div>
}