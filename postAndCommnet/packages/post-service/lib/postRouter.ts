import { Router } from "express";
import { request } from "@internal/utils";

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

    const { EVENT_BROKER = "{}" } = process.env;

    const eventBroker = JSON.parse(EVENT_BROKER) as {
      hostname: string;
      port: string;
      path: string;
    };

    logger.info("Emitting %s to event-broker", post);
    await request({
      ...eventBroker,
      method: "POST",
      body: JSON.stringify({ type: "POST_CREATED", data: post }),
      headers: { "Content-Type": "application/json" },
    });

    res.sendStatus(201);
  } catch (error) {
    logger.error(new Error(error));
    res.sendStatus(500);
  }
});

export { postRouter };
