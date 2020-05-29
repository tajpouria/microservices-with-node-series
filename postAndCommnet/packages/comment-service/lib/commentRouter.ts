import { Router } from "express";
import mongoose from "mongoose";
import { request } from "@tajpouria/mss-utils";

import { commentValidator } from "./commentValidator";
import { Comment } from "./commentModel";
import { logger } from "./utils";

const commentRouter = Router();

commentRouter.get("/:id/comment", async (req, res) => {
  try {
    const postId = req.params?.id;

    const comments = postId ? (await Comment.find({ postId })) || [] : [];

    res.json(comments);
  } catch (error) {
    logger.error(new Error(error));
    res.sendStatus(500);
  }
});

commentRouter.post("/:id/comment", async (req, res) => {
  try {
    const postId = req.params?.id;

    const { value, error } = commentValidator.validate({ ...req.body, postId });

    if (error) return res.status(400).json(error.details);

    const comment = new Comment({
      ...value,
      postId: mongoose.Types.ObjectId(value.postId),
    });
    await comment.save();
    logger.info("%s Created", comment);

    const { EVENT_BROKER = "{}" } = process.env;

    const eventBroker = JSON.parse(EVENT_BROKER) as {
      hostname: string;
      port: string;
      path: string;
    };

    logger.info("Emitting %s to event-broker", comment);
    await request({
      ...eventBroker,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "COMMENT_CREATED", data: comment }),
    });

    res.sendStatus(201);
  } catch (error) {
    logger.error(new Error(error));
    res.sendStatus(500);
  }
});

export { commentRouter };
