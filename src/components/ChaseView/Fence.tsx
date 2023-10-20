import clsx from "clsx";
import React from "react";
import { DirectionContext } from "@/contexts/DirectionContext";

interface FenceProps {
    target: React.MutableRefObject<HTMLElement>,
    size?: string,
    className?: string
}

export default function Fence({ target, size, className }: FenceProps) {
    const direction = React.useContext(DirectionContext);

    const style: React.CSSProperties = (direction === "horizontal") ? {
        height: "100%",
        width: size ? size : "4px"
    } : {
        width: "100%",
        height: size ? size : "4px"
    };

    function onFenceMouseDown() {
        document.addEventListener("mousemove", onFenceMouseMove);
        document.addEventListener("mouseup", onFenceMouseUp);

        document.documentElement.style.userSelect = "none";
        document.documentElement.style.pointerEvents = "none";
        document.documentElement.style.cursor = direction === "horizontal" ? "col-resize" : "row-resize";
    }

    function onFenceMouseMove(event: MouseEvent) {
        if (direction === "horizontal") {
            const newTargetWidth = event.clientX - target.current.offsetLeft;

            target.current.style.width = `${newTargetWidth}px`;
        }
        else {
            const newTargetHeight = event.clientY - target.current.offsetTop;

            target.current.style.height = `${newTargetHeight}px`;
        }
    }

    function onFenceMouseUp() {
        document.removeEventListener("mousemove", onFenceMouseMove);
        document.removeEventListener("mouseup", onFenceMouseUp);

        document.documentElement.style.userSelect = "auto";
        document.documentElement.style.pointerEvents = "auto";
        document.documentElement.style.cursor = "auto";
    }

    return (
        <div
            onMouseDown={onFenceMouseDown}
            style={style}
            className={clsx(
                { "hover:cursor-col-resize" : direction === "horizontal" },
                { "hover:cursor-row-resize" : direction === "vertical" },
                className
            )}
        />
    );
}
