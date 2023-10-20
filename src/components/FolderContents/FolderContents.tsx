import { invoke } from "@tauri-apps/api";
import { FolderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import FSNodeListing from "./FSNodeListing";
import { FSDirectory } from "@/backend/FSNode";
import { useNaviHistoryStore } from "@/stores/NaviHistory";

export default function FolderContents() {
    const [contents, setContents] = useState<FSDirectory | null>(null);
    const naviHistory = useNaviHistoryStore();

    useEffect(() => {
        let isCancelled = false;

        if (naviHistory.history[naviHistory.current]) {
            invoke<FSDirectory>("get_directory_contents", { directory: naviHistory.getCurrentDirectory() })
                .then((fsDirectory) => {
                    console.log(fsDirectory);

                    if (!isCancelled) {
                        setContents(fsDirectory);
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
            {contents === null ? (
                <p>loading...</p>
            ) : contents.children.length === 0 ? (
                <p>empty!</p>
            ) : (
                <div className="flex flex-col">
                    <button
                        className="flex flex-row items-center gap-2"
                        onDoubleClick={() => {
                            invoke<FSDirectory>("get_parent_directory", { path: naviHistory.getCurrentDirectory() })
                                .then((parentDir) => {
                                    naviHistory.gotoArbitrary(parentDir.path);
                                })
                                .catch((err) => {
                                    console.error(err);
                                })
                        }}
                    >
                        <FolderIcon width="1em" height="1em" className="min-w-[1em] min-h-[1em] " />
                        <span>../</span>
                    </button>

                    {contents.children.map((fsNode) => (
                        <FSNodeListing
                            node={fsNode}
                            onDoubleClick={() => {
                                if (fsNode.tag === "directory") {
                                    naviHistory.gotoArbitrary(fsNode.data.path);
                                }
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
