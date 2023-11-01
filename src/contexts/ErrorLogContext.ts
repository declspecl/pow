import React, { createContext } from "react";

interface ErrorLog {
    errorLog: string[],
    setErrorLog: React.Dispatch< React.SetStateAction<string[]> >
}

export const ErrorLogContext = createContext<ErrorLog>(null!);
