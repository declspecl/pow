// utils
import clsx from "clsx";
import { exit } from "@tauri-apps/api/process";
import { Dispatch, SetStateAction } from "react";

// backend
import { UserConfig } from "@/backend/UserConfig";
import { get_default_user_config } from "@/backend/Commands";

// stores
import { useNaviHistoryStore } from "@/stores/NaviHistory";

interface UserConfigErrorProps {
    userConfigError: object,
    setUserConfigError: Dispatch< SetStateAction<object | null> >
    setUserConfig: Dispatch< SetStateAction<UserConfig> >
}

export function UserConfigError({ userConfigError, setUserConfigError, setUserConfig }: UserConfigErrorProps) {
    // ability to navigate to default directory when proceeding with default configuration
    const naviHistoryGotoArbitrary = useNaviHistoryStore((state) => state.gotoArbitrary);

    return (
        <div className="p-8 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-start gap-4 rounded-lg bg-background-50">
            <h1 className="text-4xl text-text">An error occured in loading your user configuration.</h1>

            <div className="flex flex-col gap-1 text-base text-text">
                <p>The following error occured in attempting to load your user configuration:</p>

                <p className="text-ui-secondary">{JSON.stringify(userConfigError, null, 2)}</p>

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
                    onClick={async () => {
                        const default_user_config: UserConfig = await get_default_user_config();

                        setUserConfigError(null);
                        setUserConfig(default_user_config);
                        naviHistoryGotoArbitrary(default_user_config.pow.default_directory);
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
