import notesController from "../controllers/notes.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import allowedTo from "../middlewares/allowedTo.js";
import express from "express";
import userRoles from "../utils/userRoles.js";

const router = express.Router();

router
  .route("/")
  .get(verifyToken, notesController.getAllNotes)
  .post(verifyToken, notesController.createNote);

router
  .route("/:id")
  .patch(verifyToken, notesController.updateNote)
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.MANAGER),
    notesController.deleteNote
  );

export default router;
