import { create } from "zustand";
import { IRepository } from "../../data/types/repo";
import { handleAxiosError } from "../../data/utils/handleAxiosError";
import {
  getRepos as getReposApi,
  addRepo as addRepoApi,
  updateRepo as updateRepoApi,
  deleteRepo as deleteRepoApi,
} from "../../data/api/repos";

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
      const data = await getReposApi();
      set({ repos: data, loading: false });
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
      const data = await addRepoApi(path);
      set((state) => ({
        repos: [...state.repos, data],
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
      const data = await updateRepoApi(id);
      set((state) => ({
        repos: state.repos.map((repo) => (repo._id === id ? data : repo)),
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
      await deleteRepoApi(id);
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
