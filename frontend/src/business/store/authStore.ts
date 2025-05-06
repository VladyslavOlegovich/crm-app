import { create } from "zustand";
import axios from "../../data/api";
import { IUser } from "../../data/types/user";
import { handleAxiosError } from "../../data/utils/handleAxiosError";

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
      const response = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      set({ token: response.data.token, user: response.data.user });
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Login failed");
      console.error("Login error:", errorMessage);
      throw new Error(errorMessage);
    }
  },

  register: async (email: string, password: string) => {
    try {
      const response = await axios.post("/auth/register", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      set({ token: response.data.token, user: response.data.user });
    } catch (error) {
      const errorMessage = handleAxiosError(error, "Login failed");
      console.error("Registration failed", errorMessage);

      throw new Error(errorMessage);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },
}));
