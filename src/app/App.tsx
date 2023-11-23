// utils
import { useState, useEffect } from "react";
import { setVisibleTheme, getLocalStorageTheme } from "@/lib/Theme";

// components
import { Pow } from "@/components/Pages/Pow";
import { Loading } from "@/components/Pages/Loading";
import { RuntimeUserConfigError, UserConfigError } from "@/components/Pages/UserConfigError";

// backend
import { UserConfig } from "@/backend/UserConfig";
import { access_directory, deserialize_user_config, does_user_config_exist, get_default_user_config, parse_path, serialize_user_config } from "@/backend/Commands";

// stores
import { useNaviHistoryStore } from "@/stores/NaviHistory";

// contexts
import { UserConfigContext } from "@/contexts/UserConfigContext";
import { useAppearanceStateStore } from "@/stores/AppearanceSettings";

export default function App() {
    // UserConfig state
    const [userConfig, setUserConfig] = useState<UserConfig | null>(null);

    // user config error management state
    const [userConfigError, setUserConfigError] = useState<RuntimeUserConfigError | null>(null);

    // NaviHistory state
    const naviHistoryReset = useNaviHistoryStore().reset;
    const naviHistoryGotoArbitrary = useNaviHistoryStore().gotoArbitrary;

    // appearance settings state
    const appearanceSettings = useAppearanceStateStore();

    // ---------------------------------
    // - Attempting to load UserConfig -
    // ---------------------------------

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", appearanceSettings.theme);
        document.documentElement.setAttribute("style", `font-size: ${appearanceSettings.fontSize}px;`)

        return () => {
            document.documentElement.removeAttribute("data-theme");
            document.documentElement.removeAttribute("style");
        }
    }, [appearanceSettings])

    useEffect(() => {
        let isUserConfigExistsCheckCancelled = false;
        let isGettingUserConfigCancelled = false;
        let isParsingDefaultDirectoryCancelled = false;
        let isDirectoryAccessCancelled = false;

        let isSerializingDefaultUserConfigCancelled = false;

        // check if user config exists. if it doesnt, create it and set it to default
        does_user_config_exist()
            .then((exists) => {
                if (isUserConfigExistsCheckCancelled) return;

                if (exists) {
                    // if user config does exist, attempt to load it and navigate to default directory
                    deserialize_user_config()
                        .then((user_config) => {
                            // successfully loaded user config
                            if (isGettingUserConfigCancelled) return;

                            // parsing default directory
                            parse_path(user_config.pow.default_directory)
                                .then((parsed_default_directory) => {
                                    if (isParsingDefaultDirectoryCancelled) return;

                                    // check if default directory is valid in the file system
                                    access_directory(parsed_default_directory)
                                        .then((directory) => {
                                            if (isDirectoryAccessCancelled) return;

                                            // initialize naviHistory and UserConfig
                                            naviHistoryGotoArbitrary(directory.path);
                                            setUserConfig(user_config);
                                        })
                                        .catch((error) => setUserConfigError({ when: "accessing your default directory", error }));
                                })
                                .catch((error) => setUserConfigError({ when: "parsing your default directory", error }));
                        })
                        .catch((error) => setUserConfigError({ when: "loading your user configuration from disk", error }));
                }
                else {
                    // if user config doesnt exist, set user config to default and serialize it on disk
                    get_default_user_config()
                        .then((default_user_config) => {
                            // if default user config is successfully retrieved, serialize it
                            if (isGettingUserConfigCancelled) return;

                            serialize_user_config(default_user_config)
                                .then(() => {
                                    if (isSerializingDefaultUserConfigCancelled) return;

                                    // parsing default directory
                                    parse_path(default_user_config.pow.default_directory)
                                        .then((parsed_default_directory) => {
                                            if (isParsingDefaultDirectoryCancelled) return;

                                            // check if default directory is valid in the file system
                                            access_directory(parsed_default_directory)
                                                .then((directory) => {
                                                    if (isDirectoryAccessCancelled) return;

                                                    // initialize naviHistory and UserConfig
                                                    naviHistoryGotoArbitrary(directory.path);
                                                    setUserConfig(default_user_config);
                                                })
                                                .catch((error) => setUserConfigError({ when: "accessing the default configuration's default directory", error }));
                                        })
                                        .catch((error) => setUserConfigError({ when: "parsing the default configuration's default directory", error }));
                                })
                                .catch((error) => setUserConfigError({ when: "serializing the default configuration to disk", error }));
                        })
                        .catch((error) => setUserConfigError({ when: "getting the default configuration", error }));
                }
            })
            .catch((error) => setUserConfigError({ when: "checking if your configuration exists", error }));

        return () => {
            isUserConfigExistsCheckCancelled = true;
            isGettingUserConfigCancelled = true;
            isParsingDefaultDirectoryCancelled = true;
            isDirectoryAccessCancelled = true;

            isSerializingDefaultUserConfigCancelled = true;

            naviHistoryReset();
        }
    }, [naviHistoryGotoArbitrary, naviHistoryReset]);

    // -----------------------------------------------------
    // - rendering logic: Loading, UserConfigError, or Pow -
    // -----------------------------------------------------

    if (userConfig === null) {
        if (userConfigError === null)
            return <Loading />;
        else {
            return (
                <UserConfigError
                    userConfigError={userConfigError}
                    setUserConfigError={setUserConfigError}
                    setUserConfig={setUserConfig}
                />
            );
        }
    }
    else {
        return (
            <main className="w-full h-full bg-background">
                <UserConfigContext.Provider value={{ userConfig, setUserConfig }}>
                    <Pow />
                </UserConfigContext.Provider>
            </main>
        );
    }
}
