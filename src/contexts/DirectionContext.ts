import { createContext } from "react";

type Directions = "horizontal" | "vertical";

export const DirectionContext = createContext<Directions>(null!);
