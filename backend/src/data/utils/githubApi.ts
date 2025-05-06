import axios from "axios";
import { RepoData } from "../types/repo";

const GITHUB_API_BASE_URL = "https://api.github.com/repos";

export const fetchGitHubRepo = async (path: string): Promise<RepoData> => {
  try {
    const res = await axios.get(`${GITHUB_API_BASE_URL}/${path}`);
    const data = res.data;
    return {
      owner: data.owner.login,
      name: data.name,
      url: data.html_url,
      stars: data.stargazers_count,
      forks: data.forks_count,
      issues: data.open_issues_count,
      createdAt: Math.floor(new Date(data.created_at).getTime() / 1000),
    };
  } catch (err) {
    throw new Error("GitHub repository not found or error fetching data");
  }
};
