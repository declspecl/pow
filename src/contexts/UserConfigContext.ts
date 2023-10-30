import { createContext } from "react";
import { UserConfig } from "@/backend/UserConfig";

export const UserConfigContext = createContext<UserConfig>(null!);
