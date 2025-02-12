import mongoose from "mongoose";
import User from "./models/User.js";
import Submission from "./models/Submission.js";
import Problem from "./models/Problem.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ArenaDB";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export { connectDB, User, Submission, Problem };
