// utils
import { useState, useEffect } from "react";
import { setVisibleTheme, getLocalStorageTheme } from "@/lib/Theme";

// components
import { Pow } from "@/components/Pages/Pow";
import { Loading } from "@/components/Pages/Loading";
import { UserConfigError } from "@/components/Pages/UserConfigError";

// backend
import { UserConfig } from "@/backend/UserConfig";
import { deserialize_user_config, does_user_config_exist, get_default_user_config, parse_path, serialize_user_config } from "@/backend/Commands";

// stores
import { useNaviHistoryStore } from "@/stores/NaviHistory";

// contexts
import { UserConfigContext } from "@/contexts/UserConfigContext";

export default function App() {
    // UserConfig state
    const [userConfig, setUserConfig] = useState<UserConfig>(null!);

    // user config error management state
    const [userConfigError, setUserConfigError] = useState<object | null>(null);

    // NaviHistory state
    const naviHistoryReset = useNaviHistoryStore().reset;
    const naviHistoryGotoArbitrary = useNaviHistoryStore().gotoArbitrary;

    // ---------------------------------
    // - Attempting to load UserConfig -
    // ---------------------------------

    useEffect(() => {
        // set theme stored in local storage
        setVisibleTheme(getLocalStorageTheme());

        let isUserConfigExistsCheckCancelled = false;
        let isGettingUserConfigCancelled = false;

        let isSerializingDefaultUserConfigCancelled = false;

        // check if user config exists. if it doesnt, create it and set it to default
        does_user_config_exist()
            .then((exists) => {
                if (!isUserConfigExistsCheckCancelled) {
                    if (exists) {
                        // if user config does exist, attempt to load it and navigate to default directory
                        deserialize_user_config()
                            .then((user_config) => {
                                // successfully loaded user config
                                if (!isGettingUserConfigCancelled) {
                                    // parse default directory and initialize navihistory to it
                                    naviHistoryGotoArbitrary(user_config.pow.default_directory)
                                        .then(() => setUserConfig(user_config))
                                        .catch((err) => setUserConfigError(err));
                                }
                            })
                            .catch((err) => {
                                // if error is encountered, set userConfigError to show UserConfigError page
                                setUserConfigError(err);
                            })
                    }
                    else {
                        // if user config doesnt exist, set user config to default and serialize it on disk
                        get_default_user_config()
                            .then((default_user_config) => {
                                // if default user config is successfully retrieved, serialize it
                                if (!isGettingUserConfigCancelled) {
                                    serialize_user_config(default_user_config)
                                        .then(() => {
                                            if (!isSerializingDefaultUserConfigCancelled) {
                                                // parse default directory and initialize navihistory to it
                                                naviHistoryGotoArbitrary(default_user_config.pow.default_directory)
                                                    .then(() => setUserConfig(default_user_config))
                                                    .catch((err) => setUserConfigError(err));
                                            }
                                        })
                                        .catch((err) => setUserConfigError(err));
                                }
                            })
                            .catch((err) => setUserConfigError(err));
                    }
                }
            })
            .catch((err) => setUserConfigError(err));

        return () => {
            isUserConfigExistsCheckCancelled = true;
            isGettingUserConfigCancelled = true;

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
