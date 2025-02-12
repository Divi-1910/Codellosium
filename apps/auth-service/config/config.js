import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";

export const applySecurity = (app) => {
  app.use(mongoSanitize());
  app.use(helmet());
  app.use(morgan("combined"));
};

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many attempts, please try again later"
});
