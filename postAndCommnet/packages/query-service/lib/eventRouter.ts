import { Router } from "express";

import { Comment } from "./commentModel";
import { Post } from "./postModel";
import { logger } from "./utils";

const eventRouter = Router();

eventRouter.post("", async (req, res) => {
  try {
    const event =
      (req.body as { type: string; data: Record<string, any> }) || undefined;

    if (event) {
      switch (event.type) {
        case "POST_CREATED":
          const post = new Post(event.data);
          await post.save();
          logger.info("%s Created", post);

          break;
        case "COMMENT_CREATED":
          const comment = new Comment(event.data);
          await comment.save();
          logger.info("%s Created", comment);

          break;
        case "COMMENT_UPDATED":
          const { _id, ...updatedComment } = event.data;
          await Comment.updateOne({ _id }, { $set: updatedComment });
          logger.info("%s Updated", _id);

          break;
        default:
          break;
      }
    }
  } catch (error) {
    logger.error(new Error(error));
  }
  res.end();
});

export { eventRouter };
