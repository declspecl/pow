export function isEnvironmentVariable(environmentVariable: string): boolean {
    return (environmentVariable.startsWith("%") && environmentVariable.endsWith("%")) || environmentVariable.startsWith("$");
}

export function sanitizePath(path: string): string {
    let sanitizedPath = path.replace("\\", "/");

    while (sanitizedPath[sanitizedPath.length - 1] == "/") {
        sanitizedPath = sanitizedPath.slice(0, sanitizedPath.length - 1);
    }

    return sanitizedPath;
}
