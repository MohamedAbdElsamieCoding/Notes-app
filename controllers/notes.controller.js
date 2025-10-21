import Note from "../models/notes.model.js";
import AppError from "../utils/appError.js";
import httpStatusText from "../utils/httpStatusText.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

const getAllNotes = asyncWrapper(async (req, res, next) => {
  const notes = await Note.find();
  if (!notes.length)
    return next(new AppError("No notes found", 400, httpStatusText.FAIL));
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    results: notes.length,
    data: { notes },
  });
});
const createNote = asyncWrapper(async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content)
    return next(
      new AppError("title and content are required", 400, httpStatusText.ERROR)
    );
  const note = await Note.create({
    title,
    content,
    userId: req.user ? req.user._id : null,
  });
  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { note },
  });
});
const updateNote = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!title || !content)
    return next(
      new AppError("title and content are required", 400, httpStatusText.ERROR)
    );
  const note = await Note.findByIdAndUpdate(
    id,
    { title, content },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(202).json({ status: httpStatusText.SUCCESS, data: { note } });
});
const deleteNote = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const note = await Note.findByIdAndDelete(id);
  if (!note)
    return next(new AppError("Note not found", 400, httpStatusText.ERROR));
  res
    .status(200)
    .json({
      status: httpStatusText.SUCCESS,
      data: "Note deleted successfully",
    });
});

export default {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
};
