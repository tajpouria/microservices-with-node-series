import express from "express";
import { logger } from "./utils";
import { request } from "@internal/utils";
import { config } from "dotenv";

config();

(() => {
  const app = express();
  app.use(express.json());

  const {
    PORT = 4005,
    SUBSCRIBERS = "[]",
    SERVICE_NAME = "event-broker",
  } = process.env;

  app.post("/", (req, res) => {
    try {
      const subscribers = JSON.parse(SUBSCRIBERS) as {
        serviceName: string;
        hostname: string;
        port: string;
        path: string;
      }[];

      subscribers.forEach(({ serviceName, ...subOptions }) => {
        logger.info("Emitting %s to %s", req.body, serviceName);

        request({
          ...subOptions,
          method: "POST",
          body: JSON.stringify(req.body),
          headers: { "Content-Type": "application/json" },
        });
      });

      res.sendStatus(204);
    } catch (error) {
      logger.error(new Error(error));
      res.sendStatus(500);
    }
  });

  app.listen(PORT, () =>
    logger.info(`${SERVICE_NAME} is listening on port ${PORT}`),
  );
})();
