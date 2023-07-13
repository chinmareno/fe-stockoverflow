import { temporal } from "zundo";
import { create } from "zustand";

// define the store (typescript)
interface StoreState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}

// creates a store with undo/redo capability
const useTest = create<StoreState>()(
  temporal(
    (set) => ({
      bears: 100,
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
    }),
    { onSave: (state) => console.log("saved", state.bears) }
  )
);
import { useStore } from "zustand";
import type { TemporalState } from "zundo";

export const useTemporalStore = <T>(
  selector: (state: TemporalState<StoreState>) => T,
  equality?: (a: T, b: T) => boolean
) => useStore(useTest.temporal, selector, equality);

export default useTest;
