import { create } from "zustand";

type Theme = "dark" | "light" | undefined;
interface IThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const useThemeStore = create<IThemeStore>((set) => ({
  theme: "light",
  setTheme: (theme) => set(() => ({ theme })),
}));
export default useThemeStore;
