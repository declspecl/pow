import { invoke } from "@tauri-apps/api";
import { FolderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import FSNodeListing from "./FSNodeListing";
import { FSDirectory } from "@/backend/FSNode";
import { useNaviHistoryStore } from "@/stores/NaviHistory";
import clsx from "clsx";

export default function FolderContents() {
    const [currentDirectory, setCurrentDirectory] = useState<FSDirectory | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const naviHistory = useNaviHistoryStore();

    useEffect(() => {
        let isCancelled = false;

        if (naviHistory.history[naviHistory.current]) {
            invoke<FSDirectory>("get_directory_contents", { directory: naviHistory.getCurrentDirectory() })
                .then((fsDirectory) => {
                    console.log(fsDirectory);

                    if (!isCancelled) {
                        setCurrentDirectory(fsDirectory);
                    }
                })
                .catch((error) => console.error(error));
        }

        return () => {
            isCancelled = true;
        }
    }, [naviHistory]);

    return (
        <div>
            {currentDirectory === null ? (
                <p>loading...</p>
            ) : currentDirectory.children.length === 0 ? (
                <p>empty!</p>
            ) : (
                <div className="flex flex-col">
                    <button
                        className={clsx(
                            "flex flex-row items-center gap-2 bg-background whitespace-nowrap",
                            { "bg-background-150" : selectedIndex === 0 },
                            { "hover:bg-background-100" : selectedIndex !== 0 }
                        )}
                        onClick={(e) => {
                            if (e.detail === 1) {
                                setSelectedIndex(0)
                            }
                            else if (e.detail >= 2) {
                                invoke<FSDirectory>("get_parent_directory", { path: naviHistory.getCurrentDirectory() })
                                    .then((parentDir) => {
                                        naviHistory.gotoArbitrary(parentDir.path);
                                    })
                                    .catch((err) => {
                                        console.error(err);
                                    })
                            }
                        }}
                    >
                        <FolderIcon width="1em" height="1em" className="min-w-[1em] min-h-[1em] stroke-accent" />
                        <span>../</span>
                    </button>

                    {currentDirectory.children.map((fsNode, index) => (
                        <FSNodeListing
                            key={fsNode.tag === "directory" ? fsNode.data.path : fsNode.data.name}
                            node={fsNode}
                            selected={selectedIndex === index + 1}
                            onClick={() => {
                                setSelectedIndex(index + 1)
                            }}
                            onDoubleClick={() => {
                                invoke<FSDirectory>("get_parent_directory", { path: naviHistory.getCurrentDirectory() })
                                    .then((parentDir) => {
                                        naviHistory.gotoArbitrary(parentDir.path);
                                    })
                                    .catch((err) => {
                                        console.error(err);
                                    })
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
