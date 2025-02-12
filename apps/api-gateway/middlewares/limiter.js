import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5
});

export const submissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100
});
