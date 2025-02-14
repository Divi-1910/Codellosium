import * as problemService from "../services/problemService.js";
import { validationResult } from "express-validator";

export const createProblem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newProblem = await problemService.createProblem(req.body);
    res.status(201).json(newProblem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllProblems = async (req, res) => {
  try {
    const problems = await problemService.getAllProblems();
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProblemById = async (req, res) => {
  try {
    const problem = await problemService.getProblemById(req.params.id);
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addTestCase = async (req, res) => {
  try {
    const problem = await problemService.addTestCaseToProblem(
      req.params.id,
      req.body
    );
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
