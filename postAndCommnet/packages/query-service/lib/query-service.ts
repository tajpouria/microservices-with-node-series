import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { cors } from "@internal/utils";

import { queryRouter } from "./queryRouter";
import { logger } from "./utils";
import { eventRouter } from "./eventRouter";

dotenv.config();

(async () => {
  try {
    const {
      SERVICE_NAME = "query-service",
      PORT = 4002,
      DB_URL = "",
    } = process.env;

    await mongoose.connect(
      DB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => logger.info("Connected to DB %s", DB_URL),
    );

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/query", queryRouter);
    app.use("/event", eventRouter);

    app.listen(PORT, () =>
      logger.info("%s is Listening on port %s", SERVICE_NAME, PORT),
    );
  } catch (error) {
    logger.error(new Error(error));
    process.exit(1);
  }
})();
