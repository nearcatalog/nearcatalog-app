import { create } from "zustand";

interface SearchStore {
  searchKey: string;
  setSearchKey: (searchKey: string) => void;
  showInactive: boolean;
  setShowInactive: (showInactive: boolean) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchKey: "",
  setSearchKey: (searchKey) => set({ searchKey }),
  showInactive: false,
  setShowInactive: (showInactive) => set({ showInactive }),
}));
