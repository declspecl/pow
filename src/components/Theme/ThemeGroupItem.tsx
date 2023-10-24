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
				"px-2 py-0.5 flex flex-row gap-1 items-center border border-text rounded-md bg-background transition-[background-color]",
                "hover:bg-background-100"
			)}
		>
			<div data-theme={dataTheme} className="relative w-[1.125rem] h-[1.125rem]">
				<div
					className={clsx(
						"absolute w-full h-full rounded-full bg-ui-accent"
					)}
				/>

				{selected && (
                    <CheckIcon className="absolute top-full left-full -translate-y-full -translate-x-[105%] z-10 w-full h-full stroke-text" />
                )}
			</div>

			<span className="flex flex-row justify-center items-center">
				{name}
			</span>
		</button>
	);
}
