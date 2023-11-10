import React, { createContext } from "react";
import { PowError } from "@/components/ErrorToast";

export const SetErrorLogContext = createContext< React.Dispatch< React.SetStateAction<PowError[]> > >(null!);
