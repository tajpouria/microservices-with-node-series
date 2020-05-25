import { Router } from "express";
import { commentValidator } from "./commentValidator";
import { Comment } from "./commentModel";
import { logger } from "./utils";

const commentRouter = Router();

commentRouter.get("/:id/comment", async (req, res) => {
  try {
    const commentId = req.params?.commentId ?? null;

    const comments = (await Comment.find({ commentId })) || [];

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

    if (error) return res.status(400).json(error);

    const comment = new Comment(value);
    await comment.save();
    logger.info("%s Created", comment);

    res.sendStatus(201);
  } catch (error) {
    logger.error(new Error(error));
    res.sendStatus(500);
  }
});

export { commentRouter };
