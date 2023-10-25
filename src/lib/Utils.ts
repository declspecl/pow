export function isEnvironmentVariable(environmentVariable: string): boolean {
	return (environmentVariable.startsWith('%') && environmentVariable.endsWith('%')) || environmentVariable.startsWith('$');
}
