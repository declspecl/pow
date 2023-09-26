"use client";

import { invoke } from "@tauri-apps/api";
import landmarkFolders from "./LandmarkFolders";
import { useNaviHistoryStore } from "@/stores/NaviHistory";
import clsx from "clsx";

interface FileTreeProps {

}

export default function FileTree() {
	const shellFolders: string[] = landmarkFolders.shellFolders;

	const gotoArbitrary = useNaviHistoryStore((state) => state.gotoArbitrary);

	return (
		<div>
			{shellFolders.map((folderName) => (
				<button
					key={folderName}
					onClick={() => gotoArbitrary(folderName)}
					className={clsx(
						"p-1 bg-background text-text rounded-md transition-[background-color]",
						"hover:bg-background-shade-2"
					)}
				>
					{folderName}
				</button>
			))}
		</div>
	);
}
