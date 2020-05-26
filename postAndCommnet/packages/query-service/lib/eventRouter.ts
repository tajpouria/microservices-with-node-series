import { Router } from "express";
import { Query } from "./queryModel";
import { logger } from "./utils";

const eventRouter = Router();

eventRouter.post("", async (req, res) => {
  try {
    const event =
      ((req.body ?? null) as { type: string; data: Record<string, any> }) ||
      null;

    if (event) {
      switch (event.type) {
        case "POST_CREATED":
          const query = new Query(event.data);
          await query.save();
          logger.info("%s Created", query);

          break;

        case "COMMENT_CREATED":
          const postId = event.data?.postId;
          await Query.updateOne(
            { _id: postId },
            {
              $push: {
                comments: event.data as { content: string; postId: string },
              },
            },
          );
          logger.info("%s Added to post %s", event.data, postId);

          break;

        default:
          break;
      }
    }

    res.end();
  } catch (error) {
    logger.error(new Error(error));
    res.sendStatus(500);
  }
});

export { eventRouter };
