import { create } from "zustand";

type Theme = "dark" | "light";
interface IThemeStore {
  theme: Theme | undefined;
  setTheme: (theme: Theme) => void;
}

const useThemeStoreItems = create<IThemeStore>((set) => ({
  theme: undefined,
  setTheme: (theme) => set(() => ({ theme })),
}));
export default useThemeStoreItems;
