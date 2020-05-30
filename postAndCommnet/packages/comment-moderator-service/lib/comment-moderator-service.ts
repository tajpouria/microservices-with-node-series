import express from "express";
import { logger } from "./utils";
import { config } from "dotenv";
import { eventRouter } from "./eventRouter";

config();

(() => {
  const app = express();
  app.use(express.json());

  const {
    PORT = 4003,
    SERVICE_NAME = "comment-moderator-service",
  } = process.env;

  app.use("/event", eventRouter);

  app.listen(PORT, () =>
    logger.info(`${SERVICE_NAME} is listening on port ${PORT}`),
  );
})();
