import { Router } from "express";

import { logger } from "./utils";
import { Post } from "./postModel";

const queryRouter = Router();

queryRouter.get("", async (_, res) => {
  try {
    const queries = await Post.aggregate([
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
    ]);

    res.json(queries);
  } catch (error) {
    logger.error(new Error(error));
    res.sendStatus(500);
  }
});

export { queryRouter };
