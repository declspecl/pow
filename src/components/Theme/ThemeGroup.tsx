import { useState } from "react";
import ThemeGroupItem from "./ThemeGroupItem";
import { Themes, getLocalStorageTheme, setLocalStorageTheme, setVisibleTheme } from "@/lib/Theme";

export default function ThemeGroup() {
    const currentTheme = getLocalStorageTheme();

	let themeIndex: number;

	switch (currentTheme) {
		case Themes.Light:
			themeIndex = 0;
			break;

		case Themes.Dark:
			themeIndex = 1;
			break;

		case Themes.RosePine:
			themeIndex = 2;
			break;

		case Themes.TokyoNight:
			themeIndex = 3;
			break;

		default:
			themeIndex = -1;
			break;
	}

	const [selectedIndex, setSelectedIndex] = useState(themeIndex);

	return (
		<div className="flex flex-row flex-wrap gap-2">
			<ThemeGroupItem
				name="Light"
				dataTheme="light"
				selected={selectedIndex === 0}
				onClick={() => {
					setVisibleTheme(Themes.Light);
                    setLocalStorageTheme(Themes.Light);

					setSelectedIndex(0);
				}}
			/>

			<ThemeGroupItem
				name="Dark"
				dataTheme="dark"
				selected={selectedIndex === 1}
				onClick={() => {
					setVisibleTheme(Themes.Dark);
                    setLocalStorageTheme(Themes.Dark);

					setSelectedIndex(1);
				}}
			/>

			<ThemeGroupItem
				name="Rosé Pine"
				dataTheme="rose-pine"
				selected={selectedIndex === 2}
				onClick={() => {
					setVisibleTheme(Themes.RosePine);
                    setLocalStorageTheme(Themes.RosePine);

					setSelectedIndex(2);
				}}
			/>

			<ThemeGroupItem
				name="Tokyo Night"
				dataTheme="tokyonight"
				selected={selectedIndex === 3}
				onClick={() => {
					setVisibleTheme(Themes.TokyoNight);
                    setLocalStorageTheme(Themes.TokyoNight);

					setSelectedIndex(3);
				}}
			/>
		</div>
	);
}

