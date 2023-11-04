import { FileTreeItem } from "./FileTree/FileTreeItem";
import { useContext, useState, useEffect } from "react";

import { UserConfigContext } from "@/contexts/UserConfigContext";
import { SetErrorLogContext } from "@/contexts/SetErrorLogContext";

import { BipartitePath } from "@/backend/BipartitePath";
import { get_bipartite_path } from "@/backend/Commands";

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
                .catch((error) => setErrorLog((errorLog) => [...errorLog, error]));
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
        <div className="flex flex-col items-start">
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
