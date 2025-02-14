import { body } from "express-validator";

export const createProblemValidator = [
  body("title").notEmpty().withMessage("Title is required."),
  body("description").notEmpty().withMessage("Description is required."),
  body("constraints").notEmpty().withMessage("Constraints are required."),
  body("inputFormat").notEmpty().withMessage("Input format is required."),
  body("outputFormat").notEmpty().withMessage("Output format is required."),
  body("testCases").isArray().withMessage("Test cases should be an array.")
];
