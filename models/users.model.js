import mongoose from "mongoose";
import validator from "validator";
import userRoles from "../utils/userRoles.js";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "invalid Email"],
    },
    password: {
      type: String,
      required: true,
      validate: [validator.isStrongPassword, "Password isn't strong"],
      select: false,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    token: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: [userRoles.ADMIN, userRoles.MANAGER, userRoles.USER],
      default: userRoles.USER,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
