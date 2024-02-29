import { create } from "zustand";

interface selectedChats {
  user: string;
  selectChat: (user: string) => void;
}

export const useSelectedChats = create<selectedChats>((set) => ({
  user: "",
  selectChat: (id) => set(() => ({ user: id })),
}));
