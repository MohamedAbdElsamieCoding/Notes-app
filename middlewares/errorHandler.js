import logger from "../utils/logger.js";
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  logger.error(
    `${req.id || "no id"} ${err.message} , ${req.method} , ${
      req.originalUrl
    }\n${err.stack}`
  );

  res.status(statusCode).json({
    status: "error",
    message: err.message || "Something went wrong",
  });
};
