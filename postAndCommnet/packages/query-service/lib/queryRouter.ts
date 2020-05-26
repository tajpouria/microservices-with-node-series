import { Router } from "express";

import { Query } from "./queryModel";
import { logger } from "./utils";

const queryRouter = Router();

queryRouter.get("", async (_, res) => {
  try {
    const queries = (await Query.find()) || [];
    res.json(queries);
  } catch (error) {
    logger.error(new Error(error));
    res.sendStatus(500);
  }
});

export { queryRouter };
