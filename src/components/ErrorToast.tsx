import clsx from "clsx";
import * as Toast from "@radix-ui/react-toast";
import { AlertCircleIcon, XIcon } from "lucide-react";

interface ErrorToastProps {
    errorLog: string[]
}

export function ErrorToast({ errorLog } : ErrorToastProps) {
    return (
        <>
            {Array.from({ length: errorLog.length }).map((_, i) => (
                <Toast.Root
                    key={`${errorLog[i]}-${i}`}
                    // TODO: add duration
                    className={clsx(
                        "p-2.5 flex flex-row justify-between items-center gap-2.5 bg-background-50 border border-background-250 rounded-lg",
                        "data-state-closed:animate-fadeOut",
                        "data-state-open:animate-slideInRTL data-state-open:animate-fadeIn"
                    )}
                >
                    <div className="flex flex-row items-center gap-2.5">
                        <Toast.Title>
                            <AlertCircleIcon className="w-7 h-7 stroke-ui-primary stroke-2" />
                        </Toast.Title>

                        <div className="w-[2px] self-stretch bg-background-250" />

                        <Toast.Description className="break-normal text-text">{errorLog[i]}</Toast.Description>
                    </div>

                    <Toast.Close className="rounded-lg transition-[background-color] hover:bg-background-150">
                        <XIcon className={clsx(
                            "m-1 w-5 h-5 stroke-ui-secondary",
                        )}/>
                    </Toast.Close>
                </Toast.Root>
            ))}
        </>
    );
}
