import { create } from "zustand";
import { fetchMe, logoutUser } from "../api/auth";

interface AuthUser {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  setUser: (user: AuthUser | null) => void;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),

  logout: async () => {
    try {
      // Call backend logout to clear cookies
      await logoutUser();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      // Clear Zustand state
      set({ user: null, loading: false });
    }
  },

  loadUser: async () => {
    set({ loading: true });
    try {
      const res = await fetchMe();
      set({ user: res.data.user, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },
}));
