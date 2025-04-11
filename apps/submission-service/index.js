import express from "express";
import dotenv from "dotenv";
import submissionRoutes from "./routes/submissionRoutes.js";
import { errorHandler } from "./middlewares/error.js";
import { connectDB } from "@repo/db";
import { createBullBoard } from "@bull-board/api";
import { ExpressAdapter } from "@bull-board/express";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter.js";
import { submissionQueue } from "./queues/submissionQueue.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.SUBMISSION_SERVICE_PORT || 7000;

// console.log(process.env.CLIENT_URL);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(cookieParser());
app.use(express.json());

connectDB();

const expressAdapter = new ExpressAdapter();
expressAdapter.setBasePath("/admin/queue");

createBullBoard({
  queues: [new BullMQAdapter(submissionQueue)],
  serverAdapter: expressAdapter
});

app.use("/admin/queue", expressAdapter.getRouter());

app.use("/", submissionRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Submission Service running on port ${PORT}`);
});
