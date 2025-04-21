import { create } from "zustand"

type AuthStore = {
  user: any | null
  setUser: (user: any | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
