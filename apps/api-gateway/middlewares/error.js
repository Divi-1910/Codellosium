export const errorHandler = (err, req, res, next) => {
  console.error("Inside Error Handler");
  console.error("error :", err.stack);

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Internal server error" : err.message;

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};
