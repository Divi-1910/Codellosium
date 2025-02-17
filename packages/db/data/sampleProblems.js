import mongoose from "mongoose";

export const sampleProblems = [
  {
    title: "Sum of Two Numbers",
    description: "take two numbers as input , and return there sum as output",
    difficulty: "easy",
    constraints: ["Each input would have exactly one solution."],
    testCases: [
      { input: "2 2", expectedOutput: "4", isSample: true },
      { input: "3 0", expectedOutput: "3", isSample: false },
      { input: "-1 1", expectedOutput: "0", isSample: false },
      { input: "-2 -4", expectedOutput: "-6", isSample: true }
    ],
    author: new mongoose.Types.ObjectId()
  }
];
