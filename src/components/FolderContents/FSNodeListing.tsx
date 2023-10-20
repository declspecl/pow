import { FSNode } from "@/backend/FSNode";
import clsx from "clsx";
import { FileIcon, FolderIcon } from "lucide-react";

interface FSNodeListingProps {
    node: FSNode,
    onClick?: () => void,
    onDoubleClick?: () => void,
    className?: string
}

export default function FSNodeListing({ node, onClick, onDoubleClick, className }: FSNodeListingProps) {
    return (
        <button
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            className={clsx(
                "flex flex-row items-center gap-2 whitespace-nowrap",
                className,
            )}
        >
            {node.tag === "directory" ? (
                <>
                    <FolderIcon width="1em" height="1em" className="min-w-[1em] min-h-[1em]" />
                    <span>{node.data.path.split("\\").pop() + "/"}</span>
                </>
            ) : (
                <>
                    <FileIcon width="1em" height="1em" className="min-w-[1em] min-h-[1em]" />
                    <span>{node.data.name}</span>
                </>
            )}
        </button>
    );
}
