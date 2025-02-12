import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import { applySecurity } from "./config/config.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "@repo/db";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

const PORT = process.env.AUTH_SERVICE_PORT || 4000;

connectDB();

app.use(cookieParser());
app.use(express.json());

applySecurity(app);

app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
