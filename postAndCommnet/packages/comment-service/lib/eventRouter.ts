import { Router } from "express";
import { logger } from "./utils";

import { Comment } from "./commentModel";

const eventRouter = Router();

eventRouter.post("", async (req, res) => {
  try {
    const event = req.body;

    if (event?.type === "COMMENT_UPDATED") {
      const { _id, ...updatedComment } = event.data;

      await Comment.updateOne({ _id }, { $set: updatedComment });
      logger.info("Comment %s updated to %s", _id, updatedComment);
    }
  } catch (error) {
    logger.error(new Error(error));
  }
  res.end();
});

export { eventRouter };
