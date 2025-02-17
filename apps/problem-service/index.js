import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import problemRoutes from "./routes/problemRoutes.js";
import { connectDB } from "@repo/db";

dotenv.config();

const app = express();
const PORT = 6001;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/", problemRoutes);

app.listen(PORT, () => {
  console.log(`Problem Service running on port ${PORT}`);
});
