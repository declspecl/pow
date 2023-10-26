import clsx from "clsx";
import React, { useState } from "react";
import * as Toast from "@radix-ui/react-toast";

export interface ErrorToastHandle {
    show: () => void
}

interface ErrorToastProps {
    title: string,
    children: React.ReactNode
}

export const ErrorToast = React.forwardRef<ErrorToastHandle, ErrorToastProps>((props, forwardedRef) => {
    const [count, setCount] = useState(0);

    React.useImperativeHandle(forwardedRef, () => ({
        show: () => setCount((count) => count + 1)
    }));

    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <Toast.Root
                    key={`ErrorToast${i}`}
                    className={clsx(
                        "absolute p-2 flex flex-col border border-text rounded-md bg-background text-text"
                    )}
                    {...props}
                >
                    <Toast.Title>{props.title}</Toast.Title>

                    <Toast.Description>
                        {props.children}
                    </Toast.Description>
                </Toast.Root>
            ))}
        </>
    );
});
