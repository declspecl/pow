import { create } from "zustand";

export interface NaviHistory {
	history: string[],
	current: number
}

export interface NaviHistoryState extends NaviHistory {
	gotoArbitrary: (directory: string) => void,
	gotoNext: () => void,
	gotoPrev: () => void
}

export const useNaviHistoryStore = create<NaviHistoryState>()((set) => ({
	history: [],
	current: -1,
	gotoArbitrary: (directory: string) => set((state) => ({
		history: state.history.slice(0, state.current + 1).concat(directory),
		current: state.current + 1
	})),
	gotoNext: () => set((state) => ({ current: (state.current < state.history.length - 1) ? state.current + 1 : state.current })),
	gotoPrev: () => set((state) => ({ current: (state.current > 0) ? state.current - 1 : state.current }))
}))
