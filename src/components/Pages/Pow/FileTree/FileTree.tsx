import landmarkFolders from "./LandmarkFolders";
import { useNaviHistoryStore } from "@/stores/NaviHistory";
import clsx from "clsx";

export function FileTree() {
	const shellFolders: string[] = landmarkFolders.shellFolders;

	const gotoArbitrary = useNaviHistoryStore((state) => state.gotoArbitrary);

	return (
		<div className="flex flex-col items-start">
			{shellFolders.map((folderName) => (
				<button
					key={folderName}
					onClick={() => gotoArbitrary(folderName)}
					className={clsx(
						"p-1 rounded-md transition-[background-color]",
					)}
				>
					{folderName}
				</button>
			))}
		</div>
	);
}
