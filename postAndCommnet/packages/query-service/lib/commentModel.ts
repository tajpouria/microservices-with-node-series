import mongoose from "mongoose";

interface IComment extends mongoose.Document {
  content: string;
  commentId: string;
}

const commentSchema = new mongoose.Schema<IComment>({
  content: { type: String, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  status: {
    type: String,
    enum: ["approved", "pending", "rejected"],
    default: "pending",
  },
});

export const Comment = mongoose.model<IComment>("Comment", commentSchema);
