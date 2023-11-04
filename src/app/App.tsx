import { useState, useEffect } from "react";
import { UserConfig } from "@/backend/UserConfig";
import { useNaviHistoryStore } from "@/stores/NaviHistory";
import { setVisibleTheme, getLocalStorageTheme } from "@/lib/Theme";
import { deserialize_user_config, parse_path } from "@/backend/Commands";

import { Pow } from "@/components/Pages/Pow";
import { Loading } from "@/components/Pages/Loading";
import { UserConfigContext } from "@/contexts/UserConfigContext";
import { UserConfigError } from "@/components/Pages/UserConfigError";

export default function App() {
    // UserConfig state
    const [userConfig, setUserConfig] = useState<UserConfig>(null!);

    // user config error management state
    const [userConfigError, setUserConfigError] = useState<string | null>(null);

    // NaviHistory state
    const naviHistoryReset = useNaviHistoryStore().reset;
    const naviHistoryGotoArbitrary = useNaviHistoryStore().gotoArbitrary;

    // ---------------------------------
    // - Attempting to load UserConfig -
    // ---------------------------------

    useEffect(() => {
        // set theme stored in local storage
        setVisibleTheme(getLocalStorageTheme());

        let isCancelled = false;

        // attempt to load user config and navigate to default directory
        deserialize_user_config()
            .then((user_config) => {
                // successfully loaded user config
                if (!isCancelled) {
                    parsePath(user_config.pow.default_directory)
                        .then((parsedDefaultDirectory) => {
                            // successfully parsed default directory
                            console.log(parsedDefaultDirectory);
                            naviHistoryGotoArbitrary(parsedDefaultDirectory);
                        })
                        .catch((err) => {
                            // if error is encountered, set userConfigError to show UserConfigError page
                            setUserConfigError(JSON.stringify(err, null, 2));
                        })
                }

                setUserConfig(user_config);
            })
            .catch((err) => {
                // if error is encountered, set userConfigError to show UserConfigError page
                setUserConfigError(JSON.stringify(err, null, 2));
            })

        return () => {
            isCancelled = true;

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
