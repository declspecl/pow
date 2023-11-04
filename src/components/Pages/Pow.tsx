import { useRef, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import * as ChaseView from "@/components/ChaseView";
import { ErrorToast } from "@/components/ErrorToast";

import { Navbar } from "./Pow/Navbar";
import { FileTree } from "./Pow/FileTree";
import { FolderContents } from "./Pow/FolderContents";

import { SetErrorLogContext } from "@/contexts/SetErrorLogContext";

import { FSDirectory } from "@/backend/FSNode";

// actual top level application component
export function Pow() {
    const [errorLog, setErrorLog] = useState<string[]>([]);
    const [currentDirectory, setCurrentDirectory] = useState<FSDirectory | null>(null);

    const lambRef = useRef<HTMLDivElement>(null!);

    return (
        <Toast.Provider swipeDirection="right">
            <div className="w-auto h-full flex flex-col bg-background text-text font-inter">
                <SetErrorLogContext.Provider value={setErrorLog}>
                    <Navbar />

                    <ChaseView.Root
                        direction="horizontal"
                        className="flex-1 w-auto overflow-y-hidden"
                    >
                        <ChaseView.Lamb
                            ref={lambRef}
                            defaultSize="35ex"
                            minSize="30ex"
                            maxSize="calc(100% - 30ex)"
                            className="p-1"
                        >
                            <FileTree
                                currentDirectory={currentDirectory}
                                setCurrentDirectory={setCurrentDirectory}
                            />
                        </ChaseView.Lamb>

                        <ChaseView.Fence target={lambRef} size="0.25rem" className="bg-background-200" />

                        <ChaseView.Wolf className="p-1 overflow-y-auto">
                            <FolderContents
                                currentDirectory={currentDirectory}
                                setCurrentDirectory={setCurrentDirectory}
                            />
                        </ChaseView.Wolf>
                    </ChaseView.Root>
                </SetErrorLogContext.Provider>

                <ErrorToast errorLog={errorLog} />

                <Toast.Viewport className="[--viewport-padding:_25px] p-[var(--viewport-padding)] fixed bottom-0 right-0 flex flex-col gap-2.5 w-[390px] max-w-[100vw] list-none z-[10] outline-none" />
            </div>
        </Toast.Provider>
    );
}
