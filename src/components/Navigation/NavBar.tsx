import { useState } from "react";
import ThemeSelector from "../Theme/ThemeSelector";
import DirectoryNavButton from "./DirectoryNavButton";
import { useNaviHistoryStore } from "@/stores/NaviHistory";

export default function NavBar() {
	const [inputVal, setInputVal] = useState("");

	const naviHistory = useNaviHistoryStore();

	return (
		<div className="p-2 flex flex-row items-center gap-4 border-b-4 border-b-background-200">
			<div className="flex flex-row gap-2">
				<DirectoryNavButton
                    direction="left"
                    onClick={naviHistory.gotoPrevious}
                    disabled={naviHistory.current <= 0}
                />

				<DirectoryNavButton
                    direction="right"
                    onClick={naviHistory.gotoNext}
                    disabled={naviHistory.current >= naviHistory.history.length - 1}
                />
			</div>

			<div className="grow flex flex-row">
				<input
					type="text"
					onChange={(e) => setInputVal(e.target.value)}
					className="p-1 grow min-w-[80rex] rounded-sm"
				/>
			</div>

			<div className="flex flex-row items-center">
				<ThemeSelector />
			</div>
		</div>
	);
}
