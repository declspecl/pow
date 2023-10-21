import clsx from "clsx";
import { FolderIcon } from "lucide-react";

interface ParentDirectoryListingProps {
    selected?: boolean,
    onClick?: () => void,
    onDoubleClick?: () => void,
    className?: string,
}

export default function ParentDirectoryListing({ selected, onClick, onDoubleClick, className }: ParentDirectoryListingProps) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "flex flex-row items-center gap-2 bg-background whitespace-nowrap",
                { "bg-background-150" : selected },
                { "hover:bg-background-100" : !selected },
                className,
            )}
        >
            <FolderIcon width="1em" height="1em" className="min-w-[1em] min-h-[1em] stroke-primary" />
            <span>..</span>
        </button>
    );
}
