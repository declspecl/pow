import { useState, useContext } from "react";
import { UserConfig } from "@/backend/UserConfig";
import { serialize_user_config } from "@/backend/Commands";
import { UserConfigContext } from "@/contexts/UserConfigContext";

enum SettingsFSM {
    NOTHING,
    SAVING,
    COMPLETE
}

export default function Settings() {
    const [fsm, setFSM] = useState(SettingsFSM.NOTHING);

    const { userConfig, setUserConfig }= useContext(UserConfigContext);

    return (
        <button>
            {(fsm === SettingsFSM.NOTHING) ? (
                <span>save</span>
            ) : (
                (fsm === SettingsFSM.SAVING) ? (
                    <span>saving...</span>
                ) : (
                    <span>complete!</span>
                )
            )}
        </button>
    );
}
