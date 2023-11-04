// utils
import { useState, useContext } from "react";

// components
import ThemeSelector from "@/components/Theme/ThemeSelector";
import { DirectoryNavButton } from "./Navbar/DirectoryNavButton";

// backend
import { access_directory } from "@/backend/Commands";

// stores
import { useNaviHistoryStore } from "@/stores/NaviHistory";

// contexts
import { SetErrorLogContext } from "@/contexts/SetErrorLogContext";

export function Navbar() {
    const [inputVal, setInputVal] = useState("");

    const naviHistory = useNaviHistoryStore();

    const setErrorLog = useContext(SetErrorLogContext);

    return (
        <div className="p-2 flex flex-row items-center gap-4 border-b-4 border-b-background-200 bg-background z-20">
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

                    access_directory(inputVal)
                        .then((directory) => {
                            naviHistory.gotoArbitrary(directory.path);

                            setInputVal("");
                        })
                        .catch((error) => setErrorLog((errorLog) => [...errorLog, error]));
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
