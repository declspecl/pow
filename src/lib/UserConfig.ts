export interface UserConfig {
	width: number,
	height: number,
	theme: string,
	windowTitle: string,
	pinnedFolders: string[],
	defaultFolder: string,
	excludedExtensions: string[],
}

export interface BackendUserConfig {
	width: number,
	height: number,
	theme: string,
	window_title: string,
	pinned_folders: string[],
	default_folder: string,
	excluded_extensions: string[],
}
