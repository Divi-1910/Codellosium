export const errorHandler = (err, req, res, next) => {
  console.error("Submission Service Error:", err.stack);
  res.status(500).json({ error: "Internal server error" });
};
