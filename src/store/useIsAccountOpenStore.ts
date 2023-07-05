import { create } from "zustand";

interface IIsAccountOpenStore {
  isProfileOpen: boolean;
  setIsProfileOpen: (isAccountOpenStore: boolean) => void;
}

const useIsAccountOpenStore = create<IIsAccountOpenStore>((set) => ({
  isProfileOpen: false,
  setIsProfileOpen: (isProfileOpen: boolean) => set(() => ({ isProfileOpen })),
}));

export default useIsAccountOpenStore;
