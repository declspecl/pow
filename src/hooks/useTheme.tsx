import { useState, useLayoutEffect } from "react";

const preferredTheme: string = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export default function useTheme(): [string, React.Dispatch<React.SetStateAction<string>>] {
	const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || preferredTheme);

	useLayoutEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	return [theme, setTheme];
}
