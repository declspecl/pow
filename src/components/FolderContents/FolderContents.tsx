import { invoke } from "@tauri-apps/api";
import { FolderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import FSNodeListing from "./FSNodeListing";
import { FSDirectory } from "@/backend/FSNode";
import { useNaviHistoryStore } from "@/stores/NaviHistory";
import clsx from "clsx";
import ParentDirectoryListing from "./ParentDirectoryListing";

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
                <ParentDirectoryListing
                    selected={selectedIndex === 0}
                    onClick={() => {
                        setSelectedIndex(0);
                    }}
                />
            ) : (
                <div className="flex flex-col">
                    <ParentDirectoryListing
                        selected={selectedIndex === 0}
                        onClick={() => {
                            setSelectedIndex(0);
                        }}
                    />

                    {currentDirectory.children.map((fsNode, index) => (
                        <FSNodeListing
                            key={fsNode.tag === "directory" ? fsNode.data.path : fsNode.data.name}
                            node={fsNode}
                            selected={selectedIndex === index + 1}
                            onClick={() => {
                                setSelectedIndex(index + 1)
                            }}
                            onDoubleClick={() => {
                                if (fsNode.tag === "directory") {
                                    setCurrentDirectory(null);

                                    invoke<FSDirectory>("get_directory_contents", { directory: fsNode.data.path })
                                        .then((directory) => {
                                            naviHistory.gotoArbitrary(directory.path);
                                        })
                                        .catch((err) => {
                                            console.error(err);
                                        })
                                }
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
