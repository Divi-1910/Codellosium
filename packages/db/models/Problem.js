import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true
  },
  expectedOutput: {
    type: String,
    required: true
  },
  isSample: {
    type: Boolean,
    default: false
  }
});

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true
    },
    testCases: [testCaseSchema],
    constraints: [String],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Problem", problemSchema);
