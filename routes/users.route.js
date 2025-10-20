import userController from "../controllers/users.controller.js";
import express from "express";

const router = express.Router();

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);

export default router;
