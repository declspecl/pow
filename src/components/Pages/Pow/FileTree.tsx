import { FSDirectory } from "@/backend/FSNode";
import { FileTreeItem } from "./FileTree/FileTreeItem";
import { useNaviHistoryStore } from "@/stores/NaviHistory";
import React, { useContext, useState, useEffect } from "react";
import { UserConfigContext } from "@/contexts/UserConfigContext";
import { SetErrorLogContext } from "@/contexts/SetErrorLogContext";
import { BipartitePath } from "@/backend/BipartitePath";
import { get_bipartite_path } from "@/backend/Commands";

interface FileTreeProps {
    currentDirectory: FSDirectory | null,
    setCurrentDirectory: React.Dispatch< React.SetStateAction< FSDirectory | null> >
}

export function FileTree({ currentDirectory, setCurrentDirectory }: FileTreeProps) {
    const userConfig = useContext(UserConfigContext).userConfig;
    const [pinnedDirectories, setPinnedDirectories] = useState<BipartitePath[]>([]);

    const setErrorLog = useContext(SetErrorLogContext);

    useEffect(() => {
        let isCancelled = false;

        for (const pinnedDirectory of userConfig.pow.pinned_directories) {
            get_bipartite_path(pinnedDirectory)
                .then((pinnedDirectory) => {
                    if (!isCancelled) {
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

    const gotoArbitrary = useNaviHistoryStore((state) => state.gotoArbitrary);

    return (
        <div>
            {pinnedDirectories ? (
                <div className="flex flex-col items-start">
                    {pinnedDirectories.map((pinnedDirectory) => (
                    <>
                        <p>{pinnedDirectory.display_friendly_path}</p>
                    </>
                    ))}
                </div>
            ) : (
                <p>
                    loading...
                </p>
            )}
        </div>
    );
}
