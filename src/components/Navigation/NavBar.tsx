"use client";

import React from "react";
import ThemeSelector from "../Theme/ThemeSelector";
import NextDirectoryButton from "./NextDirectoryButton";
import { useNaviHistoryStore } from "@/stores/NaviHistory";
import PreviousDirectoryButton from "./PreviousDirectoryButton";

export default function NavBar() {
	const history = useNaviHistoryStore((state) => state.history);
	const current = useNaviHistoryStore((state) => state.current);

	const gotoPrev = useNaviHistoryStore((state) => state.gotoPrev);
	const gotoNext = useNaviHistoryStore((state) => state.gotoNext);
	const gotoArbitrary = useNaviHistoryStore((state) => state.gotoArbitrary);

	return (
		<div className="p-2 flex flex-row items-center gap-4 border-b-4 border-b-background-shade-2">
			<div className="flex flex-row items-centeap-2">
				<PreviousDirectoryButton onClick={gotoPrev} disabled={current === 0} />

				<NextDirectoryButton onClick={gotoNext} disabled={current === history.length - 1} />
			</div>

			<div className="grow flex flex-row">
				<input
					type="text"
					onMouseLeave={() => gotoArbitrary("C:\\")}
					className="p-1 grow min-w-[80rex] bg-background text-text border border-text-shade-2 rounded-sm"
				/>
			</div>

			<div className="flex flex-row items-center">
				<ThemeSelector />
			</div>
		</div>
	);
}
