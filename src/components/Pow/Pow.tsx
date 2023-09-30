import NavBar from "../Navigation/NavBar";
import FileTree from "../FileTree/FileTree";
import FolderContents from "../FolderContents/FolderContents";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function Pow() {
	return (
		<div className="flex flex-col h-full">
			<NavBar />
		
			<PanelGroup
				direction="horizontal"
				autoSaveId="pow-split"
				units="pixels"
				className="grow bg-background"
			>
				<Panel
					defaultSize={300}
					minSize={50}
					className="bg-background"
				>
					<FileTree />
				</Panel>
		
				<PanelResizeHandle className="w-1 h-full bg-background-shade-2" />
		
				<Panel
					minSize={50}
					className="bg-background overflow-auto"
				>
					<FolderContents />
				</Panel>
			</PanelGroup>
		</div>
	);
}
