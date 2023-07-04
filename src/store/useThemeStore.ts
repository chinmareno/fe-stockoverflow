import { create } from "zustand";
import { Theme } from "./profileStore";

interface IThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const useThemeStore = create<IThemeStore>((set) => ({
  theme: "light",
  setTheme: (theme) => set(() => ({ theme })),
}));
export default useThemeStore;
