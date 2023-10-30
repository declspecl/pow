import { useState, useEffect } from "react";
import { UserConfig } from "@/backend/UserConfig";
import { useNaviHistoryStore } from "@/stores/NaviHistory";
import { setVisibleTheme, getLocalStorageTheme } from "@/lib/Theme";
import { deserialize_user_config, parsePath } from "@/backend/Commands";

import Pow from "@/components/Pages/Pow/Pow";
import { Loading } from "@/components/Pages/Loading/Loading";
import UserConfigError from "@/components/Pages/UserConfigError/UserConfigError";
import { UserConfigContext } from "@/contexts/UserConfigContext";

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
                console.log(user_config);
                if (!isCancelled) {
                    parsePath(user_config.pow.default_directory)
                        .then((parsedDefaultDirectory) => {
                            console.log(parsedDefaultDirectory);
                            naviHistoryGotoArbitrary(parsedDefaultDirectory);
                        })
                        .catch((err) => {
                            setErrorEncountered(JSON.stringify(err));
                        })
                }

                setUserConfig(user_config);
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
                <UserConfigContext.Provider value={userConfig as UserConfig}>
                    <Pow />
                </UserConfigContext.Provider>
            )}
        </main>
    );
}
