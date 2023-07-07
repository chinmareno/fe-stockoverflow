import { create } from "zustand";

interface IIsEditModalStockOpenStore {
  isEditModalStockOpenStore: boolean;
  setIsEditModalStockOpenStore: (isEditModalStockOpenStore: boolean) => void;
}

const useIsEditModalStockOpenStore = create<IIsEditModalStockOpenStore>(
  (set) => ({
    isEditModalStockOpenStore: false,
    setIsEditModalStockOpenStore: (isEditModalStockOpenStore: boolean) =>
      set(() => ({ isEditModalStockOpenStore })),
  })
);

export default useIsEditModalStockOpenStore;
