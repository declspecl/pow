import { useContext } from "react";
import * as Toast from "@radix-ui/react-toast";
import { ErrorLogContext } from "@/contexts/ErrorLogContext";

export function ErrorToast() {
    const { errorLog } = useContext(ErrorLogContext);

    return (
        <>
            {Array.from({ length: errorLog.length }).map((_, i) => (
                <Toast.Root key={errorLog[i]}>
                    <Toast.Title>Error Encountered</Toast.Title>
                    <Toast.Description>{errorLog[i]}</Toast.Description>
                </Toast.Root>
            ))}
        </>
    );
}
