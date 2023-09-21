"use client";

import React, { useReducer, Dispatch, SetStateAction } from "react";
import PreviousDirectoryButton from "./PreviousDirectoryButton";
import ThemeSelector from "../Theme/ThemeSelector";
import NextDirectoryButton from "./NextDirectoryButton";

type NavBarProps = {
	dispatch: (action: DirHistAction | DirHistAddAction) => void
}

type DirHist = {
	history: string[];
	current: number;
}

export default function NavBar() {
	const [dirHist, dispatch] = useReducer(dirHistReducer, {
		history: [],
		current: -1
	});

	return (
		<div className="p-2 flex flex-row items-center gap-4 border-b-4 border-b-background-shade-2">
			<div className="flex flex-row items-center gap-2">
				<PreviousDirectoryButton onClick={() => dispatch({ type: "previous" })} />
				<NextDirectoryButton onClick={() => dispatch({ type: "previous" })} />
			</div>

			<div className="grow flex flex-row">
				<input
					type="text"
					onMouseLeave={() => dispatch({ type: "push", historyEntry: `test ${dirHist.history.length}` })}
					className="p-1 grow min-w-[80rex] bg-background text-text border border-text-shade-2 rounded-sm"
				/>
			</div>

			<div className="flex flex-row items-center">
				<ThemeSelector />
			</div>
		</div>
	);
}

type DirHistActionType = "previous" | "next" | "push";

interface DirHistAction {
	type: DirHistActionType
}

interface DirHistAddAction extends DirHistAction {
	historyEntry: string
}

function dirHistReducer(dirHist: DirHist, action: DirHistAction | DirHistAddAction):  DirHist {
	switch (action.type) {
		case "previous": {
			const newIndex: number = (dirHist.current > 0) ? dirHist.current - 1 : dirHist.current;

			const newDirHist: DirHist = {
				history: dirHist.history,
				current: newIndex
			}

			console.log(`action: previous\nnewDirHist: ${JSON.stringify(newDirHist)}`);

			return newDirHist;
		}

		case "next": {
			const newIndex: number = (dirHist.current < dirHist.history.length - 1) ? dirHist.current + 1 : dirHist.current;

			const newDirHist: DirHist = {
				history: dirHist.history,
				current: newIndex
			}

			console.log(`action: next\nnewDirHist: ${JSON.stringify(newDirHist)}`);

			return newDirHist;
		}

		case "push": {
			const newDirHist: DirHist = dirHist;

			if (newDirHist.current !== dirHist.history.length - 1) {
				for (let i = newDirHist.history.length - 1; i > newDirHist.current; i--) {
					newDirHist.history.pop();
				}
			}

			newDirHist.history.push((action as DirHistAddAction).historyEntry);
			newDirHist.current += 1;

			console.log(`action: push\nnewDirHist: ${JSON.stringify(newDirHist)}`);

			return newDirHist;		}
	}
}
