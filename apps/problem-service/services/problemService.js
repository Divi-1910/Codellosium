import { Problem } from "@repo/db";

export const createProblem = async (data) => {
  const {
    title,
    description,
    constraints,
    inputFormat,
    outputFormat,
    testCases
  } = data;

  const problem = new Problem({
    title,
    description,
    constraints,
    inputFormat,
    outputFormat,
    testCases
  });

  try {
    const savedProblem = await problem.save();
    return savedProblem;
  } catch (error) {
    throw new Error("Error creating problem: " + error.message);
  }
};

export const getAllProblems = async () => {
  try {
    const problems = await Problem.find();
    return problems;
  } catch (error) {
    throw new Error("Error fetching problems: " + error.message);
  }
};

export const getProblemById = async (id) => {
  try {
    const problem = await Problem.findById(id);
    return problem;
  } catch (error) {
    throw new Error("Problem not found: " + error.message);
  }
};

export const addTestCaseToProblem = async (problemId, testCase) => {
  try {
    const problem = await Problem.findById(problemId);
    problem.testCases.push(testCase);
    await problem.save();
    return problem;
  } catch (error) {
    throw new Error("Error adding test case: " + error.message);
  }
};
