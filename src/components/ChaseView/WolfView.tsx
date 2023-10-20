import clsx from "clsx";
import React, { useContext } from "react";
import { DirectionContext } from "@/contexts/DirectionContext";

interface WolfViewProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode,
    className?: string
}

export default function WolfView({ children, className }: WolfViewProps) {
    const direction = useContext(DirectionContext);

    const style: React.CSSProperties = (direction === "horizontal") ? {
        height: "100%"
    } : {
        width: "100%"
    };

    return (
        <div
            style={style}
            className={clsx(
                "grow overflow-auto",
                className
            )}
        >
            {children}
        </div>
    );
};
