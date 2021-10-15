// importing package
import mongoose from "mongoose";

import MONGODB_URL from "./config/mongoURL";
import logger from "./logger";

// connecting to db
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(logger.info("database is connected"))
  .catch((err) => logger.error(err));
