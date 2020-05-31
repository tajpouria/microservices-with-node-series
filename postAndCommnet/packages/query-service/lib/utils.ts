import { Logger } from "tajpouria-mss-utils";

import { Comment } from "./commentModel";
import { Post } from "./postModel";

export const logger = Logger(`${process.cwd()}/logs`);

export const eventHandler = async (event: {
  type: string;
  data: Record<string, any>;
}) => {
  switch (event.type) {
    case "POST_CREATED":
      const existingPost = await Post.findById(event.data?._id);

      if (!existingPost) {
        const post = new Post(event.data);
        await post.save();
        logger.info("%s Created", post);
      }

      break;
    case "COMMENT_CREATED":
      const existingComment = await Comment.findById(event.data?._id);

      if (!existingComment) {
        const comment = new Comment(event.data);
        await comment.save();
        logger.info("%s Created", comment);
      }

      break;
    case "COMMENT_UPDATED":
      const { _id, ...updatedComment } = event.data;
      await Comment.updateOne({ _id }, { $set: updatedComment });
      logger.info("%s Updated", _id);

      break;
    default:
      break;
  }
};
