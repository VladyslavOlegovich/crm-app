import { Request, Response } from "express";
import {
  addRepository,
  getRepositories,
  updateRepository,
  deleteRepository,
} from "../../business/services/repoService";
import { IRepository } from "../../data/models/repo.model";

interface AddRepoRequestBody {
  path: string;
}

interface RepoParams {
  id: string;
}
declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

export const addRepo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { path } = req.body as AddRepoRequestBody;

    if (!path) {
      res.status(400).json({ message: "Path is required" });
      return;
    }

    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized: userId is missing" });
      return;
    }

    const newRepo: IRepository = await addRepository(req.userId, path);
    res.status(201).json(newRepo);
  } catch (err: any) {
    const status =
      err.message === "GitHub repository not found or error fetching data"
        ? 400
        : 500;
    res.status(status).json({ message: err.message });
  }
};

export const getRepos = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized: userId is missing" });
      return;
    }

    const repos: IRepository[] = await getRepositories(req.userId);
    res.json(repos);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateRepo = async (
  req: Request<RepoParams>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Repository ID is required" });
      return;
    }
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized: userId is missing" });
      return;
    }

    const updatedRepo: IRepository = await updateRepository(req.userId, id);
    res.json(updatedRepo);
  } catch (err: any) {
    const status =
      err.message === "Invalid repository ID"
        ? 400
        : err.message === "Repo not found"
        ? 404
        : err.message === "GitHub repository not found or error fetching data"
        ? 400
        : 500;
    res.status(status).json({ message: err.message });
  }
};

export const deleteRepo = async (
  req: Request<RepoParams>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Repository ID is required" });
      return;
    }
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized: userId is missing" });
      return;
    }

    await deleteRepository(req.userId, id);
    res.json({});
  } catch (err: any) {
    const status = err.message === "Repo not found" ? 404 : 500;
    res.status(status).json({ message: err.message });
  }
};
