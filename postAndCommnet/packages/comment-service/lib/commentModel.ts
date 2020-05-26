import mongoose from "mongoose";

interface IComment extends mongoose.Document {
  content: string;
  commentId: string;
}

const commentSchema = new mongoose.Schema<IComment>({
  content: { type: String, required: true },
  postId: { type: String, required: true },
});

export const Comment = mongoose.model<IComment>("Comment", commentSchema);
