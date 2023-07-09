import { create } from "zustand";

interface IIsLoadingStore {
  isLoginLoading: boolean;
  setIsLoginLoading: (isLoginLoading: boolean) => void;

  isSignupLoading: boolean;
  setIsSignupLoading: (isSignupLoading: boolean) => void;

  isChangeAccountLoading: boolean;
  setIsChangeAccountLoading: (isChangeAccountLoading: boolean) => void;

  isEditAccountLoading: boolean;
  setIsEditAccountLoading: (isEditAccountLoading: boolean) => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useLoadingStore = create<IIsLoadingStore>((set) => ({
  isLoginLoading: false,
  setIsLoginLoading: (isLoginLoading: boolean) =>
    set(() => ({ isLoginLoading })),

  isSignupLoading: false,
  setIsSignupLoading: (isSignupLoading: boolean) =>
    set(() => ({ isSignupLoading })),

  isChangeAccountLoading: false,
  setIsChangeAccountLoading: (isChangeAccountLoading: boolean) =>
    set(() => ({ isChangeAccountLoading })),

  isEditAccountLoading: false,
  setIsEditAccountLoading: (isEditAccountLoading: boolean) =>
    set(() => ({ isEditAccountLoading })),

  isLoading: false,
  setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
}));

export default useLoadingStore;
