"use client";

import { useState, useLayoutEffect, type Dispatch, type SetStateAction } from "react";

const preferredTheme: string = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export default function useTheme(): [string, Dispatch< SetStateAction<string> >] {
	const [theme, setTheme]: [string, Dispatch< SetStateAction<string> >]  = useState(localStorage.getItem("theme") || preferredTheme);

	useLayoutEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	return [theme, setTheme];
}
