import { FSNodeListing } from "./FSNodeListing";
import { FSDirectory } from "@/backend/FSNode";
import { useState, useEffect, useContext } from "react";
import { useNaviHistoryStore } from "@/stores/NaviHistory";
import { ArbitraryDirectoryListing } from "./ArbitraryDirectoryListing";
import { access_directory, get_parent_directory } from "@/backend/Commands";
import { SetErrorLogContext } from "@/contexts/SetErrorLogContext";

export function FolderContents() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [currentDirectory, setCurrentDirectory] = useState<FSDirectory | null>(null);

    const setErrorLog = useContext(SetErrorLogContext);

    const naviHistory = useNaviHistoryStore();

    useEffect(() => {
        let isCancelled = false;

        setCurrentDirectory(null);

        if (naviHistory.getCurrentDirectory()) {
            access_directory(naviHistory.getCurrentDirectory())
                .then((fsDirectory) => {
                    console.log(fsDirectory);

                    if (!isCancelled) {
                        setCurrentDirectory(fsDirectory);
                    }
                })
                .catch((error) => setErrorLog((errorLog) => [...errorLog, error]));
        }

        return () => {
            isCancelled = true;
        }
    }, [naviHistory, setErrorLog]);

    const directoryListings: React.ReactNode[] = [
        <ArbitraryDirectoryListing
            key="."
            directory="."
            selected={selectedIndex === 0}
            onClick={() => {
                setSelectedIndex(0);
            }}
            onDoubleClick={() => {
                console.log("double clicked");
                access_directory(naviHistory.getCurrentDirectory())
                    .then((directory) => {
                        naviHistory.gotoArbitrary(directory.path);
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }}
        />,
        <ArbitraryDirectoryListing
            key=".."
            directory=".."
            selected={selectedIndex === 1}
            onClick={() => {
                setSelectedIndex(1);
            }}
            onDoubleClick={() => {
                get_parent_directory(naviHistory.getCurrentDirectory())
                    .then((parent_directory) => {
                        naviHistory.gotoArbitrary(parent_directory.path);
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }}
        />
    ];

    if (currentDirectory !== null && currentDirectory.children.length > 0) {
        currentDirectory.children.forEach((fsNode, index) => {
            directoryListings.push(
                <FSNodeListing
                    key={fsNode.tag === "directory" ? fsNode.data.path + index : fsNode.data.name}
                    node={fsNode}
                    selected={selectedIndex === index + 2}
                    onClick={() => {
                        setSelectedIndex(index + 2)
                    }}
                    onDoubleClick={() => {
                        if (fsNode.tag === "directory") {
                            access_directory(fsNode.data.path)
                                .then((directory) => {
                                    naviHistory.gotoArbitrary(directory.path);
                                })
                                .catch((err) => {
                                    console.error(err);
                                })
                        }
                    }}
                />
            );
        });
    }

    return (
        <div>
            {currentDirectory === null ? (
                <p>loading...</p>
            ) :  (
                <div className="flex flex-col">
                    {directoryListings}
                </div>
            )}
        </div>
    );
}
