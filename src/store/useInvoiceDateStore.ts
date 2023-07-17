import { create } from "zustand";

interface IInvoiceDate {
  date: Date;
  setDate: (date: Date) => void;
}

const useInvoiceDateStore = create<IInvoiceDate>((set) => ({
  date: new Date(),
  setDate: (date: Date) => set(() => ({ date })),
}));

export default useInvoiceDateStore;
