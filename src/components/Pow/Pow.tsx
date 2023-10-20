import { useRef } from "react";
import Fence from "../ChaseView/Fence";
import NavBar from "../Navigation/NavBar";
import FileTree from "../FileTree/FileTree";
import LambView from "../ChaseView/LambView";
import WolfView from "../ChaseView/WolfView";
import ChaseView from "../ChaseView/ChaseView";
import FolderContents from "../FolderContents/FolderContents";

export default function Pow() {
    const lambRef = useRef<HTMLDivElement>(null!);

	return (
		<div className="w-auto h-full flex flex-col">
			<NavBar />
		
            <ChaseView
                direction="horizontal"
                className="flex-1 w-auto bg-background overflow-y-hidden"
            >
                <LambView
                    ref={lambRef}
                    defaultSize="35ex"
                    minSize="30ex"
                    maxSize="calc(100% - 30ex)"
                    className="bg-background"
                >
                    <FileTree />
                </LambView>

                <Fence target={lambRef} className="bg-background-shade-2" />

                <WolfView className="bg-background text-text overflow-y-auto">
                    <FolderContents />
                </WolfView>
            </ChaseView>
		</div>
	);
}
