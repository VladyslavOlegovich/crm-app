/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "./index";
import { IRepository } from "../types/repo";

export const addRepo = async (path: string): Promise<IRepository> => {
  try {
    const response = await axios.post<IRepository>("/repos", { path });
    return response.data;
  } catch (error) {
    throw new Error("Failed to add repository. Please try again.");
  }
};

export const getRepos = async (): Promise<IRepository[]> => {
  try {
    const response = await axios.get<IRepository[]>("/repos");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch repositories. Please try again.");
  }
};

export const updateRepo = async (id: string): Promise<IRepository> => {
  try {
    const response = await axios.put<IRepository>(`/repos/${id}`, {});
    return response.data;
  } catch (error) {
    throw new Error("Failed to update repository. Please try again.");
  }
};

export const deleteRepo = async (id: string): Promise<void> => {
  try {
    await axios.delete(`/repos/${id}`);
  } catch (error) {
    throw new Error("Failed to delete repository. Please try again.");
  }
};
