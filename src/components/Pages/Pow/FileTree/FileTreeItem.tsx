// utils
import clsx from "clsx";
import { useContext } from "react";

// components
import { FolderIcon } from "lucide-react";

// backend
import { access_directory, parse_path } from "@/backend/Commands";
import { BipartitePath } from "@/backend/BipartitePath";

// stores
import { useNaviHistoryStore } from "@/stores/NaviHistory";

// contexts
import { SetErrorLogContext } from "@/contexts/SetErrorLogContext";

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
                parse_path(directory.real_path)
                    .then((parsedPath) => {
                        access_directory(parsedPath)
                            .then((directory) => naviHistoryGotoArbitrary(directory.path))
                            .catch((error) => setErrorLog((errorLog) => [
                                ...errorLog,
                                {
                                    when: `trying to access the directory "${directory.real_path}"`,
                                    error
                                }
                            ]));
                    })
                    .catch((error) => setErrorLog((errorLog) => [
                        ...errorLog,
                        {
                            when: `trying to parse the path "${directory.real_path}"`,
                            error
                        }
                    ]));
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
