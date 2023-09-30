import { create } from "zustand";
import { invoke } from "@tauri-apps/api/tauri";

export interface UserConfig {
	width?: number,
	height?: number,
	theme?: string,
	windowTitle?: string,
	pinnedFolders?: string[],
	defaultFolder?: string,
	excludedExtensions?: string[],

	setWidth: (width: number) => void,
	setHeight: (height: number) => void
}

export const useUserConfigStore = create<UserConfig>()((set, get) => ({
	width: undefined,
	height: undefined,
	theme: undefined,
	windowTitle: undefined,
	pinnedFolders: undefined,
	defaultFolder: undefined,
	excludedExtensions: undefined,

	setWidth: async (width: number) => {
		const oldWidth = get().width;

		await invoke("set_user_config", { config: { width: (oldWidth ? oldWidth : 0) + width } })
		await invoke("serialize_user_config");

		set((state) => ({ width: (state.width ? state.width : 0) + width }))
	},
	setHeight: (width: number) => set(() => ({ width: width }))
}));
