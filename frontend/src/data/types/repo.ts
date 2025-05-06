export interface IRepository {
  _id: string;
  owner: string;
  repoPath: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  createdAt: number;
}
