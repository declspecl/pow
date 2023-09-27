"use client";

import clsx from "clsx";
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { useNaviHistoryStore } from "@/stores/NaviHistory";

export default function FolderContents() {
	const [contents, setContents] = useState<string[] | null>(null);
	const naviHistory = useNaviHistoryStore();

	useEffect(() => {
		invoke<string[]>("get_directory_contents", { currentDirectory: naviHistory.history[naviHistory.current] })
			.then((contents) => setContents(contents))
			.catch((error) => console.error(error));
	}, [naviHistory]);

	let displayFriendlyContents: React.ReactNode;

	if (contents === null)
	{
		displayFriendlyContents = <p>loading...</p>
	}
	else
	{
		if (contents.length === 0)
		{
			displayFriendlyContents = <p>empty!</p>
		}
		else
		{
			displayFriendlyContents = contents.map((item) => {
				return (
					<button
						key={item}
						className={clsx(
							"w-full text-left px-1 py-0.5 bg-background text-text rounded-sm",
							"hover:bg-background-shade-2"
						)}
					>
						{item}
					</button>
				);
			})
		}
	}

	return (
		<div
			className={clsx(
				"flex flex-col items-start",
			)}
		>
			{displayFriendlyContents}
		</div>
	);
}
