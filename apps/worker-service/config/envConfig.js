import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  WORKER_SERVICE_PORT: process.env.WORKER_SERVICE_PORT || 8000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://mongo:27017/CodePlatform",
  REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
  REDIS_PORT: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  TIMEOUT_LIMIT: process.env.TIMEOUT_LIMIT
    ? parseInt(process.env.TIMEOUT_LIMIT)
    : 2000, // in ms
  MEMORY_LIMIT: process.env.MEMORY_LIMIT
    ? parseInt(process.env.MEMORY_LIMIT)
    : 256 * 1024 * 1024, // 256 MB
  NOTIFICATION_SERVICE_URL:
    process.env.NOTIFICATION_SERVICE_URL || "http://localhost:5000/notify"
};
