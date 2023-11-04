// utils
import clsx from "clsx";

// components
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

interface DirectoryNavProps {
    direction: "left" | "right",
    onClick: () => void,
    disabled: boolean
}

export function DirectoryNavButton({ direction, onClick, disabled }: DirectoryNavProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                "p-1 rounded-lg bg-background transition-[background-color]",
                { "hover:bg-background-100" : !disabled }
            )}
        >
            {direction === "left" ? (
                <ArrowLeftIcon className={clsx(
                    "transition-[stroke]",
                    { "opacity-50" : disabled }
                )}/>
            ) : (
                <ArrowRightIcon className={clsx(
                    "transition-[stroke]",
                    { "opacity-50" : disabled }
                )}/>
            )}
        </button>
    );
}
