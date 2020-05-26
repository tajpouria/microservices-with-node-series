import { Router } from "express";

import { postValidators } from "./postValidators";
import { Post } from "./postModel";
import { logger } from "./utils";

const postRouter = Router();

postRouter.get("", async (_, res) => {
  try {
    const posts = (await Post.find()) || [];

    res.send(posts);
  } catch (error) {
    logger.error(new Error(error));
    res.sendStatus(500);
  }
});

postRouter.post("", async (req, res) => {
  try {
    const { value, error } = postValidators.validate(req.body);

    if (error) return res.status(400).json(error.details);

    const post = new Post(value);
    await post.save();
    logger.info("%s Created.", post);

    res.sendStatus(201);
  } catch (error) {
    logger.error(new Error(error));
    res.sendStatus(500);
  }
});

export { postRouter };
