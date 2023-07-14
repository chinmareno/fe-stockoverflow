import { temporal } from "zundo";
import { create } from "zustand";

// define the store (typescript)
type ActionName = "create" | "edit" | "delete";
type StockHistoryState = {
  name: string;
  type: string;
  length: number;
  quantity: number;
  newQuantity?: number;
  cost: number;
  date: string;
  actionName: ActionName;
};
interface IStockHistory {
  actionName: ActionName;
  name: string;
  type: string;
  length: number;
  quantity: number;
  newQuantity?: number;
  cost: number;
  date: string;
  setAction: ({
    name,
    type,
    length,
    quantity,
    newQuantity,
    cost,
    date,
    actionName,
  }: StockHistoryState) => void;
}

// creates a store with undo/redo capability
const useStockHistoryStore = create<IStockHistory>()(
  temporal(
    (set) => ({
      actionName: "create",
      name: "",
      type: "",
      length: 0,
      quantity: 0,
      newQuantity: 0,
      cost: 0,
      date: "",
      setAction: ({
        actionName,
        cost,
        date,
        length,
        name,
        type,
        quantity,
        newQuantity,
      }: StockHistoryState) =>
        set(() => ({
          actionName,
          cost,
          date,
          length,
          name,
          quantity,
          newQuantity,
          type,
        })),
    }),
    { limit: 50 }
  )
);

import { useStore } from "zustand";
import type { TemporalState } from "zundo";

export const useTemporalStockHistory = <T>(
  selector: (state: TemporalState<IStockHistory>) => T,
  equality?: (a: T, b: T) => boolean
) => useStore(useStockHistoryStore.temporal, selector, equality);

export default useStockHistoryStore;
