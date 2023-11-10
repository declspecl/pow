import { create } from "zustand";

export interface AppearanceState {
    theme: string,
    fontSize: number,
    filledIcons: boolean,

    setTheme: (theme: string) => void,
    setFontSize: (fontSize: number) => void,
    setFilledIcons: (filledIcons: boolean) => void,
}

export interface AppearanceActions {
    setTheme: (theme: string) => void,
    setFontSize: (fontSize: number) => void,
    setFilledIcons: (filledIcons: boolean) => void,
}

export const useAppearanceStateStore = create<AppearanceState>()((set) => ({
    // if no theme is set in localstorage, use system default
    theme: localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark").matches ? "dark" : "light"),
    // if no font size is set, use 16
    fontSize: parseInt(localStorage.getItem("fontSize") || "16"),
    // if no filled icons is set, use false
    filledIcons: localStorage.getItem("filledIcons") === "true" ? true : false,

    setTheme: (theme: string) => {
        localStorage.setItem("theme", theme);

        set({ theme: theme });
    },
    setFontSize: (fontSize: number) => {
        localStorage.setItem("fontSize", fontSize.toString());

        set({ fontSize: fontSize });
    },
    setFilledIcons: (filledIcons: boolean) => {
        localStorage.setItem("filledIcons", filledIcons.toString());

        set({ filledIcons: filledIcons });
    }
}));
