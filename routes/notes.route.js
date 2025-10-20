import notesController from "../controllers/notes.controller.js";
import express from "express";

const router = express.Router();

router
  .route("/")
  .get(notesController.getAllNotes)
  .post(notesController.createNote);

router
  .route("/:id")
  .patch(notesController.updateNote)
  .delete(notesController.deleteNote);

export default router;
