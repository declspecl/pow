import clsx from "clsx";
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { useNaviHistoryStore } from "@/stores/NaviHistory";
import { FSNode, FSDirectory } from "@/backend/FSNode";

export default function FolderContents() {
    const [contents, setContents] = useState<FSDirectory | null>(null);
    const naviHistory = useNaviHistoryStore();

    useEffect(() => {
        let isCancelled = false;

        if (naviHistory.history[naviHistory.current]) {
            invoke<FSDirectory>("get_directory_contents", { current_directory: naviHistory.history[naviHistory.current] })
                .then((node) => {
                    console.log(node);

                    if (!isCancelled) {
                        setContents(node);
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
                <div className="overflow-scroll">
                    <button
                        onClick={() => {
                            invoke<string>("get_parent_directory", { path: naviHistory.history[naviHistory.current] })
                                .then((parentDir) => {
                                    naviHistory.gotoArbitrary(parentDir);
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

                    {contents.children.map((fsNode) => (
                        <button
                            key={fsNode.File?.name ?? fsNode.Directory?.path}
                            onClick={() => {
                                naviHistory.gotoArbitrary(fsNode.File?.name ?? fsNode.Directory?.path ?? "wat");
                            }}
                            className={clsx(
                                "font-inter",
                                "w-full text-left px-1 py-0.5 bg-background text-text rounded-sm",
                                "hover:bg-background-shade-2"
                            )}
                        >
                            {fsNode.File?.name ?? fsNode.Directory?.path ?? "wat"}
                        </button>
                    ))}
                </div>
            );
        }
    }

    return displayFriendlyContents;
}
