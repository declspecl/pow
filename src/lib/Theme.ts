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

export function setToSystemTheme() {
    setCurrentTheme(getSystemTheme());
}

export function getCurrentTheme(): Themes {
    const theme = localStorage.getItem("theme");

    const possibleThemes: string[] = Object.values(Themes) as string[];

    if (theme === null || !possibleThemes.includes(theme)) {
        setToSystemTheme();

        return getSystemTheme();
    }

    return theme as Themes;
}

export function setCurrentTheme(newTheme: Themes) {
    document.documentElement.setAttribute("data-theme", newTheme);

    localStorage.setItem("theme", newTheme);
}
