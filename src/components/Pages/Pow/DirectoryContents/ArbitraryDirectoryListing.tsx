// utils
import clsx from "clsx";

// components
import { FolderIcon } from "lucide-react";

interface ArbitraryDirectoryListingProps {
    directory: string,
    selected?: boolean,
    onClick?: () => void,
    onDoubleClick?: () => void,
    className?: string,
}

export function ArbitraryDirectoryListing({ directory, selected, onClick, onDoubleClick, className }: ArbitraryDirectoryListingProps) {
    return (
        <button
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            className={clsx(
                "flex flex-row items-center gap-1 bg-background whitespace-nowrap",
                { "bg-background-150" : selected },
                { "hover:bg-background-100" : !selected },
                className,
            )}
        >
            <FolderIcon width="1em" height="1em" className="min-w-[1em] min-h-[1em] stroke-ui-primary" />
            <span>{directory}</span>
        </button>
    );
}
