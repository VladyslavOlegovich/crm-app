import { create } from "zustand";
import axios from "../../data/api";
import { IRepository } from "../../data/types/repo";
import { handleAxiosError } from "../../data/utils/handleAxiosError";

interface RepoState {
  repos: IRepository[];
  path: string;
  error: string | null;
  loading: boolean;
  setPath: (path: string) => void;
  fetchRepos: () => Promise<void>;
  addRepo: () => Promise<void>;
  updateRepo: (id: string) => Promise<void>;
  deleteRepo: (id: string) => Promise<void>;
}

export const useRepoStore = create<RepoState>((set) => ({
  repos: [],
  path: "",
  error: null,
  loading: false,

  setPath: (path) => set({ path }),

  fetchRepos: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/repos");
      set({ repos: response.data, loading: false });
    } catch (error) {
      const errorMessage = handleAxiosError(
        error,
        "Failed to fetch repositories:"
      );
      console.error("Failed to fetch repositories:", error);
      set({
        error: errorMessage,
        loading: false,
      });
    }
  },

  addRepo: async () => {
    set({ loading: true, error: null });
    try {
      const { path } = useRepoStore.getState();
      const response = await axios.post("/repos/add", { path });
      set((state) => ({
        repos: [...state.repos, response.data],
        path: "",
        loading: false,
      }));
    } catch (error) {
      const errorMessage = handleAxiosError(
        error,
        "Failed to add repository. Please check the path."
      );
      console.error("Failed to add repository:", error);
      set({
        error: errorMessage,
        loading: false,
      });
    }
  },

  updateRepo: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`/repos/${id}`);
      set((state) => ({
        repos: state.repos.map((repo) =>
          repo._id === id ? response.data : repo
        ),
        loading: false,
      }));
    } catch (error) {
      const errorMessage = handleAxiosError(
        error,
        "Failed to update repository."
      );
      console.error("Failed to update repository:", error);
      set({
        error: errorMessage,
        loading: false,
      });
    }
  },

  deleteRepo: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/repos/${id}`);
      set((state) => ({
        repos: state.repos.filter((repo) => repo._id !== id),
        loading: false,
      }));
    } catch (error) {
      const errorMessage = handleAxiosError(
        error,
        "Failed to delete repository."
      );
      console.error("Failed to delete repository:", error);
      set({
        error: errorMessage,
        loading: false,
      });
    }
  },
}));
