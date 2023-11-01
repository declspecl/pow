import React, { createContext } from "react";

export const SetErrorLogContext = createContext< React.Dispatch< React.SetStateAction<string[]> > >(null!);
