import express from "express";
import { requestLogger } from "./middlewares/requestLogger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import logger from "./utils/logger.js";
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

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
  logger.info(`Environment : ${process.env.NODE_ENV}`);
});
