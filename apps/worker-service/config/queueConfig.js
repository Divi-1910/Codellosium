import { ENV } from "./envConfig.js";

export const queueConfig = {
  redis: {
    host: ENV.REDIS_HOST,
    port: ENV.REDIS_PORT
  },
  queueName: "submissions"
};
