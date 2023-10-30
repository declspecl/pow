import { isEnvironmentVariable } from "@/lib/Utils";
import { access_directory, resolve_environment_variable } from "./Commands";

export async function parsePath(path: string): Promise<string> {
    const pathComponents: string[] = path.replace("\\", "/").split("/");

    const parsedComponents: string[] = new Array(pathComponents.length).fill(null);

    for (let i = 0; i < pathComponents.length; i++) {
        if (isEnvironmentVariable(pathComponents[i])) {
            if (pathComponents[i] == "%USERHOME%" ||
                pathComponents[i] == "$USERHOME" ||
                pathComponents[i]  == "%HOME%" ||
                pathComponents[i] == "$HOME") {
                parsedComponents[i] = "~";
            }
            else {
                parsedComponents[i] = ((await access_directory(await resolve_environment_variable(pathComponents[i]))).path);
                parsedComponents[i].replace("\\", "/");
            }
        }
        else {
            parsedComponents[i] = (pathComponents[i]);
        }
    }

    return parsedComponents.join("/");
}
