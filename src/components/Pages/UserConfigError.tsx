// utils
import clsx from "clsx";
import { exit } from "@tauri-apps/api/process";
import { Dispatch, SetStateAction } from "react";

// backend
import { UserConfig } from "@/backend/UserConfig";
import { access_directory, get_default_user_config } from "@/backend/Commands";

// stores
import { useNaviHistoryStore } from "@/stores/NaviHistory";

export interface RuntimeUserConfigError {
    when: string,
    error: object
}

interface UserConfigErrorProps {
    userConfigError: RuntimeUserConfigError,
    setUserConfigError: Dispatch< SetStateAction<RuntimeUserConfigError | null> >
    setUserConfig: Dispatch< SetStateAction<UserConfig | null> >
}

export function UserConfigError({ userConfigError, setUserConfigError, setUserConfig }: UserConfigErrorProps) {
    // ability to navigate to default directory when proceeding with default configuration
    const naviHistoryGotoArbitrary = useNaviHistoryStore((state) => state.gotoArbitrary);

    return (
        <div className="p-8 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-start gap-4 rounded-lg bg-background-50">
            <h1 className="text-4xl text-text">An error occured in loading your user configuration.</h1>

            <div className="flex flex-col gap-1 text-base text-text">
                <p>The following error occured when {userConfigError.when}:</p>

                <p className="text-ui-secondary">
                    {Object.keys(userConfigError.error)[0].toString()}: {Object.values(userConfigError.error)[0].toString()}
                </p>

                <p>
                    To fix the problem, refer to the documentation on how to structure the configuration file.
                    Select one of the following options:
                </p>
            </div>

            <div className="flex flex-row flex-wrap gap-4">
                <button
                    onClick={async () => {
                        await exit(0);
                    }}
                    className={clsx(
                        "px-4 py-1.5 rounded-md bg-ui-primary text-background"
                    )}
                >
                    Close the application
                </button>

                <button
                    onClick={() => {
                        console.log("open config file");
                    }}
                    className={clsx(
                        "px-4 py-1.5 rounded-md bg-ui-secondary text-background"
                    )}
                >
                    Open configuration file
                </button>

                <button
                    onClick={() => {
                        get_default_user_config()
                            .then(default_user_config => {
                                access_directory(default_user_config.pow.default_directory)
                                    .then((directory) => {
                                        naviHistoryGotoArbitrary(directory.path)
                                            .then(() => {
                                                setUserConfigError(null);
                                                setUserConfig(default_user_config);
                                            })
                                            .catch((err) => setUserConfigError({ when: "parsing the default user configuration's default directory", error: err }));
                                    })
                                    .catch((err) => setUserConfigError({ when: "accessing the default user configuration's default directory", error: err }));
                            })
                            .catch((err) => setUserConfigError({ when: "getting the default user configuration", error: err }));
                    }}
                    className={clsx(
                        "px-4 py-1.5 rounded-md bg-ui-accent text-text"
                    )}
                >
                    Proceed with default configuration
                </button>
            </div>
        </div>
    );
}