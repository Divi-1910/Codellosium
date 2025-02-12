import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema({
  testCaseId: mongoose.Types.ObjectId,
  input: String,
  expectedOutput: String,
  actualOutput: String,
  passed: Boolean
});

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      index: true
    },
    code: {
      type: String,
      required: true
    },
    language: {
      type: String,
      enum: ["python"],
      required: true
    },
    type: {
      type: String,
      enum: ["playground", "arena"],
      required: true,
      default: "arena"
    },
    input: String,
    output: String,
    error: String,
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "finished"],
      default: "pending"
    },
    executionTime: Number,
    memoryUsage: Number,
    testResults: [testResultSchema]
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Submission", submissionSchema);
