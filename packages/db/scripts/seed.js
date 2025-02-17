import mongoose from "mongoose";
import dotenv from "dotenv";
import Problem from "../models/Problem.js";
import { sampleProblems } from "../data/sampleProblems.js";

dotenv.config();

const seedProblems = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/ArenaDB",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log("MongoDB connected for seeding.");
    await Problem.deleteMany({});
    console.log("Cleared existing problems.");

    await Problem.insertMany(sampleProblems);
    console.log("Seeded Sample problems successfully.");

    process.exit();
  } catch (error) {
    console.error("Error seeding problems:", error);
    process.exit(1);
  }
};

seedProblems();
