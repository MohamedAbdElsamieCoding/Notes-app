import jwt from "jsonwebtoken";
import httpStatusText from "../utils/httpStatusText.js";
import AppError from "../utils/appError.js";

const verifyToken = (req, res, next) => {
  const authHeaders =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeaders) {
    const error = new AppError("token is required", 401, httpStatusText.ERROR);
    return next(error);
  }
  try {
    const token = authHeaders.split(" ")[1];
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = currentUser;
    next();
  } catch (err) {
    const error = new AppError("invalid token", 403, httpStatusText.FAIL);
    return next(error);
  }
};

export default verifyToken;
