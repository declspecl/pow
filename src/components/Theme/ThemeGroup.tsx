import { Dispatch, SetStateAction, useState } from "react";
import ThemeGroupItem from "./ThemeGroupItem";

type ThemeGroupProps = {
	theme: string,
	setTheme: Dispatch< SetStateAction<string> >
}

export default function ThemeGroup({ theme, setTheme }: ThemeGroupProps) {
	let themeIndex: number;

	switch (theme) {
		case "light":
			themeIndex = 0;
			break;

		case "dark":
			themeIndex = 1;
			break;

		case "rose-pine":
			themeIndex = 2;
			break;

		case "tokyonight":
			themeIndex = 3;
			break;

		default:
			themeIndex = -1;
			break;
	}

	const [selectedIndex, setSelectedIndex] = useState(themeIndex);

	return (
		<div className="flex flex-row gap-x-2 gap-y-2 flex-wrap">
			<ThemeGroupItem
				name="Light"
				dataTheme="light"
				selected={selectedIndex === 0}
				onClick={() => {
					setTheme("light");
					setSelectedIndex(0);
				}}
			/>

			<ThemeGroupItem
				name="Dark"
				dataTheme="dark"
				selected={selectedIndex === 1}
				onClick={() => {
					setTheme("dark");
					setSelectedIndex(1);
				}}
			/>

			<ThemeGroupItem
				name="Rosé Pine"
				dataTheme="rose-pine"
				selected={selectedIndex === 2}
				onClick={() => {
					setTheme("rose-pine");
					setSelectedIndex(2);
				}}
			/>

			<ThemeGroupItem
				name="Tokyo Night"
				dataTheme="tokyonight"
				selected={selectedIndex === 3}
				onClick={() => {
					setTheme("tokyonight");
					setSelectedIndex(3);
				}}
			/>
		</div>
	);
}

