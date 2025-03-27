import { create } from "zustand"

interface InvestorState {
    isOpen: boolean
    openModal: () => void
    closeModal: () => void
}

interface TabState {
    activeTab: "investors" | "companies";
    setActiveTab: (tab: "investors" | "companies") => void;
}

type CompanyStore = {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
};

export const useInvestorStore = create<InvestorState>((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}))

export const useTabStore = create<TabState>((set) => ({
    activeTab: "investors",
    setActiveTab: (tab) => set({ activeTab: tab }),
}));


export const useCompanyStore = create<CompanyStore>((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}));