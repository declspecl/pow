import clsx from "clsx";
import React, { useContext } from "react";
import { DirectionContext } from "@/contexts/DirectionContext";

interface LambViewProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultSize: string,
    minSize?: string,
    maxSize?: string,
    children?: React.ReactNode,
    className?: string
}

const LambView = React.forwardRef<HTMLDivElement, LambViewProps>((props, ref) => {
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
                "overflow-auto",
                props.className
            )}
        >
            {props.children}
        </div>
    );
});

LambView.displayName = "LambView";

export default LambView;
