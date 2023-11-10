// utils
import { useContext, useState, useEffect } from "react";

// components
import { FileTreeItem } from "./FileTree/FileTreeItem";

// backend
import { BipartitePath } from "@/backend/BipartitePath";
import { get_bipartite_path } from "@/backend/Commands";

// contexts
import { UserConfigContext } from "@/contexts/UserConfigContext";
import { SetErrorLogContext } from "@/contexts/SetErrorLogContext";

export function FileTree() {
    const [pinnedDirectories, setPinnedDirectories] = useState<BipartitePath[]>([]);

    const setErrorLog = useContext(SetErrorLogContext);
    const userConfig = useContext(UserConfigContext).userConfig;

    useEffect(() => {
        let isCancelled = false;

        // attempting to load all pinned directories from user config
        for (const pinnedDirectory of userConfig.pow.pinned_directories) {
            get_bipartite_path(pinnedDirectory)
                .then((pinnedDirectory) => {
                    if (!isCancelled) {
                        // incrementally set pinned directories
                        setPinnedDirectories((pinnedDirectories) => [...pinnedDirectories, pinnedDirectory]);
                    }
                })
                .catch((error) => setErrorLog((errorLog) => [
                    ...errorLog,
                    {
                        when: `trying to parse the pinned directory "${pinnedDirectory}"`,
                        error
                    }
                ]));
        }

        return () => {
            isCancelled = true;

            setPinnedDirectories([]);
        }
    }, [userConfig, setErrorLog])
    
    // -----------------------------------------------
    // - render logic: loading or pinned directories -
    // -----------------------------------------------

    return (
        <div className="min-w-max w-full flex flex-col">
            {pinnedDirectories ? (
                <>
                    {pinnedDirectories.map((pinnedDirectory) => (
                        <FileTreeItem
                            key={pinnedDirectory.real_path}
                            directory={pinnedDirectory}
                        />
                    ))}
                </>
            ) : (
                <p>
                    loading...
                </p>
            )}
        </div>
    );
}
