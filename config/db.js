import mongoose from "mongoose";
import logger from "./logger.js";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    logger.info(`Database is connected ${connect.connection.host}`);
  } catch (err) {
    logger.error(`Database is failed to connect ${err}`);
    process.exit(1);
  }
};

export default connectDb;
