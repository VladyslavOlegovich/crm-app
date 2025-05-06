import { RepoData } from "../../data/types/repo";
import { Types } from "mongoose";
import { Repository, IRepository } from "../../data/models/repo.model";
import { fetchGitHubRepo } from "../../data/utils/githubApi";

export const addRepository = async (
  userId: string,
  path: string
): Promise<IRepository> => {
  const data = await fetchGitHubRepo(path);
  const newRepo = await Repository.create({
    owner: data.owner,
    repoPath: path,
    name: data.name,
    url: data.url,
    stars: data.stars,
    forks: data.forks,
    issues: data.issues,
    createdAt: data.createdAt,
    createdBy: userId,
  });
  return newRepo;
};

export const getRepositories = async (
  userId: string
): Promise<IRepository[]> => {
  return await Repository.find({ createdBy: userId });
};

export const updateRepository = async (
  userId: string,
  id: string
): Promise<IRepository> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid repository ID");
  }
  const repo = await Repository.findOne({ _id: id, createdBy: userId });
  if (!repo) {
    throw new Error(`Repo with _id ${id} not found for user ${userId}`);
  }
  const updatedData: RepoData = await fetchGitHubRepo(repo.repoPath);
  repo.owner = updatedData.owner;
  repo.name = updatedData.name;
  repo.url = updatedData.url;
  repo.stars = updatedData.stars;
  repo.forks = updatedData.forks;
  repo.issues = updatedData.issues;
  repo.createdAt = updatedData.createdAt;
  return await repo.save();
};

export const deleteRepository = async (
  userId: string,
  id: string
): Promise<void> => {
  await Repository.deleteOne({ _id: id, createdBy: userId });
};
