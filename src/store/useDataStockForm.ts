import { create } from "zustand";

interface IDataStock {
  name: string;
  type: string;
  length: number;
  quantity: number;
  cost: number;
  setName: (name: string) => void;
  setType: (type: string) => void;
  setLength: (length: number) => void;
  setQuantity: (quantity: number) => void;
  setCost: (cost: number) => void;
}

const useDataStockForm = create<IDataStock>((set) => ({
  name: "",
  type: "",
  length: 0,
  quantity: 0,
  cost: 0,

  setName: (name: string) => set(() => ({ name })),
  setType: (type: string) => set(() => ({ type })),
  setLength: (length: number) => set(() => ({ length })),
  setQuantity: (quantity: number) => set(() => ({ quantity })),
  setCost: (cost: number) => set(() => ({ cost })),
}));

export default useDataStockForm;
