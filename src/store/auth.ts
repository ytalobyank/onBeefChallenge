import { create } from 'zustand';

type User = {
  id: number;
  email: string;
  name: string;
};

type AuthState = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null });
  },
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  }
}));
