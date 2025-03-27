import { create } from "zustand";

interface FilterStore {
    isCollapsed: boolean;
    toggleCollapse: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
    isCollapsed: false,
    toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));