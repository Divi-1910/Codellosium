import gateway from "fast-gateway";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import requestIp from "request-ip";
import { errorHandler } from "./middlewares/error.js";
import { authenticate } from "./middlewares/auth.js";
import cookieParser from "cookie-parser";

dotenv.config();

const getIP = (req, res, next) => {
  req.ip = requestIp.getClientIp(req);
  return next();
};

const helmetMiddleware = helmet();
const morganMiddleware = morgan("combined");

const corsMiddleware = cors({
  credentials: true,
  origin: process.env.CLIENT_URL
});

const server = gateway({
  middlewares: [
    helmetMiddleware,
    morganMiddleware,
    corsMiddleware,
    cookieParser
  ],
  routes: [
    {
      prefix: "/api/auth",
      target: process.env.AUTH_SERVICE_URL,
      urlRewrite: (req) => req.url.replace("/api/auth", "/"),
      middlewares: []
    },
    {
      prefix: "/api/submission",
      target: process.env.SUBMISSION_SERVICE_URL,
      urlRewrite: (req) => req.url.replace("/api/submission", "/"),
      middlewares: [authenticate]
    },
    {
      prefix: "/api/problem",
      target: process.env.PROBLEM_SERVICE_URL,
      urlRewrite: (req) => req.url.replace("/api/problem", "/"),
      middlewares: [authenticate]
    }
  ]
});

const PORT = process.env.API_GATEWAY_PORT || 3000;

server.use(errorHandler);

server.start(PORT).then(() => {
  console.log(`🚀 API Gateway running at PORT ${PORT}`);
});
