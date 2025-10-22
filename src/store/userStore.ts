import { create } from "zustand";

interface UserState {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
  setUser: (user: { id: number; name: string; email: string; role: string }) => void;
  clearUser: () => void;
}

export const userStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));