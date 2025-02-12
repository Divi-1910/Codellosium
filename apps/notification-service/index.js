import express from "express";
import http from "http";
import cors from "cors";
import { ENV } from "./config/envConfig.js";
import dotenv from "dotenv";
import notificationRoutes from "./routes/notificationRoutes.js";
import { initSocketServer } from "./websockets/socketServer.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = ENV.NOTIFICATION_SERVICE_PORT;

app.use(express.json());
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true
  })
);
app.use(cookieParser());

app.use("/notify", notificationRoutes);

initSocketServer(server);

server.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});
