"use client";

import ThemeSelector from "@/components/Theme/ThemeSelector";
import useTheme from "@/hooks/useTheme";

export default function Home() {
	const [theme, setTheme] = useTheme();

	return (
		<main className="bg-background">
			<div className="w-full h-screen flex flex-row justify-center items-center">
				<ThemeSelector />
			</div>
		</main>
	);
}
