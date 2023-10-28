import { useRef, useState } from "react";
import * as ChaseView from "@/components/ChaseView";

// pages
import { Navbar } from "./Navbar/Navbar";
import { FileTree } from "./FileTree/FileTree";
import { FolderContents } from "./FolderContents/FolderContents";

export default function Pow() {
    const [errorEncountered, setErrorEncountered] = useState<string>("test test test");

    const lambRef = useRef<HTMLDivElement>(null!);

    return (
        <div className="w-auto h-full flex flex-col bg-background text-text font-inter">
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
        </div>
    );
}
