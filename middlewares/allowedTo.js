import AppError from "../utils/appError.js";
import httpStatusText from "../utils/httpStatusText.js";

const allowedTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role)
      return res.status(401).json({ message: "User role not found" });
    const userRole = req.user.role.toUpperCase();
    const allowedRoles = roles.map((r) => r.toUpperCase());
    if (!allowedRoles.includes(userRole)) {
      const error = new AppError("Not allowed", 403, httpStatusText.FAIL);
      return next(error);
    }
    next();
  };
};

export default allowedTo;
