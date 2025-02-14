import express from "express";
import {
  createProblem,
  getAllProblems,
  getProblemById,
  addTestCase
} from "../controllers/problemController.js";
import { createProblemValidator } from "../validators/problemValidator.js";

const router = express.Router();

router.post("/", createProblemValidator, createProblem);

router.get("/", getAllProblems);

router.get("/:id", getProblemById);

router.post("/:id/testcases", addTestCase);

export default router;
