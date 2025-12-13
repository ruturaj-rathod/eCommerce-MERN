import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { User } from "@/api/auth";

interface AuthState {
  // State
  token: string | null;
  user: User | null;

  // Actions
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setToken: (token: string) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial State
      token: null,
      user: null,
      isAuthenticated: false,

      // Login Action
      login: (token: string, user: User) => {
        set({
          token,
          user,
        });
      },

      // Logout Action
      logout: () => {
        set({
          token: null,
          user: null,
        });
      },

      // Update User Action
      updateUser: (userData: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },

      // Set Token Action
      setToken: (token: string) => {
        set({ token });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;
