import clsx from "clsx";
import { ArrowLeftIcon } from "lucide-react";

interface PreviousDirectoryProps {
	onClick: () => void,
	disabled: boolean
}

export default function PreviousDirectoryButton({ onClick, disabled }: PreviousDirectoryProps) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={clsx(
				"p-1 bg-background rounded-lg transition-[background-color]",
				{ "hover:bg-background-shade-2" : !disabled }
			)}
		>
			<ArrowLeftIcon className={clsx(
				"transition-[stroke]",
				{ "stroke-text" : !disabled },
				{ "stroke-background-shade-2" : disabled}
			)}/>
		</button>
	);
}
