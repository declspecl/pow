import { useState } from "react";
import ThemeSelector from "../Theme/ThemeSelector";
import DirectoryNavButton from "./DirectoryNavButton";
import { useNaviHistoryStore } from "@/stores/NaviHistory";
import { invoke } from "@tauri-apps/api";
import { FSDirectory } from "@/backend/FSNode";

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

            <form
                className="grow flex flex-row"
                onSubmit={(e) => {
                    e.preventDefault();

                    invoke<FSDirectory>("access_directory", { directory: inputVal })
                        .then((directory) => {
                            naviHistory.gotoArbitrary(directory.path);

                            setInputVal("");
                        })
                        .catch((error) => console.error(error))
                }}
            >
                <input
                    type="text"
                    onChange={(e) => setInputVal(e.target.value)}
                    className="p-1 grow min-w-[80rex] rounded-sm"
                />
            </form>

            <div className="flex flex-row items-center">
                <ThemeSelector />
            </div>
        </div>
    );
}
