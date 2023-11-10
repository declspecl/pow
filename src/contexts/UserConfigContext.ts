import React, { createContext } from "react";
import { UserConfig } from "@/backend/UserConfig";

interface UserConfigContextType {
    userConfig: UserConfig | null,
    setUserConfig: React.Dispatch< React.SetStateAction<UserConfig | null> >
}

export const UserConfigContext = createContext<UserConfigContextType>(null!);
