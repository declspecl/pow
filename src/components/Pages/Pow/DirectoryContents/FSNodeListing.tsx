// utils
import clsx from "clsx";

// components
import { FileIcon, FolderIcon } from "lucide-react";

// backend
import { FSNode } from "@/backend/FSNode";
import { useAppearanceStateStore } from "@/stores/AppearanceSettings";

interface FSNodeListingProps {
    node: FSNode,
    selected?: boolean,
    onClick?: () => void,
    onDoubleClick?: () => void,
    className?: string,
}

export function FSNodeListing({ node, selected, onClick, onDoubleClick, className }: FSNodeListingProps) {
    const filledIcons = useAppearanceStateStore((state) => state.filledIcons);

    const contents = node.tag === "directory" ? node.data.path.split("\\").pop() : node.data.name;

    return (
        <button
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            className={clsx(
                "w-max grid grid-cols-[subgrid] col-start-1 col-span-7",
                { "bg-background-150" : selected },
                { "hover:bg-background-100" : !selected },
                className,
            )}
        >
            <div className="inline-flex justify-start flex-row items-center gap-1">
                {node.tag === "directory" ? (
                    <FolderIcon
                        width="1em"
                        height="1em"
                        className={clsx(
                            "min-w-[1em] min-h-[1em] stroke-folder",
                            { "fill-folder" : filledIcons }
                        )}
                    />
                ) : (
                    <FileIcon
                        width="1em"
                        height="1em"
                        className={clsx(
                            "min-w-[1em] min-h-[1em] stroke-file",
                            { "fill-file" : filledIcons }
                        )}
                    />
                )}

                <p className="overflow-ellipsis">{contents}</p>
            </div>

            <div>
                {node.data.info.len}
            </div>
        </button>
    );
}
