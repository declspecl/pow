import { useRef } from "react";
import Fence from "@/components/ChaseView/Fence";
import LambView from "@/components/ChaseView/LambView";
import WolfView from "@/components/ChaseView/WolfView";
import ChaseView from "@/components/ChaseView/ChaseView";

// pages
import NavBar from "@/components/Pages/Navigation/NavBar";
import FileTree from "@/components/Pages/FileTree/FileTree";
import FolderContents from "@/components/Pages/FolderContents/FolderContents";

export default function Pow() {
    const lambRef = useRef<HTMLDivElement>(null!);

	return (
		<div className="w-auto h-full flex flex-col bg-background text-text font-inter">
			<NavBar />
		
            <ChaseView
                direction="horizontal"
                className="flex-1 w-auto overflow-y-hidden"
            >
                <LambView
                    ref={lambRef}
                    defaultSize="35ex"
                    minSize="30ex"
                    maxSize="calc(100% - 30ex)"
                    className="p-1"
                >
                    <FileTree />
                </LambView>

                <Fence target={lambRef} size="0.25rem" className="bg-background-200" />

                <WolfView className="p-1 overflow-y-auto">
                    <FolderContents />
                </WolfView>
            </ChaseView>
		</div>
	);
}
