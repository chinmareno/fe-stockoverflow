import { create } from "zustand";

interface IIsMenuOpenStore {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

const useIsMenuOpenStore = create<IIsMenuOpenStore>((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (isMenuOpen: boolean) => set(() => ({ isMenuOpen })),
}));

export default useIsMenuOpenStore;
