import { Router } from "express";
import BadWords from "bad-words";
import { request } from "@tajpouria/mss-utils";

import { logger } from "./utils";

const eventRouter = Router();

eventRouter.post("", async (req, res) => {
  try {
    const event = req.body as { type: string; data: Record<string, any> };

    if (event.type === "COMMENT_CREATED") {
      const { EVENT_BROKER = "{}" } = process.env;

      const eventBroker = JSON.parse(EVENT_BROKER) as {
        hostname: string;
        port: string;
        path: string;
      };

      const bws = new BadWords(),
        data = {
          ...event.data,
          status: bws.isProfane(event.data?.content ?? "")
            ? "rejected"
            : "approved",
        };

      logger.info("Emitting %s to event-bus", data);
      await request({
        ...eventBroker,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "COMMENT_UPDATED", data }),
      });
    }
  } catch (error) {
    logger.error(new Error(error));
  }

  res.end();
});

export { eventRouter };
