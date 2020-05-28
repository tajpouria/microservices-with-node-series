import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { cors, request } from "@internal/utils";

import { queryRouter } from "./queryRouter";
import { logger, eventHandler } from "./utils";
import { eventRouter } from "./eventRouter";

dotenv.config();

(async () => {
  try {
    const {
      SERVICE_NAME = "query-service",
      PORT = 4002,
      DB_URL = "mongodb://127.0.0.1:27017/queries",
      EVENT_BROKER = "{}",
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

    app.listen(PORT, async () => {
      logger.info("%s is Listening on port %s", SERVICE_NAME, PORT);

      await new Promise((res) => setTimeout(res, 10000));

      try {
        const eventBroker = JSON.parse(EVENT_BROKER);
        const response = (await request({
          ...eventBroker,
          method: "GET",
        })) as string;

        const events = JSON.parse(response) as {
          type: string;
          data: Record<string, any>;
        }[];

        for await (let eve of events) {
          logger.info("Processing %s", eve);
          await eventHandler(eve);
        }
      } catch (error) {
        logger.error(error);
        process.exit(1);
      }
    });
  } catch (error) {
    logger.error(new Error(error));
    process.exit(1);
  }
})();
