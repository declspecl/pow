import clsx from "clsx";
import * as Toast from "@radix-ui/react-toast";
import { AlertCircleIcon, XIcon } from "lucide-react";

interface ErrorToastProps {
    errorLog: object[]
}

export function ErrorToast({ errorLog } : ErrorToastProps) {
    return (
        <>
            {errorLog.map((currentError, i) => (
                <Toast.Root
                    key={`${currentError}-${i}`}
                    // TODO: add duration
                    className={clsx(
                        "p-2.5 flex flex-row justify-between items-center gap-3 bg-background-50 border border-background-250 rounded-lg",
                        "data-state-closed:animate-fadeOut",
                        "data-state-open:animate-slideInRTL data-state-open:animate-fadeIn"
                    )}
                >
                    <div className="flex flex-row items-center gap-2">
                        <AlertCircleIcon className="w-6 h-6 stroke-ui-primary stroke-2" />

                        <div className="w-[2px] self-stretch bg-background-250" />

                        <div className="flex flex-col gap-1">
                            <Toast.Title className="text-xl font-semibold text-ui-secondary">
                                An Error Occurred
                            </Toast.Title>

                            <Toast.Description className="break-normal text-text">
                                {Object.keys(currentError)[0].toString()}: {Object.values(currentError)[0].toString()}
                            </Toast.Description>
                        </div>
                    </div>

                    <Toast.Close className="rounded-lg transition-[background-color] hover:bg-background-150">
                        <XIcon className={clsx(
                            "m-1 w-6 h-6 stroke-text",
                        )}/>
                    </Toast.Close>
                </Toast.Root>
            ))}
        </>
    );
}
