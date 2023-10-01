import { invoke } from "@tauri-apps/api/tauri";
import { useState, useEffect } from "react";
import { BackendUserConfig, UserConfig } from "@/lib/UserConfig";
import Loading from "@/components/Loading/Loading";
import useTheme from "@/hooks/useTheme";
import Pow from "@/components/Pow/Pow";
import { useNaviHistoryStore } from "@/stores/NaviHistory";
import { isEnvironmentVariable, validateEnvironmentVariable } from "@/lib/Utils";

export default function App() {
	const [theme, setTheme] = useTheme();
	const [userConfig, setUserConfig] = useState<UserConfig | null>(null);

	const naviHistoryHistory = useNaviHistoryStore().history;
	const naviHistoryGotoArbitrary = useNaviHistoryStore().gotoArbitrary;

	useEffect(() => {
		async function getUserConfig() {
			const user_config = await invoke<BackendUserConfig>("deserialize_user_config");

			console.log(user_config);

			if (naviHistoryHistory.length === 0) {
				let initialFolder: string;

				if (isEnvironmentVariable(user_config.default_folder)) {
					initialFolder = await validateEnvironmentVariable(user_config.default_folder);
				}
				else {
					initialFolder = user_config.default_folder;
				}

				naviHistoryGotoArbitrary(initialFolder);
			}

			setUserConfig({
				width: user_config.width,
				height: user_config.height,
				theme: user_config.theme,
				windowTitle: user_config.window_title,
				pinnedFolders: user_config.pinned_folders,
				defaultFolder: user_config.default_folder,
				excludedExtensions: user_config.excluded_extensions
			});
		}

		getUserConfig();
	}, [naviHistoryGotoArbitrary, naviHistoryHistory]);

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

