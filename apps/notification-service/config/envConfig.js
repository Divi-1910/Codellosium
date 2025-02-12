import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  NOTIFICATION_SERVICE_PORT: process.env.NOTIFICATION_SERVICE_PORT || 5000,
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  NODE_ENV: process.env.NODE_ENV || "development"
};
