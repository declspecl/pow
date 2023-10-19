import Pow from "@/components/Pow/Pow";
import Loading from "@/components/Loading/Loading";

import { UserConfig } from "@/backend/UserConfig";

import { useNaviHistoryStore } from "@/stores/NaviHistory";

import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { setVisibleTheme, getLocalStorageTheme } from "@/lib/Theme";
import { isEnvironmentVariable, resolveEnvironmentVariable } from "@/lib/Utils";

export default function App() {
    const [userConfig, setUserConfig] = useState<UserConfig | null>(null);

    const naviHistoryGotoArbitrary = useNaviHistoryStore().gotoArbitrary;
    const naviHistoryReset = useNaviHistoryStore().reset;

    useEffect(() => {
        setVisibleTheme(getLocalStorageTheme());

        let isCancelled = false;

        invoke<UserConfig>("deserialize_user_config")
            .then((user_config) => {
                if (!isCancelled) {
                    if (isEnvironmentVariable(user_config.default_folder)) {
                        resolveEnvironmentVariable(user_config.default_folder)
                            .then((initialFolder) => {
                                naviHistoryGotoArbitrary(initialFolder);
                            })
                            .catch((err) => {
                                console.error(err); // some error happened internally with resolving the env var
                                naviHistoryGotoArbitrary(user_config.default_folder);
                            });
                    }
                    else {
                        naviHistoryGotoArbitrary(user_config.default_folder);
                    }

                    setUserConfig({
                        width: user_config.width,
                        height: user_config.height,
                        theme: user_config.theme,
                        window_title: user_config.window_title,
                        pinned_folders: user_config.pinned_folders,
                        default_folder: user_config.default_folder,
                        excluded_extensions: user_config.excluded_extensions
                    });
                }
            })
            .catch((err) => {
                // some error happened internally with deserializing the user config (likely improper formatting)
                // TODO: make global toast system to display errors
                console.error(err);
            })

        return () => {
            isCancelled = true;

            naviHistoryReset();
        }
    }, [naviHistoryGotoArbitrary, naviHistoryReset]);

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
