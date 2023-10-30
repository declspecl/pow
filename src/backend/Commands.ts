import { FSDirectory } from "./FSNode";
import { invoke } from "@tauri-apps/api";
import { UserConfig } from "./UserConfig";

// -----------------------
// - UserConfig commands -
// -----------------------

export async function serialize_user_config(user_config: UserConfig): Promise<void> {
    return invoke<void>("serialize_user_config", { user_config });
}

export async function deserialize_user_config(): Promise<UserConfig> {
    return invoke<UserConfig>("deserialize_user_config");
}

export async function get_default_user_config(): Promise<UserConfig> {
    return invoke<UserConfig>("get_default_user_config");
}

// -------------------
// - System commands -
// -------------------

export async function access_directory(directory: string): Promise<FSDirectory> {
    return invoke<FSDirectory>("access_directory", { directory: directory });
}

export async function get_parent_directory(path: string): Promise<FSDirectory> {
    return invoke<FSDirectory>("get_parent_directory", { path: path });
}

export async function resolve_environment_variable(environmentVariable: string): Promise<string> {
	return invoke<string>("resolve_environment_variable", { environment_variable: environmentVariable });
}

export async function parsePath(path: string): Promise<string> {
    return invoke<string>("parse_path", { path: path });
}
