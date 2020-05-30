import { Router } from "express";

import { logger, eventHandler } from "./utils";

const eventRouter = Router();

eventRouter.post("", async (req, res) => {
  try {
    const event =
      (req.body as { type: string; data: Record<string, any> }) || undefined;

    if (event) {
      await eventHandler(event);
    }
  } catch (error) {
    logger.error(new Error(error));
  }
  res.end();
});

export { eventRouter };
