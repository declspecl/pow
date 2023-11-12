import clsx from "clsx";
import { useState, useEffect } from "react";
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
    const [errorLogExpanded, setErrorLogExpanded] = useState<boolean[]>([]);

    useEffect(() => {
        setErrorLogExpanded((prevErrorLogExpanded) => [...prevErrorLogExpanded, false]);
    }, [errorLog]);

    return (
        <>
            {errorLog.map((currentError, i) => (
                <Toast.Root
                    key={`${currentError}-${i}`}
                    // TODO: add duration
                    className={clsx(
                        "p-2.5 flex flex-row justify-between items-center gap-2.5 bg-background-50 border border-background-300 rounded-md",
                        "data-state-closed:animate-fadeOut",
                        "data-state-open:animate-slideInRTL data-state-open:animate-fadeIn"
                    )}
                >
                    <AlertCircleIcon className="min-w-[2rem] min-h-[2rem] stroke-ui-primary stroke-2" />
                    
                    <div className="w-[2px] self-stretch bg-background-250" />

                    <div className="flex flex-col gap-2">
                        <Toast.Title className="text-2xl font-semibold text-ui-secondary">
                            Error
                        </Toast.Title>

                        <Toast.Description className="flex flex-col gap-1 break-normal text-text">
                            <p>An error occured when {currentError.when}.</p>

                            {errorLogExpanded[i] && (
                                <p className="text-ui-accent font-mono">
                                    {`${Object.keys(currentError.error)[0].toString()}: ${Object.values(currentError.error)[0].toString()}`}
                                </p>
                            )}

                            <button onClick={() => {
                                setErrorLogExpanded((prevErrorLogExpanded) => {
                                    const newErrorLogExpanded = [...prevErrorLogExpanded];

                                    newErrorLogExpanded[i] = !newErrorLogExpanded[i];

                                    return newErrorLogExpanded;
                                });
                            }}>
                                {errorLogExpanded[i] ? (
                                    <span>Show less</span>
                                ) : (
                                    <span>Show more</span>
                                )}
                            </button>

                        </Toast.Description>
                    </div>

                    <Toast.Close className="rounded-lg transition-[background-color] hover:bg-background-150">
                         <XIcon className={clsx(
                             "m-1 w-5 h-5 stroke-text",
                         )}/>
                    </Toast.Close>
                </Toast.Root>
            ))}
        </>
    );
}
