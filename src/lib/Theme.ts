export enum Themes {
    Light = "light",
    Dark = "dark",
    System = "system",
    TokyoNight = "tokyo-night",
    RosePine = "rose-pine"
}

export function getSystemTheme(): Themes {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? Themes.Dark : Themes.Light;
}

export function getLocalStorageTheme(): Themes {
    const theme = localStorage.getItem("theme");

    const possibleThemes: string[] = Object.values(Themes) as string[];

    if (theme === null || !possibleThemes.includes(theme)) {
        const systemTheme = getSystemTheme();
        
        setPageTheme(systemTheme);
        setLocalStorageTheme(systemTheme);

        return systemTheme;
    }

    return theme as Themes;
}

export function setLocalStorageTheme(newTheme: Themes) {
    localStorage.setItem("theme", newTheme);
}

export function setPageTheme(newTheme: Themes) {
    document.documentElement.setAttribute("data-theme", newTheme);
}
