import clsx from "clsx";
import NavBar from "@/components/Navigation/NavBar";
import FileTree from "@/components/FileTree/FileTree";
import FolderContents from "@/components/FolderContents/FolderContents";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useUserConfigStore, UserConfig } from "@/stores/UserConfig";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";

export default function Home() {
	const userConfigSetWidth = useUserConfigStore().setWidth;

	useEffect(() => {
		invoke<UserConfig>("get_user_config")
			.then((cfg) => {
				userConfigSetWidth(cfg.width ? cfg.width : 0);
			})
			.catch((err) => {
				console.log("error in getting user config");
				console.error(err);
			})
	}, [userConfigSetWidth])

	return (
		<main className="bg-background h-screen">
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
						<button
							onClick={() => {
								userConfigSetWidth(10);
							}}
							className={clsx(
								"text-text bg-background border-background-shade-1 rounded-sm p-1 transition-[transform]",
								"hover:scale-105"
							)}
						>
						increase width
						</button>

						<FolderContents />
					</Panel>
				</PanelGroup>
			</div>
		</main>
	);
}

