import { invoke } from "@tauri-apps/api";

export function isEnvironmentVariable(environmentVariable: string): boolean {
	return (environmentVariable.startsWith('%') && environmentVariable.endsWith('%')) || environmentVariable.startsWith('$');
}

export async function resolveEnvironmentVariable(environmentVariable: string): Promise<string> {
	return invoke<string>("resolve_environment_variable", { environment_variable: environmentVariable });
}
