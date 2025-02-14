import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import problemRoutes from "./routes/problemRoutes.js";
import { connectDB } from "@repo/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

connectDB();

// Use routes
app.use("/api/problems", problemRoutes);

app.listen(PORT, () => {
  console.log(`Problem Service running on port ${PORT}`);
});
