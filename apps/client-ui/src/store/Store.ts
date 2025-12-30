import { create } from "zustand";
import { Socket } from "socket.io-client";
import type { ICredentials, IStore, IConversation } from "./IStore";

export const useStore = create<IStore>((set) => ({
  credentials: null,
  setCredentials: (newCredentials: ICredentials | null) =>
    set({ credentials: newCredentials }),

  users: [],
  setUsers: (users: ICredentials[]) => set({ users }),

  selectedChat: null,
  setSelectedChat: (selectedChat: ICredentials | null) => set({ selectedChat }),

  conversation: null,
  setConversation: (conversation: IConversation | null) =>
    set({ conversation }),

  messages: [],
  setMessages: (updater) =>
    set((state) => ({
      messages:
        typeof updater === "function" ? updater(state.messages) : updater,
    })),
  socket: null,
  setSocket: (socket: Socket | null) => set({ socket }),

  activeUsers: [],
  setActiveUsers: (activeUsers: ICredentials[]) => set({ activeUsers }),
}));
