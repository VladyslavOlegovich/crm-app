import { Document, Schema, model, Types } from "mongoose";

export interface IRepository extends Document {
  owner: string;
  repoPath: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  createdAt: number;
  createdBy: string;
}

const repoSchema = new Schema<IRepository>({
  owner: String,
  repoPath: { type: String, required: true },
  name: String,
  url: String,
  stars: Number,
  forks: Number,
  issues: Number,
  createdAt: Number,
  createdBy: { type: String, required: true },
});

export const Repository = model<IRepository>("Repository", repoSchema);
