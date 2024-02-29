import { create } from "zustand";

interface favoriteChats {
  users: string[];
  addUserToFavorite: (user: string) => void;
  removeUserFromFavorite: (user: string) => void;
}

export const useFavoriteChats = create<favoriteChats>((set) => ({
  users: [],
  addUserToFavorite: (user) =>
    set((state) => ({ users: [...state.users, user] })),
  removeUserFromFavorite: (user) =>
    set((state) => ({ users: state.users.filter((l) => l !== user) })),
}));
