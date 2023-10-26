import React, { createContext } from "react";

export const ToastContext = createContext< React.MutableRefObject<React.ReactNode> >(null!);
