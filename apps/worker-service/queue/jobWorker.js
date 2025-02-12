import { Worker } from "bullmq";
import { queueConfig } from "../config/queueConfig.js";
import { processJob } from "./jobProcessor.js";

const worker = new Worker(
  queueConfig.queueName,
  async (job) => {
    console.log(`Processing job ${job.id}`);
    await processJob(job.data);
  },
  {
    connection: {
      host: queueConfig.redis.host,
      port: queueConfig.redis.port
    }
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully`);
  console.log("Worker waiting for next job..."); // Added log for waiting
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed with error: ${err.message}`);
  console.log("Worker waiting for next job..."); // Added log for waiting even after failure
});

worker.on("error", (err) => {
  console.error("Worker level error:", err);
  console.log("Worker still listening for jobs..."); // Worker should still be active
});

console.log("Job worker initialized and listening for jobs."); // Startup log

export default worker;
