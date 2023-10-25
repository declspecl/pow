import { useState, useEffect } from "react";
import { UserConfig } from "@/backend/UserConfig";
import { isEnvironmentVariable } from "@/lib/Utils";
import { useNaviHistoryStore } from "@/stores/NaviHistory";
import { setVisibleTheme, getLocalStorageTheme } from "@/lib/Theme";
import { deserialize_user_config, resolve_environment_variable } from "@/backend/Commands";

import Pow from "@/components/Pages/Pow/Pow";
import Loading from "@/components/Pages/Loading/Loading";
import UserConfigError from "@/components/Pages/UserConfigError/UserConfigError";

export default function App() {
    const [userConfig, setUserConfig] = useState<UserConfig | null>(null);
    const [errorEncountered, setErrorEncountered] = useState<string | null>(null);

    const naviHistoryGotoArbitrary = useNaviHistoryStore().gotoArbitrary;
    const naviHistoryReset = useNaviHistoryStore().reset;

    useEffect(() => {
        setVisibleTheme(getLocalStorageTheme());

        let isCancelled = false;

        deserialize_user_config()
            .then((user_config) => {
                if (!isCancelled) {
                    if (isEnvironmentVariable(user_config.default_folder)) {
                        resolve_environment_variable(user_config.default_folder)
                            .then((initialFolder) => {
                                naviHistoryGotoArbitrary(initialFolder);
                            })
                            .catch((err) => {
                                setErrorEncountered(JSON.stringify(err));
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
                setErrorEncountered(JSON.stringify(err, null, 2));
            })

        return () => {
            isCancelled = true;

            naviHistoryReset();
        }
    }, [naviHistoryGotoArbitrary, naviHistoryReset]);

    return (
        <main className="w-full h-full bg-background">
            {userConfig === null && errorEncountered === null ? (
                <Loading />
            ) : errorEncountered !== null ? (
                <UserConfigError
                    errorEncountered={errorEncountered}
                    setErrorEncountered={setErrorEncountered}
                    setUserConfig={setUserConfig}
                />
            ) : (
                <Pow />
            )}
        </main>
    );
}
