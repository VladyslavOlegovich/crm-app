import { create } from "zustand";
import { IUser } from "../../data/types/user";
import { handleAxiosError } from "../../data/utils/handleAxiosError";
import {
  login as loginApi,
  register as registerApi,
} from "../../data/api/auth";
interface AuthState {
  token: string | null;
  user: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token") || null,
  user: null,

  login: async (email: string, password: string) => {
    try {
      const data = await loginApi(email, password);
      localStorage.setItem("token", data.token);
      set({ token: data.token, user: data.user });
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Login failed");
      console.error("Login error:", errorMessage);
      throw new Error(errorMessage);
    }
  },

  register: async (email: string, password: string) => {
    try {
      const data = await registerApi(email, password);
      localStorage.setItem("token", data.token);
      set({ token: data.token, user: data.user });
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Registration failed");
      console.error("Registration failed", errorMessage);

      throw new Error(errorMessage);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },
}));
