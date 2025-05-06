import { Router } from "express";
import {
  addRepo,
  getRepos,
  updateRepo,
  deleteRepo,
} from "../controllers/repo.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/add", addRepo);
router.get("/", getRepos);
router.put("/:id", updateRepo);
router.delete("/:id", deleteRepo);

export default router;
