// utils
import { useRef, useState, useEffect } from "react";

// components
import { Navbar } from "./Pow/Navbar";
import { FileTree } from "./Pow/FileTree";
import * as Toast from "@radix-ui/react-toast";
import * as ChaseView from "@/components/ChaseView";
import { ErrorToast } from "@/components/ErrorToast";
import { DirectoryContents } from "./Pow/DirectoryContents";

// backend
import { FSDirectory } from "@/backend/FSNode";
import { access_directory } from "@/backend/Commands";

// stores
import { useNaviHistoryStore } from "@/stores/NaviHistory";

// contexts
import { SetErrorLogContext } from "@/contexts/SetErrorLogContext";

// actual top level application component
export function Pow() {
    // global error log, used as value in context
    const [errorLog, setErrorLog] = useState<object[]>([]);

    // total navi history access
    const naviHistory = useNaviHistoryStore();

    // global current FSDirectory, given to FileTree and DirectoryContents
    const [currentFSDirectory, setCurrentFSDirectory] = useState<FSDirectory | null>(null);

    const lambRef = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        let isCancelled = false;

        setCurrentFSDirectory(null);

        if (naviHistory.getCurrentDirectory()) {
            access_directory(naviHistory.getCurrentDirectory())
                .then((fsDirectory) => {
                    if (!isCancelled)
                        setCurrentFSDirectory(fsDirectory);
                })
                .catch((error) => setErrorLog((errorLog) => [...errorLog, error]));
        }

        return () => {
            isCancelled = true;
        }
    }, [naviHistory]);

    // ----------
    // - render -
    // ----------

    return (
        <Toast.Provider swipeDirection="right">
            <div className="w-auto h-full flex flex-col bg-background text-text">
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
                            <FileTree />
                        </ChaseView.Lamb>

                        <ChaseView.Fence target={lambRef} size="0.25rem" className="bg-background-200" />

                        <ChaseView.Wolf className="p-1 overflow-y-auto">
                            <DirectoryContents
                                currentFSDirectory={currentFSDirectory}
                                setCurrentFSDirectory={setCurrentFSDirectory}
                            />
                        </ChaseView.Wolf>
                    </ChaseView.Root>
                </SetErrorLogContext.Provider>

                <ErrorToast errorLog={errorLog} />

                <Toast.Viewport className="[--viewport-padding:_25px] p-[var(--viewport-padding)] fixed bottom-0 right-0 flex flex-col gap-2.5 min-w-[200px] w-[500px] max-w-[100vw] list-none z-[10] outline-none" />
            </div>
        </Toast.Provider>
    );
}
