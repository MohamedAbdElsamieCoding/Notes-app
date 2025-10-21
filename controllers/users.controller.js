import User from "../models/users.model.js";
import AppError from "../utils/appError.js";
import httpStatusText from "../utils/httpStatusText.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import generateJwt from "../utils/generateJwt.js";

import bcrypt from "bcrypt";

const register = asyncWrapper(async (req, res, next) => {
  const { userName, email, password, role } = req.body;
  if (!userName || !email || !password || !role)
    return next(new AppError("Fields are required", 400, httpStatusText.ERROR));
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    userName,
    email,
    password: hashedPassword,
    role: role.toUpperCase(),
  });
  const token = generateJwt({
    email: newUser.email,
    id: newUser._id,
  });
  newUser.token = token;
  await newUser.save();
  res.status(201).json({ status: httpStatusText.SUCCESS, user: newUser });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Fields are required", 400, httpStatusText.ERROR));
  const user = await User.findOne({ email: email }).select("+password");
  if (!user)
    return next(
      new AppError("Invalid email or password", 400, httpStatusText.FAIL)
    );
  const matchedPassword = bcrypt.compare(password, user.password);
  if (email && matchedPassword) {
    const token = generateJwt({
      email: user.email,
      id: user._id,
    });
    user.token = token;
    await user.save();
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { token } });
  } else {
    const error = new AppError(
      "invalid email or password",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }
});

export default {
  register,
  login,
};
