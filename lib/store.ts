import { create } from 'zustand';

type Store = {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
};

export const useStore = create<Store>((set) => ({
  isMobile: false,
  setIsMobile: (isMobile: boolean) => set({ isMobile }),
}));
