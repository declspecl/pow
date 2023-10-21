import { isEnvironmentVariable, resolveEnvironmentVariable } from "@/lib/Utils";
import { create } from "zustand";

export interface NaviHistory {
    history: string[],
    current: number
}

export interface NaviHistoryState extends NaviHistory {
    gotoArbitrary: (directory: string) => void,
    gotoNext: () => void,
    gotoPrevious: () => void,
    pop: () => void,
    reset: () => void,
    getCurrentDirectory: () => string
}

export const useNaviHistoryStore = create<NaviHistoryState>()((set, get) => ({
    history: [],
    current: -1,
    gotoArbitrary: async (directory: string) => {
        console.log(`goto arbitrary: ${directory}`);

        if (isEnvironmentVariable(directory)) {
            const resolvedDirectory = await resolveEnvironmentVariable(directory);

            console.log(resolvedDirectory);

            set((state) => ({
                history: state.history.slice(0, state.current + 1).concat(resolvedDirectory),
                current: state.current + 1
            }));
        }
        else {
            set((state) => ({
                history: state.history.slice(0, state.current + 1).concat(directory),
                current: state.current + 1
            }));
        }
    },
    gotoNext: () => {
        if (get().current < get().history.length - 1) {
            set((state) => ({ current: state.current + 1 }));
        }
    },
    gotoPrevious: () => {
        console.log("goto previous");

        if (get().current > 0) {
            set((state) => ({ current: state.current - 1 }));
        }
    },
    pop: () => {
        console.log("pop");

        set((state) => ({ current: state.current - 1, history: state.history.slice(0, state.current)}))
    },
    reset: () => {
        console.log("reset");

        set(() => ({ history: [], current: -1 }));
    },
    getCurrentDirectory: () => {
        return get().history[get().current];
    }
}))
