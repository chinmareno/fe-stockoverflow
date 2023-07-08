import { create } from "zustand";

interface IIsModalStockOpenStore {
  isAddModalStockOpenStore: boolean;
  setIsAddModalStockOpenStore: (isAddModalStockOpenStore: boolean) => void;
  isEditModalStockOpenStore: boolean;
  setIsEditModalStockOpenStore: (isEditModalStockOpenStore: boolean) => void;
  isDeleteModalStockOpenStore: boolean;
  setIsDeleteModalStockOpenStore: (isEditModalStockOpenStore: boolean) => void;
}

const useIsModalStockOpenStore = create<IIsModalStockOpenStore>((set) => ({
  isEditModalStockOpenStore: false,
  setIsEditModalStockOpenStore: (isEditModalStockOpenStore: boolean) =>
    set(() => ({ isEditModalStockOpenStore })),
  isAddModalStockOpenStore: false,
  setIsAddModalStockOpenStore: (isAddModalStockOpenStore: boolean) =>
    set(() => ({ isAddModalStockOpenStore })),
  isDeleteModalStockOpenStore: false,
  setIsDeleteModalStockOpenStore: (isDeleteModalStockOpenStore: boolean) =>
    set(() => ({ isDeleteModalStockOpenStore })),
}));

export default useIsModalStockOpenStore;
