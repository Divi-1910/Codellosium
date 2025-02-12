import dotenv from "dotenv";
import worker from "./queue/jobWorker.js";
import { connectDB } from "@repo/db";

dotenv.config();
connectDB();

console.log("Worker Service started and listening for jobs...");
