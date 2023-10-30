"use client";

import FileTreeItem from "./FileTreeItem";
import { parsePath } from "@/backend/Utils";
import { useContext, useState, useEffect } from "react";
import { useNaviHistoryStore } from "@/stores/NaviHistory";
import { UserConfigContext } from "@/contexts/UserConfigContext";

export function FileTree() {
    const pinnedDirectories = useContext(UserConfigContext).pow.pinned_directories;
    const [parsedPinnedDirectories, setParsedPinnedDirectories] = useState<string[]>(null!);

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
                .catch((err) => {
                    console.error(err);
                })
        }

        setParsedPinnedDirectories(tmpParsedPinnedDirectories);

        return () => {
            isCancelled = true;
        }
    }, [pinnedDirectories])

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
