"use client";

import React, { useState, Dispatch, SetStateAction } from "react";
import ThemeSelector from "@/components/Theme/ThemeSelector";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import NavBar from "@/components/Navigation/NavBar";

export default function Home() {
	const [currentDirectory, setCurrentDirectory] = useState("%HOMEPATH%");

	return (
		<main className="bg-background h-screen">
			<div className="flex flex-col h-full">
				<NavBar />

				<PanelGroup
					direction="horizontal"
					autoSaveId="pow-split"
					className="grow bg-background"
				>
					<Panel
						defaultSize={17.5}
						minSize={7.5}
						maxSize={92.5}
						className="bg-background"
					>

					</Panel>

					<PanelResizeHandle className="w-1 h-full bg-background-shade-2" />

					<Panel
						defaultSize={82.5}
						minSize={7.5}
						maxSize={92.5}
						className="bg-background"
					>

					</Panel>
				</PanelGroup>
			</div>
		</main>
	);
}
