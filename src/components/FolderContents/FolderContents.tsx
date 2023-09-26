"use client";

import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { useNaviHistoryStore } from "@/stores/NaviHistory";

export default function FolderContents() {
	const [contents, setContents] = useState<string[] | null>(null);
	const currentDirectory = useNaviHistoryStore((state) => state.history[state.current]);

	useEffect(() => {
		console.log("DOING IT");

		invoke<string[]>("get_directory_contents", { currentDirectory: currentDirectory })
			.then((contents) => {
				setContents(contents);
			})
			.catch((error) => {
				console.error(error);
			})
	}, [currentDirectory])

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
					<p key={item}>{item}</p>
				);
			})
		}
	}

	return (
		<div className="text-text scroll-auto">
			{displayFriendlyContents}
		</div>
	);
}
