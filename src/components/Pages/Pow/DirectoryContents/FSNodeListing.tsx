// utils
import clsx from "clsx";

// components
import { FileIcon, FolderIcon } from "lucide-react";

// backend
import { FSNode } from "@/backend/FSNode";

interface FSNodeListingProps {
    node: FSNode,
    selected?: boolean,
    onClick?: () => void,
    onDoubleClick?: () => void,
    className?: string,
}

export function FSNodeListing({ node, selected, onClick, onDoubleClick, className }: FSNodeListingProps) {
    const contents = node.tag === "directory" ? node.data.path.split("\\").pop() : node.data.name;

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
            {node.tag === "directory" ? (
                <>
                    <FolderIcon width="1em" height="1em" className="min-w-[1em] min-h-[1em] stroke-folder" />
                    <span>{contents}</span>
                </>
            ) : (
                <>
                    <FileIcon width="1em" height="1em" className="min-w-[1em] min-h-[1em] stroke-file" />
                    <span>{contents}</span>
                </>
            )}
        </button>
    );
}
