import { create } from "zustand";
import io from "socket.io-client";
import { getToken } from "@/lib/get-token";

const createSocket = () => {
  const socket = io("http://localhost:3000", {
    transports: ["websocket"],
    query: { token: getToken() },
  });

  return socket;
};

interface useSocketType {
  socket: ReturnType<typeof createSocket> | null;
  openConnection: () => void;
}

export const useSocket = create<useSocketType>((set) => ({
  socket: null,
  openConnection: () => {
    const newSocket = createSocket();
    set({ socket: newSocket });
  },
}));
