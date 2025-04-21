import { create } from "zustand"

export type ChatMessage = {
  role: "user" | "assistant"
  content?: string
}

type ChatStore = {
  messages: ChatMessage[]
  isTyping: boolean
  addMessage: (msg: ChatMessage) => void
  setIsTyping: (status: boolean) => void
  clearMessages: () => void
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isTyping: false,
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  setIsTyping: (status) => set({ isTyping: status }),
  clearMessages: () => set({ messages: [], isTyping: false }),
}))
