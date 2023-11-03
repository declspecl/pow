import { parsePath } from "@/backend/Utils";
import { FSDirectory } from "@/backend/FSNode";
import FileTreeItem from "./FileTree/FileTreeItem";
import { useNaviHistoryStore } from "@/stores/NaviHistory";
import React, { useContext, useState, useEffect } from "react";
import { UserConfigContext } from "@/contexts/UserConfigContext";
import { SetErrorLogContext } from "@/contexts/SetErrorLogContext";

interface FileTreeProps {
    currentDirectory: FSDirectory | null,
    setCurrentDirectory: React.Dispatch< React.SetStateAction< FSDirectory | null> >
}

export function FileTree({ currentDirectory, setCurrentDirectory }: FileTreeProps) {
    const pinnedDirectories = useContext(UserConfigContext).userConfig.pow.pinned_directories;
    const [parsedPinnedDirectories, setParsedPinnedDirectories] = useState<string[]>(null!);

    const setErrorLog = useContext(SetErrorLogContext);

    useEffect(() => {
        let isCancelled = false;

        const tmpParsedPinnedDirectories: string[] = [];

        for (const pinnedDirectory of pinnedDirectories) {
            parsePath(pinnedDirectory)
                .then((parsedPinnedDirectory) => {
                    if (!isCancelled) {
                        tmpParsedPinnedDirectories.push(parsedPinnedDirectory);
                    }
                })
                .catch((error) => setErrorLog((errorLog) => [...errorLog, error]));
        }

        setParsedPinnedDirectories(tmpParsedPinnedDirectories);

        return () => {
            isCancelled = true;
        }
    }, [pinnedDirectories, setErrorLog])

    const gotoArbitrary = useNaviHistoryStore((state) => state.gotoArbitrary);

    return (
        <div>
            {parsedPinnedDirectories ? (
                <div className="flex flex-col items-start">
                    {parsedPinnedDirectories.map((parsedPinnedDirectory) => (
                    <>
                        <p>{parsedPinnedDirectory}</p>
                        <FileTreeItem
                            key={parsedPinnedDirectory}
                            directory={parsedPinnedDirectory}
                            onClick={() => {}}
                        />
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
