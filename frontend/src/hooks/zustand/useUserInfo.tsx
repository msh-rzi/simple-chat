import { UserCardType } from "@/components/user-card";

export type InfoType = {
  username: string;
  id: Number;
} & UserCardType;

import { create } from "zustand";

interface InfoReturnType {
  info: InfoType;
  updateUserInfo: (user: InfoType) => void;
}

export const useUserInfo = create<InfoReturnType>((set) => ({
  info: sessionStorage.getItem("info")
    ? JSON.parse(sessionStorage.getItem("info")!).data
    : null,
  updateUserInfo: (user) => {
    sessionStorage.setItem(
      "info",
      JSON.stringify({
        data: user,
      })
    );
    return set(() => ({ info: user }));
  },
}));
