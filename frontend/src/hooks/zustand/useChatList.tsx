import { create } from "zustand";
import { InfoType } from "./useUserInfo";

interface chatList {
  users: InfoType[];
  addUserToChatList: (user: InfoType) => void;
  removeUserFromChatList: (user: InfoType) => void;
}

export const useChatList = create<chatList>((set) => ({
  users: [],
  addUserToChatList: (user) =>
    set((state) => {
      // Check if user with the same id already exists
      const isExist = state.users.some(
        (existingUser) => existingUser.id === user.id
      );

      if (!isExist) {
        return { users: [...state.users, user] };
      }

      return state;
    }),
  removeUserFromChatList: (user) =>
    set((state) => ({
      users: state.users.filter((l) => l.title !== user.title),
    })),
}));
