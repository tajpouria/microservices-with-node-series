import mongoose from "mongoose";

interface IQuery extends mongoose.Document {
  title: string;
  comments: { content: string; postId: string }[];
}
const querySchema = new mongoose.Schema<IQuery>(
  {
    _id: String,
    title: {
      type: String,
      required: true,
    },
    comments: {
      type: [Object],
      default: [],
    },
  },
  { timestamps: true },
);

export const Query = mongoose.model<IQuery>("Query", querySchema);
