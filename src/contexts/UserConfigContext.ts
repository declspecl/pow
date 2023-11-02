import React, { createContext } from "react";
import { UserConfig } from "@/backend/UserConfig";

interface UserConfigContextType {
    userConfig: UserConfig,
    setUserConfig: React.Dispatch< React.SetStateAction<UserConfig> >
}

export const UserConfigContext = createContext<UserConfigContextType>(null!);
