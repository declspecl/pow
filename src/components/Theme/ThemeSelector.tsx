"use client";

import clsx from "clsx";
import useTheme from "@/hooks/useTheme";
import { PaletteIcon, XIcon } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import ThemeGroup from "./ThemeGroup";
import { inter } from "@/Fonts";

type ThemeSelectorProps = {
	
}

export default function ThemeSelector({  }: ThemeSelectorProps) {
	const [theme, setTheme] = useTheme();

	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<button className={clsx(
					"p-2 bg-background text-text rounded-xl transition-[background-color]",
					"hover:bg-background-shade-2"
				)}>
					<PaletteIcon />
				</button>
			</Popover.Trigger>

			<Popover.Portal>
				<Popover.Content className={clsx(inter.className, "relative top-1.5 p-3 w-80 bg-background text-text border border-text rounded-s")}>
					<Popover.Arrow className="w-3 h-1.5 fill-text" />

					<div className="flex flex-col gap-8">
						<div className="flex flex-row justify-between items-center">
							<h1 className="text-2xl font-semibold text-text">Select Theme</h1>

							<Popover.Close asChild>
								<button className={clsx(
									"p-1 flex flex-row justify-center items-center bg-background text-text rounded-lg transition-[background-color]",
									"hover:bg-background-shade-2"
								)}>
									<XIcon />
								</button>
							</Popover.Close>
						</div>

						<ThemeGroup theme={theme} setTheme={setTheme} />
					</div>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
