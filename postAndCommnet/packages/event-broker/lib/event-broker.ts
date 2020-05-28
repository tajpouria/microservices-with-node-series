import express from "express";
import { request } from "@internal/utils";
import { config } from "dotenv";
import mongoose from "mongoose";

import { logger } from "./utils";
import { Event } from "./EventModel";

config();

(async () => {
  const app = express();
  app.use(express.json());

  const {
    PORT = 4005,
    SUBSCRIBERS = "[]",
    SERVICE_NAME = "event-broker",
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

  app.post("/", async (req, res) => {
    try {
      const event = new Event(req.body);
      await event.save();

      const subscribers = JSON.parse(SUBSCRIBERS) as {
        serviceName: string;
        hostname: string;
        port: string;
        path: string;
      }[];

      subscribers.forEach(({ serviceName, ...subOptions }) => {
        logger.info("Emitting %s to %s", event, serviceName);

        request({
          ...subOptions,
          method: "POST",
          body: JSON.stringify({ type: event.type, data: event.data }),
          headers: { "Content-Type": "application/json" },
        });
      });

      res.sendStatus(204);
    } catch (error) {
      logger.error(new Error(error));
      res.sendStatus(500);
    }
  });

  app.get("/", async (_, res) => {
    try {
      const events = (await Event.find()) || [];
      res.send(events);
    } catch (error) {
      logger.error(new Error(error));
      res.sendStatus(500);
    }
  });

  app.listen(PORT, () =>
    logger.info(`${SERVICE_NAME} is listening on port ${PORT}`),
  );
})();
