import clsx from "clsx";
import { useContext } from "react";
import { FolderIcon } from "lucide-react";

import { useNaviHistoryStore } from "@/stores/NaviHistory";

import { SetErrorLogContext } from "@/contexts/SetErrorLogContext";

import { BipartitePath } from "@/backend/BipartitePath";
import { access_directory } from "@/backend/Commands";

interface FileTreeItemProps {
    directory: BipartitePath,
    className?: string,
}

export function FileTreeItem({ directory, className }: FileTreeItemProps) {
    const naviHistoryGotoArbitrary = useNaviHistoryStore((state) => state.gotoArbitrary);

    const setErrorLog = useContext(SetErrorLogContext);

	return (
        <button
            onClick={() => {
                access_directory(directory.real_path)
                    .then((directory) => {
                        naviHistoryGotoArbitrary(directory.path);
                    })
                    .catch((error) => setErrorLog((errorLog) => [...errorLog, error]));
            }}
            className={clsx(
                "w-full flex flex-row items-center gap-1 bg-background whitespace-nowrap",
                "hover:bg-background-100",
                className,
            )}
        >
            <FolderIcon width="1em" height="1em" className="min-w-[1em] min-h-[1em] stroke-folder" />
            <span>{directory.display_friendly_path}</span>
        </button>
	);
}
