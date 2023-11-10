import clsx from "clsx";
import * as Toast from "@radix-ui/react-toast";
import { AlertCircleIcon, XIcon } from "lucide-react";

export interface PowError {
    when: string,
    error: object
}

interface ErrorToastProps {
    errorLog: PowError[]
}

export function ErrorToast({ errorLog } : ErrorToastProps) {

    return (
        <>
            {errorLog.map((currentError, i) => (
                <Toast.Root
                    key={`${currentError}-${i}`}
                    // TODO: add duration
                    className={clsx(
                        "p-2.5 flex flex-row justify-between items-center gap-3 bg-background-50 border border-background-300 rounded-lg",
                        "data-state-closed:animate-fadeOut",
                        "data-state-open:animate-slideInRTL data-state-open:animate-fadeIn"
                    )}
                >
                    <div className="flex flex-row items-center gap-2.5">
                        <AlertCircleIcon className="w-8 h-8 stroke-ui-primary stroke-2" />

                        <div className="w-[2px] self-stretch bg-background-250" />

                        <div className="flex flex-col gap-2">
                            <Toast.Title className="text-xl font-semibold text-ui-secondary">
                                Error
                            </Toast.Title>

                            <Toast.Description className="flex flex-col gap-1 break-normal text-text">
                                <p>An error occured when {currentError.when}.</p>

                                <p className="text-ui-accent">
                                    {Object.keys(currentError.error)[0].toString()}: {Object.values(currentError.error)[0].toString()}
                                </p>
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
