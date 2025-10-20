import express from "express";
import { requestLogger } from "./middlewares/requestLogger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import logger from "./config/logger.js";

import notesRouter from "./routes/notes.route.js";
import usersRouter from "./routes/users.route.js";

import connectDb from "./config/db.js";

import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(requestLogger);

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);

const startServer = async () => {
  await connectDb();
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
    logger.info(`Environment : ${process.env.NODE_ENV}`);
  });
};

startServer();
