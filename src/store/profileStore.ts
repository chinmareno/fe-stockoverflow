import { create } from "zustand";

export type Theme = "dark" | "light";

export interface IProfileStore {
  username: string;
  theme: Theme;
  image: string;
  setUsername: (username: string) => void;
  setTheme: (theme: Theme) => void;
  setImage: (image: string) => void;
}

const useProfileStore = create<IProfileStore>((set) => ({
  username: "",
  theme: "light",
  image: "",

  setUsername: (username) => set(() => ({ username })),
  setTheme: (theme) => set(() => ({ theme })),
  setImage: (image) => set(() => ({ image })),
}));
export default useProfileStore;
