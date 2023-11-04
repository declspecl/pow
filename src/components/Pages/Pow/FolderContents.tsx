import { useState, useContext } from "react";
import { FSDirectory } from "@/backend/FSNode";
import { useNaviHistoryStore } from "@/stores/NaviHistory";
import { FSNodeListing } from "./FolderContents/FSNodeListing";
import { SetErrorLogContext } from "@/contexts/SetErrorLogContext";
import { access_directory, get_parent_directory } from "@/backend/Commands";
import { ArbitraryDirectoryListing } from "./FolderContents/ArbitraryDirectoryListing";

interface FolderContentsProps {
    currentFSDirectory: FSDirectory | null,
    setCurrentFSDirectory: React.Dispatch< React.SetStateAction< FSDirectory | null> >
}

export function FolderContents({ currentFSDirectory }: FolderContentsProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const setErrorLog = useContext(SetErrorLogContext);

    const naviHistory = useNaviHistoryStore();

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
                    .catch((error) => setErrorLog((errorLog) => [...errorLog, error]));
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
                    .catch((error) => setErrorLog((errorLog) => [...errorLog, error]));
            }}
        />
    ];

    if (currentFSDirectory !== null && currentFSDirectory.children.length > 0) {
        currentFSDirectory.children.forEach((fsNode, index) => {
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
                                .catch((error) => setErrorLog((errorLog) => [...errorLog, error]));
                        }
                    }}
                />
            );
        });
    }

    return (
        <div>
            {currentFSDirectory === null ? (
                <p>loading...</p>
            ) :  (
                <div className="flex flex-col">
                    {directoryListings}
                </div>
            )}
        </div>
    );
}
