import { Router } from "express";

import { logger } from "./utils";
import { Post } from "./postModel";

const queryRouter = Router();

queryRouter.get("", (_, res) => {
  try {
    Post.aggregate([
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
    ]).exec((error, result) => {
      if (error) throw new Error(error);

      res.json(result);
    });
  } catch (error) {
    logger.error(new Error(error));
    res.sendStatus(500);
  }
});

export { queryRouter };
