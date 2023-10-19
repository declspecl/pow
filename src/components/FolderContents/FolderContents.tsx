import clsx from "clsx";
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { useNaviHistoryStore } from "@/stores/NaviHistory";
import { FSDirectory } from "@/backend/FSNode";

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

    let displayFriendlyContents: React.ReactNode;

    if (contents === null)
    {
        displayFriendlyContents = <p>loading...</p>
    }
    else
    {
        if (contents.children.length === 0)
        {
            displayFriendlyContents = <p>empty!</p>
        }
        else
        {
            displayFriendlyContents = (
                <div>
                    <button
                        onClick={() => {
                            invoke<FSDirectory>("get_parent_directory", { path: naviHistory.getCurrentDirectory() })
                                .then((parentDir) => {
                                    naviHistory.gotoArbitrary(parentDir.path);
                                })
                                .catch((err) => {
                                    console.error(err);
                                })
                        }}
                        className={clsx(
                            "font-inter",
                            "w-full text-left px-1 py-0.5 bg-background text-text rounded-sm",
                            "hover:bg-background-shade-2"
                        )}
                    >
                        ..
                    </button>

                    {contents.children.map((fsNode, index) => (
                        <button
                            key={fsNode.tag === "file" ? `${fsNode.data.name}-${index}` : fsNode.data.path}
                            onClick={() => {
                                naviHistory.gotoArbitrary(
                                    fsNode.tag === "file"
                                        ? naviHistory.getCurrentDirectory()
                                        : fsNode.data.path
                                );
                            }}
                            className={clsx(
                                "font-inter",
                                "w-full text-left px-1 py-0.5 bg-background text-text rounded-sm",
                                "hover:bg-background-shade-2"
                            )}
                        >
                            {fsNode.tag === "file"
                                ? fsNode.data.name
                                : fsNode.data.path.split("\\").pop()}
                        </button>
                    ))}
                </div>
            );
        }
    }

    return displayFriendlyContents;
}
