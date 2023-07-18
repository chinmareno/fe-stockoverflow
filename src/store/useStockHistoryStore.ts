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
  setAction: ({
    name,
    type,
    length,
    quantity,
    newQuantity,
    cost,
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
      setAction: ({
        actionName,
        cost,
        length,
        name,
        type,
        quantity,
        newQuantity,
      }: StockHistoryState) =>
        set(() => ({
          actionName,
          cost,
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
