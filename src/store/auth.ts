import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: number;
  email: string;
  name: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setUser: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      isLoggedIn: () => !!get().token,
    }),
    {
      name: 'auth-storage',
    }
  )
);
