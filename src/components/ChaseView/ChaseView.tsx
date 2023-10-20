import clsx from "clsx";
import React  from "react";
import { DirectionContext } from "@/contexts/DirectionContext";

interface ChaseViewProps {
    direction: "vertical" | "horizontal",
    children: React.ReactNode,
    className?: string
}

export default function ChaseView({ direction, children, className }: ChaseViewProps) {
    const style: React.CSSProperties = (direction === "horizontal") ? {
        flexDirection: "row"
    } : {
        flexDirection: "column"
    };

    return (
        <div
            style={style}
            className={clsx(
                "flex",
                className
            )}
        >
            <DirectionContext.Provider value={direction}>
                {children}
            </DirectionContext.Provider>
        </div>
    )
}
