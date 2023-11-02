import clsx from "clsx";
import React, { useContext } from "react";
import { DirectionContext } from "@/contexts/DirectionContext";

// ----------------------------
// - ChaseView.Root component -
// ----------------------------

interface RootProps {
    direction: "vertical" | "horizontal",
    children: React.ReactNode,
    className?: string
}

export function Root({ direction, children, className }: RootProps) {
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

// ----------------------------
// - ChaseView.Lamb component -
// ----------------------------

interface LambProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultSize: string,
    minSize?: string,
    maxSize?: string,
    children?: React.ReactNode,
    className?: string
}

export const Lamb = React.forwardRef<HTMLDivElement, LambProps>((props, ref) => {
    const direction = useContext(DirectionContext);

    const style: React.CSSProperties = (direction === "horizontal") ? {
        height: "100%",
        width: props.defaultSize,
        minWidth: props.minSize,
        maxWidth: props.maxSize
    } : {
        width: "100%",
        height: props.defaultSize,
        minHeight: props.minSize,
        maxHeight: props.maxSize
    };

    return (
        <div
            ref={ref}
            style={style}
            className={clsx(
                props.className
            )}
        >
            {props.children}
        </div>
    );
});

// ----------------------------
// - ChaseView.Wolf component -
// ----------------------------

interface WolfProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode,
    className?: string
}

export function Wolf({ children, className }: WolfProps) {
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
                "flex-1",
                className
            )}
        >
            {children}
        </div>
    );
}

// -----------------------------
// - ChaseView.Fence component -
// -----------------------------

interface FenceProps {
    target: React.MutableRefObject<HTMLElement>,
    size?: string,
    className?: string
}

export function Fence({ target, size, className }: FenceProps) {
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

