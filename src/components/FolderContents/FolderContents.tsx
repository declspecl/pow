import { useEffect, useState } from "react";
import FSNodeListing from "./FSNodeListing";
import { FSDirectory } from "@/backend/FSNode";
import { useNaviHistoryStore } from "@/stores/NaviHistory";
import ArbitraryDirectoryListing from "./ArbitraryDirectoryListing";
import { access_directory } from "@/backend/Commands";

export default function FolderContents() {
    const [currentDirectory, setCurrentDirectory] = useState<FSDirectory | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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
                .catch((error) => console.error(error));
        }

        return () => {
            isCancelled = true;
        }
    }, [naviHistory]);

    const directoryListings: React.ReactNode[] = [
        <ArbitraryDirectoryListing
            key="."
            directory="."
            selected={selectedIndex === 0}
            onClick={() => {
                setSelectedIndex(0);
            }}
            onDoubleClick={() => {

            }}
        />,
        <ArbitraryDirectoryListing
            key=".."
            directory=".."
            selected={selectedIndex === 1}
            onClick={() => {
                setSelectedIndex(1);
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

    console.log(directoryListings);

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
