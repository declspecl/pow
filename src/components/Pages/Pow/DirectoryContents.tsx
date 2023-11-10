// utils
import { useState, useContext } from "react";

// components
import { FSNodeListing } from "./DirectoryContents/FSNodeListing";
import { ArbitraryDirectoryListing } from "./DirectoryContents/ArbitraryDirectoryListing";

// backend
import { FSDirectory } from "@/backend/FSNode";
import { access_directory, get_parent_directory } from "@/backend/Commands";

// stores
import { useNaviHistoryStore } from "@/stores/NaviHistory";

// contexts
import { SetErrorLogContext } from "@/contexts/SetErrorLogContext";

interface DirectoryContentsProps {
    currentFSDirectory: FSDirectory | null,
    setCurrentFSDirectory: React.Dispatch< React.SetStateAction< FSDirectory | null> >
}

export function DirectoryContents({ currentFSDirectory }: DirectoryContentsProps) {
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
                        naviHistory.gotoArbitrary(directory.path)
                            .catch((error) => setErrorLog((errorLog) => [
                                ...errorLog,
                                {
                                    when: `trying to navigate to the directory "${directory.path}"`,
                                    error
                                }
                            ]));
                    })
                    .catch((error) => setErrorLog((errorLog) => [
                        ...errorLog,
                        {
                            when: `trying to access the directory "${naviHistory.getCurrentDirectory()}"`,
                            error
                        }
                    ]));
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
                        naviHistory.gotoArbitrary(parent_directory.path)
                            .catch((error) => setErrorLog((errorLog) => [
                                ...errorLog,
                                {
                                    when: `trying to navigate to the directory "${parent_directory.path}"`,
                                    error
                                }
                            ]));
                    })
                    .catch((error) => setErrorLog((errorLog) => [
                        ...errorLog,
                        {
                            when: `trying to get the parent directory of "${naviHistory.getCurrentDirectory()}"`,
                            error
                        }
                    ]));
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
                                    naviHistory.gotoArbitrary(directory.path)
                                        .catch((error) => setErrorLog((errorLog) => [
                                            ...errorLog,
                                            {
                                                when: `trying to navigate to the directory "${directory.path}"`,
                                                error
                                            }
                                        ]));
                                })
                                .catch((error) => setErrorLog((errorLog) => [
                                    ...errorLog,
                                    {
                                        when: `trying to access the directory "${fsNode.data.path}"`,
                                        error
                                    }
                                ]));
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
