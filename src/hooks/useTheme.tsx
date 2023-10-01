import { useState, useEffect, useLayoutEffect } from "react";

const systemTheme: string = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export default function useTheme(): [string, React.Dispatch<React.SetStateAction<string>>] {
	const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || systemTheme);

	useLayoutEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	return [theme, setTheme];
}
