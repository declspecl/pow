import { invoke } from "@tauri-apps/api/tauri";
import { useState, useEffect } from "react";
import { UserConfig } from "@/lib/UserConfig";
import Loading from "@/components/Loading/Loading";
import useTheme from "@/hooks/useTheme";
import Pow from "@/components/Pow/Pow";

export default function App() {
	const [theme, setTheme] = useTheme();
	const [userConfig, setUserConfig] = useState<UserConfig | null>(null);

	useEffect(() => {
		async function getUserConfig() {
			const user_config = await invoke<UserConfig>("deserialize_user_config");

			setUserConfig(user_config);
		}

		getUserConfig();
	}, []);

	return (
		<main className="bg-background h-screen">
		{userConfig === null ? (
			<Loading />
		) : (
			<Pow />
		)}
		</main>
	);
}

