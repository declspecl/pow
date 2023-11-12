// utils
import clsx from "clsx";
import { exit } from "@tauri-apps/api/process";
import { Dispatch, SetStateAction } from "react";

// backend
import { UserConfig } from "@/backend/UserConfig";
import { access_directory, get_default_user_config, open_user_config_in_default_program, parse_path } from "@/backend/Commands";

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

                <p className="text-ui-secondary font-mono">
                    {Object.keys(userConfigError.error)[0].toString()}: {Object.values(userConfigError.error)[0].toString()}
                </p>

                <p>
                    To fix the problem, refer to the documentation on how to structure the configuration file.
                    Select one of the following options:
                </p>
            </div>

            <div className="flex flex-row flex-wrap gap-4">
                <button
                    onClick={() => {
                        open_user_config_in_default_program()
                            .then(() => console.log("YIPPEE"))
                            .catch((err) => console.error(err));
                    }}
                    className={clsx(
                        "px-4 py-1.5 rounded-md bg-ui-primary text-background"
                    )}
                >
                    Open configuration file
                </button>

                <button
                    onClick={() => {
                        get_default_user_config()
                            .then(default_user_config => {
                                parse_path(default_user_config.pow.default_directory)
                                    .then((parsedPath) => {
                                        access_directory(parsedPath)
                                            .then((directory) => {
                                                setUserConfigError(null);
                                                setUserConfig(default_user_config);

                                                naviHistoryGotoArbitrary(directory.path);
                                            })
                                            .catch((err) => setUserConfigError({ when: "accessing the default configuration's default directory", error: err }));
                                        })
                                    .catch((error) => setUserConfigError({ when: "parsing the default configuration's default directory", error }))
                            })
                            .catch((err) => setUserConfigError({ when: "getting the default configuration", error: err }));
                    }}
                    className={clsx(
                        "px-4 py-1.5 rounded-md bg-ui-secondary text-background"
                    )}
                >
                    Proceed with default configuration
                </button>
            </div>
        </div>
    );
}
