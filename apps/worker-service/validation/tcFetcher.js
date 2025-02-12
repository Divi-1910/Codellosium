// validation/testCaseFetcher.js
import { Problem } from "@repo/db";

export const fetchTestCases = async (problemId) => {
  const problem = await Problem.findById(problemId).lean();
  if (!problem) {
    throw new Error("Problem not found");
  }
  return problem.testCases || [];
};
