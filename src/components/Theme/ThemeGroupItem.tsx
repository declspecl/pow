import clsx from "clsx";
import { CheckIcon } from "lucide-react";
import { MouseEventHandler } from "react";

type ThemeGroupItemProps = {
	name: string,
	dataTheme: string,
	selected: boolean,
	onClick: MouseEventHandler<HTMLButtonElement>
}

export default function ThemeGroupItem({ name, dataTheme, selected, onClick }: ThemeGroupItemProps) {
	return (
		<button
			onClick={onClick}
			className={clsx(
				"px-2 py-0.5 flex flex-row gap-1 items-center bg-background border border-text rounded-md border-opacity-40 cursor-pointer transition-[background-color]",
				"hover:bg-background-shade-1"
			)}
		>
			<div data-theme={dataTheme} className="relative w-[1.125rem] h-[1.125rem]">
				<div
					className={clsx(
						"absolute w-full h-full rounded-full bg-background",
					)}
				/>

				{ selected && <CheckIcon className="absolute top-full left-full -translate-y-full -translate-x-[105%] w-full h-full stroke-text z-10" /> }
			</div>

			<span className="flex flex-row justify-center items-center text-text">
				{name}
			</span>
		</button>
	);
}
