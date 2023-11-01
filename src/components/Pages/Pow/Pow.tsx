import { useRef, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import * as ChaseView from "@/components/ChaseView";
import { ErrorToast } from "@/components/ErrorToast/ErrorToast";

// pages
import { Navbar } from "./Navbar/Navbar";
import { FileTree } from "./FileTree/FileTree";
import { FolderContents } from "./FolderContents/FolderContents";
import { ErrorLogContext } from "@/contexts/ErrorLogContext";

export default function Pow() {
    const [errorLog, setErrorLog] = useState<string[]>([]);

    const lambRef = useRef<HTMLDivElement>(null!);

    return (
        <Toast.Provider>
            <div className="w-auto h-full flex flex-col bg-background text-text font-inter">
                <ErrorLogContext.Provider value={{ errorLog, setErrorLog }}>
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
                            <FolderContents />
                        </ChaseView.Wolf>
                    </ChaseView.Root>
                </ErrorLogContext.Provider>

                <ErrorToast />

                <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
            </div>
        </Toast.Provider>
    );
}
