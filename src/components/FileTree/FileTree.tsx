import landmarkFolders from "./LandmarkFolders";
import { useNaviHistoryStore } from "@/stores/NaviHistory";
import clsx from "clsx";

export default function FileTree() {
	const shellFolders: string[] = landmarkFolders.shellFolders;

	const gotoArbitrary = useNaviHistoryStore((state) => state.gotoArbitrary);

	return (
		<div className="flex flex-col items-start">
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
